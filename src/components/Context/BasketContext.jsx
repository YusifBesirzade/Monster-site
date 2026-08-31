import React, { createContext, useContext, useEffect, useState } from 'react'
import { AUTH } from './AuthContext'
import { DATA } from './DataContext'
import { supabase } from '../../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export const BASKET = createContext([])

function BasketContext({ children }) {
    const { user, loading: authLoading } = useContext(AUTH)
    const { products } = useContext(DATA)
    const navigate = useNavigate()

    const [sebet, setSebet] = useState([])
    const [loading, setLoading] = useState(false)
    const [processingBasket, setProcessingBasket] = useState([])

    const userId = user?.id
    const productsLength = products?.length ?? 0

    async function loadBasket() {
        if (!userId || productsLength === 0) {
            return
        }

        setLoading(true)

        const { data, error } = await supabase
            .from('cart')
            .select('product_id, category, quantity')
            .eq('user_id', userId)

        if (error) {
            console.error('Basket load error:', error)
            setLoading(false)
            return
        }

        const basketProducts = data
            .map(item => {
                const product = products.find(p => Number(p.id) === Number(item.product_id))

                if (!product) {
                    return null
                }

                return {
                    ...product,
                    category: item.category,
                    quantity: item.quantity
                }
            })
            .filter(Boolean)

        setSebet(basketProducts)
        setLoading(false)
    }

    useEffect(() => {
        if (authLoading || !userId || productsLength === 0) {
            return
        }

        loadBasket()
    }, [userId, productsLength, authLoading])

    async function addbasket(product, category, quantity = 1) {
        if (!user) {
            navigate('/register', {
                state: {
                    from: `/product/${product.slug}`
                }
            })
            return
        }

        if (quantity <= 0 || processingBasket.includes(product.id)) {
            return
        }

        setProcessingBasket(current => [
            ...current,
            product.id
        ])

        try {
            const existingItem = sebet.find(
                item => item.id === product.id
            )

            if (existingItem) {
                const newQuantity = existingItem.quantity + quantity

                const { error } = await supabase
                    .from('cart')
                    .update({
                        quantity: newQuantity
                    })
                    .eq('user_id', user.id)
                    .eq('product_id', product.id)

                if (error) {
                    console.error('Basket update error:', error)
                    return
                }

                setSebet(current =>
                    current.map(item =>
                        item.id === product.id
                            ? {
                                ...item,
                                quantity: newQuantity
                            }
                            : item
                    )
                )

                return
            }

            const { error } = await supabase
                .from('cart')
                .insert({
                    user_id: user.id,
                    product_id: product.id,
                    category,
                    quantity
                })

            if (error) {
                if (error.code === '23505') {
                    const { data: dbItem, error: dbError } = await supabase
                        .from('cart')
                        .select('quantity')
                        .eq('user_id', user.id)
                        .eq('product_id', product.id)
                        .maybeSingle()

                    if (dbError) {
                        console.error('Basket check error:', dbError)
                        return
                    }

                    if (dbItem) {
                        const newQuantity = dbItem.quantity + quantity

                        const { error: updateError } = await supabase
                            .from('cart')
                            .update({
                                quantity: newQuantity
                            })
                            .eq('user_id', user.id)
                            .eq('product_id', product.id)

                        if (updateError) {
                            console.error('Basket update error:', updateError)
                            return
                        }

                        setSebet(current => [
                            ...current,
                            {
                                ...product,
                                category,
                                quantity: newQuantity
                            }
                        ])
                    }
                } else {
                    console.error('Basket insert error:', error)
                }

                return
            }

            setSebet(current => [
                ...current,
                {
                    ...product,
                    category,
                    quantity
                }
            ])
        } finally {
            setProcessingBasket(current =>
                current.filter(id => id !== product.id)
            )
        }
    }

    async function increaseQuant(index) {
        const item = sebet[index]

        if (!user || !item || processingBasket.includes(item.id)) {
            return
        }

        setProcessingBasket(current => [
            ...current,
            item.id
        ])

        try {
            const newQuantity = item.quantity + 1

            const { error } = await supabase
                .from('cart')
                .update({
                    quantity: newQuantity
                })
                .eq('user_id', user.id)
                .eq('product_id', item.id)

            if (error) {
                console.error('Basket increase error:', error)
                return
            }

            setSebet(current =>
                current.map((basketItem, i) =>
                    i === index
                        ? {
                            ...basketItem,
                            quantity: newQuantity
                        }
                        : basketItem
                )
            )
        } finally {
            setProcessingBasket(current =>
                current.filter(id => id !== item.id)
            )
        }
    }

    async function decreaseQuant(index) {
        const item = sebet[index]

        if (!user || !item || processingBasket.includes(item.id)) {
            return
        }

        setProcessingBasket(current => [
            ...current,
            item.id
        ])

        try {
            if (item.quantity === 1) {
                const { error } = await supabase
                    .from('cart')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('product_id', item.id)

                if (error) {
                    console.error('Basket decrease error:', error)
                    return
                }

                setSebet(current =>
                    current.filter((_, i) => i !== index)
                )

                return
            }

            const newQuantity = item.quantity - 1

            const { error } = await supabase
                .from('cart')
                .update({
                    quantity: newQuantity
                })
                .eq('user_id', user.id)
                .eq('product_id', item.id)

            if (error) {
                console.error('Basket decrease error:', error)
                return
            }

            setSebet(current =>
                current.map((basketItem, i) =>
                    i === index
                        ? {
                            ...basketItem,
                            quantity: newQuantity
                        }
                        : basketItem
                )
            )
        } finally {
            setProcessingBasket(current =>
                current.filter(id => id !== item.id)
            )
        }
    }

    async function removebasket(index) {
        const item = sebet[index]

        if (!user || !item || processingBasket.includes(item.id)) {
            return
        }

        setProcessingBasket(current => [
            ...current,
            item.id
        ])

        try {
            const { error } = await supabase
                .from('cart')
                .delete()
                .eq('user_id', user.id)
                .eq('product_id', item.id)

            if (error) {
                console.error('Basket remove error:', error)
                return
            }

            setSebet(current =>
                current.filter((_, i) => i !== index)
            )
        } finally {
            setProcessingBasket(current =>
                current.filter(id => id !== item.id)
            )
        }
    }

    const count = sebet.reduce((total, item) => total + item.quantity, 0)

    const totalPrice = sebet.reduce((total, item) => total + ((item.discountedprice ?? item.price ?? 0) * item.quantity), 0)

    return (
        <>
            <BASKET.Provider value={{
                sebet, count, totalPrice, loading, processingBasket, addbasket, increaseQuant,
                decreaseQuant, removebasket, loadBasket
            }}>
                {children}
            </BASKET.Provider>
        </>
    )
}

export default BasketContext