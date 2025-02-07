import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDbData, useDbUpdate } from '../utilities/firebase';
import { userContext } from '../components/Dispatcher';
import CameraComponent from '../components/CameraComponent';
import { v4 as uuidv4 } from 'uuid';

const UploadPage = () => {

    const { groupId }= useParams();
    const navigate = useNavigate();

    const [imagePreview, setImagePreview] = useState(null);
    const [numberOfPeople, setNumberOfPeople] = useState(0);
    const user = useContext(userContext);
        
    let apiUrl = "https://api.openai.com/v1/chat/completions";
    const [jsonData, setJsonData] = useState(null);
    const [base64String, setBase64String] = useState(null);
    const [photoTaken, setPhotoTaken] = useState(null);

    const [members, membersError] = useDbData(`/groups/${groupId}`);

    const [update, result] = useDbUpdate(); 

    // const [update, result] = useDbUpdate(`/requests/${requestId}`);



    console.log(members);

    if (membersError) { 
        return <div className="h-full w-full flex justify-center items-center"> 
            <h1 className="text-red-500" >Error loading data {membersError.toString()}</h1> 
        </div> ;
    }

  
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
            console.log('calling openai', base64String)

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
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
            console.log(data)
            console.log(data['choices'][0]['message']['content'])
            const stringResponse = data['choices'][0]['message']['content'];
            const match = stringResponse.match(/\{[\s\S]*\}/); // Regular expression to match content inside curly brackets
            const jsonContent = match ? JSON.parse(match[0]) : null; // Extract the match if it exists
            console.log(jsonContent)
            const parsedJson = {
                item_list: jsonContent.item_list,
                mainUser: {name: user.email},
                people: members,
                tax: jsonContent.tax,
            }
            console.log(parsedJson)

            setJsonData(parsedJson)

            //setJsonData(jsonResponse);
            //console.log('OpenAI API Response:', jsonResponse);
            return parsedJson;
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
        }
    }

    const handleSplitEvenly = async () => {
        if (!base64String) {
            console.error('No receipt image uploaded.');
            return;
        }
        try {
            // First, let’s validate that we have the receipt data
            const receiptData = await callOpenAI();
            if (!receiptData || !receiptData.item_list) {
                console.error('Failed to process receipt data.');
                return;
            }
            // Calculate the total cost with tax
            const totalCost = receiptData.item_list.reduce(
                (sum, item) => sum + (item.price * item.quantity),
                0
            ) + (receiptData.tax || 0); // Added fallback for tax
            // Calculate per-person cost, ensuring it’s a number
            const costPerPerson = totalCost / (members?.length || 1);
            // Make sure members exists and is an array
            if (!Array.isArray(members)) {
                throw new Error('Members data is not properly formatted');
            }
            // Process each member one at a time instead of using Promise.all
            for (const member of members) {
                if (member !== user.email) {
                    const requestID = uuidv4();
                    // Create a properly structured request object
                    const requestData = {
                        [`/requests/${requestID}`]: {
                            message: `${user?.displayName || 'Someone'} is requesting $${costPerPerson.toFixed(2)} from you`,
                            to: member,
                            amount: Number(costPerPerson.toFixed(2)),
                            status: 'pending',
                            from: user?.email,
                            timestamp: Date.now(),
                            groupId: groupId,
                            receiptDetails: {
                                items: receiptData.item_list,
                                tax: receiptData.tax || 0,
                                total: totalCost
                            }
                        }
                    };
                    // Log the data before sending to Firebase
                    console.log('Sending request data:', requestData);
                    // Update Firebase with the properly structured data
                    try {
                        await update(requestData);
                    } catch (updateError) {
                        console.error(`Failed to create request for ${member}:`, updateError);
                        // Continue with other members even if one fails
                    }
                }
            }
            alert('Payment requests sent successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error processing split:', error);
            alert('Failed to send payment requests. Please try again.');
        }
    };

  

    const handleSplitByItem = async () => {
        console.log('hey')
        if (!base64String) {
            return;
        }
        console.log('yo')

        const receiptData = await callOpenAI();
        navigate('/receipt', { state: { receiptData, members:members.filter(member => member != user.email), currentIndex: 0 }});

    }

    useEffect(() => {
        if (!!photoTaken) {
            console.log(photoTaken);
            setBase64String(photoTaken.slice(23));
        }   
    }, [photoTaken, setPhotoTaken]);


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
                    // <div className="mt-4 w-full h-4/5 object-cover rounded-md border border-dashed border-gray-400 flex justify-center items-center text-gray-600">
                    //     Choose file...
                    // </div>
                    <CameraComponent photo={photoTaken} setPhoto={setPhotoTaken} />
                )}
                <input
                    type="file"
                    accept="image/*"
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-200 file:text-purple-700 hover:file:bg-purple-300 flex justify-center"
                    onChange={handleFileChange}
                />
            </div>
            <div className="flex flex-col w-full gap-1">
                <div className="flex flex-row justify-center items-center gap-x-6">
                    <button
                        className="py-2 px-4 rounded-md text-sm font-semibold bg-purple-200 text-purple-700 hover:bg-purple-300"
                        onClick={() => handleSplitEvenly()}
                    >
                        Split evenly
                    </button>
                    <button className="py-2 px-4 rounded-md text-sm font-semibold bg-purple-200 text-purple-700 hover:bg-purple-300 "
                        onClick={() => handleSplitByItem()}>
                        Split by item
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UploadPage;