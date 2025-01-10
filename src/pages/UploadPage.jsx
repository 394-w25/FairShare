import { useState } from 'react';

const UploadPage = () => {

    const [imagePreview, setImagePreview] = useState(null);
    const [numberOfPeople, setNumberOfPeople] = useState(0);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);  // Set image preview URL
        }
    };

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
                    <button className="py-2 px-4 rounded-md text-sm font-semibold bg-purple-200 text-purple-700 hover:bg-purple-300">
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