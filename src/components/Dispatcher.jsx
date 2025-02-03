import { createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import { useAuthState } from "../utilities/firebase";
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';
import UploadPage from '../pages/UploadPage';
import ReceiptPage from '../pages/ReceiptPage';


export const userContext = createContext(); 

const Dispatcher = () => {
    const [user, loading] = useAuthState(); 

    if(loading) {
        return <p> loading user </p>
    }

    return (user ? 


    <userContext.Provider value={user}>
        <BrowserRouter> 
            <Routes>
                <Route path="/" element={<HomePage />} /> 
                <Route path="/receipt" element={<ReceiptPage />} /> 
                <Route path="/upload/:groupId" element={<UploadPage />} /> 
            </Routes>
        
        </BrowserRouter>
    </userContext.Provider>

    :

    <BrowserRouter> 
        <Routes>
            <Route path="/" element={<LandingPage />} /> 
            <Route path="*" element={<Navigate to="/" />} /> 
        </Routes>
    </BrowserRouter>
    
    )

}


export default Dispatcher; 