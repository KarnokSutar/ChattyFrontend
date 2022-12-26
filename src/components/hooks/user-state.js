import { useState } from "react";

export function useRState(){
const[value, setInput] = useState(null)
function setValue(event){
    setInput(event.target.value)
}
return{
    value, setValue
}
}
