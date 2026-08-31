import React, { createContext, useContext, useEffect, useState } from 'react'
import { AUTH } from './AuthContext'
import { DATA } from './DataContext'
import { supabase } from '../../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export const WISHLIST = createContext(null)

function WishlistContext({ children }) {
    const { user, loading: authLoading } = useContext(AUTH)
    const { products } = useContext(DATA)
    const navigate = useNavigate()

    const [wishlist, setWishlist] = useState([])
    const [loading, setLoading] = useState(false)
    const [processingWishlist, setProcessingWishlist] = useState([])

    const userId = user?.id
    const productsLength = products?.length ?? 0

    async function loadWishlist() {
        if (!userId || productsLength === 0) {
            return
        }

        setLoading(true)

        const { data, error } = await supabase
            .from('wishlist')
            .select('product_id, category')
            .eq('user_id', userId)

        if (error) {
            console.error('Wishlist load error:', error)
            setLoading(false)
            return
        }

        const wishlistProducts = data
            .map(item => {
                const product = products.find(
                    p => Number(p.id) === Number(item.product_id)
                )

                if (!product) {
                    return null
                }

                return {
                    ...product,
                    category: item.category
                }
            })
            .filter(Boolean)

        setWishlist(wishlistProducts)
        setLoading(false)
    }

    useEffect(() => {
        if (authLoading || !userId || productsLength === 0) {
            return
        }

        loadWishlist()
    }, [userId, productsLength, authLoading])


    async function addwishlist(product, category) {
        if (processingWishlist.includes(product.id)) {
            return
        }

        if (!user) {
            navigate('/login', {
                state: {
                    from: `/product/${product.slug}`
                }
            })
            return
        }

        setProcessingWishlist(current => [
            ...current,
            product.id
        ])

        try {
            const productIsAdded = wishlist.some(
                item => item.id === product.id
            )

            if (productIsAdded) {
                const { error } = await supabase
                    .from('wishlist')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('product_id', product.id)

                if (error) {
                    console.error('Wishlist delete error:', error)
                    return
                }

                setWishlist(current =>
                    current.filter(item => item.id !== product.id)
                )

                return
            }

            const { data: existingItem, error: checkError } = await supabase
                .from('wishlist')
                .select('product_id, category')
                .eq('user_id', user.id)
                .eq('product_id', product.id)
                .maybeSingle()

            if (checkError) {
                console.error('Wishlist check error:', checkError)
                return
            }

            if (existingItem) {
                setWishlist(current => {
                    const alreadyExists = current.some(
                        item => item.id === product.id
                    )

                    if (alreadyExists) {
                        return current
                    }

                    return [
                        ...current,
                        {
                            ...product,
                            category: existingItem.category
                        }
                    ]
                })

                return
            }

            const { error } = await supabase
                .from('wishlist')
                .insert({
                    user_id: user.id,
                    product_id: product.id,
                    category
                })

            if (error) {
                console.error('Wishlist insert error:', error)
                return
            }

            setWishlist(current => {
                const alreadyExists = current.some(
                    item => item.id === product.id
                )

                if (alreadyExists) {
                    return current
                }

                return [
                    ...current,
                    {
                        ...product,
                        category
                    }
                ]
            })
        } finally {
            setProcessingWishlist(current =>
                current.filter(id => id !== product.id)
            )
        }
    }

    async function removewishlist(index) {
        if (!user) {
            return
        }

        const product = wishlist[index]

        if (!product) {
            return
        }

        const { error } = await supabase
            .from('wishlist')
            .delete()
            .eq('user_id', user.id)
            .eq('product_id', product.id)

        if (error) {
            console.error('Wishlist delete error:', error)
            return
        }

        setWishlist(current =>
            current.filter((_, i) => i !== index)
        )
    }

    return (
        <WISHLIST.Provider value={{ wishlist, addwishlist, removewishlist, loadWishlist, loading, processingWishlist }}>
            {children}
        </WISHLIST.Provider>
    )
}

export default WishlistContext