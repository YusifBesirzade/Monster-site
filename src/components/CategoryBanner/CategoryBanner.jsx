import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DATA } from '../Context/DataContext'
import { translate } from '../utils/translations'

const CATEGORY_BANNERS = {
    'tum-laptoplar': {
        titleKey: 'categoryBanner.allLaptops',
        bgImage: '/img/banners/tum-laptoplar.png',
        showWindowsBadge: true,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.allLaptops',
                href: '/category/tum-laptoplar'
            }
        ]
    },

    'oyun-bilgisayarlari': {
        titleKey: 'categoryBanner.gamingComputers',
        bgImage: '/img/banners/oyun-bilgisayarlari.png',
        showWindowsBadge: true,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.allLaptops',
                href: '/category/tum-laptoplar'
            },
            {
                labelKey: 'categoryBanner.gamingComputers',
                href: '/category/oyun-bilgisayarlari'
            }
        ]
    },

    'abra': {
        titleKey: 'categoryBanner.monsterAbra',
        bgImage: '/img/banners/Abra.png',
        showWindowsBadge: true,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.allLaptops',
                href: '/category/tum-laptoplar'
            },
            {
                labelKey: 'categoryBanner.gamingComputers',
                href: '/category/oyun-bilgisayarlari'
            },
            {
                labelKey: 'categoryBanner.monsterAbra',
                href: '/category/abra'
            }
        ]
    },

    'tulpar': {
        titleKey: 'categoryBanner.monsterTulpar',
        bgImage: '/img/banners/Tulpar.png',
        showWindowsBadge: true,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.allLaptops',
                href: '/category/tum-laptoplar'
            },
            {
                labelKey: 'categoryBanner.gamingComputers',
                href: '/category/oyun-bilgisayarlari'
            },
            {
                labelKey: 'categoryBanner.monsterTulpar',
                href: '/category/tulpar'
            }
        ]
    },

    'semruk': {
        titleKey: 'categoryBanner.monsterSemruk',
        bgImage: '/img/banners/Semruk.png',
        showWindowsBadge: true,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.allLaptops',
                href: '/category/tum-laptoplar'
            },
            {
                labelKey: 'categoryBanner.gamingComputers',
                href: '/category/oyun-bilgisayarlari'
            },
            {
                labelKey: 'categoryBanner.monsterSemruk',
                href: '/category/semruk'
            }
        ]
    },



    'masaustu-bilgisayarlar': {
        titleKey: 'categoryBanner.desktopComputers',
        bgImage: null,
        showWindowsBadge: true,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.desktopComputers',
                href: '/category/masaustu-bilgisayarlar'
            }
        ]
    },

    'tulpar-masaustu': {
        titleKey: 'categoryBanner.tulparDesktop',
        bgImage: null,
        showWindowsBadge: true,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.desktopComputers',
                href: '/category/masaustu-bilgisayarlar'
            },
            {
                labelKey: 'categoryBanner.tulparDesktop',
                href: '/category/tulpar-masaustu'
            }
        ]
    },

    'is-bilgisayarlari': {
        titleKey: 'categoryBanner.businessComputers',
        bgImage: '/img/banners/is-bilgisayarlari.png',
        showWindowsBadge: true,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.allLaptops',
                href: '/category/tum-laptoplar'
            },
            {
                labelKey: 'categoryBanner.businessComputers',
                href: '/category/is-bilgisayarlari'
            }
        ]
    },

    'huma': {
        titleKey: 'categoryBanner.monsterHuma',
        bgImage: '/img/banners/Huma.png',
        showWindowsBadge: true,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.allLaptops',
                href: '/category/tum-laptoplar'
            },
            {
                labelKey: 'categoryBanner.businessComputers',
                href: '/category/is-bilgisayarlari'
            },
            {
                labelKey: 'categoryBanner.monsterHuma',
                href: '/category/huma'
            }
        ]
    },

    'markut': {
        titleKey: 'categoryBanner.monsterMarkut',
        bgImage: '/img/banners/Markut.png',
        showWindowsBadge: true,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.allLaptops',
                href: '/category/tum-laptoplar'
            },
            {
                labelKey: 'categoryBanner.businessComputers',
                href: '/category/is-bilgisayarlari'
            },
            {
                labelKey: 'categoryBanner.monsterMarkut',
                href: '/category/markut'
            }
        ]
    },

    'ogrenci-bilgisayari': {
        titleKey: 'categoryBanner.studentComputers',
        bgImage: '/img/banners/ogrenci-bilgisayari.png',
        showWindowsBadge: true,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.studentComputers',
                href: '/category/ogrenci-bilgisayari'
            }
        ]
    },

    'aksesuarlar': {
        titleKey: 'categoryBanner.accessories',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.accessories',
                href: '/category/aksesuarlar'
            }
        ]
    },

    'oyuncu-ekipmanlari': {
        titleKey: 'categoryBanner.gamingEquipment',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.accessories',
                href: '/category/aksesuarlar'
            },
            {
                labelKey: 'categoryBanner.gamingEquipment',
                href: '/category/oyuncu-ekipmanlari'
            }
        ]
    },

    'oyuncu-monitoru': {
        titleKey: 'categoryBanner.gamingMonitor',
        bgImage: '/img/banners/oyuncu-monitoru.png',
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.accessories',
                href: '/category/aksesuarlar'
            },
            {
                labelKey: 'categoryBanner.gamingEquipment',
                href: '/category/oyuncu-ekipmanlari'
            },
            {
                labelKey: 'categoryBanner.gamingMonitor',
                href: '/category/oyuncu-monitoru'
            }
        ]
    },

    'oyuncu-mouse': {
        titleKey: 'categoryBanner.gamingMouse',
        bgImage: '/img/banners/GamingMouse.png',
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.accessories',
                href: '/category/aksesuarlar'
            },
            {
                labelKey: 'categoryBanner.gamingEquipment',
                href: '/category/oyuncu-ekipmanlari'
            },
            {
                labelKey: 'categoryBanner.gamingMouse',
                href: '/category/oyuncu-mouse'
            }
        ]
    },

    'oyuncu-klavyesi': {
        titleKey: 'categoryBanner.gamingKeyboard',
        bgImage: '/img/banners/GamingKlavye.png',
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.accessories',
                href: '/category/aksesuarlar'
            },
            {
                labelKey: 'categoryBanner.gamingEquipment',
                href: '/category/oyuncu-ekipmanlari'
            },
            {
                labelKey: 'categoryBanner.gamingKeyboard',
                href: '/category/oyuncu-klavyesi'
            }
        ]
    },

    'oyuncu-kulakligi': {
        titleKey: 'categoryBanner.gamingHeadset',
        bgImage: '/img/banners/GamingKulaklik.png',
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.accessories',
                href: '/category/aksesuarlar'
            },
            {
                labelKey: 'categoryBanner.gamingEquipment',
                href: '/category/oyuncu-ekipmanlari'
            },
            {
                labelKey: 'categoryBanner.gamingHeadset',
                href: '/category/oyuncu-kulakligi'
            }
        ]
    },

    'diger-ekipmanlar': {
        titleKey: null,
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.accessories',
                href: '/category/aksesuarlar'
            },
            {
                labelKey: 'categoryBanner.gamingEquipment',
                href: '/category/oyuncu-ekipmanlari'
            }
        ]
    },

    'bilgisayar-aksesuarlari': {
        titleKey: null,
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.accessories',
                href: '/category/aksesuarlar'
            },
            {
                labelKey: 'categoryBanner.computerAccessories',
                href: '/category/bilgisayar-aksesuarlari'
            }
        ]
    },

    'mouse': {
        titleKey: 'categoryBanner.mouse',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.accessories',
                href: '/category/aksesuarlar'
            },
            {
                labelKey: 'categoryBanner.computerAccessories',
                href: '/category/bilgisayar-aksesuarlari'
            },
            {
                labelKey: 'categoryBanner.mouse',
                href: '/category/mouse'
            }
        ]
    },

    'klavye': {
        titleKey: 'categoryBanner.keyboard',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.accessories',
                href: '/category/aksesuarlar'
            },
            {
                labelKey: 'categoryBanner.computerAccessories',
                href: '/category/bilgisayar-aksesuarlari'
            },
            {
                labelKey: 'categoryBanner.keyboard',
                href: '/category/klavye'
            }
        ]
    },

    'laptop-cantasi': {
        titleKey: 'categoryBanner.laptopBag',
        bgImage: '/img/banners/laptopcantasi.png',
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.accessories',
                href: '/category/aksesuarlar'
            },
            {
                labelKey: 'categoryBanner.computerAccessories',
                href: '/category/bilgisayar-aksesuarlari'
            },
            {
                labelKey: 'categoryBanner.laptopBag',
                href: '/category/laptop-cantasi'
            }
        ]
    },

    'diger-aksesuarlar': {
        titleKey: null,
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.accessories',
                href: '/category/aksesuarlar'
            },
            {
                labelKey: 'categoryBanner.computerAccessories',
                href: '/category/bilgisayar-aksesuarlari'
            }
        ]
    },

    'rtx-5050': {
        titleKey: 'categoryBanner.rtx5050',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'common.home',
                href: '/'
            }
        ]
    },

    'rtx-5060': {
        titleKey: 'categoryBanner.rtx5060',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'common.home',
                href: '/'
            }
        ]
    },

    'rtx-5070': {
        titleKey: 'categoryBanner.rtx5070',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'common.home',
                href: '/'
            }
        ]
    },

    'rtx-5070-ti': {
        titleKey: 'categoryBanner.rtx5070Ti',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'common.home',
                href: '/'
            }
        ]
    },

    'rtx-5080': {
        titleKey: 'categoryBanner.rtx5080',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'common.home',
                href: '/'
            }
        ]
    },

    'rtx-5090': {
        titleKey: 'categoryBanner.rtx5090',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'common.home',
                href: '/'
            }
        ]
    },

    'rtx-a5000': {
        titleKey: null,
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.allLaptops',
                href: '/category/tum-laptoplar'
            },
            {
                labelKey: 'categoryBanner.rtxA5000',
                href: '/category/rtx-a5000'
            }
        ]
    },

    'intel-iris-xe': {
        titleKey: 'categoryBanner.intelIrisXe',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'common.home',
                href: '/'
            }
        ]
    },

    'intel-core-i5': {
        titleKey: 'categoryBanner.intelI5',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'common.home',
                href: '/'
            }
        ]
    },

    'intel-core-i7': {
        titleKey: 'categoryBanner.intelI7',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'common.home',
                href: '/'
            }
        ]
    },

    'intel-core-i9': {
        titleKey: 'categoryBanner.intelI9',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'common.home',
                href: '/'
            }
        ]
    },

    'core-ultra-intel-series-1': {
        titleKey: null,
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.allLaptops',
                href: '/category/tum-laptoplar'
            },
            {
                labelKey: 'categoryBanner.coreUltraSeries1',
                href: '/category/core-ultra-intel-series-1'
            }
        ]
    },

    'core-ultra-intel-series-2': {
        titleKey: null,
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.allLaptops',
                href: '/category/tum-laptoplar'
            },
            {
                labelKey: 'categoryBanner.coreUltraSeries2',
                href: '/category/core-ultra-intel-series-2'
            }
        ]
    },

    '13-nesil-islemci': {
        titleKey: 'categoryBanner.gen13',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'common.home',
                href: '/'
            }
        ]
    },

    '12-nesil-islemci': {
        titleKey: 'categoryBanner.gen12',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'common.home',
                href: '/'
            }
        ]
    },

    '16-gb-ram': {
        titleKey: 'categoryBanner.ram16',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.allLaptops',
                href: '/category/tum-laptoplar'
            },
            {
                labelKey: 'categoryBanner.ram16',
                href: '/category/16-gb-ram'
            }
        ]
    },

    '32-gb-ram': {
        titleKey: 'categoryBanner.ram32',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.allLaptops',
                href: '/category/tum-laptoplar'
            },
            {
                labelKey: 'categoryBanner.ram32',
                href: '/category/32-gb-ram'
            }
        ]
    },


    '64-gb-ram': {
        titleKey: 'categoryBanner.ram64',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.allLaptops',
                href: '/category/tum-laptoplar'
            },
            {
                labelKey: 'categoryBanner.ram64',
                href: '/category/64-gb-ram'
            }
        ]
    },


    '14-inc': {
        titleKey: 'categoryBanner.screen14',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.allLaptops',
                href: '/category/tum-laptoplar'
            },
            {
                labelKey: 'categoryBanner.screen14',
                href: '/category/14-inc'
            }
        ]
    },

    '15-inc': {
        titleKey: 'categoryBanner.screen15',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.allLaptops',
                href: '/category/tum-laptoplar'
            },
            {
                labelKey: 'categoryBanner.screen15',
                href: '/category/15-inc'
            }
        ]
    },

    '16-inc': {
        titleKey: 'categoryBanner.screen16',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.allLaptops',
                href: '/category/tum-laptoplar'
            },
            {
                labelKey: 'categoryBanner.screen16',
                href: '/category/16-inc'
            }
        ]
    },

    '17-inc': {
        titleKey: 'categoryBanner.screen17',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.allLaptops',
                href: '/category/tum-laptoplar'
            },
            {
                labelKey: 'categoryBanner.screen17',
                href: '/category/17-inc'
            }
        ]
    },


    'windows-isletim-sistemi': {
        titleKey: 'categoryBanner.windowsLaptops',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: [
            {
                labelKey: 'categoryBanner.allLaptops',
                href: '/category/tum-laptoplar'
            },
            {
                labelKey: 'categoryBanner.windowsLaptops',
                href: '/category/windows-isletim-sistemi'
            }
        ]
    },
}

function CategoryBanner({ categorySlug }) {
    const { language } = useContext(DATA)

    const currentData = CATEGORY_BANNERS[categorySlug] || {
        title: 'Kategori',
        bgImage: null,
        showWindowsBadge: false,
        breadcrumbs: []
    }

    return (
        <>
            <div className='w-full'>
                {currentData.bgImage || currentData.titleKey ? (
                    <div
                        className='relative w-full h-45 md:h-55 bg-[#1a1a1a] flex items-center px-8 md:px-16 overflow-hidden bg-cover bg-center'
                        style={{
                            backgroundImage: currentData.bgImage
                                ? `url(${currentData.bgImage})`
                                : 'none'
                        }}
                    >
                        {currentData.bgImage && (
                            <div className='absolute inset-0 bg-black/40 z-0' />
                        )}

                        <h1 className='relative z-10 text-white text-3xl md:text-5xl font-extrabold tracking-wide drop-shadow-md'>
                            {translate(currentData.titleKey, language)}
                        </h1>

                        {currentData.showWindowsBadge && (
                            <div className='absolute right-8 md:right-16 bottom-6 z-10 hidden sm:flex items-center gap-2 bg-[#0078d4] text-white px-3 py-1.5 rounded text-xs md:text-sm font-medium shadow-lg hover:bg-[#0067b8] transition-colors cursor-pointer'>
                                <svg
                                    className='w-4 h-4 fill-current'
                                    viewBox='0 0 88 88'
                                >
                                    <path d='M0 0h42v42H0zM46 0h42v42H46zM0 46h42v42H0zM46 46h42v42H46z' />
                                </svg>

                                <span>
                                    {translate("common.windowsDevices", language)}
                                </span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className='w-full bg-black'>
                        <div className='w-full px-16 md:px-36 py-3'>
                            <div className='flex items-center gap-2 flex-wrap text-xs md:text-sm text-[#888888]'>
                                <Link
                                    to='/'
                                    className='flex items-center hover:text-white transition-colors'
                                >
                                    <svg
                                        className='w-4 h-4 fill-current'
                                        viewBox='0 0 24 24'
                                    >
                                        <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
                                    </svg>

                                    <span className='ml-1'>
                                        {translate("common.home", language)}
                                    </span>
                                </Link>

                                {currentData.breadcrumbs.map((crumb, index) => (
                                    <React.Fragment key={crumb.href}>
                                        <span>&gt;</span>

                                        <Link
                                            to={crumb.href}
                                            className={`transition-colors ${index === currentData.breadcrumbs.length - 1
                                                ? 'text-[#aaaaaa] font-medium'
                                                : 'hover:text-white'
                                                }`}
                                        >
                                            {translate(crumb.labelKey, language)}
                                        </Link>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {currentData.bgImage || currentData.titleKey ? (
                    <div className='w-full bg-[#080808] border-b border-[#222222] px-8 md:px-16 py-3 flex items-center text-xs md:text-sm text-[#888888]'>
                        <div className='flex items-center gap-2 flex-wrap'>
                            <Link
                                to='/'
                                className='flex items-center hover:text-white transition-colors'
                            >
                                <svg
                                    className='w-4 h-4 fill-current'
                                    viewBox='0 0 24 24'
                                >
                                    <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
                                </svg>

                                <span className='ml-1'>
                                    {translate("common.home", language)}
                                </span>
                            </Link>

                            {currentData.breadcrumbs.map((crumb, index) => (
                                <React.Fragment key={crumb.href}>
                                    <span>&gt;</span>

                                    <Link
                                        to={crumb.href}
                                        className={`transition-colors ${index === currentData.breadcrumbs.length - 1
                                            ? 'text-[#aaaaaa] font-medium'
                                            : 'hover:text-white'
                                            }`}
                                    >
                                        {translate(crumb.labelKey, language)}
                                    </Link>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    )
}

export default CategoryBanner