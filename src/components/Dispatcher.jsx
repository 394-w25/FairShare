import { BrowserRouter, Routes, Route  } from "react-router-dom";
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';


const Dispatcher = () => {

    return (<BrowserRouter> 
        <Routes>
            <Route path="/" element={<LandingPage />} /> 
            <Route path="/home" element={<HomePage />} /> 

        </Routes>
    
    </BrowserRouter>)

}


export default Dispatcher; 