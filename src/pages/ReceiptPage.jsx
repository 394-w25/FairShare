import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { userContext } from '../components/Dispatcher';
import { useDbUpdate } from '../utilities/firebase';
import { v4 as uuidv4 } from 'uuid';


const ReceiptPage = () => {
    const user = useContext(userContext);    
    const navigate = useNavigate();
    const { state } = useLocation();
    console.log(state)
    const items = state.receiptData.item_list || [];
    const taxAmount = state.receiptData.tax || 0;
    const personTax = items.length > 0 ? taxAmount / items.length : 0;
    const [totalCost, setTotalCost] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [requestId, setRequestId] = useState(uuidv4());
    const [quantities, setQuantities] = useState(Array(items.length).fill(0));
    const [update, result] = useDbUpdate(`/requests/${requestId}`);

    const incrementTotalCost = (price) => {
        setTotalCost(prevCount => prevCount + price + personTax);
    };
    const decrementTotalCost = (price) => {
        setTotalCost(prevCount => prevCount - price - personTax);
    };
    const addItem = (index) => {
        setQuantities(prev => {
            const newQuantities = [...prev];
            if (newQuantities[index] < items[index].quantity) {
                newQuantities[index] += 1;
                incrementTotalCost(items[index].price)
            }
            return newQuantities;
          });
      };
    const subtractItem = (index) => {
        setQuantities(prev => {
            const newQuantities = [...prev];
            if (newQuantities[index] > 0) {
              newQuantities[index] -= 1;
              decrementTotalCost(items[index].price)
            }
            return newQuantities;
          });
      };

    const sendMessage = () => {
        const request = {
            message: `${user.displayName} is requesting $${totalCost} from you`,
            to: state.members[currentIndex],
            from: user.displayName
        };

        update(request);
        currentIndex === state.members.length - 1 ? navigate('/') : setCurrentIndex(prevCurrentIndex => prevCurrentIndex + 1);
    }

    useEffect( () => {
        setTotalCost(0);
        setRequestId(uuidv4());
        setQuantities(Array(items.length).fill(0));
    } , [currentIndex]);


    return (
        <div className="p-4">
            <div className="text-3xl text-center font-bold mb-4">
            {state.members[currentIndex]}
            </div>
            <div className="flex flex-col">
            <span className="text-xl text-center font-medium">Total Cost</span>
            <span className="text-xl text-stone-800 text-center font-bold mt-4 mb-4">${Math.abs(totalCost).toFixed(2)}</span>
            </div>
            <div className="ingredient-sheet">
                <ul className="space-y-2">
                    {items.map((item, index) => (
                        <div key={item.id} className="flex bg-purple-100 rounded-lg items-center py-4 min-h-[4rem] px-6 border border-gray-300">
                            <li className="flex flex-col flex-1">
                                <span className="font-medium">{item.name}</span>
                                <span className="text-gray-600">${item.price}</span>
                            </li>
                            <div className="flex gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => subtractItem(index)} className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                {quantities[index]}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => addItem(index)} className="size-6"
    >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>

                        </div>
                    ))}
                </ul>
                <div className="flex justify-center mt-8">
                <button 
                    onClick={sendMessage}
                    className="bg-stone-900 rounded-lg text-white px-6 py-3 hover:bg-purple-800"
                >
                    Send {state.members[currentIndex]} a Message
                </button>

                </div>
            </div>
        </div>
     ); 

}

export default ReceiptPage; 