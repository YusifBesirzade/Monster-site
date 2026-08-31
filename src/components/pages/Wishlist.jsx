import React, { useContext, useEffect } from 'react'
import { AUTH } from '../Context/AuthContext'
import { DATA } from '../Context/DataContext'
import { WISHLIST } from '../Context/WishlistContext'
import { BASKET } from '../Context/BasketContext'
import { useNavigate } from 'react-router-dom'
import { translate } from '../utils/translations'
import { FaHeart, FaTrash } from 'react-icons/fa'

function Wishlist() {
    const { user, loading: authLoading } = useContext(AUTH)
    const { language, products } = useContext(DATA)
    const { wishlist, removewishlist, loading } = useContext(WISHLIST)
    const { addbasket } = useContext(BASKET)

    const navigate = useNavigate()

    if (authLoading) {
        return (
            <div className='min-h-screen bg-[#1B1C1D] flex items-center justify-center'>
                <span className='text-[#A4A4A5]'>
                    Loading...
                </span>
            </div>
        )
    }

    if (!user) {
        return (
            <div className='min-h-screen bg-[#1B1C1D] flex flex-col items-center justify-center gap-5 p-5'>
                <FaHeart className='text-[#49494A] text-5xl' />

                <h2 className='text-white text-xl font-semibold'>
                    {translate("wishlist.loginRequired", language)}
                </h2>

                <button
                    onClick={() => navigate('/login')}
                    className='border border-[#00FF00] text-white px-8 py-3 hover:bg-[#00FF00] hover:text-black transition-colors cursor-pointer'
                >
                    {translate("authLogin", language)}
                </button>
            </div>
        )
    }

    return (
        <>
            <div className='min-h-screen bg-[#1B1C1D]'>
                <div className='max-w-310 mx-auto px-3 py-5 sm:px-5'>
                    <div className='flex items-center gap-3 mb-8'>
                        <FaHeart className='text-red-500 text-2xl' />

                        <h1 className='text-white text-3xl font-semibold'>
                            {translate("authWishlist", language)}
                        </h1>

                        <span className='text-[#A4A4A5]'>
                            ({wishlist.length})
                        </span>
                    </div>

                    {loading ? (
                        <div className='min-h-60 flex items-center justify-center'>
                            <span className='text-[#A4A4A5]'>
                                Loading...
                            </span>
                        </div>
                    ) : wishlist.length === 0 ? (
                        <div className='min-h-70 border border-[#313132] bg-[#161617] flex flex-col items-center justify-center gap-5'>
                            <FaHeart className='text-[#49494A] text-5xl' />

                            <h2 className='text-white text-xl font-semibold'>
                                {translate("wishlist.empty", language)}
                            </h2>

                            <button
                                onClick={() => navigate('/')}
                                className='border border-[#00FF00] text-white px-7 py-3 hover:bg-[#00FF00] hover:text-black transition-colors cursor-pointer'
                            >
                                {translate("wishlist.continueShopping", language)}
                            </button>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                            {wishlist.map((item, index) => {
                                const itemPrice =
                                    item.discountedprice ??
                                    item.price ??
                                    0

                                return (
                                    <div
                                        key={`${item.id}-${item.category}`}
                                        className='border border-[#313132] bg-[#161617] hover:border-[#1F481D] transition-colors'
                                    >
                                        <div className='relative bg-linear-to-b from-[#252526] to-[#181819] h-60 flex items-center justify-center'>
                                            <button
                                                type='button'
                                                onClick={() => removewishlist(index)}
                                                className='absolute top-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer'
                                                title={translate("wishlist.remove", language)}
                                            >
                                                <FaTrash size={14} />
                                            </button>

                                            <img
                                                src={item.cardImage}
                                                alt={item.name?.[language]}
                                                className='w-full h-full object-contain p-5'
                                            />
                                        </div>

                                        <div className='p-4'>
                                            <div className='h-12 mb-4'>
                                                <button
                                                    type='button'
                                                    onClick={() => navigate(`/product/${item.slug}`)}
                                                    className='text-white text-lg text-left line-clamp-2 hover:text-[#00FF00] transition-colors cursor-pointer'
                                                >
                                                    {item.name?.[language]}
                                                </button>
                                            </div>

                                            <div className='mb-5'>
                                                {item.discount > 0 ? (
                                                    <div className='flex flex-col'>
                                                        <span className='text-[#9B9B9C] text-sm line-through'>
                                                            {item.oldprice.toLocaleString('tr-TR')}{' '}
                                                            {translate("product.tl", language)}
                                                        </span>

                                                        <span className='text-white text-2xl font-semibold'>
                                                            {item.discountedprice.toLocaleString('tr-TR')}{' '}
                                                            {translate("product.tl", language)}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className='text-white text-2xl font-semibold'>
                                                        {itemPrice.toLocaleString('tr-TR')}{' '}
                                                        {translate("product.tl", language)}
                                                    </span>
                                                )}
                                            </div>

                                            <button
                                                type='button'
                                                onClick={() => addbasket(item, item.category, 1)}
                                                className='w-full border border-[#00FF00] text-white py-3 hover:bg-[#00FF00] hover:text-black transition-colors cursor-pointer'
                                            >
                                                {translate("common.addToCart", language)}
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Wishlist