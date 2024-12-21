export type UserId = string;

 export interface Chat {
    id:string,
    userId:UserId,
    name:string,
    message: string,
    upvotes:UserId[]; // we have to check who have upvoted what
}




export abstract class Store{
    constructor(){

    }

    initRoom(roomId :string){

    }
    getChats(roomId:string,limit: number,offset: number){

    }
    addChat(userId:UserId,roomId:string,name:string,message:string){

    }
    upvote(userId:UserId,roomId:string, chatId:string){

    }
}