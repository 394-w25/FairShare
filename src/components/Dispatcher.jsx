import { BrowserRouter, Routes, Route  } from "react-router-dom";
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';
import ReceiptPage from '../pages/ReceiptPage';
import UploadReceiptPage from "../pages/UploadReceiptPage";


const Dispatcher = () => {
    const mockUser = {
        item_list: [
            {id: 1, name: 'salmon roll', price: 12.95, quantity: 3},
            {id: 2, name:'california roll', price: 8.95, quantity: 2},
            {id: 3, name:'rice', price: 2.00, quantity: 1},
            {id: 4, name: 'tuna roll', price: 12.50, quantity: 4}
        ],
        mainUser: {name:'Jerry'},
        people : ['Amy', 'Johnny', 'Katie']
    };

    return (<BrowserRouter> 
        <Routes>
            <Route path="/" element={<LandingPage />} /> 
            <Route path="/home" element={<HomePage />} /> 
            <Route path="/receipt" element={<ReceiptPage {...mockUser} current_index={0}/>} /> 
        </Routes>
    
    </BrowserRouter>)

}


export default Dispatcher; 