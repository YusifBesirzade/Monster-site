import React, { useContext, useEffect, useState } from 'react'
import CategoryTree from '../CategoryTree/CategoryTree'
import { Link, useLocation } from 'react-router-dom'
import { containsSlug } from '../utils/categoryUtils'
import { DATA } from '../Context/DataContext'

function CategoryItem({ category, isOpen, setOpenCategory }) {
    const location = useLocation()
    const { language } = useContext(DATA)

    const currentSlug = location.pathname.split("/").pop()
    const isActive = category.slug === currentSlug
    const hasActiveChild = category.children?.some(child => containsSlug(child, currentSlug)) ?? false
    const shouldBeOpen = isActive || hasActiveChild

    // useEffect(() => {
    //     if (isActive || hasActiveChild) {
    //         setOpenCategory(category.id)
    //     }
    // }, [isActive, hasActiveChild, category.id, setOpenCategory])

    return (
        <>
            <div>
                <div className='text-white flex items-center'>
                    <Link to={`/category/${category.slug}`} className={isActive ? "text-[#00FF00]" : "text-white"}>
                        {category.name[language]}
                    </Link>

                    {category.children?.length > 0 && (
                        <button onClick={() => setOpenCategory(isOpen ? null : category.id)} className='cursor-pointer'>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`w-8 h-8 p-1 rounded-sm 
                                            ${isOpen ? "rotate-0" : "rotate-270"
                                    }`}>
                                <path
                                    d="M7.175 8.59L11 12.407l3.825-3.817L16 9.765l-5 5-5-5Z"
                                    fill="#00FF00"
                                    transform="translate(-1 -1.432)"
                                />
                            </svg>
                        </button>
                    )}
                </div>

                {(isOpen || shouldBeOpen) && category.children?.length > 0 && (
                    <div className='ml-4 mt-2'>
                        <CategoryTree categories={category.children} />
                    </div>
                )}
            </div >
        </>
    )
}

export default CategoryItem