import { signInWithGoogle } from '../utilities/firebase.js'

const LandingPage = () => {

    return (
        <div className="w-screen h-screen bg-purple-100 flex flex-col justify-center items-center gap-4">
            <span className="font-semibold text-3xl">
                FairShare
            </span>
            <button 
                className="bg-purple-500 rounded-lg px-2 py-2 font-semibold text-white text-lg" 
                onClick={signInWithGoogle}
            >
                Sign in
            </button>
        </div>
    )
}

export default LandingPage; 