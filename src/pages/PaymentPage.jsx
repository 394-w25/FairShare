import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const [number, setNumber] = useState('')


const handleSMS = (phone_num) => {
    window.location.href = 'sms:+1' + phone_num + '?body=TEST';
};

const PaymentPage = () => {


    return (
        <div className="w-screen h-screen bg-purple-100 flex flex-col justify-center items-center gap-4">
            <span className="font-semibold text-3xl">
                FairShare
            </span>
            <button 
                className="bg-purple-500 rounded-lg px-2 py-2 font-semibold text-white text-lg" 
                onClick={() => handleSMS(phone_num)}
            >
                Request Payment
            </button>
        </div>
    )
}

export default PaymentPage; 