import { IoMdCloseCircle } from "react-icons/io";

const CloseButton = ( {setIsOpen } ) => {

    return (
    <div className="mb-1 cursor-pointer"
         onClick={() => setIsOpen(false)}> 
        <IoMdCloseCircle size={25} />
    </div>
    )

}

export default CloseButton; 