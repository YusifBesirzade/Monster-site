import React, { useContext, useState } from 'react'
import appstorebadge from '../../assets/appstorebadge.png'
import googleplaybadge from '../../assets/googleplaybadge.png'
import appgallerybadge from '../../assets/appgallerybadge.png'
import troy from '../../assets/footerimage/troy.png'
import garanti from '../../assets/footerimage/garanti.png'
import visa from '../../assets/footerimage/visa.png'
import mastercard from '../../assets/footerimage/mastercard.png'
import bkm from '../../assets/footerimage/bkm.png'
import comodo from '../../assets/footerimage/comodo.png'
import { DATA } from '../Context/DataContext'
import { translate } from '../utils/translations'

function AccordionItem({ title, children }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='border-b border-[#262728] md:border-none py-3 md:py-0'>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='w-full flex items-center justify-between text-left text-white text-base md:text-xl focus:outline-none'
            >
                <span>{title}</span>
                <span className='md:hidden text-[#00FF00]'>
                    <svg
                        className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
                    </svg>
                </span>
            </button>
            <div className={`${isOpen ? 'block mt-3' : 'hidden'} md:block md:mt-2`}>
                {children}
            </div>
        </div>
    )
}

function Footer() {
    const { language } = useContext(DATA)

    return (
        <>
            <div className='w-full mx-auto bg-[#1B1C1D] relative'>
                <div className='fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-[#FFC700] text-black font-bold px-2 py-4 rounded-l-md shadow-lg [writing-mode:vertical-lr] tracking-widest text-xs uppercase cursor-pointer hover:bg-[#e6b400] transition-colors'>
                    DİJİTAL MAĞAZA
                </div>

                <hr className='w-full h-0.5 bg-[#262728]' />

                <div className='max-w-[1240px] mx-auto p-5'>
                    <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5'>
                        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-10 w-full lg:w-auto'>
                            <a href='#' className='flex items-center w-full sm:w-auto'>
                                <div className='bg-[#222324] p-2.5 inline-flex items-center justify-center'>
                                    <svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' className='w-4 h-4'>
                                        <path fill='#FFFFFF' d='M14.666 2.667H1.333v10.667h7.333V12h-6V5.334L8 8.667l5.333-3.333v3.333h1.333zM8 7.334L2.666 4h10.667zm4.667 2.667l2.666 2.666-2.667 2.667v-2H10V12h2.667z' />
                                    </svg>
                                </div>
                                <div className='bg-[#323334] text-white min-h-[40px] px-4 flex items-center text-sm font-semibold tracking-wide w-full sm:w-auto'>
                                    {translate("footer.sendMessage", language)}
                                </div>
                            </a>

                            <a href='#' className='flex items-center w-full sm:w-auto'>
                                <div className='bg-[#222324] p-2.5 inline-flex items-center justify-center'>
                                    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-4 h-4'>
                                        <g transform='translate(1.333 2)'>
                                            <circle cx='.667' cy='.667' r='.667' fill='#ffffff' transform='translate(4 6)' />
                                            <circle cx='.667' cy='.667' r='.667' fill='#ffffff' transform='translate(8 6)' />
                                            <path d='M14 9.353a4.026 4.026 0 00-7.987.947 5.383 5.383 0 003.24-3.927A5.358 5.358 0 0014 9.353z' fill='#ffffff' transform='translate(-3.335 -4)' />
                                            <path d='M14.66 9A5.993 5.993 0 102.673 9H2v4h2V9.127a4.793 4.793 0 014.52-4.86 4.671 4.671 0 014.813 4.667v4.733H8V15h6.667v-2h.667V9z' fill='#ffffff' transform='translate(-2 -3)' />
                                        </g>
                                    </svg>
                                </div>
                                <div className='bg-[#323334] text-white min-h-[40px] px-4 flex items-center text-sm font-semibold tracking-wide w-full sm:w-auto'>
                                    0850 255 11 11
                                </div>
                            </a>
                        </div>

                        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 text-white w-full lg:w-auto mt-2 lg:mt-0'>
                            <span className='text-sm text-[#8E99A1]'>
                                {translate("footer.followUs", language)}:
                            </span>

                            <div className='flex items-center gap-2'>
                                <div className='bg-[#222324] p-2 hover:bg-[#2e2f30] transition-colors cursor-pointer'>
                                    <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5'>
                                        <path fill='#ffffff' d='M21.582 7.2a2.513 2.513 0 00-1.768-1.78C18.254 5 12 5 12 5s-6.254 0-7.814.421a2.513 2.513 0 00-1.768 1.78 28.295 28.295 0 000 9.69 2.476 2.476 0 001.768 1.751c1.56.421 7.814.421 7.814.421s6.254 0 7.814-.421a2.476 2.476 0 001.768-1.751 28.3 28.3 0 000-9.69zM9.955 15.019V9.072l5.227 2.974-5.227 2.974z' />
                                    </svg>
                                </div>

                                <div className='bg-[#222324] p-2 hover:bg-[#2e2f30] transition-colors cursor-pointer'>
                                    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5'>
                                        <path d='M11.9047 8.46961L19.3513 0H17.5873L11.1187 7.35254L5.956 0H0L7.80867 11.1194L0 20H1.764L8.59067 12.2338L14.044 20H20M2.40067 1.30158H5.11067L17.586 18.7624H14.8753' fill='#ffffff' />
                                    </svg>
                                </div>

                                <div className='bg-[#222324] p-2 hover:bg-[#2e2f30] transition-colors cursor-pointer'>
                                    <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5'>
                                        <path fill='#ffffff' d='M17.011 13.25l.555-3.62h-3.473V7.282a1.81 1.81 0 012.041-1.955h1.577V2.245a19.254 19.254 0 00-2.8-.245c-2.86 0-4.73 1.734-4.73 4.872V9.63h-3.18v3.62h3.179V22h3.913v-8.75z' />
                                    </svg>
                                </div>

                                <div className='bg-[#222324] p-2 hover:bg-[#2e2f30] transition-colors cursor-pointer'>
                                    <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5'>
                                        <path fill='#ffffff' d='M12.002 6.875a5.127 5.127 0 105.127 5.127 5.118 5.118 0 00-5.127-5.127zm0 8.46a3.333 3.333 0 113.333-3.333 3.339 3.339 0 01-3.333 3.333zm6.532-8.669a1.2 1.2 0 11-1.2-1.2 1.193 1.193 0 011.2 1.195zm3.4 1.214a5.918 5.918 0 00-1.615-4.19 5.956 5.956 0 00-4.194-1.615c-1.651-.094-6.6-.094-8.25 0a5.948 5.948 0 00-4.19 1.611 5.937 5.937 0 00-1.61 4.189c-.094 1.651-.094 6.6 0 8.25a5.918 5.918 0 001.615 4.19 5.964 5.964 0 004.185 1.61c1.651.094 6.6.094 8.25 0a5.918 5.918 0 004.19-1.615 5.956 5.956 0 001.615-4.19c.093-1.65.093-6.594 0-8.245zm-2.137 10.012a3.374 3.374 0 01-1.9 1.9c-1.316.522-4.439.4-5.894.4s-4.582.116-5.894-.4a3.374 3.374 0 01-1.9-1.9c-.522-1.316-.4-4.439-.4-5.894s-.116-4.582.4-5.894a3.374 3.374 0 011.9-1.9c1.316-.522 4.439-.4 5.894-.4s4.582-.116 5.894.4a3.374 3.374 0 011.9 1.9c.522 1.316.4 4.439.4 5.894s.122 4.582-.4 5.894z' />
                                    </svg>
                                </div>

                                <div className='bg-[#222324] p-2 hover:bg-[#2e2f30] transition-colors cursor-pointer'>
                                    <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5'>
                                        <g fill='#ffffff'>
                                            <path d='M14.227 4L2 5.04l12.428 2.334-1.6-.07 8.507 4.843h-.4l-.312 3.969.522-.159.855-4.795z' />
                                            <path d='M5.469 10.707l-1.53-2.02 1.1 6.5 8.428 5.78 7.477-3.939.167-.923-6.852 2.541.16.455-8.519-5.92.981.237-.422-5.8L2 5.04z' />
                                            <path d='M19.965 15.535l.651-3.388-3.968-1.6-1.8 3.922-.284-4.761-4.479-1.807-2.282.5v5.241l6.272 4.475z' />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className='w-full h-0.5 bg-[#262728]' />

                <div className='max-w-[1240px] mx-auto p-5'>
                    <div className='flex flex-col md:flex-row flex-wrap items-start justify-between gap-6 lg:gap-10'>
                        <div className='flex flex-col gap-6 w-full md:w-auto'>
                            <AccordionItem title={translate("footer.products", language)}>
                                <ul className='text-[#8E99A1] flex flex-col gap-2 text-sm'>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.allLaptops", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.gamingComputers", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.gamingEquipment", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.businessComputers", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.workstations", language)}</a></li>
                                </ul>
                            </AccordionItem>

                            <AccordionItem title={translate("footer.contactStores", language)}>
                                <ul className='text-[#8E99A1] flex flex-col gap-2 text-sm'>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.headquarters", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.stores", language)}</a></li>
                                </ul>
                            </AccordionItem>
                        </div>

                        <div className='w-full md:w-auto'>
                            <AccordionItem title={translate("footer.performanceHardware", language)}>
                                <ul className='text-[#8E99A1] flex flex-col gap-2 text-sm'>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.intelI5Laptops", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.intelI7Laptops", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.intelI9Laptops", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.coreUltra1Laptops", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.coreUltra2Laptops", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.rtx5050Laptops", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.rtx5060Laptops", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.rtx5070Laptops", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.rtx5070TiLaptops", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.rtx5080Laptops", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.rtxA5000Laptops", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.intelIrisXeLaptops", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.rtx5090Laptops", language)}</a></li>
                                </ul>
                            </AccordionItem>
                        </div>

                        <div className='flex flex-col gap-6 w-full md:w-auto'>
                            <AccordionItem title={translate("footer.corporate", language)}>
                                <ul className='text-[#8E99A1] flex flex-col gap-2 text-sm'>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.aboutMonster", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.companyInformation", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.productStrategy", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.bankAccountInformation", language)}</a></li>
                                </ul>
                            </AccordionItem>

                            <AccordionItem title={translate("footer.legal", language)}>
                                <ul className='text-[#8E99A1] flex flex-col gap-2 text-sm'>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.privacyNotice", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.legalRights", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.cookieManagement", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.security", language)}</a></li>
                                </ul>
                            </AccordionItem>
                        </div>

                        <div className='w-full md:w-auto'>
                            <AccordionItem title={translate("footer.monsterWorld", language)}>
                                <ul className='text-[#8E99A1] flex flex-col gap-2 text-sm'>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.uniqueWarranty", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.announcementsCampaigns", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.bankCampaigns", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.pressRoom", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.userReviews", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.monsterReviews", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.wallpapers", language)}</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors inline-flex items-center gap-1'>{translate("footer.monsterBlog", language)} ↗</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors'>{translate("footer.performanceDiscovery", language)}</a></li>
                                </ul>
                            </AccordionItem>
                        </div>

                        <div className='w-full md:w-auto'>
                            <AccordionItem title={translate("footer.monsterSupport", language)}>
                                <ul className='text-[#8E99A1] flex flex-col gap-2 text-sm'>
                                    <li><a href='#' className='hover:text-white transition-colors inline-flex items-center gap-1'>{translate("footer.solutionCenter", language)} ↗</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors inline-flex items-center gap-1'>{translate("footer.callCenter", language)} ↗</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors inline-flex items-center gap-1'>{translate("footer.lifetimeMaintenance", language)} ↗</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors inline-flex items-center gap-1'>{translate("footer.drivers", language)} ↗</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors inline-flex items-center gap-1'>{translate("footer.userManual", language)} ↗</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors inline-flex items-center gap-1'>{translate("footer.technicalService", language)} ↗</a></li>
                                    <li><a href='#' className='hover:text-white transition-colors inline-flex items-center gap-1'>{translate("footer.orderDelivery", language)} ↗</a></li>
                                </ul>
                            </AccordionItem>
                        </div>
                    </div>
                </div>

                <div className='max-w-[500px] mx-auto mt-10 px-5 text-center'>
                    <h4 className='text-white text-xl font-medium'>
                        {translate("footer.mobileAppTitle", language)}
                    </h4>

                    <p className='text-[#8E99A1] mt-2 text-sm'>
                        {translate("footer.mobileAppDescription", language)}
                    </p>

                    <div className='flex flex-col md:flex-row items-center justify-center gap-4 py-4'>
                        <img className='w-36 cursor-pointer' src={appstorebadge} alt='app store badge' />
                        <img className='w-36 cursor-pointer' src={googleplaybadge} alt='google play badge' />
                        <img className='w-36 cursor-pointer' src={appgallerybadge} alt='app gallery badge' />
                    </div>
                </div>

                <hr className='bg-[#00FF00] h-1 border-none' />

                <div className='max-w-[1240px] mx-auto flex flex-col md:flex-row items-center md:justify-between gap-4 px-5 py-4 text-white'>
                    <p className='text-xs text-[#8E99A1] text-center md:text-left'>
                        {translate("footer.rights", language)}
                    </p>

                    <div className='flex flex-wrap items-center justify-center gap-3'>
                        <img className='w-8 h-auto object-contain' src={troy} alt='troy' />
                        <img className='w-10 h-auto object-contain' src={garanti} alt='garanti' />
                        <img className='w-10 h-auto object-contain' src={visa} alt='visa' />
                        <img className='w-10 h-auto object-contain' src={mastercard} alt='mastercard' />
                        <img className='w-10 h-auto object-contain' src={bkm} alt='bkm' />
                        <img className='w-10 h-auto object-contain' src={comodo} alt='comodo' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer