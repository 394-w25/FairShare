import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const UploadPage = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [numberOfPeople, setNumberOfPeople] = useState(0);
    // let base64String;
    
    let apiUrl = "https://api.openai.com/v1/chat/completions";
    const [jsonData, setJsonData] = useState(null);
    const [base64String, setBase64String] = useState(null);

    const navigate = useNavigate();

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);  // Set image preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                const string = reader.result.split(',')[1]; // Remove the data URL prefix
                setBase64String(string);
            };
            reader.readAsDataURL(file);
        }
    };

    async function callOpenAI() {
        try {
            console.log('calling open ai api')
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer`,
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini', // Specify the model you're using
                    messages: [
                        {
                            role: 'user',
                            content: [
                                {
                                    type: 'text',
                                    text: "This is a receipt. Please extract the items on the receipt, then a colon separating it from its quantities and unit prices. Put the extracted values and the total cost, tax amount, and final bill with tax included into a JSON format. For the items, list it in this format: item_list: [ {id: 1, name: 'salmon roll', price: 12.95, quantity: 3}, {id: 2, name:'california roll', price: 8.95, quantity: 2}, ...]",
                                },
                                {
                                    type: 'image_url',
                                    image_url: {
                                        url: `data:image/jpeg;base64,${base64String}`,
                                    },
                                },
                            ],
                        },
                    ],
                    max_tokens: 300,
                }),
            });

            const data = await response.json();
            console.log(data['choices'][0]['message']['content'])
            const jsonResponse = data['choices'][0]['message']['content'];
            //setJsonData(jsonResponse);
            //console.log('OpenAI API Response:', jsonResponse);
            return jsonResponse;
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
        }
    }

    const handleSplitEvenly = () => {
        console.log(base64String);
        if (!imagePreview || !base64String) {
            return;
        }

        const receiptData = callOpenAI();
        navigate('/receipt', { state: { receiptData }});
        // const reader = new FileReader();
        // reader.onloadend = () => {
        //     // The result will be the base64-encoded string
        //     const base64String = reader.result.split(',')[1]; // Remove the data URL prefix
        //     console.log(base64String);
        // };
        // reader.readAsDataURL(file);

        // callOpenAI()
    }


    return (
        // <div className="bg-purple-200">
        <div className="w-screen h-screen bg-white flex flex-col gap-4 p-4 justify-evenly">
            <span className="font-semibold text-lg text-center w-full">Upload receipt</span>
            <div className="w-full h-4/5 flex flex-col justify-center items-center gap-4">
                {imagePreview ? (
                    <div className="mt-4 w-full h-4/5 border border-black overflow-y-auto rounded-md">
                        <img src={imagePreview} alt="Selected" className="w-full h-auto object-cover" />
                    </div>
                ) : (
                    <div className="mt-4 w-full h-4/5 object-cover rounded-md border border-dashed border-gray-400 flex justify-center items-center text-gray-600">
                        Choose file...
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-200 file:text-purple-700 hover:file:bg-purple-300 flex justify-center"
                    onChange={handleFileChange}
                />
            </div>
            <div className="flex flex-col w-full gap-1">
                <div className="flex flex-row gap-1 text-lg justify-center items-center font-semibold">
                    <input type="number" value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)} className="w-7 bg-purple-200 h-7 text-center rounded" />
                    <span className="">FairSharers</span>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <button
                        className="py-2 px-4 rounded-md text-sm font-semibold bg-purple-200 text-purple-700 hover:bg-purple-300"
                        onClick={() => handleSplitEvenly()}
                    >
                        Split evenly
                    </button>
                    <button className="py-2 px-4 rounded-md text-sm font-semibold bg-purple-200 text-purple-700 hover:bg-purple-300">
                        Split by item
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UploadPage;