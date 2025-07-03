import { io } from "socket.io-client"


 function CreateSocket(uN){

   
    const socket = io('https://livelinkserver.onrender.com', {
        auth: {
            userName: uN
        }
    })
}


export default CreateSocket