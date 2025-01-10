import { createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import { useAuthState } from "../utilities/firebase";
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';
import PaymentPage from "../pages/PaymentPage";


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
            </Routes>
        
        </BrowserRouter>
    </userContext.Provider>

    :

    <BrowserRouter> 
        <Routes>
<<<<<<< HEAD
            <Route path="/" element={<LandingPage/>}/>
            <Route path="*" element={ <Navigate to="/"/> } /> 
=======
            <Route path="/" element={<LandingPage />} /> 
            <Route path="/home" element={<HomePage />} /> 
            <Route path="/pay" element={<PaymentPage />} />
>>>>>>> payment-request-page
        </Routes>
    </BrowserRouter>
    
    )

}


export default Dispatcher; 