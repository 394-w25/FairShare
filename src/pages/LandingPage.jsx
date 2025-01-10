import { signInWithGoogle } from '../utilities/firebase.js'


const LandingPage = () => {
    // const [username, setUsername] = 

    return (
        <div className="">
            sign in
            <button 
                className="p-3" 
                onClick={() => signInWithGoogle()}
            >
                Sign in
            </button>

        </div>
    )
}

export default LandingPage; 