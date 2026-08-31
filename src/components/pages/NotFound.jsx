import React, { useContext } from 'react'
import { DATA } from '../Context/DataContext'
import { FaExclamationTriangle } from 'react-icons/fa'
import { translate } from '../utils/translations'
import { Link } from 'react-router-dom'

function NotFound() {
    const { language } = useContext(DATA)

    return (
        <>
            <div className='min-h-[70vh] bg-[#080808] flex items-center justify-center px-4'>
                <div className='text-center max-w-xl'>
                    <FaExclamationTriangle className='text-[#FBB407] text-5xl mx-auto mb-6' />

                    <h1 className='text-[#00FF00] text-7xl sm:text-8xl font-black'>
                        404
                    </h1>

                    <h2 className='text-white text-2xl sm:text-3xl font-bold mt-4'>
                        {translate("notFound.title", language)}
                    </h2>

                    <p className='text-[#A4A4A5] text-sm sm:text-base mt-3'>
                        {translate("notFound.description", language)}
                    </p>

                    <Link
                        to='/'
                        className='inline-block mt-7 bg-[#00FF00] text-black px-7 py-3 font-bold hover:bg-[#00E000] transition-colors'
                    >
                        {translate("notFound.home", language)}
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NotFound