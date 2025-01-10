import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const phone_num = 6314324732

const PaymentPage = () => {
    const [number, setNumber] = useState('')

    const onPhoneNumberChanged = (event) => {
        event.target.value != number ? setNumber(event.target.value) : print("Number same")
    };

    const handleSMS = (phone_num) => {
        window.location.href = 'sms:+1' + phone_num + '?body=TEST';
    };

    return (
        <div className="w-screen h-screen bg-purple-100 flex flex-col justify-center items-center gap-4">
            <span className="font-semibold text-3xl">
                FairShare
            </span>
            <input onChange={onPhoneNumberChanged}></input>
            <button 
                className="bg-purple-500 rounded-lg px-2 py-2 font-semibold text-white text-lg" 
                onClick={() => handleSMS(number)}
            >
                Request Payment
            </button>
        </div>
    )
}

export default PaymentPage; 