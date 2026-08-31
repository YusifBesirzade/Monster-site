import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DATA } from '../Context/DataContext'
import { BASKET } from '../Context/BasketContext'
import { WISHLIST } from '../Context/WishlistContext'
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa'
import { translate } from '../utils/translations'
import { AUTH } from '../Context/AuthContext'

function ProductDetail() {
    const { slug } = useParams()
    const { products, language } = useContext(DATA)
    const { addbasket } = useContext(BASKET)
    const { addwishlist, wishlist } = useContext(WISHLIST)
    const [selectedImage, setSelectedImage] = useState(0)
    const navigate = useNavigate()
    const { user } = useContext(AUTH)

    const product = products.find(
        item => item.slug === slug
    )

    if (!product) {
        return (
            <div className='min-h-screen bg-[#1B1C1D] flex items-center justify-center'>
                <span className='text-white text-xl'>
                    {translate("product.notFound", language)}
                </span>
            </div>
        )
    }

    const isFav = wishlist.some(
        item => item.id === product.id && item.category === product.departmentSlug
    )

    const productName = product.name?.[language] || product.name

    const currentPrice = product.discountedprice ?? product.price ?? 0

    const defaultSpecificationList = [
        "operatingSystem",
        "processorArchitecture",
        "processorType",
        "gpuSeries",
        "processorModel",
        "graphicsCard",
        "graphicsCardFanCount",
        "graphicsCardBaseClock",
        "graphicsCardBoostClock",
        "displayOutputPorts",
        "gpuMuxSwitch",
        "screen",
        "screenSize",
        "memory",
        "memoryConfiguration",
        "maxMemory",
        "firstM2Ssd",
        "secondM2Ssd",
        "storageSupport",
        "keyboard",
        "camera",
        "wireless",
        "wirelessNetwork",
        "wiredWifiAntenna",
        "speakers",
        "audioSystem",
        "cardReader",
        "gigabitEthernet",
        "storage",
        "motherboard",
        "audioChip",
        "rgb",
        "argb",
        "usb2",
        "usb20",
        "usb32",
        "usb32Gen1",
        "usb32Gen2",
        "usb32Gen2TypeC",
        "displayConnections",
        "hdmi",
        "miniDisplay",
        "displayPort",
        "headphoneJack",
        "microphone",
        "fanSize",
        "fanCount",
        "processorCooler",
        "case",
        "topPanelPorts",
        "airCoolerSupport",
        "liquidCoolerSupport",
        "graphicsCardSupport",
        "powerSupply",
        "color",
        "dimensions",
        "weight",
        "material",
        "adapter",
        "battery",
        "warranty",
        "additionalInfo"
    ]

    const accessorySpecificationLists = {
        gamepad: [
            "color",
            "interface",
            "battery",
            "batteryStandbyTime",
            "design",
            "feature",
            "vibrationSensor",
            "motionSensor",
            "dpad",
            "lighting",
            "wirelessCompatibility",
            "content"
        ],

        keyboard: [
            "multiDeviceUsage",
            "color",
            "design",
            "powerButton",
            "connection",
            "operatingDistance",
            "chargingConnection",
            "batteryCapacity",
            "batteryUsageTime",
            "supportedDevices",
            "backlight",
            "keyStructure",
            "multimediaKeyCount",
            "dimensions",
            "weight",
            "caseType",
            "systemRequirements"
        ],

        headphone: [
            "sensitivity",
            "impedance",
            "headphoneDiameter",
            "microphoneSize",
            "microphoneSensitivity",
            "microphoneType",
            "cableLength",
            "connectionType",
            "dimensions",
            "productWeight",
            "packageWeight",
            "design",
            "feature",
            "controller",
            "soundAdjustment",
            "rgbLightingEffect",
            "frequencyRange",
            "microphoneImpedance",
            "vibration",
            "systemRequirements",
            "power"
        ],

        bag: [
            "material",
            "dimensions",
            "cover",
            "modelName"
        ],

        cable: [
            "resolutionSupport",
            "connectionType",
            "hdrSupport",
            "bandwidth",
            "length",
            "connectorType",
            "material"
        ]
    }

    const specificationList =
        accessorySpecificationLists[product.productType] ||
        defaultSpecificationList

    return (
        <>
            <div className='bg-[#1B1C1D] min-h-screen'>
                <div className='max-w-310 mx-auto px-3 py-5 sm:px-5'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10'>
                        <div className='flex flex-col gap-4'>
                            <div className='w-full min-h-90 sm:min-h-105 md:min-h-120 bg-[#161617] flex items-center justify-center p-4 sm:p-5 overflow-hidden'>
                                <img
                                    src={product.images?.[selectedImage]}
                                    alt={productName}
                                    className='w-full max-h-90 sm:max-h-105 md:max-h-120 object-contain transition-transform duration-300 hover:scale-125 cursor-zoom-in'
                                />
                            </div>

                            <div className='flex items-center gap-3 overflow-x-auto pb-2'>
                                {product.images?.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 border bg-[#161617] flex items-center justify-center cursor-pointer transition-colors ${selectedImage === index
                                            ? 'border-[#00FF00]'
                                            : 'border-[#313132] hover:border-[#00FF00]'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${productName} ${index + 1}`}
                                            className='w-full h-full object-contain'
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className='text-white min-w-0'>
                            <div className='flex items-start justify-between gap-3 sm:gap-5'>
                                <h1 className='text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight break-words'>
                                    {productName}
                                </h1>

                                <button
                                    onClick={() => addwishlist(product, product.departmentSlug)}
                                    className={`w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full border flex items-center justify-center cursor-pointer transition-colors ${isFav
                                        ? 'border-red-500 bg-red-500 text-white'
                                        : 'border-[#49494A] text-white hover:text-[#00FF00] hover:border-[#00FF00]'
                                        }`}
                                >
                                    {isFav ? <FaHeart /> : <FaRegHeart />}
                                </button>
                            </div>

                            {product.rating > 0 && (
                                <div className='flex items-center gap-2 mt-4 flex-wrap'>
                                    <div className='flex shrink-0'>
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <FaStar
                                                key={star}
                                                size={16}
                                                className={
                                                    star <= product.rating
                                                        ? 'text-[#FBBD08]'
                                                        : 'text-[#4A4A4B]'
                                                }
                                            />
                                        ))}
                                    </div>

                                    <span className='text-[#FBBD08]'>
                                        {product.rating} ({product.commentcount})
                                    </span>
                                </div>
                            )}

                            <div className='mt-6 sm:mt-8'>
                                {product.discount > 0 ? (
                                    <div className='flex flex-col gap-1'>
                                        <span className='line-through text-[#9B9B9C] text-base sm:text-lg'>
                                            {product.oldprice.toLocaleString('tr-TR')} {translate("product.tl", language)}
                                        </span>

                                        <span className='text-white text-3xl sm:text-4xl font-semibold'>
                                            {product.discountedprice.toLocaleString('tr-TR')} {translate("product.tl", language)}
                                        </span>

                                        <span className='text-[#EC268F] font-bold mt-2'>
                                            %{product.discount} {translate("product.discount", language)}
                                        </span>
                                    </div>
                                ) : (
                                    <span className='text-white text-3xl sm:text-4xl font-semibold'>
                                        {product.price.toLocaleString('tr-TR')} {translate("product.tl", language)}
                                    </span>
                                )}
                            </div>

                            <div className='mt-4'>
                                <span className='text-[#26DE2E] text-sm'>
                                    {translate("product.installment", language).replace(
                                        "{monthly}",
                                        product.monthlypaid
                                    )}
                                </span>
                            </div>

                            <div className='mt-6 sm:mt-8'>
                                <div className='mb-4 flex items-center gap-2'>
                                    <span
                                        className={`w-2.5 h-2.5 rounded-full ${product.inStock
                                            ? 'bg-[#00FF00]'
                                            : 'bg-red-500'
                                            }`}
                                    />

                                    <span
                                        className={`text-sm font-medium ${product.inStock
                                            ? 'text-[#00FF00]'
                                            : 'text-red-500'
                                            }`}
                                    >
                                        {product.inStock
                                            ? translate("productInStock", language)
                                            : translate("productOutOfStock", language)
                                        }
                                    </span>
                                </div>

                                <button
                                    onClick={() => addbasket(product, product.departmentSlug, 1)}
                                    disabled={!product.inStock}
                                    className={`w-full border py-3 transition-colors ${product.inStock
                                        ? 'border-[#00FF00] text-white hover:bg-[#00FF00] hover:text-black cursor-pointer'
                                        : 'border-[#49494A] text-[#777777] cursor-not-allowed'
                                        }`}
                                >
                                    {translate("common.addToCart", language)}
                                </button>
                            </div>

                            <div className='mt-6 sm:mt-8 border-t border-[#313132] pt-5 sm:pt-6'>
                                <h2 className='text-xl font-semibold mb-4'>
                                    {translate("product.description", language)}
                                </h2>

                                <ul className='flex flex-col gap-3 text-[#A4A4A5]'>
                                    {product.description?.map((item, index) => (
                                        <li key={index} className='flex gap-2'>
                                            <span className='text-[#00FF00]'>•</span>
                                            <span>{item[language]}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='mt-10 sm:mt-12 md:mt-16'>
                        <h2 className='text-xl sm:text-2xl text-white font-semibold mb-5 sm:mb-6'>
                            {translate("product.specifications", language)}
                        </h2>

                        <div className='border border-[#313132] bg-[#161617] overflow-hidden'>
                            {specificationList.map(key => {
                                const value = product.specifications?.[key]

                                if (!value) {
                                    return null
                                }

                                return (
                                    <div
                                        key={key}
                                        className='grid grid-cols-1 md:grid-cols-3 border-b border-[#313132] last:border-b-0'
                                    >
                                        <div className='p-3 sm:p-4 text-white font-medium uppercase text-sm sm:text-base break-words'>
                                            {translate(`specification.${key}`, language)}
                                        </div>

                                        <div className='md:col-span-2 p-3 sm:p-4 text-[#A4A4A5] text-sm sm:text-base break-words'>
                                            {key === "storageSupport"
                                                ? `${value.count} x ${value.type?.[language]}`
                                                : value[language]}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className='mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4'>
                        {product.description?.map((item, index) => (
                            <div
                                key={index}
                                className='border border-[#313132] bg-[#161617] p-4 sm:p-5'
                            >
                                <span className='text-[#A4A4A5]'>
                                    {item[language]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail