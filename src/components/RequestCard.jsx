const RequestCard = ( {message}) => {
    console.log(message);
    return (
        <div className="border-2 border-black rounded-lg text-xl py-9 mx-4 ">
            {message}
        </div>
    )
}

export default RequestCard; 