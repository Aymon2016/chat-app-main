const express = require('express');
const cors = require('cors');
const socket = require("socket.io");
const dotenv = require('dotenv');
const mongoose= require('mongoose');
const authRoutes = require("./router/auth");
const messageRoutes = require("./router/messageRouter");


const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect('mongodb+srv://AYMON:<AYMON>@cluster0.gq9xpkk.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedtopology:true,
})
.then(()=> console.log('database connection successful'))
.catch(err=>console.log(err));

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV ==='production'){
  app.use(express.static('client/build'))
  app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

const PORT=8000;

const server = app.listen(PORT,()=>{
    console.log(`app listening to port ${PORT}`)
})

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });