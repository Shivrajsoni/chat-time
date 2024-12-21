import { WebSocketServer } from "ws";
import { OutgoingMessage , SupportedMessage as OutgoingSupportedMessages} from "./messages/outgoingMessages"
import {UserManager} from "./UserManager"
import { IncomingMessage , SupportedMessage } from "./messages/incomingMessages"
import { inMemoryStore } from "./store/inMemoryStore"


const wss = new WebSocketServer({port:8080});


wss.on('connection',function(socket){

    socket.on('message',function(message){
        if(message.type ==='utf8'){
            try{
                messageHandler(socket,JSON.parse(message.utf8Data));
            } catch(e){
                console.log("Error Caught",e);
            }
        }
    })


})

function messageHandler(ws:connection,message:IncomingMessage){

    if(message.type ===SupportedMessage.JoinRoom){
        const payload = message.payload;
        userManager.addUser(payload.name,payload.userId,paylaod.roomId,ws);
    }
    if(message.type ===SupportedMessage.sendMessage){
        const payload = message.payload;
        const user = userManager.getUser(payload.roomId,payload.userId);

        if(!user){
            console.log("User Not Found in DB");
            return;
        }
        let chat = store.addchat(payload.userId,user.name,payload.roomId,payload.message);
        if(!chat){
            return;
        }
        const outgoingPayload:OutgoingMessage = {
            type : OutgoingSupportedMessage.AddChat,
            payload :{
                chatId:chat.id,
                roomId : payload.roomId,
                message: payload.message,
                name:user.name,
                upvotes:0
            }
        }
        userManager.broadcast(payload.roomId,payload.userId,outgoingPayload);


    }

    if(message.type === SupportedMessage.UpvoteMessage){
        const payload = message.payload;
        const chat = store.upvote(payload.userId,payload.roomId,payload.chatId);
        console.log("Inside Upvote ")
        if(!chat){
            return ;
        }
        console.log("Inside UpVote 2")

        const outgoingPayload:OutgoingMessage = {
            type :OutgoingSupportedMessages.UpdateChat,
            payload:{
                chatId:payload.chatId,
                roomId:payload.roomId,
                upvotes:chat.upvotes.length
            }
        }

        console.log("inside UpVote 3");
        UserManager.broadcast(payload.roomId,payload.userId,outgoingPayload);

    }
}
wss.on('disconnect',()=>{
    console.log('Client disconnected')
})

