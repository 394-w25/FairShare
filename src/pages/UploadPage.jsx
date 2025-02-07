import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDbData } from '../utilities/firebase';
import { userContext } from '../components/Dispatcher';
import CameraComponent from '../components/CameraComponent';
import { useMutation } from '@tanstack/react-query';
import { callOpenAi } from "../api"

const UploadPage = () => {

    const { groupId } = useParams();
    const navigate = useNavigate();

    const [imagePreview, setImagePreview] = useState(null);
    const [numberOfPeople, setNumberOfPeople] = useState(0);
    const user = useContext(userContext);

    const [base64String, setBase64String] = useState(null);
    const [photoTaken, setPhotoTaken] = useState(null);

    const [members, membersError] = useDbData(`/groups/${groupId}`);


    console.log(members);

    const { mutate: callOpenAiMutate, isPending: callOpenAiLoading, isError: callOpenAiError, isSuccess: callOpenAiSuccess, data: receiptData } = useMutation({
        mutationFn: callOpenAi,
        onSuccess: (data) => {
            navigate('/receipt', { state: { receiptData: data, members: members.filter(member => member != user.email), currentIndex: 0 } })
        }
    });

    if (membersError) {
        return <div className="h-full w-full flex justify-center items-center">
            <h1 className="text-red-500" >Error loading data {membersError.toString()}</h1>
        </div>;
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



    const handleSplitEvenly = () => {
        if (!base64String) {
            return;
        }

        const receiptData = callOpenAI();
        navigate('/receipt', { state: { receiptData, members, currentIndex: 0 } });
        // const reader = new FileReader();
        // reader.onloadend = () => {
        //     // The result will be the base64-encoded string
        //     const base64String = reader.result.split(',')[1]; // Remove the data URL prefix
        //     console.log(base64String);
        // };
        // reader.readAsDataURL(file);

        // callOpenAI()
    }

    const handleSplitByItem = async () => {
        if (!base64String) {
            return;
        }
        console.log(base64String);
        const callOpenAiBody = {
            base64String: base64String,
            user: user,
            members: members
        }

        callOpenAiMutate(callOpenAiBody);
    }

    useEffect(() => {
        if (!!photoTaken) {
            console.log(photoTaken);
            setBase64String(photoTaken.slice(23));
        }
    }, [photoTaken, setPhotoTaken]);

    useEffect(() => {
        console.log(callOpenAiLoading)
    }, [callOpenAiLoading])


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
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-200 file:text-purple-700 hover:file:bg-purple-300 flex justify-center disabled:cursor-not-allowed"
                    onChange={handleFileChange}
                    disabled={callOpenAiLoading}
                />
            </div>
            <div className="flex flex-col w-full gap-1">
                <div className="flex flex-row justify-center items-center">
                    {/* <button
                        className="py-2 px-4 rounded-md text-sm font-semibold bg-purple-200 text-purple-700 hover:bg-purple-300"
                        onClick={() => handleSplitEvenly()}
                    >
                        Split evenly
                    </button> */}
                    <button className={`py-2 px-4 rounded-md text-sm font-semibold bg-purple-200 text-purple-700
                     hover:bg-purple-300 disabled:cursor-not-allowed`}
                        onClick={() => handleSplitByItem()}
                        disabled={callOpenAiLoading}
                    >
                        {callOpenAiLoading ? (
                            <span>
                                Loading...
                            </span>
                        ) : (
                            <span>
                                Split by item
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UploadPage;