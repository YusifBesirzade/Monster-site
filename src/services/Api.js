import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

async function getCategories() {
    const res = await api.get("/categories");
    return res.data;
}

async function getProducts() {
    const res = await api.get("/products")
    return res.data
}

async function getFilters() {
    const res = await api.get("/filters")
    return res.data
}

async function getHardwareMenus() {
    const res = await api.get("/hardware")
    return res.data
}


export { getCategories, getProducts, getFilters, getHardwareMenus }