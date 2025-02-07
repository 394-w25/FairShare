import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { userContext } from '../components/Dispatcher';


const ReviewReceipt = () => {
    //have to show items, give an edit and delete option
    const user = useContext(userContext);    
    const navigate = useNavigate();
    const { state } = useLocation();
    // console.log(state);
    const [items, setItems] = useState(state.receiptData.item_list || []);
    console.log(items)
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [changeIndex, setChangeIndex] = useState(0);
    const handleDelete = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const movetoReceipt = () => {
        const updatedReceiptData = {
            ...state.receiptData, 
            item_list: items      
        };
        navigate('/receipt', { state: { receiptData: updatedReceiptData, members: state.members, currentIndex: 0 }});
    };

    const PopupForm = ({ isPopupOpen, onClose, index }) => {
        // Create local state for the form
        const [formData, setFormData] = useState({
            name: items[index]?.name || '',
            price: items[index]?.price || ''
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            // Update the items array only on submit
            const newItems = [...items];
            newItems[index] = {
                ...newItems[index],
                name: formData.name,
                price: formData.price
            };
            setItems(newItems);
            onClose();
        };
        
        if (!isPopupOpen) return null;
        
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">
                            Name:
                            <input 
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">
                            Price:
                            <input 
                                type="text"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </label>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-stone-900 rounded-lg text-white px-6 py-3 hover:bg-purple-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-stone-900 rounded-lg text-white px-6 py-3 hover:bg-purple-800"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
              </div>
            </div>
        );
    };


    return(
        <div className="p-4">
             <ul className="space-y-2">
                    {items.map((item, index) => (
                        <div key={item.id} className="flex bg-purple-100 rounded-lg items-center py-4 min-h-[4rem] px-6 border border-gray-300">
                            <li className="flex flex-col flex-1">
                                <span className="font-medium">{item.name}</span>
                                <span className="text-gray-600">${item.price}</span>
                            </li>
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => {
                                        setChangeIndex(index);
                                        setPopupOpen(true);
                                    }}
                                    className="bg-stone-900 rounded-lg text-white px-6 py-3 hover:bg-purple-800"
                                >
                                    Edit Item
                                </button>
                                <button 
                                    onClick={() => handleDelete(index)}
                                    className="bg-stone-900 rounded-lg text-white px-6 py-3 hover:bg-purple-800"
                                >
                                    Delete Item
                                </button>
                            </div>
                        </div>
                    ))}
                    <PopupForm 
                        isPopupOpen={isPopupOpen}
                        onClose={() => setPopupOpen(false)}
                        index={changeIndex}
                    />
                </ul>
            <button 
                // onClick={sendMessage}
                className="bg-stone-900 rounded-lg text-white px-6 py-3 hover:bg-purple-800"
            >
                Add Missing Item
            </button>

            <button 
                onClick={() => movetoReceipt()}
                className="bg-stone-900 rounded-lg text-white px-6 py-3 hover:bg-purple-800"
            >
                Assign Items to Participants
            </button>
        </div>
    
    );
}
export default ReviewReceipt;