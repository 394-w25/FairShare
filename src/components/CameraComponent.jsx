import { useRef, useState, useEffect } from 'react';


const CameraComponent = ({ photo, setPhoto }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    // const [photo, setPhoto] = useState(null);

    const startCamera = async () => {
        try {
            console.log('you')
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            console.log('e')
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        } catch (err) {
            console.error("Error accessing webcam:", err);
        }
    }

    const handleTakePhoto = () => {
        if (canvasRef.current && videoRef.current) {
            const canvas = canvasRef.current;
            const video = videoRef.current;

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const canvasContext = canvas.getContext("2d");
            if (canvasContext) {
                canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);

                const photoData = canvas.toDataURL("image/jpeg");
                setPhoto(photoData);
            }
        }
    }

    const handleRetakePhoto = () => {
        setPhoto(null);
        startCamera();
    }

    useEffect(() => {
        startCamera();
    }, [])

    return (
        <div className="mt-4 w-full h-4/5 object-cover rounded-md border border-dashed border-gray-400 flex justify-center items-center text-gray-600 relative">
            {!!photo ? (
                <img src={photo} alt="Captured image" />
            ) : (

                <video ref={videoRef} className="h-full w-full" />
            )}
            <canvas ref={canvasRef} className="h-full w-full hidden" />
            {!!photo ? (
                <button className="absolute right-3 bottom-3 border p-2 rounded" onClick={() => { handleRetakePhoto() }}>
                    Retake Photo
                </button>

            ) : (
                <button className="absolute right-3 bottom-3 border p-2 rounded" onClick={() => { handleTakePhoto() }}>
                    Take Photo
                </button>

            )}
        </div>
    )
}

export default CameraComponent;