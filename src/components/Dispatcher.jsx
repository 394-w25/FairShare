import { createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import { useAuthState } from "../utilities/firebase";
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';
import UploadPage from '../pages/UploadPage';
import ReceiptPage from '../pages/ReceiptPage';
import RequestsPage from '../pages/RequestsPage';
import ReviewReceipt from '../pages/ReviewReceipt';
import Navbar from "../components/NavigationBar";

import ProfilePage from '../pages/ProfilePage';



export const userContext = createContext(); 

const Dispatcher = () => {
    const [user, loading] = useAuthState(); 

    if (loading) {
        return <p>Loading user...</p>;
    }

    return user ? (
        <userContext.Provider value={user}>
            {/* Navbar for authenticated users */}
            <Navbar />  
            <Routes>
                <Route path="/" element={<HomePage />} /> 
                <Route path="/receipt" element={<ReceiptPage />} /> 
                <Route path="/reviewreceipt" element={<ReviewReceipt />} /> 
                <Route path="/upload/:groupId" element={<UploadPage />} /> 
                <Route path="/requests" element={<RequestsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </userContext.Provider>
    ) : (
        <Routes>
            <Route path="/" element={<LandingPage />} /> 
            <Route path="*" element={<Navigate to="/" />} /> 
        </Routes>
    );

}


export default Dispatcher; 