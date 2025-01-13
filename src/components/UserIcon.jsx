

const UserIcon = ({ size, email }) => {
    return (
    <div className={`flex flex-none justify-center items-center bg-purple-300 w-${size} h-${size} rounded-full self-center`}> 
        {email[0].toUpperCase()} 
    </div>
    );
}

export default UserIcon; 