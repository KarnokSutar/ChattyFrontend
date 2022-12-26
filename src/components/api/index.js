
export function saveUserData(user){
    return new Promise((resolve)=>{
   localStorage.setItem("chatty-user", JSON.stringify(user));
    console.log(user)
    resolve(
        JSON.parse(localStorage.getItem('chatty-user') || []),
      )
        ;})}

        export function requestUserData(){
            return new Promise((resolve)=>{
                const user = localStorage.getItem('chatty-user'||[])
                console.log(JSON.parse(user))
        resolve(JSON.parse(user));});}

        export function clearUserData(){
            console.log(" clear user")
            return new Promise(()=>{
        localStorage.removeItem("chatty-user");
                ;})}


      