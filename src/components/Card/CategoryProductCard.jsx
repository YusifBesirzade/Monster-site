import React, { useContext } from 'react'
import { DATA } from '../Context/DataContext'
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { BASKET } from '../Context/BasketContext';
import { WISHLIST } from '../Context/WishlistContext';
import { translate } from '../utils/translations';
import { useNavigate } from 'react-router-dom';

function CategoryProductCard({ categoryProduct }) {
    console.log("CARD PRODUCT:", categoryProduct?.id, categoryProduct?.name?.tr)
    const { language } = useContext(DATA)
    const { addbasket } = useContext(BASKET)
    const { addwishlist, wishlist, processingWishlist } = useContext(WISHLIST)
    const navigate = useNavigate()

    const isFav = wishlist.some(
        (fav) => fav.id === categoryProduct.id
    )

    const productDescription = [
        categoryProduct.specifications?.processorModel?.[language],
        categoryProduct.specifications?.graphicsCard?.[language],
        categoryProduct.specifications?.screen?.[language],
        categoryProduct.specifications?.memory?.[language],
        categoryProduct.specifications?.firstM2Ssd?.[language],
        categoryProduct.specifications?.operatingSystem?.[language],
        categoryProduct.specifications?.storageSupport &&
        `${categoryProduct.specifications.storageSupport.count} x ${categoryProduct.specifications.storageSupport.type?.[language]}`
    ].filter(item => item != null)

    return (
        <>
            <div onClick={() => navigate(`/product/${categoryProduct.slug}`)} key={categoryProduct.id}
                className='w-full min-w-0 h-full flex flex-col justify-between border border-[#313132] hover:border-[#1F481D] cursor-pointer'>
                <div className='relative bg-linear-to-b from-[#252526] to-[#181819] w-full h-52 flex items-center justify-center shrink-0 mb-2 select-none'>
                    <div onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (processingWishlist.includes(categoryProduct.id)) {
                            return
                        }
                        addwishlist(categoryProduct, categoryProduct.departmentSlug)
                    }}
                        className='absolute top-3 right-4 text-xl bg-white border border-gray-300 rounded-full p-2 cursor-pointer hover:bg-red-600 hover:text-white'>
                        {isFav ? (
                            <FaHeart className='text-red-500' />
                        ) : (
                            <FaRegHeart />
                        )}
                    </div>
                    <img className='w-full h-48 object-contain' src={categoryProduct.cardImage} alt={categoryProduct.name[language]} />
                    {categoryProduct.cpuImage && (
                        <img
                            className='absolute bottom-0 right-1 w-10 h-10 object-contain'
                            src={categoryProduct.cpuImage}
                            alt="CPU"
                        />
                    )}
                </div>
                <label onClick={(e) => e.stopPropagation()}
                    className='bg-black text-[#A4A4A5] flex items-center gap-2 py-2 px-3 cursor-pointer select-none shrink-0'>
                    <div className='relative flex items-center justify-center shrink-0'>
                        <input className='peer appearance-none w-4 h-4 border border-[#A4A4A5] bg-transparent 
                      checked:bg-[#00FF00] checked:border-[#00FF00] cursor-pointer' type="checkbox" />
                        <svg
                            className="absolute left-0.5 top-0.5 w-3 h-3 text-black opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="3.5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <span>{translate("common.compare", language)}</span>
                </label>
                <div className='bg-[#161617]'>
                    <div className='flex flex-col gap-2 p-3'>
                        <div className='h-6 flex items-center shrink-0'>
                            {categoryProduct.rating > 0 && (
                                <div className='h-5 flex items-center gap-2'>
                                    <div className='flex'>
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <FaStar key={star} size={14}
                                                className={star <= categoryProduct.rating ? "text-[#FBBD08]" : "text-[#4A4A4B]"} />
                                        ))}
                                    </div>

                                    <span className='text-[#FBBD08]'>{categoryProduct.rating} ({categoryProduct.commentcount})</span>
                                </div>
                            )}
                        </div>

                        <div className='h-12 flex items-start shrink-0 overflow-hidden'>
                            <span className='text-white text-lg line-clamp-2 leading-tight block'>{categoryProduct.name[language]}</span>
                        </div>

                        <ul className='mt-3 flex flex-col gap-1 text-[#A4A4A5] text-sm h-45'>
                            {productDescription.slice(0, 6).map((item, index) => (
                                <li key={index} className='flex min-w-0 gap-2'>
                                    <span>•</span>
                                    <span className='min-w-0 line-clamp-1'>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className='mt-auto'>
                            <div className='h-20 flex flex-col justify-end'>
                                {categoryProduct.discount > 0 ? (
                                    <div className='flex items-end justify-between min-h-13.75'>
                                        <div className='flex flex-col items-start gap-1'>
                                            <span className='line-through text-[#9B9B9C]'>{categoryProduct.oldprice} {translate("product.tl", language)}</span>
                                            <span className='text-white text-3xl font-semibold'>{categoryProduct.discountedprice} {translate("product.tl", language)}</span>
                                        </div>
                                        <div className='relative flex flex-col items-center justify-center w-16 bg-[#ec268f] text-white text-center font-bold
                                font-sans shadow-md [clip-path:polygon(0_0,100%_0,100%_100%,50%_88%,0_100%)]'>
                                            <div className='w-full bg-[#bd156c] py-1 text-[11px] uppercase font-extrabold'>
                                                {translate("product.discount", language)}
                                            </div>
                                            <div className='py-2 pb-5 text-xl font-black'>
                                                %{categoryProduct.discount}
                                            </div>
                                        </div>
                                    </div>) : (
                                    <div className='flex items-end w-full min-h-13.75 gap-5'>
                                        <span className='text-white text-3xl font-semibold'>{categoryProduct.price} {translate("product.tl", language)}</span>
                                    </div>)}
                            </div>

                            <div className='h-8 mt-2 flex items-center mb-6'>
                                <span className='text-[#26DE2E] text-xs font-medium'>
                                    {translate("product.installment", language).replace(
                                        "{monthly}",
                                        categoryProduct.monthlypaid
                                    )}
                                </span>
                            </div>
                            <button onClick={(e) => {
                                e.stopPropagation()
                                addbasket(categoryProduct, categoryProduct.departmentSlug, 1)
                            }} className='w-full text-white bg-transparent border border-[#00FF00] 
                           hover:text-black hover:bg-[#00FF00] p-2 cursor-pointer'>{translate("common.addToCart", language)}</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CategoryProductCard