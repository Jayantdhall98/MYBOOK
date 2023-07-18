const { Socket } = require("socket.io");

const io= require("socket.io")(8900,{
cors:{
origin:"http://localhost:3000",
},

});

let users=[]

const adduser=(userId,socketId)=>{
    !users.some((user)=>user.userId===userId)&&
    users.push({userId,socketId})
}
const removeuser=(socketId)=>{
    users=users.filter(user=>user.socketId !==socketId)
}
const getuser=(userId)=>{
   return users.find((user)=>user.userId===userId)
}


//when connect 

io.on("connection",(Socket)=>{
    console.log("a user connected ...")
   // after every cconnection take userid and socket id from user 
Socket.on("adduser",userId=>{
adduser(userId,Socket.id);
io.emit("getusers",users);
})


//send and get messages 
Socket.on("sendmessage",({senderId,receiverId,text})=>{
const user = getuser(receiverId);
io.to(user.SocketId).emit("getMessage",{
    senderId,
    text,
})
})




//when dissconnect 

Socket.on("disconnect",()=>{

    console.log("a user disconnected.... ");
     removeuser(Socket.id);
     io.emit("getusers",users);

});
});