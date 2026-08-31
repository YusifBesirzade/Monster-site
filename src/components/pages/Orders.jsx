import React, { useContext, useEffect, useState } from 'react'
import { AUTH } from '../Context/AuthContext'
import { DATA } from '../Context/DataContext'
import { FaArrowLeft, FaBoxOpen } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { translate } from '../utils/translations'
import { supabase } from '../../lib/supabaseClient'

function Orders() {
    const { language } = useContext(DATA)
    const { loading: authLoading } = useContext(AUTH)
    const { products } = useContext(DATA)

    const [user, setUser] = useState(null)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getOrders() {
            const {
                data: { session }
            } = await supabase.auth.getSession()

            const currentUser = session?.user || null

            setUser(currentUser)

            if (!currentUser) {
                setLoading(false)
                return
            }

            const { data, error } = await supabase
                .from('orders')
                .select(`
                    id,
                    total,
                    payment_status,
                    status,
                    created_at,
                    order_items (
                        id,
                        product_id,
                        category,
                        quantity,
                        price
                    )
                `)
                .eq('user_id', currentUser.id)
                .order('created_at', { ascending: false })

            if (!error) {
                setOrders(data || [])
            }

            setLoading(false)
        }

        if (!authLoading) {
            getOrders()
        }
    }, [authLoading])

    if (authLoading || loading) {
        return (
            <div className='min-h-[70vh] bg-[#080808] flex items-center justify-center'>
                <p className='text-[#A4A4A5]'>Loading...</p>
            </div>
        )
    }

    if (!user) {
        return (
            <div className='min-h-[70vh] bg-[#080808] flex items-center justify-center px-4'>
                <div className='text-center'>
                    <FaBoxOpen className='text-[#A4A4A5] text-5xl mx-auto mb-5' />

                    <h2 className='text-white text-2xl font-bold mb-4'>
                        {translate("authLogin", language)}
                    </h2>

                    <Link
                        to='/login'
                        className='inline-block bg-[#00FF00] text-black px-6 py-3 font-bold hover:bg-[#00E000] transition-colors'
                    >
                        {translate("authLogin", language)}
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full bg-[#080808] min-h-screen px-3 py-6 sm:px-5 md:px-8 lg:px-12'>
            <div className='max-w-310 mx-auto'>

                <div className='flex items-center gap-3 mb-6'>
                    <Link
                        to='/profile'
                        className='text-[#A4A4A5] hover:text-white transition-colors'
                    >
                        <FaArrowLeft />
                    </Link>

                    <div>
                        <h1 className='text-white text-3xl sm:text-4xl font-bold'>
                            {translate("profile.orders", language)}
                        </h1>

                        <div className='w-16 h-1 bg-[#00FF00] mt-3'></div>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className='bg-[#161617] border border-[#313233]'>
                        <div className='flex justify-center items-center py-20 px-5'>
                            <div className='text-center'>
                                <div className='w-20 h-20 bg-[#202021] flex items-center justify-center mx-auto mb-6'>
                                    <FaBoxOpen className='text-[#A4A4A5] text-3xl' />
                                </div>

                                <h2 className='text-white text-2xl font-bold'>
                                    {translate("orders.empty", language)}
                                </h2>

                                <p className='text-[#A4A4A5] text-sm mt-3'>
                                    {translate("orders.emptyDescription", language)}
                                </p>

                                <Link
                                    to='/category/tum-laptoplar'
                                    className='inline-block mt-6 border border-[#00FF00] text-white px-6 py-3 hover:bg-[#00FF00] hover:text-black transition-colors'
                                >
                                    {translate("wishlist.continueShopping", language)}
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='space-y-5'>
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className='bg-[#161617] border border-[#313233] p-5 sm:p-6'
                            >
                                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#313233] pb-5'>
                                    <div>
                                        <p className='text-[#A4A4A5] text-sm mb-1'>
                                            Sifariş №
                                        </p>

                                        <p className='text-white font-semibold'>
                                            {order.id.slice(0, 8).toUpperCase()}
                                        </p>

                                        <p className='text-[#777778] text-sm mt-2'>
                                            {new Date(order.created_at).toLocaleDateString('tr-TR')}
                                        </p>
                                    </div>

                                    <div className='flex flex-col sm:items-end gap-2'>
                                        <span
                                            className={`inline-block px-3 py-1 text-sm font-medium ${order.status === 'confirmed'
                                                ? 'bg-[#00FF00]/10 text-[#00FF00]'
                                                : 'bg-yellow-500/10 text-yellow-400'
                                                }`}
                                        >
                                            {order.status === 'confirmed'
                                                ? 'Təsdiqləndi'
                                                : 'Gözləyir'}
                                        </span>

                                        <span className='text-white font-semibold'>
                                            {Number(order.total).toLocaleString('tr-TR')} TL
                                        </span>
                                    </div>
                                </div>

                                <div className='pt-5 space-y-4'>
                                    {order.order_items?.map((item) => {
                                        const product = products.find(
                                            product => Number(product.id) === Number(item.product_id)
                                        )

                                        return (
                                            <div
                                                key={item.id}
                                                className='flex gap-4 border-b border-[#252526] pb-4 last:border-b-0 last:pb-0'
                                            >
                                                <div className='w-20 h-20 bg-[#202021] flex-shrink-0'>
                                                    {product?.cardImage && (
                                                        <img
                                                            src={product.cardImage}
                                                            alt={product.name?.[language] || 'Product'}
                                                            className='w-full h-full object-contain'
                                                        />
                                                    )}
                                                </div>

                                                <div className='flex-1 min-w-0'>
                                                    <p className='text-white font-medium'>
                                                        {product?.name?.[language] ||
                                                            product?.name?.tr ||
                                                            product?.name?.en ||
                                                            `Product #${item.product_id}`}
                                                    </p>

                                                    <p className='text-[#A4A4A5] text-sm mt-1'>
                                                        Miqdar: {item.quantity}
                                                    </p>

                                                    <p className='text-[#777778] text-sm mt-1'>
                                                        Vahid qiyməti: {Number(item.price).toLocaleString('tr-TR')} TL
                                                    </p>
                                                </div>

                                                <p className='text-white font-medium whitespace-nowrap'>
                                                    {(Number(item.price) * Number(item.quantity)).toLocaleString('tr-TR')} TL
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}

export default Orders