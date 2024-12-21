import connection from 'ws';
import {OutgoingMessage} from "./messages/outgoingMessages";


interface User {
    name:string,
    id:string,
    conn: connection
}

interface Room {
    users : User[]
}

export class UserManager {
    private rooms:Map<string ,Room>;
    constructor(){
        this.rooms = new Map<string , Room>()
    }
    addUser(name:string,userId:string,roomId:string,socket:connection){
        if(!this.rooms.get(roomId)){
            this.rooms.get(roomId,{
                users:[]
            })
        }

        this.rooms.get(roomId)?.users.push({
            name, 
            id:userId,
            conn : socket
        })

        socket.on('close',(reasonCode,description) =>{
            this.removeUser(roomId,userId);
        });
    }

    removeUser(roomId:string,userId:string){
        console.log("Removed User");
        const users = this.rooms.get(roomId).users;
        if(users){
            users.filter(({id})=>id != userId )
        }

    }
    getUser(roomId:string,userId:string):User | null {
        const user = this.rooms.get(roomId)?users.find(({id} =>id ===userId));
        return user ?? null;

    }

    broadcast(roomId:string, userId:string,message:OutgoingMessage){
        const user = this.getUser(roomId,userId);
        if(!user){
            console.log("User not found");
            return ;
        }

        const room  = this.rooms.get(roomId);
        if(!room){
            console.log("Room not Found")
        }
        else{
            room.users.forEach(({conn,id}) =>{
                if(id===userId){
                    return ;
                }
                console.log("Outgoing Message" + JSON.stringfy(message))
                conn.sendUTF(JSON.stringify(message))
            })
        }

    }




}