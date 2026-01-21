import { useState } from 'react';

interface DeviceInfo {
    isMac: boolean;
    isWindows: boolean;
    isMobile: boolean;
}

const getDeviceInfo = (): DeviceInfo => {
    if (typeof window === 'undefined') {
        return {
            isMac: false,
            isWindows: false,
            isMobile: false,
        };
    }

    const nav = navigator as Navigator & {
        userAgentData?: {
            platform?: string;
            mobile?: boolean;
        };
    };

    const platform =
        nav.userAgentData?.platform ??
        navigator.platform ??
        '';

    const userAgent = navigator.userAgent ?? '';

    const isMobile =
        nav.userAgentData?.mobile ??
        /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(userAgent);

    return {
        isMac: platform.toLowerCase().includes('mac'),
        isWindows: platform.toLowerCase().includes('win'),
        isMobile,
    };
};

const useDeviceInfo = (): DeviceInfo => {
    const [device] = useState<DeviceInfo>(getDeviceInfo);
    return device;
};

export default useDeviceInfo;