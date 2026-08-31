import React, { useContext } from 'react'
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa'
import { DATA } from '../Context/DataContext'
import { translate } from '../utils/translations'
import { BASKET } from '../Context/BasketContext'
import { WISHLIST } from '../Context/WishlistContext'
import { useNavigate } from 'react-router-dom'

function ProductCard({ product }) {
    const { language } = useContext(DATA)
    const { addbasket } = useContext(BASKET)
    const { addwishlist, wishlist, processingWishlist } = useContext(WISHLIST)
    const navigate = useNavigate()

    const isFav = wishlist.some(fav => fav.id === product.id)

    const isProcessing = processingWishlist.includes(product.id)

    return (
        <>
            <div onClick={() => navigate(`/product/${product.slug}`)} key={product.id}
                className='w-full h-full flex flex-col justify-between border border-[#313132] hover:border-1 hover:border-[#00FF00] p-3 cursor-pointer'>
                <div className='relative w-full flex justify-center h-52 shrink-0 mb-2'>
                    <div onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (isProcessing) {
                            return
                        }
                        addwishlist(product, product.departmentSlug)
                    }}
                        className='absolute top-2 right-2 z-10 text-xl bg-white border border-gray-300 rounded-full p-2 cursor-pointer hover:bg-red-600 hover:text-white transition-colors'>
                        {isFav ? (
                            <FaHeart className='text-red-500' />
                        ) : (
                            <FaRegHeart />
                        )}
                    </div>
                    <img className='w-full h-48 object-contain' src={product.cardImage} alt={product.name[language]} />
                    <img className='absolute bottom-0 right-1 w-10 h-10 object-contain' src={product.cpuImage} alt="CPU" />
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='h-6 flex items-center shrink-0'>
                        {product.rating > 0 && (
                            <div className='h-5 flex items-center gap-2'>
                                <div className='flex'>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <FaStar key={star} size={14}
                                            className={star <= product.rating ? "text-[#FBBD08]" : "text-[#4A4A4B]"} />
                                    ))}
                                </div>

                                <span className='text-[#FBBD08]'>{product.rating} ({product.commentcount})</span>
                            </div>
                        )}
                    </div>

                    <div className='h-14 flex items-start shrink-0 overflow-hidden'>
                        <span className='text-white text-lg line-clamp-1 leading-tight block text-left w-full'>
                            {product.name[language]}
                        </span>
                    </div>

                    <div className='mt-auto'>
                        <div className='h-20 flex flex-col justify-end'>
                            {product.discount > 0 ? (
                                <div className='flex items-end justify-between min-h-13.75'>
                                    <div className='flex flex-col items-start gap-1'>
                                        <span className='line-through text-[#9B9B9C]'>
                                            {product.oldprice} {translate("product.tl", language)}
                                        </span>
                                        <span className='text-white text-3xl font-semibold'>
                                            {product.discountedprice} {translate("product.tl", language)}
                                        </span>
                                    </div>
                                    <div className='relative flex flex-col items-center justify-center w-16 bg-[#ec268f] text-white text-center font-bold
                                font-sans shadow-md [clip-path:polygon(0_0,100%_0,100%_100%,50%_88%,0_100%)]'>
                                        <div className='w-full bg-[#bd156c] py-1 text-[11px] uppercase font-extrabold'>
                                            {translate("product.discount", language)}
                                        </div>
                                        <div className='py-2 pb-5 text-xl font-black'>
                                            %{product.discount}
                                        </div>
                                    </div>
                                </div>) : (
                                <div className='flex items-end w-full min-h-13.75 gap-5'>
                                    <span className='text-white text-3xl font-semibold'>
                                        {product.price} {translate("product.tl", language)}
                                    </span>
                                </div>)}
                        </div>

                        <div className='h-8 mt-2 flex items-center mb-6'>
                            <span className='text-[#26DE2E] text-xs font-medium'>
                                {translate("product.installment", language).replace(
                                    "{monthly}",
                                    product.monthlypaid
                                )}
                            </span>
                        </div>
                        <button onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            addbasket(product, product.departmentSlug, 1)
                        }}
                            className='w-full text-white bg-transparent border border-[#00FF00] hover:text-black hover:bg-[#00FF00] p-2 cursor-pointer'>
                            {translate("common.addToCart", language)}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard