import { useSelector } from "react-redux"
import { Friends } from "./Friends"



export function Contacts(){

    function doNothing(){
        console.log('doNothing')
    }
    const contacts = useSelector(state => state.Auth.contacts)
    const renderFriends = contacts.map((contact, index)=>{
        return <Friends key={index} friend = {contact} onClick = {doNothing}/>
    })

    return(
        <div className="contacts">
{renderFriends}
        </div>
    )
}