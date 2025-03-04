import { useRef, useEffect } from 'react';

const CameraComponent = ({ photo, setPhoto }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const checkDevices = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter((device) => device.kind === "videoinput");
        console.log("Available video devices:", videoInputs);
        const hasRearCamera = videoInputs.some((device) =>
            device.label.toLowerCase().includes("back") || 
            device.label.toLowerCase().includes("rear") || 
            device.label.toLowerCase().includes("environment") || 
            device.label.toLowerCase().includes("phone")
        );
        
        return hasRearCamera;
    }

    const startCamera = async () => {
        try {
            // First get basic camera access to populate device labels
            const initialStream = await navigator.mediaDevices.getUserMedia({ 
                video: true 
            });

            // Stop initial stream
            initialStream.getTracks().forEach(track => track.stop());

            // Now check devices with populated labels
            const hasRearCamera = await checkDevices();
            console.log("Has rear camera:", hasRearCamera);

            // Start stream with correct camera
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: {
                    facingMode: hasRearCamera ? "environment" : "user",
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                }
            });

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

                // Stop the camera stream after taking photo
                const stream = video.srcObject;
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
            }
        }
    }

    const handleRetakePhoto = () => {
        setPhoto(null);
        startCamera();
    }

    useEffect(() => {
        startCamera();
        
        // Cleanup function to stop camera when component unmounts
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="mt-4 w-full h-4/5 object-cover rounded-md border border-dashed border-gray-400 flex justify-center items-center text-gray-600 relative">
            {!!photo ? (
                <img src={photo} alt="Captured image" className="h-full w-full object-contain" />
            ) : (
                <video ref={videoRef} className="h-full w-full object-contain" />
            )}
            <canvas ref={canvasRef} className="h-full w-full hidden" />
            {!!photo ? (
                <button className="absolute right-3 bottom-3 border p-2 rounded" onClick={handleRetakePhoto}>
                    Retake Photo
                </button>
            ) : (
                <button className="absolute right-3 bottom-3 border p-2 rounded" onClick={handleTakePhoto}>
                    Take Photo
                </button>
            )}
        </div>
    )
}

export default CameraComponent;;