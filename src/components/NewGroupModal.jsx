import { useState } from 'react';
import SearchBar from './SearchBar';

const NewGroupModal = ({ users, isOpen, setIsOpen}) => {
    const [search, setSearch] = useState("");


    const filterUsers = (filterBy, user) => {
        if (filterBy === "") return true

        return user.email.startsWith(filterBy);
    }

    const filteredUsers = users.filter(user => filterUsers(search, user))


    return (
        <div className={`fixed inset-0 flex justify-center items-start py-4 ${ isOpen ? 'bg-black/20' : 'invisible'}`}
            onClick={() => setIsOpen(false)}>

            <div className="flex flex-col bg-white rounded-md relative w-[85%] h-full"
                 onClick={(e) => e.stopPropagation()}>



                <SearchBar search={search} setSearch={setSearch} />




                <div className="flex justify-between ">
                    <button className="bg-red-500 hover:bg-red-600 text-white rounded-md border-2 border-red-700 p-3 m-1 font-bold shadow-md"
                            onClick={() => setIsOpen(false)}>
                        Cancel
                    </button>


                    <button className="bg-black border-2 rounded-md p-3 text-white font-bold shadow-md">
                        Create
                    </button>
                </div>
            </div>

        </div>
    ); 
}


export default NewGroupModal; 