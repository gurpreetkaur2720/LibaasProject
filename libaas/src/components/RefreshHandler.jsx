import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const RefreshHandler = ({ setIsAuthenticated }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
            if (location.pathname === "/login" || location.pathname === "/signup") {
                navigate('/', { replace: false });
            }
        }

        return () => {

        }
    }, [location, navigate, setIsAuthenticated])


    return (
        <></>
    )
}

export default RefreshHandler