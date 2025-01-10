import { signOut } from '../utilities/firebase';

const HomePage = () => {

    return (
    <button onClick={signOut}> 
        Sign Out
    </button>); 

}

export default HomePage; 