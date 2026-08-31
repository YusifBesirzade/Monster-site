import React from 'react'
import Header from '../inc/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../inc/Footer'
import Navbar from '../inc/Navbar'

function Layout() {
    return (
        <>
            <Header />
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout