// import { useMediaQuery } from 'react-responsive';
// import { useState, useEffect } from 'react';

// export const Desktop = ({ children }) => {
//     const isDesktop = useMediaQuery({ minWidth: 1280 });
//     return isDesktop ? children : null;
// };
// export const Tablet = ({ children }) => {
//     const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
//     return isTablet ? children : nullll;
// };
// export const Mobile = ({ children }) => {
//     const isMobile = useMediaQuery({ maxWidth: 767 });
//     return isMobile ? children : null;
// };
// export const Default = ({ children }) => {
//     const isNotMobile = useMediaQuery({ minWidth: 768 });
//     return isNotMobile ? children : null;
// };

// import { minWidth } from '@mui/system';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

function ReactResponsiveHook() {
    const [isClient, setIsClient] = useState(false);

    // const isOnlyMobile = useMediaQuery({
    //     maxWidth: '640px'
    // });
    const isMobile = useMediaQuery({
        // minWidth: '768px'
        minWidth: '925px'
    });

    const isTablet = useMediaQuery({
        // minWidth: '768px'
        minWidth: '1280px'
    });

    const isDesktop = useMediaQuery({
        // minWidth: '1024px'
        minWidth: '1366px'
    });

    useEffect(() => {
        if (typeof window !== 'undefined') setIsClient(true);
    }, []);

    return {
        isDesktop: isClient ? isDesktop : true,
        isTablet: isClient ? isTablet : false,
        isMobile: isClient ? isMobile : false

        // isOnlyMobile: isClient ? isOnlyMobile : false
    };
}

export default ReactResponsiveHook;
