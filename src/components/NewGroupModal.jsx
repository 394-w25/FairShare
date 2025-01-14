import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDbUpdate } from '../utilities/firebase';
import { useNavigate } from 'react-router';
import SearchBar from './SearchBar';
import SearchUserCard from './UserCard/SearchUserCard';
import GroupUserCard from './UserCard/GroupUserCard';
import CloseButton from './CloseButton';


const NewGroupModal = ({ users, isOpen, setIsOpen}) => {
    const [search, setSearch] = useState("");
    const [group, setGroup] = useState([]);
    const [groupId, setGroupId] = useState(uuidv4());
    const [update, result] = useDbUpdate(`groups/${groupId}`);
    const nav = useNavigate();

    console.log(groupId)

    const filteredUsers = users.filter(user => {return user.email.startsWith(search) && search !== ""})


    const handleClick = () => {
        const groupObj = {}
        group.forEach((email, index) => {groupObj[index] = email});
        update(groupObj);
        nav(`/scan/${groupId}`);
        setIsOpen(false);
    }

    return (
        <div className={`fixed inset-0 flex justify-center items-start py-4 ${ isOpen ? 'bg-black/20' : 'invisible'}`}
            onClick={() => setIsOpen(false)}>

            <div className="flex flex-col bg-white rounded-md relative w-[85%] h-full"
                 onClick={(e) => e.stopPropagation()}>
                
                <CloseButton setIsOpen={setIsOpen}/>

                <p className="text-2xl font-bold my-1 ml-2"> Create Group</p>

                <SearchBar search={search} setSearch={setSearch} />
                
                <div className="flex flex-col gap-y-2 h-[200px] overflow-auto">
                    {filteredUsers.map(user => <SearchUserCard key={user.email} email={user.email} setGroup={setGroup}/>)}
                </div>

                <p className="text-xl my-1 ml-2"> Group Members</p>

                <div className="flex flex-col items-center gap-y-2 border-2 border-black rounded-lg h-[240px] overflow-auto mb-2 shadow-2xl py-1">
                    {group.map(email => <GroupUserCard key={email} email={email} setGroup={setGroup} />)}
                </div>
                
                <button className="bg-black border-2 rounded-md p-3 text-white font-bold shadow-md mt-auto mb-2"
                        onClick={handleClick}>
                    Create
                </button>


            </div>

        </div>
    ); 
}


export default NewGroupModal; 