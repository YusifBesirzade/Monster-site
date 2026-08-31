function normalize(value) {
    return String(value ?? '')
        .toLowerCase()
        .replace(/[\s()-]/g, '')
}

function matchesFilter(product, key, value) {
    if (key === "price") {
        const price = product.discountedprice ?? product.price ?? 0
        const [min, max] = value.replaceAll("tl", "").split("-").map(Number)
        return price >= min && price <= max
    }

    if (key === "ramConfiguration") {
        const configuration = product.specifications?.memoryConfiguration?.tr || ""
        const match = value.match(/\d+x\d+gb/)

        if (!match) {
            return false
        }

        return normalize(configuration).includes(
            normalize(match[0])
        )
    }

    if (key === "secondM2Ssd") {
        const secondSsd = product.specifications?.secondM2Ssd?.tr || ""
        return normalize(secondSsd).includes(
            normalize(value).replace("ssd", "")
        )
    }

    if (key === "cpuArchitecture") {
        const architecture =
            product.specifications?.processorArchitecture?.tr || ""

        return normalize(architecture) === normalize(value)
    }

    const productValue = product.filters?.[key]

    if (!productValue) {
        return false
    }

    if (key === "keyboard") {
        return normalize(productValue).startsWith(normalize(value))
    }

    if (key === "weight") {
        return normalize(productValue) === normalize(value)
    }

    return productValue === value
}

export { matchesFilter }