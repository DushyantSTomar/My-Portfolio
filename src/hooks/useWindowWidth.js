import { useState, useEffect } from 'react';

const useWindowWidth = () => {
    const [width, setWidth] = useState(0); // Default to 0 initially for SSR if needed

    useEffect(() => {
        // Set initial width on client mount
        setWidth(window.innerWidth);

        const handleResize = () => setWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        // Clean up event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return width;
};

export default useWindowWidth;
