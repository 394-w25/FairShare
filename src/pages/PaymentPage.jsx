import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// const PaymentPage = (props, current_index) => {
const PaymentPage = () => {
    const navigate = useNavigate();

    const [number, setNumber] = useState('')
    const [isNumberValid, setIsNumberValid] = useState(true)

    const onPhoneNumberChanged = (event) => {
        event.target.value != number ? setNumber(event.target.value) : print("Number same")
    };

    const handleSMS = (phone_num) => {
        // const cost = props.cost
        // const receiver = props.person
        // const sender = ??

        const cost = 12;
        const receiver = 'John Doe';
        const sender = 'Jane Doe';

        // Validate phone number
        if(phone_num.length != 10 || isNaN(parseInt(phone_num))){
            setIsNumberValid(false)
            return
        }
        else{
            setIsNumberValid(true)

            window.location.href = 'sms:+1' + phone_num + '?body=Hi ' + receiver + '! You are being requested $' + cost + ' from ' + sender + ' from FairShare.';
    
        }
    };

    const handleNext = () => {
        // navigate('/ReceiptPage', { 
        //     person: { 
               
        //     } 
        // });
        navigate('/ReceiptPage');     
    }

    return (
        <div className="w-screen h-screen bg-purple-100 flex flex-col justify-center items-center gap-4">
            <span className="font-semibold text-3xl">
                FairShare
            </span>
            {/* <p>{props.person.name}</p>
            <p>{props.cost}</p> */}
            <input onChange={onPhoneNumberChanged}></input>
            {!isNumberValid && <p>This number is invalid</p>}
            <button 
                className="bg-purple-500 rounded-lg px-2 py-2 font-semibold text-white text-lg" 
                onClick={() => handleSMS(number)}
            >
                Request Payment
            </button>
            
            <button 
                className="bg-purple-500 rounded-lg px-2 py-2 font-semibold text-white text-lg" 
                onClick={() => handleNext(number)}
            >
                Next
            </button>

        </div>
    )
}

export default PaymentPage; 