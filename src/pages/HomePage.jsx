import { useContext, useState } from 'react'; 
import { userContext } from '../components/Dispatcher';
import { useDbData, useDbUpdate, signOut } from "../utilities/firebase"
import Header from '../components/Header';
import NewGroupModal from '../components/NewGroupModal';
import GroupCard from '../components/GroupCard';


const HomePage = () => {
    const user = useContext(userContext);
    const [isOpen, setIsOpen] = useState(false); 
    const [data, dataError] = useDbData(`/users/${user.uid}`);
    const [update, result] = useDbUpdate(`/users/${user.uid}`);
    const [users, usersError ] = useDbData('/users');
    const [groups, groupsError] = useDbData(`/groups`);


    if (dataError) { 
        return <div className="h-full w-full flex justify-center items-center"> 
            <h1 className="text-red-500" >Error loading data {dataError.toString()}</h1> 
        </div> ;
    }
    if (usersError) { 
        return <div className="h-full w-full flex justify-center items-center"> 
            <h1 className="text-red-500" >Error loading data {usersError.toString()}</h1> 
        </div> ;
    }
    if (groupsError) { 
        return <div className="h-full w-full flex justify-center items-center"> 
            <h1 className="text-red-500" >Error loading data {groupsError.toString()}</h1> 
        </div> ;
    }


    if ( data === undefined || users === undefined || groups === undefined) {
        return <div className="flex justify-center items-center"> 
            <h1>Loading data...</h1> 
        </div> ;
    } 

    if (!data) {
        update({
            email: user.email 
        })
    }


    //List of all groups the signed-in user is in 
    const groupsUserIsIn = Object.values(groups)
                                .filter((group) => {
                                    const listOfUsers = Object.values(group);
                                    return listOfUsers.includes(user.email);
                                })

    //List of all users of the application
    const listOfUsers = Object.values(users);
    

    return (
    <div className="min-h-screen flex flex-col items-center gap-y-2 overflow-auto">
        <Header />
        
        <h2 className="text-lg self-start ml-2">Groups</h2>

        <div className="flex flex-col gap-y-2 overflow-auto h-[525px] w-10/12">
            {groupsUserIsIn.map((group, index) => <GroupCard key={index} index={index} usersInGroup={group} />)}
        </div>

        <button className="w-56 p-2 border-2 border-black bg-black text-white mt-auto mb-2" 
                onClick={() => setIsOpen(true)}> 
            Create New Group 
        </button>

        {isOpen && <NewGroupModal users={listOfUsers} isOpen={isOpen} setIsOpen={setIsOpen}/> }

        
    </div>); 

}

export default HomePage; 