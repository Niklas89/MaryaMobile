import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true; 
        // useEffect fix: stop useEffect from running twice because of the React v18 update - https://github.com/gitdagray/useeffect_fix
            
        // we want to run this only when authState is empty (after refresh the page and the state has been emptied)
        // so we can send the cookie to the refreshToken endpoint
        const verifyRefreshToken = async () => {
            try {
                 await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                // prevent us from getting into an endless loading loop
                isMounted && setIsLoading(false);
            }
        }

        // Avoids unwanted call to verifyRefreshToken
        // if we don't have a refresh token we call this function verifyRefreshToken()
        // otherwise we setIsLoading to false
        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
        return () =>  { 
            isMounted = false;
         }
        
    }, [])

    
    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading]) // run useEffect everytime isLoading state changes
    
    // <Outlet /> represents all childs components or routes inside our PersistLogin route and
    return (
        <> 
            {!persist // if persist is false (user trust device is unchecked on login page) just go straight to those child components (components and routes) */
                ? <Outlet />
                : isLoading // otherwise check if isLoading is true 
                    ? <p>Loading...</p>
                    : <Outlet />
            }
            
        </>
    )
}

export default PersistLogin