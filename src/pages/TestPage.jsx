import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const TestPage = () => {
// const PaymentPage = () => {
    const { state } = useLocation();

    const navigate = useNavigate();

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

    const handleClick = () => {
        // navigate('/ReceiptPage', { 
        //     person: { 
               
        //     } 
        // });
        navigate('../receipt', {   state: {
            user: {...mockUser},
            currentIndex: 0
        }}
        );     
        console.log("Navigate back to receipt");
    }

    return (
        <div className="w-screen h-screen bg-purple-100 flex flex-col justify-center items-center gap-4">
            <button 
                className="bg-purple-400 rounded-lg px-2 py-2 font-semibold text-white text-lg" 
                onClick={() => handleClick()}
            >
                Click
            </button>

        </div>
    )
}

export default TestPage; 