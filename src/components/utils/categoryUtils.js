export function containsSlug(category, slug) {
    if (!category) {
        return false
    }

    if (category.slug === slug) {
        return true
    }

    if (!category.children || category.children.length === 0) {
        return false
    }

    return category.children.some(child =>
        containsSlug(child, slug)
    )
}

export function buildSidebarCategories(categories, currentSlug) {
    const tumLaptoplar = categories.find(category => category.id === 1)
    const oyunBilgisayarlari = categories.find(category => category.id === 2)
    const masaustuBilgisayarlar = categories.find(category => category.id === 3)
    const isBilgisayarlari = categories.find(category => category.id === 4)
    const ogrenciBilgisayari = categories.find(category => category.id === 5)
    const aksesuarlar = categories.find(category => category.id === 6)
    const oyuncuMonitoru = categories.find(category => category.id === 7)

    const abra = oyunBilgisayarlari?.children.find(
        category => category.slug === "abra"
    )

    const tulpar = oyunBilgisayarlari?.children.find(
        category => category.slug === "tulpar"
    )

    const semruk = oyunBilgisayarlari?.children.find(
        category => category.slug === "semruk"
    )

    const huma = isBilgisayarlari?.children.find(
        category => category.slug === "huma"
    )

    const markut = isBilgisayarlari?.children.find(
        category => category.slug === "markut"
    )

    const oyunSidebar = {
        ...oyunBilgisayarlari,
        children: [
            {
                ...abra,
                children: [
                    {
                        id: 1111,
                        name: {
                            tr: "Abra A5",
                            az: "Abra A5",
                            en: "Abra A5"
                        },
                        slug: "abra-a5",
                        children: []
                    },
                    {
                        id: 1112,
                        name: {
                            tr: "Abra A7",
                            az: "Abra A7",
                            en: "Abra A7"
                        },
                        slug: "abra-a7",
                        children: []
                    }
                ]
            },
            {
                ...tulpar,
                children: []
            },
            {
                ...semruk,
                children: []
            }
        ]
    }

    const isSidebar = {
        ...isBilgisayarlari,
        children: [
            ...(huma
                ? [
                    {
                        ...huma,
                        children: []
                    }
                ]
                : []),
            ...(markut
                ? [
                    {
                        ...markut,
                        children: []
                    }
                ]
                : [])
        ]
    }

    const laptopSidebar = {
        ...tumLaptoplar,
        children: [
            oyunSidebar,
            isSidebar
        ]
    }

    const tulparMasaustu = masaustuBilgisayarlar?.children.find(
        category => category.slug === "tulpar-masaustu"
    )

    const masaustuSidebar = {
        ...masaustuBilgisayarlar,
        children: tulparMasaustu ? [
            {
                ...tulparMasaustu,
                children: [
                    {
                        id: 2111,
                        name: {
                            tr: "TULPAR TD3",
                            az: "TULPAR TD3",
                            en: "TULPAR TD3"
                        },
                        slug: "tulpar-td3",
                        children: []
                    }
                ]
            }
        ] : []
    }

    const sidebarRoots = [
        laptopSidebar,
        masaustuSidebar,
        ogrenciBilgisayari,
        aksesuarlar,
        oyuncuMonitoru
    ]

    return sidebarRoots.filter(category =>
        containsSlug(category, currentSlug)
    )
}

export function getFilterCategorySlug(categories, currentSlug, filters) {
    function findPath(categories, slug, path = []) {
        for (const category of categories) {
            const newPath = [...path, category]

            if (category.slug === slug) {
                return newPath
            }

            if (category.children?.length > 0) {
                const result = findPath(category.children, slug, newPath)

                if (result) {
                    return result
                }
            }
        }

        return null
    }

    const path = findPath(categories, currentSlug)

    if (!path) {
        return null
    }

    for (let i = path.length - 1; i >= 0; i--) {
        const categorySlug = path[i].slug

        if (filters.some(filter => filter.categorySlug === categorySlug)) {
            return categorySlug
        }
    }

    return null
}
