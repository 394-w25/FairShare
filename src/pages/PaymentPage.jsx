import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const PaymentPage = () => {
// const PaymentPage = () => {
    const { state } = useLocation();
    console.log(state.members)

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

            window.location.href = 'sms:+1' + phone_num + '?body=Hi ' + state.members[state.currentIndex] + '! You are being requested $' + state.cost + ' by ' +  state.receiptData.mainUser.name + ' from FairShare.';
    
        }
    };

    const handleNext = () => {
        // navigate('/ReceiptPage', { 
        //     person: { 
               
        //     } 
        // });

        if (state.currentIndex == state.members.length - 1) {
            navigate('../')
        } else {

            navigate('../receipt', {   state: {
                receiptData: state.receiptData,
                members: state.members,
                currentIndex: state.currentIndex + 1
            }}
            );     
            console.log("Navigate back to receipt");
        }}

    return (
        <div className="w-screen h-screen bg-purple-100 flex flex-col justify-center items-center gap-4">
            <span className="font-semibold text-3xl">
                FairShare
            </span>
            <p>{state.members[state.currentIndex]}</p>
            <p>{state.cost}</p>
            <p>Enter phone number</p>
            <input onChange={onPhoneNumberChanged}></input>
            {!isNumberValid && <p>This number is invalid</p>}
            <button 
                className="bg-purple-500 rounded-lg px-2 py-2 font-semibold text-white text-lg" 
                onClick={() => handleSMS(number)}
            >
                Request Payment
            </button>
            
            <button 
                className="bg-purple-400 rounded-lg px-2 py-2 font-semibold text-white text-lg" 
                onClick={() => handleNext(number)}
            >
                Next
            </button>

        </div>
    )
}

export default PaymentPage; 