import { FaTrash } from "react-icons/fa";

const GroupUserCard = ( {email, setGroup} ) => {

    const handleClick = () => {
        setGroup((prevGroup) => prevGroup.filter(user => user !== email));
    }


    return (
        <div className="flex justify-between items-center w-full cursor-pointer gap-x-2 border-2 border-purple-400 rounded-lg py-1 px-2">
            
            <div className="flex flex-none justify-center items-center bg-purple-300 w-10 h-10 rounded-full self-center"> 
                {email[0].toUpperCase()} 
            </div>

            <div className="text-[10px] md:text-lg font-bold"> {email} </div>

            <div className=""
                onClick={handleClick}>
                <FaTrash size={15}/>
            </div>

        </div> );
}

export default GroupUserCard; 