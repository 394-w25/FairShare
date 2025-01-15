

const SearchUserCard = ({ email, setGroup }) => { 

    const handleClick = () => {
        setGroup((prevGroup) => [... prevGroup, email])
    }

    return (
    <div className="flex items-center shadow-md cursor-pointer"
         onClick={handleClick}>
        <div className="flex flex-none justify-center items-center bg-purple-300 w-10 h-10 rounded-full self-center ml-2 mr-4"> 
            {email[0].toUpperCase()} 
        </div>

        <div className="text-xs md:text-lg font-bold"> {email} </div>
    </div> )

}


export default SearchUserCard; 