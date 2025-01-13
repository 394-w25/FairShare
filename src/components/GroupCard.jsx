import UserIcon from './UserIcon';

const GroupCard = ( {index, curUser, usersInGroup} ) => {

    const displayedUsers = Object.values(usersInGroup)
                                .filter(user => user != curUser)
                                .slice(0, 3);


    return (
    <div className="flex flex-col gap-y-2 border-2 border-black mx-2 rounded-md p-2">
        
        <h2 className="font-lg font-bold text-purple-400"> Group {index} </h2>

        <div className="flex flex-shrink-0">
            {displayedUsers.map(user => <UserIcon  key={user} email={user} size={10}/>)}
        </div>

    </div>)

}

export default GroupCard; 