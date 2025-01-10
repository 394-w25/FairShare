
const ReceiptPage = (props) => {
    // currently using mock User input
    const items = props.item_list
    const assignUser = () => {
        console.log('Item assigned');
      };
    const sendMessage = () => {
        console.log('Message Sent');
      };

    return (
        <div className="p-4">
            <div className="text-3xl text-center font-bold mb-4">
            {props.person.name}
            </div>
            <div className="ingredient-sheet">
                <ul className="space-y-2">
                    {items.map((item) => (
                        <div key={item} className="flex bg-purple-100 rounded-lg justify-between items-center py-4 min-h-[4rem] px-6 border border-gray-300">
                            <li className="flex flex-col">
                                <span className="font-medium">{item.name}</span>
                                <span className="text-gray-600">${item.price}</span>
                            </li>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={assignUser} className="w-6 h-6"
>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

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