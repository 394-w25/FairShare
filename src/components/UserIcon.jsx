
const UserIcon = ({ size, name }) => {
    const split_name = name.split(" "); 
    const initials = split_name.length > 1 ? split_name[0][0] + split_name[1][0] : split_name[0][0].toUpperCase()
    
    return (
    <div className={`flex flex-none justify-center items-center bg-purple-300 w-${size} h-${size} rounded-full self-center`}> 
        {initials} 
    </div>
    );
}

export default UserIcon; 