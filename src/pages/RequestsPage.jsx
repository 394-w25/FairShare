import { useContext } from "react";
import { userContext } from "../components/Dispatcher";
import { useDbData } from "../utilities/firebase";
import RequestCard from "../components/RequestCard"; 

const Requestspage = () => {
    const user = useContext(userContext);
    const [data, error] = useDbData(`/requests`); 
    
    if (error) { 
        return <div className="h-full w-full flex justify-center items-center"> 
            <h1 className="text-red-500" >Error loading requests {error.toString()}</h1> 
        </div> ;
    }

    if (data === undefined) {
        return <div className="flex justify-center items-center"> 
        <h1>Loading data...</h1> 
    </div> ;
    }

    const requests = Object.values(data)
                            .filter(request => request.to === user.email);

    const requestComponents = requests.map((request, index) => <RequestCard key={index} message={request.message}/>)

    return (
        <div className="flex flex-col gap-y-2">
            {requestComponents}
        </div>
    )
}

export default Requestspage; 