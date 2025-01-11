
const SearchBar = ( {search, setSearch}) => {

    const handleChange = (e) => {
        const value = e.target.value; 
        setSearch(value);
    }

    return ( 
        <input type="text" 
                placeholder="Add people to the group"
                className="rounded-md bg-gray-200  p-2 mb-2 mx-2 outline-none"
                value={search}
                onChange={(e) => handleChange(e)}/>
    );


}

export default SearchBar; 