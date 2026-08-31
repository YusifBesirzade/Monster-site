import React, { useContext, useState } from 'react'
import { translate } from '../utils/translations'
import { DATA } from '../Context/DataContext'

function FilterItem({ filter, onFilterChange, selectedFilters }) {
    const [isOpen, setIsOpen] = useState(false)
    const { language } = useContext(DATA)

    const filterNames = {
        gpuSeries: "filterGpuSeries",
        gpu: "filterGpu",
        cpuType: "filterCpuType",
        cpuModel: "filterCpuModel",
        screenSize: "filterScreenSize",
        screenFeatures: "filterScreenFeatures",
        ram: "filterRam",
        ramConfiguration: "filterRamConfiguration",
        operatingSystem: "filterOperatingSystem",
        firstM2Ssd: "filterFirstM2Ssd",
        secondM2Ssd: "filterSecondM2Ssd",
        cpuArchitecture: "filterCpuArchitecture",
        weight: "filterWeight",
        keyboard: "filterKeyboard",
        price: "filterPrice",
        case: "filterCase",
        motherboard: "filterMotherboard",
        cpuCooler: "filterCpuCooler",
        color: "filterColor",
        powerSupply: "filterPowerSupply"
    }

    const formatOptionName = value => {
        return value
            .replaceAll("-", " ")
            .replaceAll("gb", "GB")
            .replaceAll("tb", "TB")
            .replaceAll("mhz", "MHz")
            .replace(/\b\w/g, char => char.toUpperCase())
    }

    return (
        <div className='bg-[#222223] border border-[#313132] transition-colors py-2 px-3'>
            <div onClick={() => setIsOpen(!isOpen)} className='flex items-start justify-between cursor-pointer select-none'>
                <span className='text-white text-md'>
                    {translate(filterNames[filter.key], language)}
                </span>

                {filter.children?.length > 0 && (
                    <button className='cursor-pointer'>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-8 h-8 p-1 rounded-sm 
                                            ${isOpen ? "rotate-0" : "rotate-270"
                                }`}>
                            <path
                                d="M7.175 8.59L11 12.407l3.825-3.817L16 9.765l-5 5-5-5Z"
                                fill="#00FF00"
                                transform="translate(-1 -1.432)"
                            />
                        </svg>
                    </button>
                )}
            </div>

            {isOpen && filter.children?.length > 0 && (
                <div className='mt-2 flex flex-col gap-4'>
                    {filter.children.map(option => (
                        <label key={option.id} className='flex items-center gap-2 text-[#A4A4A5] text-sm cursor-pointer'>
                            <div className='relative flex items-center justify-center select-none'>
                                <input onChange={() => onFilterChange(filter.key, option.slug)}
                                    checked={
                                        selectedFilters[filter.key]?.includes(option.slug) || false
                                    }
                                    className='peer appearance-none w-4 h-4 border border-[#A4A4A5] bg-transparent 
                               checked:bg-[#00FF00] checked:border-[#00FF00] cursor-pointer' type="checkbox" />
                                <svg
                                    className="absolute left-0.5 top-0.5 w-3 h-3 text-black opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="3.5"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <span className='text-base'>
                                {formatOptionName(option.slug)}
                            </span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    )
}

export default FilterItem