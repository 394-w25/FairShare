import { useContext, useState } from 'react'; 
import { userContext } from '../components/Dispatcher';
import { useDbData, useDbUpdate, signOut } from "../utilities/firebase"
import Header from '../components/Header';
import NewGroupModal from '../components/NewGroupModal';


const HomePage = () => {
    const user = useContext(userContext);
    const [isOpen, setIsOpen] = useState(false); 
    const [data, dataError] = useDbData(`/users/${user.uid}`);
    const [update, result] = useDbUpdate(`/users/${user.uid}`);
    const [users, usersError ] = useDbData('/users');

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


    if ( data === undefined || users === undefined) {
        return <div className="flex justify-center items-center"> 
            <h1>Loading data...</h1> 
        </div> ;
    } 

    if (!data) {
        update({
            groups: false 
        })
    }

    const listOfUsers = Object.values(users);
    console.log(listOfUsers); 


    return (
    <div className="min-h-screen flex flex-col items-center gap-y-4">
        <Header />
        

        <button className="w-56 p-2 border-2 border-black bg-black text-white" 
                onClick={() => setIsOpen(true)}> 
            Create New Group 
        </button>

        <NewGroupModal users={listOfUsers} isOpen={isOpen} setIsOpen={setIsOpen}/> 

        
    </div>); 

}

export default HomePage; 