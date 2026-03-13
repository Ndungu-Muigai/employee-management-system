import { TiPencil } from "react-icons/ti"


const StepEditIcon = ({ step, setStep}) =>
{
    //Styling for the edit icon
    const iconStyling = "hover:text-gray-300"
    const iconSize = 22

    return(
        <TiPencil className={iconStyling} size={iconSize} title="Edit details" onClick={()=> setStep(step)}/>
    )
}

export default StepEditIcon