import UserIcon from './UserIcon';
import { IoMdCheckmark } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { useDbRemove } from '../utilities/firebase';

const RequestCard = ( {requestId, message, from}) => {

    const [remove, result] = useDbRemove(`requests/${requestId}`);

    const handleClick = () => { 
        remove();
    }
   
    return (
        <div className="flex-col border-y-2 border-gray-300 mx-2 py-4 px-2">
            
            <div className="flex items-center gap-x-2">
                <UserIcon name={from} size={10}/> 
                <p> {from} </p>
            </div>
            
           <p className="font-bold font-lg:1"> Message </p>
            <p className="ml-2">  {message }</p>

            <div className="flex gap-x-2 mt-2">
                <button className="border-2 rounded-md p-2 "
                        onClick={handleClick}> 
                    <IoMdCheckmark color="green" /> 
                </button>

                <button className="border-2 rounded-md p-2 "
                        onClick={handleClick}> 
                    <IoCloseSharp  color="red"/> 
                </button>
            </div>
        </div>
    )
}

export default RequestCard; 