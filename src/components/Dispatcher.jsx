import { createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import { useAuthState } from "../utilities/firebase";
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';


export const userContext = createContext(); 

const Dispatcher = () => {
    const [user, loading] = useAuthState(); 

    if(loading) {
        return <p> loading user </p>
    }

    return (user ? 

    <BrowserRouter> 
        <Routes>
            <Route path="/" element={<LadningPage/>}/>
            <Route path="*" element={ <Navigate to="/"/> } /> 
        </Routes>
    </BrowserRouter>
    
    : 
    <userContext.Provider value={user}>
        <BrowserRouter> 
            <Routes>
                <Route path="/" element={<HomePage />} /> 
            </Routes>
        
        </BrowserRouter>
    </userContext.Provider>
    )

}


export default Dispatcher; 