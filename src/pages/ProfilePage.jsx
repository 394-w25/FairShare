import { useDbData, useDbUpdate, signOut } from "../utilities/firebase"
import { useNavigate, Link } from 'react-router-dom';
import { useContext, useState } from "react";
import { userContext } from "../components/Dispatcher";
import UserIcon from "../components/UserIcon";
import RequestCard from "../components/RequestCard";
import GroupCard from "../components/GroupCard";

const ProfilePage = () => {
    const nav = useNavigate(); 
    const user = useContext(userContext);
    const [selectedTab, setSelectedTab] = useState('Requests')
    const [users, usersError] = useDbData(`/user`)
    const [groups, groupsError] = useDbData(`/groups`)
    const [requests, requestsError] = useDbData('/requests')
    const [data, dataError] = useDbData(`/users/${user.uid}`);
    const [update, result] = useDbUpdate(`/users/${user.uid}`);

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
    if (requestsError) {
        return <div className="h-full w-full flex justify-center items-center">
            <h1 className="text-red-500" >Error loading data {requestsError.toString()}</h1>
        </div>
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
    const groupsUserIsIn = Object.entries(groups)
                                .filter(([groupId, group]) => {
                                    const listOfUsers = Object.values(group);
                                    return listOfUsers.includes(user.email);
                                })
    
    //List of all of the requests the signed-in user has
    const requestsUserIsIn = Object.entries(requests)
                                .filter(([requestId, request]) => {
                                    const listOfUsers = Object.values(request);
                                    return listOfUsers.includes(user.email);
                                })

    const handleClick = (buttonType) => {
        console.log(buttonType)
        setSelectedTab(buttonType)
    }
                       
    return(
        <div className="min-h-screen flex flex-col items-center gap-y-2 overflow-auto">
            <div className="flex flex-row items-center">
                <UserIcon size={10} email={user.email}/>
                <div className="flex flex-col">
                    <h>{user.displayName}</h>
                    <h>{user.email}</h>
                </div>
                
            </div>
            
            <button
                className="bg-red-500 rounded-lg px-2 py-2 font-semibold text-white text-lg"
                onClick={signOut}
            >
                Sign out
            </button>
            <div className="flex flex-row">
                <button
                    className="bg-purple-500 rounded-lg px-2 py-2 font-semibold text-white text-lg"
                    onClick={() => handleClick("Requests")}
                >
                    Requests
                </button>
                <button
                    className="bg-purple-500 rounded-lg px-2 py-2 font-semibold text-white text-lg"
                    onClick={() => handleClick("Groups")}
                >
                    Groups
                </button>
            </div>
            {selectedTab === "Requests" ?
                <div className="flex flex-col border-2 border-gray-300 rounded-lg pt-2 gap-y-2 overflow-auto h-[525px] w-11/12">
                    {requestsUserIsIn.map(([requestId, request], index) => <RequestCard  key={index} message={request.message}/>)}
                </div>
                :
                <div className="flex flex-col border-2 border-gray-300 rounded-lg pt-2 gap-y-2 overflow-auto h-[525px] w-11/12">
                    {groupsUserIsIn.map(([groupId, group], index) => <Link to={`/upload/${groupId}`} key={index}> <GroupCard index={index} usersInGroup={group} /> </Link>)}
                </div>
            }
        </div>
    );
}

export default ProfilePage;