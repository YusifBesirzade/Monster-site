const hardwareFilterMap = {
    "rtx-5050": ["gpu", "rtx-5050-8gb"],
    "rtx-5060": ["gpu", "rtx-5060-8gb"],
    "rtx-5070": ["gpu", "rtx-5070-8gb"],
    "rtx-5070-ti": ["gpu", "rtx-5070-ti-12gb"],
    "rtx-5080": ["gpu", "rtx-5080-16gb"],
    "rtx-5090": ["gpu", "rtx-5090-24gb"],
    "rtx-a5000": ["gpu", "rtx-a5000"],
    "intel-iris-xe": ["gpu", "intel-iris-xe"],

    "intel-core-i5": ["cpuType", "core-5"],
    "intel-core-i7": ["cpuType", "core-7"],
    "intel-core-i9": ["cpuType", "core-9"],

    "core-ultra-intel-series-1": ["cpuModel", "ultra9-185h"],
    "core-ultra-intel-series-2": ["cpuModel", "ultra9-285h"],
    "13-nesil-islemci": ["cpuModel", "13-nesil"],
    "12-nesil-islemci": ["cpuModel", "12-nesil"],

    "16-gb-ram": ["ram", "16gb"],
    "32-gb-ram": ["ram", "32gb"],
    "64-gb-ram": ["ram", "64gb"],

    "14-inc": ["screenSize", "14-0"],
    "15-inc": ["screenSize", "15-6"],
    "16-inc": ["screenSize", "16-0"],
    "17-inc": ["screenSize", "17-3"],

    "windows-isletim-sistemi": ["operatingSystem", "windows-11-home"],
    "freedos": ["operatingSystem", "freedos"]
}

export function getHardwareFilter(slug) {
    return hardwareFilterMap[slug]
}