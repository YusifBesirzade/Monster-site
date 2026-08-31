import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Home from '../pages/Home'
import Category from '../pages/Category'
import ProductDetail from '../pages/ProductDetail'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import Wishlist from '../pages/Wishlist'
import Basket from '../pages/Basket'
import Profile from '../pages/Profile'
import Orders from '../pages/Orders'
import NotFound from '../pages/NotFound'
import { DATA } from '../Context/DataContext'
import { translate } from '../utils/translations'
import Checkout from '../pages/Checkout'
import PaymentSuccess from '../pages/PaymentSuccess'

function Router() {
    const {
        productsLoading,
        categoriesLoading,
        filtersLoading,
        hardwareLoading,
        productsError,
        categoriesError,
        language
    } = useContext(DATA)

    const isLoading = productsLoading || categoriesLoading || filtersLoading || hardwareLoading

    const hasCriticalError = productsError || categoriesError

    if (isLoading) {
        return (
            <div className='min-h-screen bg-[#080808] flex items-center justify-center'>
                <div className='flex flex-col items-center gap-4'>
                    <div className='w-10 h-10 border-4 border-[#313233] border-t-[#00FF00] rounded-full animate-spin'></div>

                    <span className='text-white text-sm'>
                        {translate("app.loading", language)}
                    </span>
                </div>
            </div>
        )
    }

    if (hasCriticalError) {
        return (
            <div className='min-h-screen bg-[#080808] flex items-center justify-center px-4'>
                <div className='text-center'>
                    <h1 className='text-white text-2xl sm:text-3xl font-bold'>
                        {translate("app.error", language)}
                    </h1>

                    <p className='text-[#A4A4A5] text-sm mt-3'>
                        {translate("app.errorDescription", language)}
                    </p>

                    <button
                        onClick={() => window.location.reload()}
                        className='mt-6 bg-[#00FF00] text-black px-6 py-3 font-bold hover:bg-[#00E000] transition-colors cursor-pointer'
                    >
                        {translate("app.retry", language)}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/category/:slug' element={<Category />} />
                    <Route path='/product/:slug' element={<ProductDetail />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/wishlist' element={<Wishlist />} />
                    <Route path='/cart' element={<Basket />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/payment-success' element={<PaymentSuccess />} />
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </>
    )
}

export default Router