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

    
    const requests = Object.entries(data)
                            .filter(([id, request]) => request.to === user.email);

    console.log(requests);
    const requestComponents = requests.map(([id, request]) => <RequestCard key={id} 
                                                                            requestId = {id}
                                                                            message={request.message}
                                                                            from={request.from}/>)

    return (
        <div className="flex flex-col gap-y-2">
            <h1 className="font-bold text-center text-3xl my-2 "> Incoming Requests </h1>
            {requestComponents}
        </div>
    )
}

export default Requestspage; 