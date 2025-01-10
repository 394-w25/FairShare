import { createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import { useAuthState } from "../utilities/firebase";
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';
import ReceiptPage from '../pages/ReceiptPage';
import UploadReceiptPage from "../pages/UploadReceiptPage";
import PaymentPage from "../pages/PaymentPage";


export const userContext = createContext(); 

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
    const [user, loading] = useAuthState(); 

    if(loading) {
        return <p> loading user </p>
    }

    return (user ? 

    <userContext.Provider value={user}>
        <BrowserRouter> 
            <Routes>
                <Route path="/" element={<HomePage />} /> 
                <Route path="/receipt" element={<ReceiptPage {...mockUser} current_index={0}/>} /> 
                <Route path="/pay" element={<PaymentPage />} />
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