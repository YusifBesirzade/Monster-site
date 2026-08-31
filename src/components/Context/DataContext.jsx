import React, { createContext, useEffect, useState } from 'react'
import { getCategories, getFilters, getHardwareMenus, getProducts } from '../../services/Api'

export const DATA = createContext([])

function DataContext({ children, initialCategories }) {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState(initialCategories)
    const [filters, setFilters] = useState([])
    const [hardwareMenus, setHardwareMenus] = useState({})
    const [language, setLanguage] = useState("tr")

    const [productsLoading, setProductsLoading] = useState(true)
    const [categoriesLoading, setCategoriesLoading] = useState(true)
    const [filtersLoading, setFiltersLoading] = useState(true)
    const [hardwareLoading, setHardwareLoading] = useState(true)

    const [productsError, setProductsError] = useState(false)
    const [categoriesError, setCategoriesError] = useState(false)
    const [filtersError, setFiltersError] = useState(false)
    const [hardwareError, setHardwareError] = useState(false)

    useEffect(() => {
        getProducts()
            .then(response => {
                setProducts(response.data)
            })
            .catch(() => {
                setProductsError(true)
            })
            .finally(() => {
                setProductsLoading(false)
            })
    }, [])

    useEffect(() => {
        getCategories()
            .then(response => {
                setCategories(response.category)
            })
            .catch(() => {
                setCategoriesError(true)
            })
            .finally(() => {
                setCategoriesLoading(false)
            })
    }, [])

    useEffect(() => {
        getFilters()
            .then(response => {
                setFilters(response.filter)
            })
            .catch(() => {
                setFiltersError(true)
            })
            .finally(() => {
                setFiltersLoading(false)
            })

    }, [])

    useEffect(() => {
        getHardwareMenus()
            .then(response => {
                setHardwareMenus(response.hardware)
            })
            .catch(() => {
                setHardwareError(true)
            })
            .finally(() => {
                setHardwareLoading(false)
            })
    }, [])

    return (
        <>
            <DATA.Provider value={{
                products, setProducts, categories, setCategories, filters, setFilters, language, setLanguage,
                hardwareMenus, setHardwareMenus, productsLoading, categoriesLoading, filtersLoading,
                hardwareLoading, productsError, categoriesError, filtersError, hardwareError
            }}>
                {children}
            </DATA.Provider>
        </>
    )
}

export default DataContext