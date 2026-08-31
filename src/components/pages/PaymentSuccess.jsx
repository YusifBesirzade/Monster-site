import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'
import { supabase } from '../../lib/supabaseClient'

function PaymentSuccess() {
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')

    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let interval
        let attempts = 0

        async function getOrder() {
            if (!sessionId) {
                setError('Sifariş məlumatı tapılmadı')
                setLoading(false)
                return
            }

            const { data, error } = await supabase
                .from('orders')
                .select('id, total, payment_status, status, created_at')
                .eq('stripe_session_id', sessionId)
                .single()

            if (error) {
                setError('Sifariş məlumatı yüklənmədi')
                setLoading(false)
                return
            }

            setOrder(data)

            if (
                data.payment_status === 'paid' &&
                data.status === 'confirmed'
            ) {
                setLoading(false)
                clearInterval(interval)
                return
            }

            attempts++

            if (attempts >= 10) {
                setLoading(false)
                clearInterval(interval)
            }
        }

        getOrder()

        interval = setInterval(getOrder, 2000)

        return () => clearInterval(interval)
    }, [sessionId])

    return (
        <div className='min-h-screen bg-[#1B1C1D] flex items-center justify-center px-4'>
            <div className='w-full max-w-xl border border-[#313132] bg-[#161617] p-8 text-center'>
                {loading ? (
                    <>
                        <div className='mx-auto mb-5 h-14 w-14 border-4 border-[#313132] border-t-white rounded-full animate-spin' />

                        <h1 className='text-white text-2xl font-semibold mb-3'>
                            Ödəniş təsdiqlənir
                        </h1>

                        <p className='text-[#A4A4A5]'>
                            Sifariş məlumatlarınız hazırlanır...
                        </p>
                    </>
                ) : error ? (
                    <>
                        <h1 className='text-white text-2xl font-semibold mb-3'>
                            Xəta baş verdi
                        </h1>

                        <p className='text-[#A4A4A5] mb-7'>
                            {error}
                        </p>

                        <Link
                            to='/orders'
                            className='inline-block bg-white text-black px-6 py-3 font-medium hover:bg-gray-200 transition'
                        >
                            Sifarişlərim
                        </Link>
                    </>
                ) : order?.payment_status === 'paid' &&
                    order?.status === 'confirmed' ? (
                    <>
                        <FaCheckCircle className='mx-auto text-[#00FF00] text-6xl mb-5' />

                        <h1 className='text-white text-3xl font-semibold mb-3'>
                            Ödəniş uğurla tamamlandı
                        </h1>

                        <p className='text-[#A4A4A5] mb-6'>
                            Sifarişiniz uğurla qəbul edildi.
                        </p>

                        <div className='border border-[#313132] p-5 mb-7 text-left'>
                            <p className='text-[#A4A4A5] mb-2'>
                                Sifariş №
                            </p>

                            <p className='text-white font-medium mb-4 break-all'>
                                {order.id.slice(0, 8).toUpperCase()}
                            </p>

                            <p className='text-[#A4A4A5] mb-2'>
                                Ümumi məbləğ
                            </p>

                            <p className='text-white font-semibold text-xl mb-4'>
                                {Number(order.total).toLocaleString('tr-TR')} TL
                            </p>

                            <p className='text-[#A4A4A5] mb-2'>
                                Ödəniş
                            </p>

                            <p className='text-[#00FF00] font-medium'>
                                Ödəniş təsdiqləndi
                            </p>
                        </div>

                        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
                            <Link
                                to='/orders'
                                className='bg-white text-black px-6 py-3 font-medium hover:bg-gray-200 transition'
                            >
                                Sifarişlərim
                            </Link>

                            <Link
                                to='/category/tum-laptoplar'
                                className='border border-[#313132] text-white px-6 py-3 font-medium hover:bg-[#222223] transition'
                            >
                                Alış-verişə davam et
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className='text-white text-2xl font-semibold mb-3'>
                            Ödəniş gözlənilir
                        </h1>

                        <p className='text-[#A4A4A5] mb-7'>
                            Ödənişiniz qəbul edilib, sifarişiniz təsdiqlənir.
                        </p>

                        <Link
                            to='/orders'
                            className='inline-block bg-white text-black px-6 py-3 font-medium hover:bg-gray-200 transition'
                        >
                            Sifarişlərim
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default PaymentSuccess