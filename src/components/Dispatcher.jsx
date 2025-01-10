import { BrowserRouter, Routes, Route  } from "react-router-dom";
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';
import PaymentPage from "../pages/PaymentPage";


const Dispatcher = () => {

    return (<BrowserRouter> 
        <Routes>
            <Route path="/" element={<LandingPage />} /> 
            <Route path="/home" element={<HomePage />} /> 
            <Route path="/pay" element={<PaymentPage />} />
        </Routes>
    
    </BrowserRouter>)

}


export default Dispatcher; 