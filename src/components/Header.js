import { Card } from "./Card";
import { useMatch } from "react-router-dom";

// import { useDispatch } from "react-redux";


export function Header(props){

    const loginPage = useMatch('/login')
    const registrationPage = useMatch('/')
    return(
        <Card>
        <div className="header">
            <span> Chatty</span>
         
       { !loginPage && !registrationPage && < input
          onClick={props.clickHandler} 
          className="search"
          placeholder="Search"
          type="text"
          />}
             {/* </div> */}
        </div>
        </Card>
    )
}