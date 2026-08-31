import React, { useContext } from 'react'
import { WISHLIST } from '../Context/WishlistContext'
import { DATA } from '../Context/DataContext'
import { BASKET } from '../Context/BasketContext'
import { translate } from '../utils/translations'
import { FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { IoClose } from 'react-icons/io5'

function WishlistModal({ onClose }) {
    const { wishlist, removewishlist } = useContext(WISHLIST)
    const { language } = useContext(DATA)
    const { addbasket } = useContext(BASKET)

    return (
        <>
            <div
                onClick={onClose}
                className='fixed inset-0 z-[9998] bg-black/60'
            />

            <div
                onClick={(e) => e.stopPropagation()}
                className='fixed sm:absolute right-0 sm:right-0 top-0 sm:top-full mt-0 sm:mt-3 z-[9999] w-full sm:w-100 h-full sm:h-auto max-h-screen sm:max-h-none rounded-none sm:rounded-sm border-0 sm:border border-[#313233] bg-[#161617] shadow-2xl'
            >
                <div className='hidden sm:block absolute -top-2 right-6 h-4 w-4 rotate-45 border-l border-t border-[#313233] bg-[#161617]' />

                <div className='flex items-center justify-between px-5 py-4 border-b border-[#313233]'>
                    <div className='flex items-center gap-2'>
                        <FaHeart className='text-red-500' />

                        <h3 className='text-white text-lg font-semibold'>
                            {translate("authWishlist", language)}
                        </h3>

                        <span className='text-[#A4A4A5] text-sm'>
                            ({wishlist.length})
                        </span>
                    </div>

                    <button
                        onClick={onClose}
                        className='text-[#A4A4A5] hover:text-white cursor-pointer'
                    >
                        <IoClose size={20} />
                    </button>
                </div>

                {wishlist.length === 0 ? (
                    <div className='flex justify-center items-center py-8'>
                        <h3 className='text-xl font-bold text-white tracking-wide'>
                            {translate("wishlist.empty", language)}
                        </h3>
                    </div>
                ) : (
                    <>
                        <div className='max-h-100 overflow-y-auto'>
                            {wishlist.map((item, index) => (
                                <div
                                    key={`${item.id}-${item.category}`}
                                    className='flex gap-3 p-4 border-b border-[#313233]'
                                >
                                    <div className='w-20 h-20 shrink-0 bg-[#202021] flex items-center justify-center'>
                                        <img
                                            src={item.cardImage}
                                            alt={item.name?.[language]}
                                            className='w-full h-full object-contain'
                                        />
                                    </div>

                                    <div className='flex-1 min-w-0'>
                                        <Link
                                            to={`/product/${item.slug}`}
                                            onClick={onClose}
                                            className='text-white text-sm line-clamp-2 hover:text-[#00FF00] transition-colors'
                                        >
                                            {item.name?.[language]}
                                        </Link>

                                        <div className='text-white font-semibold mt-2'>
                                            {(item.discountedprice ?? item.price ?? 0).toLocaleString('tr-TR')}
                                            {' '}
                                            {translate("product.tl", language)}
                                        </div>

                                        <div className='flex items-center justify-between mt-3'>
                                            <button
                                                onClick={() => addbasket(item, item.category, 1)}
                                                className='text-[#00EF00] text-xs hover:text-white cursor-pointer'
                                            >
                                                {translate("common.addToCart", language)}
                                            </button>

                                            <button
                                                onClick={() => removewishlist(index)}
                                                className='text-[#A4A4A5] text-xs hover:text-red-500 cursor-pointer'
                                            >
                                                {translate("wishlist.remove", language)}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='p-4'>
                            <Link
                                to='/wishlist'
                                onClick={onClose}
                                className='block w-full text-center border border-[#00FF00] text-white hover:bg-[#00FF00] hover:text-black py-2 transition-colors'
                            >
                                {translate("wishlist.viewAll", language)}
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default WishlistModal