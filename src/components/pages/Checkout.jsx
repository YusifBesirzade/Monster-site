import React, { useContext, useEffect, useState } from 'react'
import { BASKET } from '../Context/BasketContext'
import { AUTH } from '../Context/AuthContext'
import { DATA } from '../Context/DataContext'
import { useNavigate } from 'react-router-dom'
import { FaCreditCard, FaLock } from 'react-icons/fa'
import { translate } from '../utils/translations'
import { supabase } from '../../lib/supabaseClient'

function Checkout() {
    const { sebet, totalPrice, loading: basketLoading } = useContext(BASKET)
    const { user } = useContext(AUTH)
    const { language } = useContext(DATA)
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!user) {
            navigate('/login')
            return
        }

        if (!basketLoading && sebet.length === 0) {
            navigate('/cart')
            return
        }

        setFirstName(user.user_metadata?.firstName || '')
        setLastName(user.user_metadata?.lastName || '')
        setEmail(user.email || '')
        setPhone(user.user_metadata?.phone || '')
    }, [user, basketLoading, sebet.length, navigate])

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const { data, error } = await supabase.functions.invoke(
                'create-checkout-session',
                {
                    body: {
                        firstName,
                        lastName,
                        email,
                        phone,
                        address,
                        city,
                        postalCode
                    }
                }
            )

            if (error) {
                console.error('CHECKOUT ERROR:', error)
                throw new Error(error.message || 'Checkout error')
            }

            if (!data?.checkoutUrl) {
                throw new Error('Stripe checkout URL not found')
            }

            window.location.href = data.checkoutUrl
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    if (basketLoading || !user || sebet.length === 0) {
        return (
            <div className='min-h-screen bg-[#1B1C1D] flex items-center justify-center'>
                <span className='text-[#A4A4A5]'>
                    Loading...
                </span>
            </div>
        )
    }

    return (
        <>
            <div className='min-h-screen bg-[#1B1C1D]'>
                <div className='max-w-310 mx-auto px-3 py-8 sm:px-5'>
                    <div className='flex items-center gap-3 mb-8'>
                        <FaCreditCard className='text-[#00FF00] text-2xl' />

                        <h1 className='text-white text-3xl font-semibold'>
                            {translate("basket.checkout", language)}
                        </h1>
                    </div>

                    <div className='grid grid-cols-1 xl:grid-cols-3 gap-5'>
                        <form
                            onSubmit={handleSubmit}
                            className='xl:col-span-2 border border-[#313132] bg-[#161617]'
                        >
                            <div className='px-5 py-4 border-b border-[#313132]'>
                                <h2 className='text-white text-lg font-semibold'>
                                    Müştəri məlumatları
                                </h2>
                            </div>

                            <div className='p-5 grid grid-cols-1 sm:grid-cols-2 gap-5'>
                                <div>
                                    <label className='block text-[#A4A4A5] text-sm mb-2'>
                                        {translate("authFirstName", language)}
                                    </label>

                                    <input
                                        type='text'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className='w-full bg-[#202021] border border-[#49494A] text-white p-3 outline-none focus:border-[#00FF00]'
                                        required
                                    />
                                </div>

                                <div>
                                    <label className='block text-[#A4A4A5] text-sm mb-2'>
                                        {translate("authLastName", language)}
                                    </label>

                                    <input
                                        type='text'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className='w-full bg-[#202021] border border-[#49494A] text-white p-3 outline-none focus:border-[#00FF00]'
                                        required
                                    />
                                </div>

                                <div>
                                    <label className='block text-[#A4A4A5] text-sm mb-2'>
                                        {translate("authEmail", language)}
                                    </label>

                                    <input
                                        type='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='w-full bg-[#202021] border border-[#49494A] text-white p-3 outline-none focus:border-[#00FF00]'
                                        required
                                    />
                                </div>

                                <div>
                                    <label className='block text-[#A4A4A5] text-sm mb-2'>
                                        {translate("authPhone", language)}
                                    </label>

                                    <input
                                        type='tel'
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className='w-full bg-[#202021] border border-[#49494A] text-white p-3 outline-none focus:border-[#00FF00]'
                                        required
                                    />
                                </div>

                                <div className='sm:col-span-2'>
                                    <label className='block text-[#A4A4A5] text-sm mb-2'>
                                        Ünvan
                                    </label>

                                    <textarea
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        rows='4'
                                        className='w-full bg-[#202021] border border-[#49494A] text-white p-3 outline-none focus:border-[#00FF00] resize-none'
                                        required
                                    />
                                </div>

                                <div>
                                    <label className='block text-[#A4A4A5] text-sm mb-2'>
                                        Şəhər
                                    </label>

                                    <input
                                        type='text'
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className='w-full bg-[#202021] border border-[#49494A] text-white p-3 outline-none focus:border-[#00FF00]'
                                        required
                                    />
                                </div>

                                <div>
                                    <label className='block text-[#A4A4A5] text-sm mb-2'>
                                        Poçt kodu
                                    </label>

                                    <input
                                        type='text'
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        className='w-full bg-[#202021] border border-[#49494A] text-white p-3 outline-none focus:border-[#00FF00]'
                                        required
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className='mx-5 mb-5 border border-red-500/40 bg-red-500/10 text-red-400 p-3 text-sm'>
                                    {error}
                                </div>
                            )}

                            <div className='px-5 py-4 border-t border-[#313132] flex items-center gap-2 text-[#A4A4A5] text-sm'>
                                <FaLock size={13} />

                                <span>
                                    Stripe ilə təhlükəsiz ödəniş
                                </span>
                            </div>

                            <div className='p-5 pt-0'>
                                <button
                                    type='submit'
                                    disabled={loading}
                                    className='w-full bg-[#00FF00] text-black font-semibold py-3 hover:bg-[#26DE2E] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                                >
                                    {loading
                                        ? 'Yönləndirilir...'
                                        : 'Stripe ilə ödə'}
                                </button>
                            </div>
                        </form>

                        <div className='h-fit border border-[#313132] bg-[#161617]'>
                            <div className='px-5 py-4 border-b border-[#313132]'>
                                <h2 className='text-white text-lg font-semibold'>
                                    {translate("basket.summary", language)}
                                </h2>
                            </div>

                            <div className='p-5'>
                                <div className='space-y-4'>
                                    {sebet.map(item => {
                                        const itemPrice =
                                            item.discountedprice ??
                                            item.price ??
                                            0

                                        const itemTotal =
                                            itemPrice * item.quantity

                                        return (
                                            <div
                                                key={`${item.id}-${item.category}`}
                                                className='flex gap-3'
                                            >
                                                <div className='w-20 h-20 shrink-0 bg-[#202021] flex items-center justify-center'>
                                                    <img
                                                        src={item.cardImage}
                                                        alt={item.name?.[language]}
                                                        className='w-full h-full object-contain'
                                                    />
                                                </div>

                                                <div className='flex-1 min-w-0'>
                                                    <p className='text-white text-sm line-clamp-2'>
                                                        {item.name?.[language]}
                                                    </p>

                                                    <p className='text-[#A4A4A5] text-xs mt-1'>
                                                        {item.quantity} x {itemPrice.toLocaleString('tr-TR')} {translate("product.tl", language)}
                                                    </p>
                                                </div>

                                                <span className='text-white text-sm font-semibold whitespace-nowrap'>
                                                    {itemTotal.toLocaleString('tr-TR')} {translate("product.tl", language)}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className='border-t border-[#313132] mt-5 pt-5'>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-[#A4A4A5]'>
                                            {translate("basket.total", language)}
                                        </span>

                                        <span className='text-white text-xl font-semibold'>
                                            {totalPrice.toLocaleString('tr-TR')} {translate("product.tl", language)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout