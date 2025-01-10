import { BrowserRouter, Routes, Route  } from "react-router-dom";
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';
import ReceiptPage from '../pages/ReceiptPage';


const Dispatcher = () => {
    const mockUser = {
        item_list: [
            {name: 'salmon roll', price: 12.95},
            {name:'california roll', price: 8.95},
            {name:'rice', price: 2.00},
            {name: 'tuna roll', price: 12.50}
        ],
        person : {name: 'Amy'}
    };

    return (<BrowserRouter> 
        <Routes>
            <Route path="/" element={<LandingPage />} /> 
            <Route path="/home" element={<HomePage />} /> 
            <Route path="/receipt" element={<ReceiptPage {...mockUser}/>} /> 

        </Routes>
    
    </BrowserRouter>)

}


export default Dispatcher; 