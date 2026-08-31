import React, { useContext, useState } from 'react'
import { DATA } from '../Context/DataContext'
import { Link } from 'react-router-dom'
import { translate } from '../utils/translations'

function Navbar() {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [openNavbar, setOpenNavbar] = useState(false)
    const { categories, language, hardwareMenus } = useContext(DATA)

    const activeCategory = categories.find(c => c.slug === selectedCategory)

    return (
        <div className='hidden lg:block sticky top-0 z-40 bg-black'
            onMouseLeave={() => setOpenNavbar(false)}
        >
            <ul className='max-w-350 mx-auto px-4 py-4 flex items-center justify-center flex-wrap gap-4 xl:gap-7 text-white text-sm'>
                {categories.map(c => (
                    <li
                        key={c.id}
                        onMouseEnter={() => {
                            setSelectedCategory(c.slug)
                            setOpenNavbar(c.children?.length > 0)
                        }}
                        className='relative group hover:text-[#00EF00] uppercase whitespace-nowrap'
                    >
                        <Link to={`/category/${c.slug}`}>
                            {c.name[language]}

                            <span className='absolute left-0 -bottom-1.5 h-0.5 w-0 bg-[#00EF00] transition-all duration-300 group-hover:w-5'></span>
                        </Link>
                    </li>
                ))}

                <li>
                    <div className='w-0.5 h-5 bg-[#49494a]'></div>
                </li>

                <li
                    className='relative group hover:text-[#00EF00] whitespace-nowrap'
                    onMouseEnter={() => {
                        setSelectedCategory('cpuGpu')
                        setOpenNavbar(true)
                    }}
                >
                    <button className='cursor-pointer'>
                        {translate("header.cpuGpu", language)}

                        <span className='absolute left-0 -bottom-1.5 h-0.5 w-0 bg-[#00EF00] transition-all duration-300 group-hover:w-5'></span>
                    </button>
                </li>

                <li
                    className='relative group hover:text-[#00EF00] whitespace-nowrap'
                    onMouseEnter={() => {
                        setSelectedCategory('memoryScreen')
                        setOpenNavbar(true)
                    }}
                >
                    <button className='cursor-pointer'>
                        {translate("header.memoryScreen", language)}

                        <span className='absolute left-0 -bottom-1.5 h-0.5 w-0 bg-[#00EF00] transition-all duration-300 group-hover:w-5'></span>
                    </button>
                </li>
            </ul>

            <div
                key={selectedCategory}
                className={`absolute w-full ${activeCategory?.children?.some(
                    c => c.children?.length > 0
                )
                    ? 'bg-[linear-gradient(105deg,#000_50%,#363737_50%)]'
                    : 'bg-[#131414]'
                    } text-white min-h-50 top-full flex items-center justify-center gap-8 z-[999] transition-all duration-300 ease-out ${openNavbar
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-2'
                    }`}
            >
                {openNavbar && selectedCategory === 'cpuGpu' && (
                    <div className='w-full bg-[#181818] text-white border-t border-[#222222] py-4 md:py-8'>
                        <div className='w-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row justify-start items-start gap-8 lg:gap-12'>
                            <div className='w-full lg:w-auto'>
                                <h3 className='uppercase font-bold mb-4 md:mb-6 text-sm tracking-wider text-left text-white pl-0 lg:pl-6'>
                                    {hardwareMenus?.cpuGpu?.sections?.[0]?.title?.[language]}
                                </h3>

                                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-x-6 md:gap-y-6'>
                                    {hardwareMenus?.cpuGpu?.sections?.[0]?.items?.map(item => (
                                        <Link
                                            key={item.slug}
                                            to={`/category/${item.slug}`}
                                            className='w-full lg:w-28 flex flex-col items-start justify-start gap-2 hover:text-[#00FF00] transition-colors group m-0 p-0'
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name[language]}
                                                className='w-12 h-12 md:w-16 md:h-16 object-contain'
                                            />

                                            <div className='relative'>
                                                <span className='text-[10px] md:text-[11px] font-semibold text-left leading-tight uppercase group-hover:text-[#00FF00]'>
                                                    {item.name[language]}
                                                </span>

                                                <span className='absolute left-0 -bottom-1.5 h-0.5 w-0 bg-[#00FF00] transition-all duration-300 group-hover:w-5'></span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className='w-full lg:w-auto flex flex-col gap-8 border-t lg:border-t-0 lg:border-l border-[#282828] pt-6 lg:pt-0 pl-0 lg:pl-12'>
                                <div>
                                    <h3 className='uppercase font-bold mb-4 md:mb-6 text-sm tracking-wider text-left text-white pl-0'>
                                        {hardwareMenus?.cpuGpu?.sections?.[1]?.title?.[language]}
                                    </h3>

                                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-x-6 md:gap-y-6 justify-start items-start'>
                                        {hardwareMenus?.cpuGpu?.sections?.[1]?.items?.map(item => (
                                            <Link
                                                key={item.slug}
                                                to={`/category/${item.slug}`}
                                                className='w-full lg:w-28 flex flex-col items-start justify-start gap-2 hover:text-[#00FF00] transition-colors group m-0 p-0'
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.name[language]}
                                                    className='w-12 h-12 md:w-16 md:h-16 object-contain'
                                                />

                                                <div className='relative'>
                                                    <span className='text-[10px] md:text-[11px] font-semibold text-left leading-tight uppercase group-hover:text-[#00FF00]'>
                                                        {item.name[language]}
                                                    </span>

                                                    <span className='absolute left-0 -bottom-1.5 h-0.5 w-0 bg-[#00FF00] transition-all duration-300 group-hover:w-5'></span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className='uppercase font-bold mb-4 md:mb-6 text-sm tracking-wider text-left text-white pl-0'>
                                        {hardwareMenus?.cpuGpu?.sections?.[2]?.title?.[language]}
                                    </h3>

                                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-x-6 md:gap-y-6 justify-start items-start'>
                                        {hardwareMenus?.cpuGpu?.sections?.[2]?.items?.map(item => (
                                            <Link
                                                key={item.slug}
                                                to={`/category/${item.slug}`}
                                                className='relative group w-full lg:w-28 flex items-start justify-start hover:text-[#00FF00] transition-colors pl-0 m-0'
                                            >
                                                <div className='relative'>
                                                    <span className='text-[10px] md:text-[11px] font-semibold text-left leading-tight uppercase'>
                                                        {item.name[language]}
                                                    </span>

                                                    <span className='absolute left-0 -bottom-1.5 h-0.5 w-0 bg-[#00FF00] transition-all duration-300 group-hover:w-5'></span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {openNavbar && selectedCategory === 'memoryScreen' && (
                    <div className='w-full bg-[#181818] text-white border-t border-[#222222] py-6 md:py-8'>
                        <div className='w-full max-w-7xl mx-auto px-4 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-12'>
                            {hardwareMenus?.memoryScreen?.sections?.map(section => (
                                <div key={section.title.tr || section.title.az || section.title.en}>
                                    <h3 className='uppercase font-bold mb-3 md:mb-5 text-sm md:text-base tracking-wider text-left text-white'>
                                        {section.title[language]}
                                    </h3>

                                    <div className='flex flex-col gap-2 md:gap-3 items-start justify-start'>
                                        {section.items.map(item => (
                                            <Link
                                                key={item.slug}
                                                to={`/category/${item.slug}`}
                                                className='relative group text-xs md:text-sm text-left hover:text-[#00FF00] transition-colors leading-relaxed'
                                            >
                                                <span>
                                                    {item.name[language]}
                                                </span>

                                                <span className='absolute left-0 -bottom-1 h-0.5 w-0 bg-[#00FF00] transition-all duration-300 group-hover:w-5'></span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {openNavbar &&
                    selectedCategory !== 'cpuGpu' &&
                    selectedCategory !== 'memoryScreen' &&
                    activeCategory?.children.map(c =>
                        c.children?.length > 0 ? (
                            <div
                                key={c.id}
                                className='flex flex-col items-center'
                            >
                                <div className='uppercase font-bold'>
                                    {c.name[language]}
                                </div>

                                <div className='flex items-center gap-5 pt-5 px-10'>
                                    {c.children.map(child => (
                                        <Link
                                            key={child.id}
                                            to={`/category/${child.slug}`}
                                            className='relative group flex flex-col items-center gap-3 hover:text-[#00EF00] cursor-pointer'
                                        >
                                            <img
                                                className='w-20'
                                                src={child.image}
                                                alt={child.name[language]}
                                            />

                                            <div className='relative'>
                                                <div className='uppercase'>
                                                    {child.name[language]}
                                                </div>

                                                <span className='absolute left-0 -bottom-1.5 h-0.5 w-0 bg-[#00EF00] transition-all duration-300 group-hover:w-5'></span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={c.id}
                                to={`/category/${c.slug}`}
                                className='relative group hover:text-[#00EF00] cursor-pointer uppercase flex flex-col items-center justify-center gap-3'
                            >
                                <img
                                    className='w-20'
                                    src={c.image}
                                    alt={c.name[language]}
                                />

                                {c.name[language]}

                                <span className='absolute left-0 -bottom-1.5 h-0.5 w-0 bg-[#00EF00] transition-all duration-300 group-hover:w-5'></span>
                            </Link>
                        )
                    )}
            </div>
        </div>
    )
}

export default Navbar