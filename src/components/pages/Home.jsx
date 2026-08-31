import React, { useContext, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import monsterbanner from '../../assets/monsterbanner/monsterbannerphoto.png'
import monsterminibanner1 from '../../assets/monsterbanner/monsterminibanner1.png'
import monsterminibanner2 from '../../assets/monsterbanner/monsterminibanner2.png'
import monsterminibanner3 from '../../assets/monsterbanner/monsterminibanner3.png'
import intelcore7 from '../../assets/monsterbanner/intelcore7.png'
import inteli5logo from '../../assets/monsterbanner/inteli5logo.png'
import inteli7logo from '../../assets/monsterbanner/inteli7logo.png'
import inteli9logo from '../../assets/monsterbanner/inteli9logo.png'
import intelultra5 from '../../assets/monsterbanner/intelultra5.png'
import intelultra7logo from '../../assets/monsterbanner/intelultra7logo.png'
import intelultra9logo from '../../assets/monsterbanner/intelultra9logo.png'
import amdryzen5logo from '../../assets/monsterbanner/amdryzen5logo.png'
import amdryzen7logo from '../../assets/monsterbanner/amdryzen7logo.png'
import amdryzen9logo from '../../assets/monsterbanner/amdryzen9logo.png'
import amdradeonlogo from '../../assets/monsterbanner/amdradeonlogo.png'
import nvidialogo from '../../assets/monsterbanner/nvidialogo.jpg'
import webfirat from '../../assets/webfiratcavus.png'
import webawards from '../../assets/webawards.png'
import webgucunuz from '../../assets/webgucunuzugosterin.png'
import webdeneyim from '../../assets/webdeneyim.png'
import gaming2xcompress from '../../assets/gaming2xcompress.jpg'
import techbrandsbanner from '../../assets/TechBrandsBanner.png'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../../src/slide.css';
import '../../../src/heroslide.css';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import { DATA } from '../Context/DataContext';
import ProductCard from '../Card/ProductCard';
import { heroSliders } from '../../data/homeData';
import { translate } from '../utils/translations';

function Home() {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState("home.categories.laptops")
    const { products, language } = useContext(DATA)

    const options = [
        "home.categories.laptops",
        "home.categories.desktopComputers",
        "home.categories.accessories"
    ]

    const featuredProducts = products.filter(product => {
        if (!product.isFeatured) {
            return false
        }

        if (selected === "home.categories.laptops") {
            return product.departmentSlug === "laptoplar"
        }

        if (selected === "home.categories.desktopComputers") {
            return product.departmentSlug === "masaustu-bilgisayarlar"
        }

        if (selected === "home.categories.accessories") {
            return product.departmentSlug === "aksesuarlar"
        }

        return true
    });

    return (
        <>
            <div className='relative w-full mx-auto bg-black text-center overflow-hidden'>
                <div className='relative w-full'>
                    <div className='absolute top-2 sm:top-5 md:top-6 lg:top-8 left-1/2 -translate-x-1/2 w-full z-10 px-4'>
                        <h2 className='text-white text-base sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-wide leading-tight max-w-[95%] sm:max-w-[85%] md:max-w-[750px] lg:max-w-none mx-auto'>
                            {translate("home.startWithNewMonster", language)}
                        </h2>
                    </div>

                    <img
                        className='w-full h-auto min-h-[300px] sm:min-h-[420px] md:min-h-[550px] lg:min-h-[680px] xl:min-h-[780px] object-cover object-center'
                        src={monsterbanner}
                        alt='Monster photo'
                    />

                    <div className='fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-[#FFC700] text-black font-bold px-1.5 py-3 sm:px-2 sm:py-4 rounded-l-md shadow-lg [writing-mode:vertical-lr] tracking-widest text-[10px] sm:text-xs uppercase cursor-pointer hover:bg-[#e6b400] transition-colors'>
                        DİJİTAL MAĞAZA
                    </div>
                </div>

                <div className='heroslider relative block md:hidden w-full px-4 py-6 bg-black'>
                    <Swiper
                        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
                        navigation={{
                            nextEl: ".custom-next",
                            prevEl: ".custom-prev"
                        }}
                        pagination={{
                            el: ".mini-banner-pagination",
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        mousewheel={true}
                        keyboard={true}
                        className='w-full'
                    >
                        <SwiperSlide>
                            <div className='flex flex-col items-center gap-2.5 w-full max-w-[300px] mx-auto pb-6'>
                                <img
                                    className='w-full h-auto object-contain rounded-lg shadow-md'
                                    src={monsterminibanner1}
                                    alt='Monster Banner 1'
                                />
                                <div className='w-full flex flex-wrap items-center justify-center gap-1.5'>
                                    <img className='h-5 sm:h-6 w-auto object-contain' src={intelcore7} alt='Intel Core 7' />
                                    <img className='h-5 sm:h-6 w-auto object-contain' src={inteli5logo} alt='Intel Core i5' />
                                    <img className='h-5 sm:h-6 w-auto object-contain' src={inteli7logo} alt='Intel Core i7' />
                                    <img className='h-5 sm:h-6 w-auto object-contain' src={inteli9logo} alt='Intel Core i9' />
                                    <img className='h-5 sm:h-6 w-auto object-contain' src={intelultra5} alt='Intel Core Ultra 5' />
                                    <img className='h-5 sm:h-6 w-auto object-contain' src={intelultra7logo} alt='Intel Core Ultra 7' />
                                    <img className='h-5 sm:h-6 w-auto object-contain' src={intelultra9logo} alt='Intel Core Ultra 9' />
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className='flex flex-col items-center gap-2.5 w-full max-w-[300px] mx-auto pb-6'>
                                <img
                                    className='w-full h-auto object-contain rounded-lg shadow-md'
                                    src={monsterminibanner2}
                                    alt='Monster Mini Banner 2'
                                />
                                <div className='w-full flex flex-wrap items-center justify-center gap-1.5'>
                                    <img className='h-5 sm:h-6 w-auto object-contain' src={amdryzen5logo} alt='Amd Ryzen 5' />
                                    <img className='h-5 sm:h-6 w-auto object-contain' src={amdryzen7logo} alt='Amd Ryzen 7' />
                                    <img className='h-5 sm:h-6 w-auto object-contain' src={amdryzen9logo} alt='Amd Ryzen 9' />
                                    <img className='h-5 sm:h-6 w-auto object-contain' src={amdradeonlogo} alt='Amd Radeon' />
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className='flex flex-col items-center gap-2.5 w-full max-w-[300px] mx-auto pb-6'>
                                <img
                                    className='w-full h-auto object-contain rounded-lg shadow-md'
                                    src={monsterminibanner3}
                                    alt='Monster Banner 3'
                                />
                                <div className='w-full flex items-center justify-center gap-2'>
                                    <img className='h-5 sm:h-6 w-auto object-contain' src={nvidialogo} alt='Nvidia' />
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>

                    <div className='mini-banner-pagination flex justify-center items-center gap-1 mt-2'></div>
                </div>

                <div className='hidden md:block absolute bottom-3 lg:bottom-6 xl:bottom-8 left-1/2 -translate-x-1/2 z-20 w-full px-4 md:px-6 lg:px-8 max-w-[1300px]'>
                    <div className='grid grid-cols-3 gap-3 lg:gap-5 xl:gap-6 items-end justify-items-center w-full'>
                        <div className='flex flex-col items-center gap-2 w-full max-w-[360px]'>
                            <img
                                className='w-full h-auto object-contain rounded-lg shadow-lg'
                                src={monsterminibanner1}
                                alt='Monster Banner 1'
                            />
                            <div className='w-full flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 lg:gap-2'>
                                <img className='h-5 md:h-6 lg:h-7 xl:h-8 w-auto object-contain' src={intelcore7} alt='Intel Core 7' />
                                <img className='h-5 md:h-6 lg:h-7 xl:h-8 w-auto object-contain' src={inteli5logo} alt='Intel Core i5' />
                                <img className='h-5 md:h-6 lg:h-7 xl:h-8 w-auto object-contain' src={inteli7logo} alt='Intel Core i7' />
                                <img className='h-5 md:h-6 lg:h-7 xl:h-8 w-auto object-contain' src={inteli9logo} alt='Intel Core i9' />
                                <img className='h-5 md:h-6 lg:h-7 xl:h-8 w-auto object-contain' src={intelultra5} alt='Intel Core Ultra 5' />
                                <img className='h-5 md:h-6 lg:h-7 xl:h-8 w-auto object-contain' src={intelultra7logo} alt='Intel Core Ultra 7' />
                                <img className='h-5 md:h-6 lg:h-7 xl:h-8 w-auto object-contain' src={intelultra9logo} alt='Intel Core Ultra 9' />
                            </div>
                        </div>

                        <div className='flex flex-col items-center gap-2 w-full max-w-[360px]'>
                            <img
                                className='w-full h-auto object-contain rounded-lg shadow-lg'
                                src={monsterminibanner2}
                                alt='Monster Mini Banner 2'
                            />
                            <div className='w-full flex flex-wrap items-center justify-center gap-1.5 lg:gap-2.5'>
                                <img className='h-5 md:h-6 lg:h-7 xl:h-8 w-auto object-contain' src={amdryzen5logo} alt='Amd Ryzen 5' />
                                <img className='h-5 md:h-6 lg:h-7 xl:h-8 w-auto object-contain' src={amdryzen7logo} alt='Amd Ryzen 7' />
                                <img className='h-5 md:h-6 lg:h-7 xl:h-8 w-auto object-contain' src={amdryzen9logo} alt='Amd Ryzen 9' />
                                <img className='h-5 md:h-6 lg:h-7 xl:h-8 w-auto object-contain' src={amdradeonlogo} alt='Amd Radeon' />
                            </div>
                        </div>

                        <div className='flex flex-col items-center gap-2 w-full max-w-[360px]'>
                            <img
                                className='w-full h-auto object-contain rounded-lg shadow-lg'
                                src={monsterminibanner3}
                                alt='Monster Banner 3'
                            />
                            <div className='w-full flex items-center justify-center lg:justify-end gap-2'>
                                <img
                                    className='h-6 md:h-7 lg:h-8 xl:h-9 w-auto object-contain'
                                    src={nvidialogo}
                                    alt='Nvidia'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='relative bg-[#1B1C1D] h-auto overflow-x-hidden'>
                <div className="slider relative w-full overflow-hidden">
                    <Swiper
                        navigation={{
                            nextEl: ".hero-next",
                            prevEl: ".hero-prev"
                        }}
                        pagination={{
                            el: ".hero-pagination",
                            clickable: true,
                            renderBullet: function (index, className) {
                                return '<span class="' + className + ' custom-hero-bullet"></span>';
                            }
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false
                        }}
                        keyboard={true}
                        modules={[Navigation, Pagination, Keyboard, Autoplay]}
                        className="heroSwiper w-full"
                    >
                        {heroSliders.map((image, index) => (
                            <SwiperSlide key={index} className='w-full! bg-[#1B1C1D] flex justify-center items-center'>
                                <img className='w-full h-auto block object-cover' src={image} alt={`Slider ${index + 1}`} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button className='hero-prev hidden md:flex absolute bg-[#1B1C1D]/80 hover:bg-[#1B1C1D] text-white top-1/2 -translate-y-1/2 left-2 sm:left-4 md:left-8 lg:left-12 w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 items-center justify-center z-30 rounded-full cursor-pointer transition-all duration-200 hover:border-2 hover:border-white'>
                        <IoIosArrowBack size={22} />
                    </button>

                    <button className='hero-next hidden md:flex absolute bg-[#1B1C1D]/80 hover:bg-[#1B1C1D] text-white top-1/2 -translate-y-1/2 right-2 sm:right-4 md:right-8 lg:right-12 w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 items-center justify-center z-30 rounded-full cursor-pointer transition-all duration-200 hover:border-2 hover:border-white'>
                        <IoIosArrowForward size={22} />
                    </button>
                    <div className='w-full bg-[#111213] py-2 sm:py-2.5 flex justify-center items-center z-30 border-t border-[#232425]'>
                        <div className='bg-[#171819] px-3 sm:px-6 py-1.5 flex items-center justify-center border border-[#2A2B2C]'>
                            <div className='hero-pagination flex items-center justify-center gap-1.5 sm:gap-2'></div>
                        </div>
                    </div>
                </div>

                <div className='mt-6 sm:mt-12 md:mt-16 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex flex-col items-center gap-4 sm:gap-5 text-white'>
                        <div className='w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0'>
                            <h4 className='text-lg sm:text-xl md:text-2xl font-bold'>{translate("home.featuredProducts", language)}</h4>
                            <div className='relative w-full sm:w-44 md:w-50 select-none'>
                                <div onClick={() => setIsOpen(!isOpen)} className={`w-full flex items-center justify-between border bg-black text-white py-2 pl-3 pr-4 cursor-pointer transition-colors ${isOpen ? 'border-[#00FF00]' : 'border-[#313233]'}`}>
                                    <span>{translate(selected, language)}</span>
                                    <svg className={`w-4 h-4 fill-current text-[#A4A4A5] transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>

                                {isOpen && (
                                    <div className='absolute top-full left-0 w-full bg-black border border-t-0 border-[#313233] z-50 shadow-lg'>
                                        {options.map((option, index) => (
                                            <div key={index}
                                                onClick={() => {
                                                    setSelected(option);
                                                    setIsOpen(false);
                                                }}
                                                className='py-2 px-3 text-white hover:bg-[#1F481D] hover:text-[#00FF00] cursor-pointer transition-colors'>
                                                {translate(option, language)}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="featuredslider relative w-full max-w-[1240px] mx-auto px-1 sm:px-4 md:px-6 py-3 sm:py-4">
                        <Swiper
                            modules={[Navigation, Pagination]}
                            navigation={{
                                nextEl: '.product-next',
                                prevEl: '.product-prev',
                            }}
                            pagination={{
                                el: ".product-pagination",
                                clickable: true
                            }}
                            spaceBetween={16}
                            slidesPerView={1}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                            }}
                            autoHeight={false}
                            className="productSwiper w-full pb-10! [&_.swiper-wrapper]:items-stretch"
                        >
                            {featuredProducts.map((product, index) => (
                                <SwiperSlide key={product.id || index}>
                                    <ProductCard product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <button className='product-prev hidden sm:flex absolute top-1/2 -translate-y-1/2 -left-4 md:-left-8 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-[#1B1C1D] hover:bg-black text-white items-center justify-center rounded-full transition-colors cursor-pointer border border-[#313233] shadow-md'>
                            <IoIosArrowBack size={22} />
                        </button>
                        <button className='product-next hidden sm:flex absolute top-1/2 -translate-y-1/2 -right-4 md:-right-8 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-[#1B1C1D] hover:bg-black text-white items-center justify-center rounded-full transition-colors cursor-pointer border border-[#313233] shadow-md'>
                            <IoIosArrowForward size={22} />
                        </button>

                        <div className='product-pagination flex justify-center items-center gap-1.5 mt-4'></div>
                    </div>
                </div>

                <div className='flex flex-col gap-4 sm:gap-5 mt-8'>
                    <img className='w-full h-auto object-contain px-3 sm:px-4 md:px-5' src={webfirat} alt="tablet" />
                    <img className='w-full h-auto object-contain px-3 sm:px-4 md:px-5' src={webawards} alt="awards" />
                    <img className='w-full h-auto object-contain px-3 sm:px-4 md:px-5' src={webgucunuz} alt="web gucunuz" />
                    <div className='flex flex-col sm:flex-row gap-4 sm:gap-0'>
                        <img className='w-full sm:w-1/2 h-auto object-contain px-3 sm:px-4 md:px-5' src={gaming2xcompress} alt="gaming 2x compress" />
                        <img className='w-full sm:w-1/2 h-auto object-contain px-3 sm:px-4 md:px-5' src={techbrandsbanner} alt="tech brands banner" />
                    </div>
                    <img className='w-full h-auto object-contain px-3 sm:px-4 md:px-5' src={webdeneyim} alt="web deneyim" />
                </div>
            </div>
        </>
    )
}

export default Home