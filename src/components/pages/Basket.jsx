import React, { useContext } from 'react'
import { BASKET } from '../Context/BasketContext'
import { DATA } from '../Context/DataContext'
import { useNavigate } from 'react-router-dom'
import { FaMinus, FaPlus, FaShoppingCart, FaTrash } from 'react-icons/fa'
import { translate } from '../utils/translations'

function Basket() {
    const {
        sebet,
        increaseQuant,
        decreaseQuant,
        removebasket,
        totalPrice,
        count,
        loading
    } = useContext(BASKET)

    const { language } = useContext(DATA)
    const navigate = useNavigate()

    if (loading) {
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
                <div className='max-w-310 mx-auto px-3 py-5 sm:px-5'>
                    <div className='flex items-center gap-3 mb-8'>
                        <FaShoppingCart className='text-[#00FF00] text-2xl' />

                        <h1 className='text-white text-3xl font-semibold'>
                            {translate("header.cart", language)}
                        </h1>

                        <span className='text-[#A4A4A5]'>
                            ({count})
                        </span>
                    </div>

                    {sebet.length === 0 ? (
                        <div className='min-h-70 border border-[#313132] bg-[#161617] flex flex-col items-center justify-center gap-5'>
                            <FaShoppingCart className='text-[#49494A] text-5xl' />

                            <h2 className='text-white text-xl font-semibold'>
                                {translate("basket.empty", language)}
                            </h2>

                            <button
                                type='button'
                                onClick={() => navigate('/category/tum-laptoplar')}
                                className='border border-[#00FF00] text-white px-7 py-3 hover:bg-[#00FF00] hover:text-black transition-colors cursor-pointer'
                            >
                                {translate("wishlist.continueShopping", language)}
                            </button>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 xl:grid-cols-3 gap-5'>
                            <div className='xl:col-span-2 border border-[#313132] bg-[#161617]'>
                                <div className='flex items-center justify-between px-5 py-4 border-b border-[#313132]'>
                                    <h2 className='text-white text-lg font-semibold'>
                                        {translate("header.cart", language)}
                                    </h2>

                                    <span className='text-[#A4A4A5] text-sm'>
                                        ({count})
                                    </span>
                                </div>

                                <div>
                                    {sebet.map((item, index) => {
                                        const itemPrice =
                                            item.discountedprice ??
                                            item.price ??
                                            0

                                        const itemTotal =
                                            itemPrice * item.quantity

                                        return (
                                            <div
                                                key={`${item.id}-${item.category}`}
                                                className='flex flex-col sm:flex-row gap-4 p-4 sm:p-5 border-b border-[#313132] last:border-b-0'
                                            >
                                                <div className='w-full sm:w-32 h-52 sm:h-32 shrink-0 bg-[#202021] flex items-center justify-center'>
                                                    <img
                                                        src={item.cardImage}
                                                        alt={item.name?.[language]}
                                                        className='w-full h-full object-contain'
                                                    />
                                                </div>

                                                <div className='flex-1 min-w-0'>
                                                    <button
                                                        type='button'
                                                        onClick={() => navigate(`/product/${item.slug}`)}
                                                        className='w-full text-white text-base sm:text-lg text-left line-clamp-2 hover:text-[#00FF00] transition-colors cursor-pointer'
                                                    >
                                                        {item.name?.[language]}
                                                    </button>

                                                    <div className='mt-2'>
                                                        <span className='text-[#A4A4A5] text-sm'>
                                                            {itemPrice.toLocaleString('tr-TR')}{' '}
                                                            {translate("product.tl", language)}
                                                        </span>
                                                    </div>

                                                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-5'>
                                                        <div className='flex items-center border border-[#49494A] w-fit'>
                                                            <button
                                                                type='button'
                                                                onClick={() => decreaseQuant(index)}
                                                                className='w-9 h-9 flex items-center justify-center text-white hover:text-[#00FF00] cursor-pointer'
                                                            >
                                                                <FaMinus size={11} />
                                                            </button>

                                                            <span className='w-10 text-center text-white text-sm'>
                                                                {item.quantity}
                                                            </span>

                                                            <button
                                                                type='button'
                                                                onClick={() => increaseQuant(index)}
                                                                className='w-9 h-9 flex items-center justify-center text-white hover:text-[#00FF00] cursor-pointer'
                                                            >
                                                                <FaPlus size={11} />
                                                            </button>
                                                        </div>

                                                        <button
                                                            type='button'
                                                            onClick={() => removebasket(index)}
                                                            className='flex items-center gap-2 text-[#A4A4A5] text-sm hover:text-red-500 transition-colors cursor-pointer w-fit'
                                                        >
                                                            <FaTrash size={13} />

                                                            {translate("basket.remove", language)}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className='flex items-center sm:items-start sm:justify-end'>
                                                    <span className='text-white text-base sm:text-lg font-semibold whitespace-nowrap'>
                                                        {itemTotal.toLocaleString('tr-TR')}{' '}
                                                        {translate("product.tl", language)}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className='h-fit border border-[#313132] bg-[#161617]'>
                                <div className='px-5 py-4 border-b border-[#313132]'>
                                    <h2 className='text-white text-lg font-semibold'>
                                        {translate("basket.summary", language)}
                                    </h2>
                                </div>

                                <div className='p-5'>
                                    <div className='flex items-center justify-between mb-5'>
                                        <span className='text-[#A4A4A5]'>
                                            {translate("basket.total", language)}
                                        </span>

                                        <span className='text-white text-xl font-semibold'>
                                            {totalPrice.toLocaleString('tr-TR')}{' '}
                                            {translate("product.tl", language)}
                                        </span>
                                    </div>

                                    <button
                                        type='button'
                                        onClick={() => navigate('/checkout')}
                                        className='w-full bg-[#00FF00] text-black font-semibold py-3 hover:bg-[#26DE2E] transition-colors cursor-pointer'
                                    >
                                        {translate("basket.checkout", language)}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Basket