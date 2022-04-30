import { useEffect } from "react";
import { useLocation } from "react-router-dom";
 
function ScrollToTop({ children }) {
    const location = useLocation();

    useEffect(() => {
        console.log('scroll to top called')
        window.scrollTo(0, 0);
    }, [location]);
    
    return children;
}
 
export default ScrollToTop;