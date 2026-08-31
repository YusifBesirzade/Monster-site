import React, { useContext, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { DATA } from '../Context/DataContext'
import CategoryProductCard from '../Card/CategoryProductCard'
import CategoryTree from '../CategoryTree/CategoryTree'
import { buildSidebarCategories, getFilterCategorySlug } from '../utils/categoryUtils'
import FilterItem from '../FilterItem/FilterItem'
import { translate } from '../utils/translations'
import CategoryBanner from '../CategoryBanner/CategoryBanner'
import { getHardwareFilter } from '../utils/hardwareFilterUtils'
import { matchesFilter } from '../utils/filterUtils'

function Category() {
    const [openFilter, setOpenFilter] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState({})
    const [sortOption, setSortOption] = useState('')
    const [isSortOpen, setIsSortOpen] = useState(false)
    const [onlyInStock, setOnlyInStock] = useState(false)
    const { slug } = useParams()
    const { categories, filters, products, language } = useContext(DATA)
    const location = useLocation()

    const currentSlug = location.pathname.split("/").pop()

    const filterCategorySlug = getFilterCategorySlug(
        categories,
        currentSlug,
        filters
    )

    const currentFilters = filters.find(
        item => item.categorySlug === filterCategorySlug
    )

    const sidebarCategories = buildSidebarCategories(
        categories,
        currentSlug
    )

    const handleFilterChange = (key, value) => {
        console.log("HANDLE:", key, value)

        setSelectedFilters(prev => {
            const values = prev[key] || []

            if (values.includes(value)) {
                return {
                    ...prev,
                    [key]: values.filter(item => item !== value)
                }
            }

            return {
                ...prev,
                [key]: [...values, value]
            }
        })
    }

    const hardwareFilter = getHardwareFilter(slug)

    const categoryProducts = hardwareFilter
        ? products.filter(product =>
            product.filters?.[hardwareFilter[0]] === hardwareFilter[1]
        )
        : slug === "tum-laptoplar"
            ? products.filter(product =>
                product.departmentSlug === "laptoplar"
            )
            : ["abra", "tulpar", "semruk"].includes(slug)
                ? products.filter(product =>
                    product.categorySlugs?.includes("oyun-bilgisayarlari") &&
                    product.brand === slug
                )
                : ["huma", "markut"].includes(slug)
                    ? products.filter(product =>
                        product.categorySlugs?.includes("is-bilgisayarlari") &&
                        product.brand === slug
                    )
                    : products.filter(product =>
                        product.categorySlugs?.includes(slug)
                    )

    const availableFilters = currentFilters?.filters
        ? currentFilters.filters.map(filter => ({
            ...filter,
            children: filter.children?.filter(option =>
                categoryProducts.some(product =>
                    matchesFilter(product, filter.key, option.slug)
                )
            ) || []
        }))
        : []

    console.log(
        "SLUG:",
        slug
    )

    const filteredProducts = categoryProducts.filter(product => {
        if (onlyInStock && !product.inStock) {
            return false
        }

        for (const key in selectedFilters) {
            if (
                selectedFilters[key].length > 0 &&
                !selectedFilters[key].some(value =>
                    matchesFilter(product, key, value)
                )
            ) {
                return false
            }
        }

        return true
    })

    const sortFunctions = {
        discount: (a, b) => (b.discount ?? 0) - (a.discount ?? 0),

        priceAsc: (a, b) =>
            (a.discountedprice ?? a.price ?? 0) -
            (b.discountedprice ?? b.price ?? 0),

        priceDesc: (a, b) =>
            (b.discountedprice ?? b.price ?? 0) -
            (a.discountedprice ?? a.price ?? 0),

        rating: (a, b) =>
            (b.rating ?? 0) - (a.rating ?? 0),

        oldest: (a, b) =>
            new Date(a.createdAt) - new Date(b.createdAt),

        newest: (a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt),

        bestseller: (a, b) =>
            (b.salesCount ?? 0) - (a.salesCount ?? 0)
    }

    const sortedProducts = [...filteredProducts].sort(
        sortFunctions[sortOption] || (() => 0)
    )

    const sortLabels = {
        discount: translate("sort.discount", language),
        priceAsc: translate("sort.priceAsc", language),
        priceDesc: translate("sort.priceDesc", language),
        rating: translate("sort.rating", language),
        oldest: translate("sort.oldest", language),
        newest: translate("sort.newest", language),
        bestseller: translate("sort.bestseller", language)
    }

    return (
        <>
            <div className='bg-[#1B1C1D] w-full min-h-screen'>
                <div>
                    <CategoryBanner categorySlug={slug} />
                </div>

                <div className='max-w-310 mx-auto flex flex-col md:flex-row items-start gap-4 p-3 sm:p-4 md:p-5'>
                    <div className='sidebar bg-transparent w-full md:w-72 shrink-0 flex flex-col gap-4'>
                        <div className='border border-[#313132] bg-[#202021] p-1 select-none'>
                            <button
                                onClick={() =>
                                    setOpenFilter(
                                        openFilter === "category"
                                            ? null
                                            : "category"
                                    )
                                }
                                className='inset-shadow-2xs shadow-amber-100 flex items-center justify-between w-full gap-3 sm:gap-6 md:gap-30 py-2 px-3 sm:px-4 cursor-pointer'
                            >
                                <span className='text-white text-sm sm:text-base'>
                                    {translate(
                                        "common.categories",
                                        language
                                    )}
                                </span>

                                <span className='text-[#00FF00] shrink-0'>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`w-7 h-7 sm:w-8 sm:h-8 p-1 rounded-sm ${openFilter
                                            ? 'rotate-0'
                                            : 'rotate-270'
                                            }`}
                                    >
                                        <path
                                            d="M7.175 8.59L11 12.407l3.825-3.817L16 9.765l-5 5-5-5Z"
                                            fill="#00FF00"
                                            transform="translate(-1 -1.432)"
                                        />
                                    </svg>
                                </span>
                            </button>

                            {openFilter === "category" && (
                                <div className='mt-2 py-2 border-t border-[#313132]'>
                                    <CategoryTree categories={sidebarCategories} />
                                </div>
                            )}
                        </div>

                        {availableFilters.length > 0 && (
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-white text-base sm:text-lg mb-2'>
                                    {translate(
                                        "common.filterSelection",
                                        language
                                    )}
                                </h2>

                                <div className='flex flex-col gap-3'>
                                    {availableFilters.map(filter => (
                                        <FilterItem
                                            key={filter.id}
                                            filter={filter}
                                            selectedFilters={selectedFilters}
                                            onFilterChange={handleFilterChange}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='flex-1 w-full min-w-0 p-2 sm:p-3 md:p-5'>
                        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5'>
                            <label className='flex items-center gap-3 text-white cursor-pointer select-none'>
                                <div className='relative flex items-center justify-center select-none'>
                                    <input
                                        type='checkbox'
                                        checked={onlyInStock}
                                        onChange={(e) =>
                                            setOnlyInStock(e.target.checked)
                                        }
                                        className='peer appearance-none w-4 h-4 border border-[#A4A4A5] bg-transparent checked:bg-[#00FF00] checked:border-[#00FF00] cursor-pointer'
                                    />

                                    <svg
                                        className='absolute left-0.5 top-0.5 w-3 h-3 text-black opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                        strokeWidth='3.5'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M5 13l4 4L19 7'
                                        />
                                    </svg>
                                </div>

                                <span className='text-sm text-[#A4A4A5]'>
                                    {translate(
                                        "stock.only",
                                        language
                                    )}
                                </span>
                            </label>

                            <div className='relative w-full sm:w-72'>
                                <button
                                    type='button'
                                    onClick={() =>
                                        setIsSortOpen(prev => !prev)
                                    }
                                    className={`w-full bg-[#0d0d0d] border px-4 sm:px-5 py-3 flex items-center justify-between cursor-pointer transition-colors gap-4 uppercase font-medium text-xs sm:text-sm tracking-wide ${isSortOpen
                                        ? 'border-[#00FF00]'
                                        : 'border-[#2d2d2e] hover:border-[#00FF00]'
                                        }`}
                                >
                                    <span
                                        className={`truncate ${isSortOpen
                                            ? 'text-[#00FF00]'
                                            : 'text-[#A4A4A5]'
                                            }`}
                                    >
                                        {sortLabels[sortOption] ||
                                            translate(
                                                "sort.default",
                                                language
                                            )}
                                    </span>

                                    {isSortOpen ? (
                                        <svg
                                            width='18'
                                            height='18'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            stroke='#00FF00'
                                            strokeWidth='2.5'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            className='shrink-0'
                                        >
                                            <line
                                                x1='18'
                                                y1='6'
                                                x2='6'
                                                y2='18'
                                            />
                                            <line
                                                x1='6'
                                                y1='6'
                                                x2='18'
                                                y2='18'
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            width='18'
                                            height='18'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            stroke='currentColor'
                                            strokeWidth='2.5'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            className='text-white shrink-0'
                                        >
                                            <line
                                                x1='3'
                                                y1='6'
                                                x2='21'
                                                y2='6'
                                            />
                                            <line
                                                x1='6'
                                                y1='12'
                                                x2='21'
                                                y2='12'
                                            />
                                            <line
                                                x1='10'
                                                y1='18'
                                                x2='21'
                                                y2='18'
                                            />
                                        </svg>
                                    )}
                                </button>

                                {isSortOpen && (
                                    <div className='absolute top-full left-0 w-full z-50 bg-[#0d0d0d] border border-t-0 border-[#00FF00] shadow-2xl'>
                                        {[
                                            ['discount', 'sort.discount'],
                                            ['priceAsc', 'sort.priceAsc'],
                                            ['priceDesc', 'sort.priceDesc'],
                                            ['rating', 'sort.rating'],
                                            ['oldest', 'sort.oldest'],
                                            ['newest', 'sort.newest'],
                                            ['bestseller', 'sort.bestseller']
                                        ].map(([value, key]) => (
                                            <button
                                                key={value}
                                                type='button'
                                                onClick={() => {
                                                    setSortOption(value)
                                                    setIsSortOpen(false)
                                                }}
                                                className={`w-full text-left px-4 sm:px-5 py-3 text-xs sm:text-sm transition-colors cursor-pointer uppercase ${sortOption === value
                                                    ? 'text-[#00FF00] bg-[#181819] font-semibold'
                                                    : 'text-[#A4A4A5] hover:bg-[#181819] hover:text-white'
                                                    }`}
                                            >
                                                {translate(
                                                    key,
                                                    language
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='grid min-w-0 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4'>
                            {sortedProducts.length > 0 ? (
                                sortedProducts.map(product => (
                                    <CategoryProductCard
                                        key={product.id}
                                        categoryProduct={product}
                                    />
                                ))
                            ) : (
                                <div className='col-span-full flex items-center justify-center min-h-60'>
                                    <span className='text-[#A4A4A5] text-base sm:text-lg text-center'>
                                        {translate(
                                            "common.noProducts",
                                            language
                                        )}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category