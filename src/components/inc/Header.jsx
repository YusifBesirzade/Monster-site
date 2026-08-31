import React, { useContext, useState } from 'react'
import monsterlogo from '../../assets/monster-logo.svg'
import arrow from '../../assets/arrow.png'
import { DATA } from '../Context/DataContext'
import { Link } from 'react-router-dom'
import { translate } from '../utils/translations'
import { BASKET } from '../Context/BasketContext'
import BasketModal from '../Basket/BasketModal'
import { AUTH } from '../Context/AuthContext'
import { WISHLIST } from '../Context/WishlistContext'
import WishlistModal from '../Wishlist/WishlistModal'
import { FaHeart } from 'react-icons/fa'
import { IoClose, IoHomeOutline, IoMenu, IoPersonOutline } from "react-icons/io5";
import { IoIosArrowForward } from 'react-icons/io'

function Header() {
    const [isLanguageOpen, setIsLanguageOpen] = useState(false)
    const [isBasketOpen, setIsBasketOpen] = useState(false)
    const [isAccountOpen, setIsAccountOpen] = useState(false)
    const { count } = useContext(BASKET)
    const { user, logout } = useContext(AUTH)
    const [isWishlistOpen, setIsWishlistOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [openCategories, setOpenCategories] = useState({})
    const { categories, language, setLanguage, products, hardwareMenus } = useContext(DATA)
    const { wishlist } = useContext(WISHLIST)

    const searchResults = search.trim()
        ? products.filter(product => {
            const query = search.toLowerCase()

            const name = product.name?.[language]?.toLowerCase() || ''
            const slug = product.slug?.toLowerCase() || ''
            const brand = product.brand?.toLowerCase() || ''

            return (
                name.includes(query) ||
                slug.includes(query) ||
                brand.includes(query)
            )
        }).slice(0, 6) : []

    return (
        <>
            {/* Mobil-menu start */}
            <div className='relative bg-black w-full lg:hidden px-3 sm:px-5 py-2'>
                <div className='w-full flex flex-col gap-2'>

                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2 sm:gap-4'>
                            <button
                                onClick={() => setOpenMenu(!openMenu)}
                                aria-label='Toggle menu'
                                className='text-white p-1 cursor-pointer shrink-0'
                            >
                                {openMenu ? (
                                    <IoClose className='text-white text-3xl' />
                                ) : (
                                    <IoMenu className='text-white text-3xl' />
                                )}
                            </button>

                            <Link to='/' className='shrink-0'>
                                <img
                                    className='w-28 sm:w-32 h-12 object-contain'
                                    src={monsterlogo}
                                    alt='Monster Logo'
                                />
                            </Link>
                        </div>

                        <div className='flex items-center gap-1 sm:gap-2'>
                            <button
                                onClick={() => setIsAccountOpen(!isAccountOpen)}
                                className='p-2 cursor-pointer text-white'
                            >
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='currentColor'
                                >
                                    <path d='M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 3a3 3 0 11-3 3 3 3 0 013-3zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z' />
                                </svg>
                            </button>

                            {user && (
                                <button
                                    onClick={() => setIsWishlistOpen(true)}
                                    className='relative p-2 cursor-pointer text-white hover:text-red-500 transition-colors'
                                    title={translate("authWishlist", language)}
                                >
                                    <FaHeart className='text-xl' />

                                    <span className='absolute -top-1 -right-1 bg-red-500 text-white rounded-full min-w-5 h-5 px-1 flex items-center justify-center text-[11px] font-bold'>
                                        {wishlist.length}
                                    </span>
                                </button>
                            )}

                            <button
                                onClick={() => setIsBasketOpen(true)}
                                className='text-white p-2 relative cursor-pointer'
                            >
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='currentColor'
                                >
                                    <path d='M7 18a2 2 0 102 2 2 2 0 00-2-2zM1 4h2l3.6 7.59L3.62 17H19v-2H7l1.1-2h8.64l4.97-9H5.21l-.94-2H1zm16 14a2 2 0 102 2 2 2 0 00-2-2z' />
                                </svg>

                                <span className='absolute top-0 right-0 bg-[#FF0000] text-white rounded-full min-w-4 h-4 px-1 flex items-center justify-center text-[10px] font-bold'>
                                    {count}
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className='relative border border-[#49494A] text-[#a1a1a1] bg-[#161617] py-2 px-3 sm:px-4 flex items-center'>
                        <input
                            type='text'
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                setIsSearchOpen(true)
                            }}
                            onFocus={() => {
                                if (search.trim()) {
                                    setIsSearchOpen(true)
                                }
                            }}
                            onBlur={() =>
                                setTimeout(() => setIsSearchOpen(false), 200)
                            }
                            placeholder={translate(
                                "header.searchPlaceholder",
                                language
                            )}
                            className='w-full bg-transparent text-white outline-none pr-7 text-sm'
                        />

                        <svg
                            width='20'
                            height='20'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                            className='text-[#A4A4A5] pointer-events-none absolute right-2'
                        >
                            <path d='M15.5 14h-.79l-.28-.27a6.51 6.51 0 10-.7.7l.27.28v.79l5 4.99L20.49 19zm-6 0A4.5 4.5 0 1114 9.5 4.494 4.494 0 019.5 14z' />
                        </svg>

                        {isSearchOpen && search.trim() && (
                            <div className='absolute top-full left-0 w-full mt-1 bg-[#161617] border border-[#313233] shadow-xl z-[9999]'>
                                {searchResults.length > 0 ? (
                                    <div className='max-h-80 overflow-y-auto'>
                                        {searchResults.map(product => (
                                            <Link
                                                key={product.id}
                                                to={`/product/${product.slug}`}
                                                onClick={() => {
                                                    setSearch('')
                                                    setIsSearchOpen(false)
                                                }}
                                                className='flex items-center gap-3 p-3 border-b border-[#313233] last:border-b-0 hover:bg-[#202021]'
                                            >
                                                <img
                                                    src={product.cardImage}
                                                    alt={product.name?.[language]}
                                                    className='w-12 h-12 shrink-0 object-contain bg-[#202021]'
                                                />

                                                <div className='flex-1 min-w-0'>
                                                    <div className='text-white text-xs line-clamp-2'>
                                                        {product.name?.[language]}
                                                    </div>

                                                    <div className='text-[#A4A4A5] text-xs mt-1'>
                                                        {(product.discountedprice ??
                                                            product.price ??
                                                            0).toLocaleString('tr-TR')}{' '}
                                                        {translate(
                                                            "product.tl",
                                                            language
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='p-4 text-center text-[#A4A4A5] text-xs'>
                                        {translate("search.noResults", language)}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {openMenu && (
                        <div className='fixed inset-0 z-[999999] bg-[#0d0d0e] flex flex-col px-3 py-2'>
                            <div className='flex items-center justify-between px-4 sm:px-5 py-3 border-b border-[#262627] shrink-0'>
                                <Link to='/' onClick={() => setOpenMenu(false)} className='shrink-0'>
                                    <img
                                        className='w-40 sm:w-24 h-12 object-contain'
                                        src={monsterlogo}
                                        alt='Monster Logo'
                                    />
                                </Link>

                                <button
                                    onClick={() => setOpenMenu(false)}
                                    aria-label='Close menu'
                                    className='text-white p-1 cursor-pointer shrink-0'
                                >
                                    <IoClose className='text-3xl' />
                                </button>
                            </div>

                            <div className='flex-1 overflow-y-auto'>
                                {categories.map(c => (
                                    c.children?.length > 0 ? (
                                        <div key={c.id} className='border-b border-[#262627]'>
                                            <button
                                                onClick={() =>
                                                    setOpenCategories(prev => ({ ...prev, [c.id]: !prev[c.id] }))
                                                }
                                                className={`w-full flex items-center justify-between px-4 sm:px-6 py-4 text-white text-sm sm:text-base uppercase cursor-pointer ${openCategories[c.id] ? 'bg-gradient-to-r from-[#2c2c2d] to-[#0d0d0e]' : 'bg-black'}`}
                                            >
                                                <span>{c.name[language]}</span>
                                                <svg
                                                    className={`w-4 h-4 transition-transform shrink-0 text-[#00EF00] ${openCategories[c.id] ? 'rotate-0' : '-rotate-90'}`}
                                                    viewBox='0 0 20 20'
                                                    fill='currentColor'
                                                >
                                                    <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
                                                </svg>
                                            </button>

                                            {openCategories[c.id] && (
                                                <div className='pb-2'>
                                                    <div className='h-0.5 bg-[#9E010C] mx-4 sm:mx-6 mb-2'></div>

                                                    {c.children.map(child => (
                                                        child.children?.length > 0 ? (
                                                            <div key={child.id} className='mb-2'>
                                                                <div className='px-8 sm:px-10 py-2 text-[#A4A4A5] text-xs uppercase font-bold'>
                                                                    {child.name[language]}
                                                                </div>

                                                                {child.children.map(grandchild => (
                                                                    <Link
                                                                        key={grandchild.id}
                                                                        to={`/category/${grandchild.slug}`}
                                                                        onClick={() => setOpenMenu(false)}
                                                                        className='block px-10 sm:px-12 py-2 text-white text-sm hover:text-[#00FF00] transition-colors'
                                                                    >
                                                                        {grandchild.name[language]}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <Link
                                                                key={child.id}
                                                                to={`/category/${child.slug}`}
                                                                onClick={() => setOpenMenu(false)}
                                                                className='block px-8 sm:px-10 py-2 text-white text-sm hover:text-[#00FF00] transition-colors'
                                                            >
                                                                {child.name[language]}
                                                            </Link>
                                                        )
                                                    ))}

                                                    <Link
                                                        to={`/category/${c.slug}`}
                                                        onClick={() => setOpenMenu(false)}
                                                        className='block bg-black px-4 sm:px-6 py-3 mt-2 text-[#00EF00] text-sm font-bold uppercase hover:text-[#00FF00]'
                                                    >
                                                        {c.name[language]}
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link
                                            key={c.id}
                                            to={`/category/${c.slug}`}
                                            onClick={() => setOpenMenu(false)}
                                            className='flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#262627] text-white text-sm sm:text-base uppercase hover:text-[#00FF00] hover:bg-[#1B1B1C] transition-colors'
                                        >
                                            <span>{c.name[language]}</span>
                                            <IoIosArrowForward className='text-[#A4A4A5] shrink-0' />
                                        </Link>
                                    )
                                ))}

                                <Link
                                    to='#'
                                    onClick={() => setOpenMenu(false)}
                                    className='flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#262627] text-white text-sm sm:text-base hover:text-[#00FF00] transition-colors'
                                >
                                    <span>{translate("header.cpuGpu", language)}</span>
                                    <IoIosArrowForward className='text-[#A4A4A5] shrink-0' />
                                </Link>

                                <Link
                                    to='#'
                                    onClick={() => setOpenMenu(false)}
                                    className='flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#262627] text-white text-sm sm:text-base hover:text-[#00FF00] transition-colors'
                                >
                                    <span>{translate("header.memoryScreen", language)}</span>
                                    <IoIosArrowForward className='text-[#A4A4A5] shrink-0' />
                                </Link>

                                <div className='flex flex-col'>
                                    <Link
                                        to='#'
                                        onClick={() => setOpenMenu(false)}
                                        className='px-4 sm:px-6 py-3 text-[#A4A4A5] text-sm hover:text-[#00FF00] transition-colors'
                                    >
                                        {translate("header.contactStores", language)}
                                    </Link>

                                    <Link
                                        to='#'
                                        onClick={() => setOpenMenu(false)}
                                        className='px-4 sm:px-6 py-3 text-[#A4A4A5] text-sm hover:text-[#00FF00] transition-colors'
                                    >
                                        {translate("header.chooseYourMonster", language)}
                                    </Link>

                                    <Link
                                        to='#'
                                        onClick={() => setOpenMenu(false)}
                                        className='px-4 sm:px-6 py-3 text-[#A4A4A5] text-sm hover:text-[#00FF00] transition-colors'
                                    >
                                        {translate("header.warranty", language)}
                                    </Link>

                                    <Link
                                        to='#'
                                        onClick={() => setOpenMenu(false)}
                                        className='flex items-center gap-1 px-4 sm:px-6 py-3 text-[#A4A4A5] text-sm hover:text-[#00FF00] transition-colors'
                                    >
                                        {translate("header.support", language)}
                                        <img src={arrow} alt='arrow' className='w-4' />
                                    </Link>

                                    <Link
                                        to='#'
                                        onClick={() => setOpenMenu(false)}
                                        className='flex items-center gap-1 px-4 sm:px-6 py-3 text-[#A4A4A5] text-sm hover:text-[#00FF00] transition-colors'
                                    >
                                        {translate("header.appointment", language)}
                                        <img src={arrow} alt='arrow' className='w-4' />
                                    </Link>
                                </div>

                                <div className='relative px-4 sm:px-6 py-4 z-50'>
                                    <button
                                        onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                                        className='w-full flex items-center justify-between text-[#FBBD08] text-sm cursor-pointer'
                                    >
                                        <span>{language.toUpperCase()}</span>

                                        <svg
                                            className={`w-4 h-4 transition-transform ${isLanguageOpen
                                                ? 'rotate-0'
                                                : ''
                                                }`}
                                            viewBox='0 0 20 20'
                                            fill='currentColor'
                                        >
                                            <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
                                        </svg>
                                    </button>

                                    {isLanguageOpen && (
                                        <div className='mt-2 border border-[#313233]'>
                                            {['tr', 'az', 'en', 'ru', 'de', 'zh'].map(item => (
                                                <button
                                                    key={item}
                                                    onClick={() => {
                                                        setLanguage(item)
                                                        setIsLanguageOpen(false)
                                                    }}
                                                    className={`w-full text-left px-3 py-2 text-xs transition-colors cursor-pointer ${language === item
                                                        ? 'text-[#00EF00] bg-[#1F1F20]'
                                                        : 'text-white hover:text-[#00EF00] hover:bg-[#1F1F20]'
                                                        }`}
                                                >
                                                    {item.toUpperCase()}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className='flex items-stretch border-t border-[#262627] shrink-0'>
                                <Link
                                    to='/'
                                    onClick={() => setOpenMenu(false)}
                                    className='flex-1 flex items-center justify-center gap-4 py-3 text-white border-r border-[#262627]'
                                >
                                    <IoHomeOutline className='text-xl' />
                                    <span className='text-base'>{translate("header.home", language)}</span>
                                </Link>

                                <Link
                                    to={user ? '/profile' : '/login'}
                                    onClick={() => setOpenMenu(false)}
                                    className='flex-1 flex items-center justify-center gap-4 py-3 text-white'
                                >
                                    <IoPersonOutline className='text-xl' />
                                    <span className='text-base'>{user ? translate("authProfile", language) : translate("authLogin", language)}</span>
                                </Link>
                            </div>
                        </div>
                    )}

                    {isAccountOpen && (
                        <div>
                            <div
                                className='fixed inset-0 bg-black/60 z-[99998]'
                                onClick={() => setIsAccountOpen(false)}
                            ></div>

                            <div className='absolute left-3 right-3 sm:left-auto sm:right-5 top-16 sm:w-72 bg-[#161617] border border-[#313233] shadow-xl z-[99999] p-4'>
                                {user ? (
                                    <div>
                                        <div className='px-2 py-3 border-b border-[#313233]'>
                                            <div className='text-white text-sm truncate'>
                                                {user.user_metadata?.username || user.email}
                                            </div>

                                            <div className='text-[#FBB407] text-xs mt-1'>
                                                {translate("authAccount", language)}
                                            </div>
                                        </div>

                                        <Link
                                            to='/profile'
                                            onClick={() => setIsAccountOpen(false)}
                                            className='block px-2 py-3 text-sm text-white border-b border-[#313233] hover:text-[#00FF00]'
                                        >
                                            {translate("authProfile", language)}
                                        </Link>

                                        <Link
                                            to='/wishlist'
                                            onClick={() => setIsAccountOpen(false)}
                                            className='block px-2 py-3 text-sm text-white border-b border-[#313233] hover:text-[#00FF00]'
                                        >
                                            {translate("authWishlist", language)}
                                        </Link>

                                        <button
                                            onClick={async () => {
                                                await logout()
                                                setIsAccountOpen(false)
                                            }}
                                            className='w-full text-left px-2 py-3 text-sm text-[#FBB407] hover:text-red-500 cursor-pointer'
                                        >
                                            {translate("authLogout", language)}
                                        </button>
                                    </div>
                                ) : (
                                    <div className='flex flex-col gap-3'>
                                        <Link
                                            to='/login'
                                            onClick={() => setIsAccountOpen(false)}
                                            className='w-full text-center bg-[#00FF00] text-black font-bold text-sm py-3 hover:bg-[#00e000] transition-colors'
                                        >
                                            {translate("authLogin", language)}
                                        </Link>

                                        <Link
                                            to='/register'
                                            onClick={() => setIsAccountOpen(false)}
                                            className='w-full text-center border border-[#FBB407] text-[#FBB407] font-bold text-sm py-3 hover:bg-[#1F1F20] transition-colors'
                                        >
                                            {translate("authRegister", language)}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {isWishlistOpen && (
                        <WishlistModal
                            onClose={() => setIsWishlistOpen(false)}
                        />
                    )}

                    {isBasketOpen && (
                        <BasketModal
                            onClose={() => setIsBasketOpen(false)}
                        />
                    )}
                </div>
            </div>
            {/* End */}

            {/* Desktop-menu start */}
            <div className='bg-black hidden lg:flex'>
                <div className='w-full mx-auto flex flex-col items-end gap-4 mt-2'>

                    <div className='w-full max-w-350 mx-auto flex items-end justify-end gap-3 text-[#FBBD08] text-xs px-4'>
                        <div className='flex items-center gap-1 cursor-pointer hover:text-[#00EF00] transition-all'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">

                                <path
                                    d="M7.99984 7.8759e-06C9.85139 -0.000521381 11.6458 0.641004 
                                13.0774 1.81526C14.509 2.98952 15.489 4.62385 15.8506 6.43975C16.2122 
                                8.25565 15.933 10.1408 15.0604 11.7738C14.1879 13.4069 12.7761 14.6869 
                                11.0655 15.3957C9.35502 16.1044 7.45166 16.1982 5.67978 15.6608C3.90791 
                                15.1235 2.37718 13.9884 1.34843 12.449C0.319686 10.9095 -0.143413 9.06095 
                                0.0380501 7.21831C0.219513 5.37567 1.03431 3.65297 2.34359 2.34376C3.08535 
                                1.59952 3.96696 1.00931 4.93768 0.607078C5.9084 0.204844 6.94908 -0.00146925 
                                7.99984 7.8759e-06ZM7.94906 9.65886L6.78369 12.8789C6.75504 12.9596 6.71057 
                                13.0338 6.65289 13.097C6.5952 13.1603 6.52546 13.2114 6.44776 13.2474C6.33104 
                                13.3021 6.2007 13.321 6.07326 13.3015C5.94582 13.2821 5.82701 13.2253 5.73191 
                                13.1383C5.6368 13.0512 5.56966 12.9379 5.53901 12.8127C5.50836 12.6875 5.51557 
                                12.556 5.55974 12.4349L6.37224 10.1849C6.43671 10.0156 6.48766 9.84144 6.52458 
                                9.66407C6.55742 9.48399 6.58089 9.30232 6.59489 9.1198C6.62614 8.79037 6.64828 
                                8.4336 6.66521 8.09115C6.68213 7.74871 6.69385 7.41667 6.70297 7.14194C6.71468 
                                6.79949 6.62224 6.77735 6.3475 6.71225L6.29021 6.69923L3.94646 6.25782C3.86216 
                                6.24295 3.78163 6.21161 3.70946 6.16558C3.63729 6.11956 3.57491 6.05975 3.52588 
                                5.98959C3.45305 5.8833 3.41339 5.75779 3.41193 5.62895C3.41047 5.50011 3.44727 
                                5.37373 3.51768 5.26582C3.58808 5.15791 3.68893 5.07331 3.80744 5.02275C3.92596 
                                4.97219 4.05681 4.95793 4.18343 4.98178L6.70166 5.45444C6.80192 5.46355 6.89958 
                                5.47527 7.00244 5.48699C7.31233 5.52945 7.62458 5.5525 7.93734 5.556C8.32667 5.5484 
                                .71529 5.51927 9.1014 5.46876C9.21859 5.45574 9.32927 5.44141 9.43994 5.431L11.8162 
                                4.98569C11.9848 4.95073 12.1604 4.98397 12.3045 5.07813C12.376 5.12647 12.4371 5.18852 
                                .4843 5.26068C12.5316 5.33283 12.564 5.41366 12.5798 5.49846C12.5955 5.58326 12.5943 
                                5.67035 12.5761 5.75466C12.5579 5.83897 12.5231 5.91883 12.4738 5.98959C12.4254 6.0602 
                                12.3636 6.12058 12.2919 6.16727C12.2202 6.21397 12.14 6.24606 12.0558 6.26173L9.785 
                                6.68881C9.70948 6.70574 9.64177 6.71746 9.58187 6.72657C9.34489 6.76694 9.22771 6.78777 
                                9.24203 7.12501C9.25244 7.3711 9.28239 7.66537 9.32145 7.97266C9.36703 8.33334 9.42692 
                                .71615 9.48942 9.06641C9.52979 9.29688 9.56755 9.48178 9.61963 9.65886C9.67171 9.83595 
                                .7225 10.0169 9.80062 10.2344L10.5962 12.4349C10.6404 12.556 10.6476 12.6875 10.6169 
                                12.8127C10.5863 12.9379 10.5191 13.0512 10.424 13.1383C10.3289 13.2253 10.2101 13.2821 
                                10.0827 13.3015C9.95523 13.321 9.82489 13.3021 9.70817 13.2474C9.63047 13.2114 9.56073 
                                13.1603 9.50304 13.097C9.44536 13.0338 9.40089 12.9596 9.37224 12.8789L8.20297 9.66537L8.07276 
                                9.42709L7.94255 9.65886H7.94906ZM7.99984 2.69011C8.26585 2.68989 8.52371 2.78191 8.72948 
                                2.95049C8.93524 3.11908 9.07619 3.3538 9.12829 3.61466C9.18039 3.87552 9.14043 4.14637 9.01521 
                                4.38107C8.88999 4.61576 8.68726 4.79978 8.44157 4.90175C8.19589 5.00373 7.92244 5.01736 7.66783 
                                .94032C7.41322 4.86327 7.1932 4.70033 7.04527 4.47925C6.89733 4.25817 6.83064 3.99263 6.85654 
                                3.72788C6.88245 3.46313 6.99936 3.21556 7.18734 3.02735C7.29383 2.92033 7.42045 2.83543 7.5599 
                                2.77755C7.69934 2.71967 7.84886 2.68996 7.99984 2.69011ZM12.7329 3.26694C11.6393 2.16967 10.199 
                                1.4856 8.65753 1.33131C7.11604 1.17703 5.56875 1.56207 4.27936 2.42082C2.98997 3.27957 2.03827 
                                4.55889 1.58647 6.04073C1.13467 7.52257 1.21072 9.11524 1.80166 10.5473C2.3926 11.9793 3.46187 
                                13.1622 4.82722 13.8941C6.19257 14.6261 7.76951 14.862 9.28928 14.5615C10.809 14.2611 12.1776 
                                13.4429 13.1617 12.2464C14.1458 11.0499 14.6845 9.5492 14.686 8.00001C14.688 7.12137 14.5164 
                                6.25099 14.1813 5.43878C13.8461 4.62657 13.3539 3.88851 12.7329 3.26694Z" fill="currentColor">
                                </path>

                            </svg>

                            <span>
                                {translate("header.accessibility", language)}
                            </span>
                        </div>

                        <ul className='flex items-center gap-2 flex-wrap justify-end'>
                            <li className='hover:text-[#00EF00] transition-all'>
                                <a href='#'>
                                    {translate("header.contactStores", language)}
                                </a>
                            </li>

                            <li className='hover:text-[#00EF00] transition-all'>
                                <a href='#'>
                                    {translate("header.chooseYourMonster", language)}
                                </a>
                            </li>

                            <li className='hover:text-[#00EF00] transition-all'>
                                <a href='#'>
                                    {translate("header.warranty", language)}
                                </a>
                            </li>

                            <li className='hover:text-[#00EF00] transition-all'>
                                <a
                                    href='#'
                                    className='flex items-center gap-1'
                                >
                                    {translate("header.support", language)}
                                    <img
                                        src={arrow}
                                        alt='arrow'
                                        className='w-4'
                                    />
                                </a>
                            </li>

                            <li className='hover:text-[#00EF00] transition-all'>
                                <a
                                    href='#'
                                    className='flex items-center gap-1'
                                >
                                    {translate("header.appointment", language)}
                                    <img
                                        src={arrow}
                                        alt='arrow'
                                        className='w-4'
                                    />
                                </a>
                            </li>
                        </ul>

                        <div className='relative ml-2 shrink-0'>
                            <button
                                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                                className='flex items-center gap-1 text-[#FBBD08] hover:text-[#00EF00] transition-colors cursor-pointer'
                            >
                                <span>{language.toUpperCase()}</span>

                                <svg
                                    className={`w-3 h-3 transition-transform ${isLanguageOpen
                                        ? 'rotate-180'
                                        : ''
                                        }`}
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                >
                                    <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
                                </svg>
                            </button>

                            {isLanguageOpen && (
                                <div className='absolute right-0 top-full mt-2 w-20 bg-black border border-[#313233] z-50 shadow-lg'>
                                    {['tr', 'az', 'en', 'ru', 'de', 'zh'].map(item => (
                                        <button
                                            key={item}
                                            onClick={() => {
                                                setLanguage(item)
                                                setIsLanguageOpen(false)
                                            }}
                                            className={`w-full text-left px-3 py-2 text-xs transition-colors cursor-pointer ${language === item
                                                ? 'text-[#00EF00] bg-[#1F1F20]'
                                                : 'text-white hover:text-[#00EF00] hover:bg-[#1F1F20]'
                                                }`}
                                        >
                                            {item.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='w-full max-w-350 mx-auto flex items-center justify-between gap-4 xl:gap-5 p-3 xl:p-4'>
                        <div className='logo shrink-0'>
                            <Link to='/'>
                                <img
                                    className='w-55 xl:w-70 h-16 object-contain'
                                    src={monsterlogo}
                                    alt='Monster Logo'
                                />
                            </Link>
                        </div>

                        <div className='search flex-1 min-w-0 max-w-100 md:max-w-68 lg:max-w-100 relative'>
                            <div className='relative border border-[#49494A] text-[#a1a1a1] bg-[#161617] py-1 px-4 xl:px-6'>
                                <input
                                    type='text'
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value)
                                        setIsSearchOpen(true)
                                    }}
                                    onFocus={() => {
                                        if (search.trim()) {
                                            setIsSearchOpen(true)
                                        }
                                    }}
                                    placeholder={translate(
                                        "header.searchPlaceholder",
                                        language
                                    )}
                                    className='w-full bg-transparent text-white outline-none pr-7'
                                />

                                <svg
                                    width='25'
                                    height='25'
                                    viewBox='0 0 24 24'
                                    fill='currentColor'
                                    className='absolute right-2 top-1 text-[#A4A4A5] pointer-events-none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        fill='none'
                                        d='M0 0h24v24H0z'
                                    />

                                    <path d='M15.5 14h-.79l-.28-.27a6.51 6.51 0 10-.7.7l.27.28v.79l5 4.99L20.49 19zm-6 0A4.5 4.5 0 1114 9.5 4.494 4.494 0 019.5 14z' />
                                </svg>
                            </div>

                            {isSearchOpen && search.trim() && (
                                <div className='absolute top-full left-0 w-full mt-2 bg-[#161617] border border-[#313233] shadow-xl z-[9999]'>
                                    {searchResults.length > 0 ? (
                                        <div className='max-h-100 overflow-y-auto'>
                                            {searchResults.map(product => (
                                                <Link
                                                    key={product.id}
                                                    to={`/product/${product.slug}`}
                                                    onClick={() => {
                                                        setSearch('')
                                                        setIsSearchOpen(false)
                                                    }}
                                                    className='flex items-center gap-3 p-3 border-b border-[#313233] last:border-b-0 hover:bg-[#202021] transition-colors'
                                                >
                                                    <div className='w-14 h-14 shrink-0 bg-[#202021] flex items-center justify-center'>
                                                        <img
                                                            src={product.cardImage}
                                                            alt={product.name?.[language]}
                                                            className='w-full h-full object-contain'
                                                        />
                                                    </div>

                                                    <div className='flex-1 min-w-0'>
                                                        <div className='text-white text-sm line-clamp-2'>
                                                            {product.name?.[language]}
                                                        </div>

                                                        <div className='text-[#A4A4A5] text-xs mt-1'>
                                                            {(product.discountedprice ??
                                                                product.price ??
                                                                0).toLocaleString('tr-TR')}{' '}
                                                            {translate(
                                                                "product.tl",
                                                                language
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className='px-4 py-5 text-center text-[#A4A4A5] text-sm'>
                                            {translate("search.noResults", language)}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className='btns flex items-center gap-2 xl:gap-3 text-sm shrink-0'>
                            <div className='hidden xl:block'>
                                <a
                                    href='#'
                                    className='text-[#26DF2E] border-2 border-[#49494A] h-11 px-4 flex items-center justify-center whitespace-nowrap'
                                >
                                    {translate(
                                        "header.externalPayment",
                                        language
                                    )}
                                </a>
                            </div>

                            <div className='relative'>
                                {user ? (
                                    <>
                                        <button
                                            onClick={() =>
                                                setIsAccountOpen(!isAccountOpen)
                                            }
                                            className='flex items-center gap-2 border-2 border-[#49494A] h-11 px-3 xl:px-4 cursor-pointer hover:border-[#00FF00] transition-colors'
                                        >
                                            <svg
                                                width='24'
                                                height='24'
                                                viewBox='0 0 24 24'
                                                fill='currentColor'
                                                className='text-white shrink-0'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <path
                                                    fill='none'
                                                    d='M0 0h24v24H0z'
                                                />
                                                <path d='M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 3a3 3 0 11-3 3 3 3 0 013-3zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z' />
                                            </svg>

                                            <div className='flex flex-col items-start min-w-0'>
                                                <span className='text-white text-sm max-w-25 xl:max-w-35 truncate'>
                                                    {user.user_metadata?.username ||
                                                        user.email}
                                                </span>

                                                <span className='text-[#FBB407] text-xs'>
                                                    {translate(
                                                        "authAccount",
                                                        language
                                                    )}
                                                </span>
                                            </div>

                                            <svg
                                                className={`w-4 h-4 text-[#A4A4A5] transition-transform shrink-0 ${isAccountOpen
                                                    ? 'rotate-180'
                                                    : ''
                                                    }`}
                                                viewBox='0 0 20 20'
                                                fill='currentColor'
                                            >
                                                <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
                                            </svg>
                                        </button>

                                        {isAccountOpen && (
                                            <div className='absolute right-0 top-full mt-2 w-52 bg-[#161617] border border-[#313233] shadow-xl z-[9999]'>
                                                <Link
                                                    to='/profile'
                                                    onClick={() =>
                                                        setIsAccountOpen(false)
                                                    }
                                                    className='block px-4 py-3 text-sm text-white hover:text-[#00FF00] hover:bg-[#1F1F20] transition-colors'
                                                >
                                                    {translate(
                                                        "authProfile",
                                                        language
                                                    )}
                                                </Link>

                                                <Link
                                                    to='/wishlist'
                                                    onClick={() =>
                                                        setIsAccountOpen(false)
                                                    }
                                                    className='block px-4 py-3 text-sm text-white hover:text-[#00FF00] hover:bg-[#1F1F20] transition-colors'
                                                >
                                                    {translate(
                                                        "authWishlist",
                                                        language
                                                    )}
                                                </Link>

                                                <button
                                                    onClick={async () => {
                                                        await logout()
                                                        setIsAccountOpen(false)
                                                    }}
                                                    className='w-full text-left px-4 py-3 text-sm text-[#FBB407] hover:text-red-500 hover:bg-[#1F1F20] transition-colors cursor-pointer'
                                                >
                                                    {translate(
                                                        "authLogout",
                                                        language
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className='flex items-center gap-2 border-2 border-[#49494A] h-11 px-3 xl:px-4'>
                                        <svg
                                            width='24'
                                            height='24'
                                            viewBox='0 0 24 24'
                                            fill='currentColor'
                                            className='text-white shrink-0'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                fill='none'
                                                d='M0 0h24v24H0z'
                                            />
                                            <path d='M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 3a3 3 0 11-3 3 3 3 0 013-3zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z' />
                                        </svg>

                                        <div className='flex flex-col'>
                                            <Link
                                                to='/login'
                                                className='text-white text-sm hover:text-[#00FF00]'
                                            >
                                                {translate(
                                                    "authLogin",
                                                    language
                                                )}
                                            </Link>

                                            <Link
                                                to='/register'
                                                className='text-[#FBB407] text-xs hover:text-[#00FF00]'
                                            >
                                                {translate(
                                                    "authRegister",
                                                    language
                                                )}
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {user && (
                                <div className='relative'>
                                    <button
                                        onClick={() =>
                                            setIsWishlistOpen(true)
                                        }
                                        className='relative text-white flex items-center justify-center border-2 border-[#49494A] h-11 w-11 hover:border-red-500 hover:text-red-500 transition-colors cursor-pointer'
                                        title={translate(
                                            "authWishlist",
                                            language
                                        )}
                                    >
                                        <FaHeart />

                                        <span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full min-w-5 h-5 px-1 flex items-center justify-center text-[11px] font-bold'>
                                            {wishlist.length}
                                        </span>
                                    </button>

                                    {isWishlistOpen && (
                                        <WishlistModal
                                            onClose={() =>
                                                setIsWishlistOpen(false)
                                            }
                                        />
                                    )}
                                </div>
                            )}

                            <div className='relative'>
                                <button
                                    onClick={() =>
                                        setIsBasketOpen(true)
                                    }
                                    className='text-white flex items-center justify-center gap-2 border-2 border-[#49494A] h-11 px-3 xl:px-4 cursor-pointer'
                                >
                                    <div className='relative'>
                                        <svg
                                            width='24'
                                            height='24'
                                            viewBox='0 0 24 24'
                                            fill='currentColor'
                                            className='text-white'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                fill='none'
                                                d='M0 0h24v24H0z'
                                            />
                                            <path d='M7 18a2 2 0 102 2 2 2 0 00-2-2zM1 4h2l3.6 7.59L3.62 17H19v-2H7l1.1-2h8.64l4.97-9H5.21l-.94-2H1zm16 14a2 2 0 102 2 2 2 0 00-2-2z' />
                                        </svg>

                                        <span className='absolute -top-2 -right-2 bg-[#FF0000] text-white rounded-full min-w-4 h-4 px-1 flex items-center justify-center text-[10px] font-bold'>
                                            {count}
                                        </span>
                                    </div>

                                    <span className='text-sm hidden xl:block'>
                                        {translate(
                                            "header.cart",
                                            language
                                        )}
                                    </span>
                                </button>

                                {isBasketOpen && (
                                    <BasketModal
                                        onClose={() =>
                                            setIsBasketOpen(false)
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <hr className='w-full h-0.5 bg-[#9E010C]' />
                </div>
            </div>
            {/* End */}
        </>
    )
}

export default Header