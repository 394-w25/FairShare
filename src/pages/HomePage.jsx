import { useContext } from 'react'; 
import Header from '../components/Header';
import { userContext } from '../components/Dispatcher';
import { useDbData, useDbUpdate, signOut } from "../utilities/firebase"


const HomePage = () => {
    const user = useContext(userContext);
    const [data, dataError] = useDbData(`/users/${user.uid}`);
    const [update, result] = useDbUpdate(`/users/${user.uid}`);
    const [users, usersError ] = useDbData('/users');

    if (dataError) { 
        return <div className="flex justify-center items-center"> 
            <h1 className="text-red-500" >Error loading data {dataError.toString()}</h1> 
        </div> ;
    }
    if (usersError) { 
        return <div className="flex justify-center items-center"> 
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

    console.log()




    return (
    <div classNam="flex">
        <Header />

        <button className="border-1 border-black" onClick={signOut}> Sign Out </button>



      
    </div>); 

}

export default HomePage; 