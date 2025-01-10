
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReceiptPage = (props) => {
    // currently using mock User input
    const navigate = useNavigate();
    const items = props.item_list
    const [quantities, setQuantities] = useState(Array(items.length).fill(0));
    const addItem = (index) => {
        setQuantities(prev => {
            const newQuantities = [...prev];
            if (newQuantities[index] < items[index].quantity) {
                newQuantities[index] += 1;
            }
            return newQuantities;
          });
      };
    const subtractItem = (index) => {
        setQuantities(prev => {
            const newQuantities = [...prev];
            if (newQuantities[index] > 0) {
              newQuantities[index] -= 1;
            }
            return newQuantities;
          });
      };
    const sendMessage = () => {
        console.log('Message Sent');
        navigate('./PaymentPage');
      };

    return (
        <div className="p-4">
            <div className="text-3xl text-center font-bold mb-4">
            {props.person.name}
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
                    className="bg-stone-900 rounded-lg text-white px-6 py-3 rounded hover:bg-purple-800"
                >
                    Send {props.person.name} a Message
                </button>

                </div>
            </div>
        </div>
     ); 

}

export default ReceiptPage; 