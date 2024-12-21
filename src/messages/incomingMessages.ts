 import z from "zod";
 export enum SupportedMessage {
     JoinRoom = 'JOIN_ROOM',
     SendMessage = 'SEND_MESSAGE',
     UpvoteMessage = 'UPVOTE_MESSAGE'
 }

 export type IncomingMessage = {
     type :SupportedMessage.JoinRoom,
     payload : InitMessageType
 } | {
     type : SupportedMessage.SendMessage,
     payload : UserMessageType
 } | {
     type : SupportedMessage.UpvoteMessage,
     payload : UpvoteMessageType
 };

 export const InitMessage = z.object({
     name : z.string(),
     userId : z.string(),
     roomId :z.string(),
 })

 export type InitMessageType = z.infer<Typeof InitMessage>;

 export const userMessage = z.object({
     userId :z.string() ,
     roomId:z.string() ,
     message:z.string(),
 })

 export type UserMessageType = z.infer<Typeof UserMessage>;


export const UpVoteMessage = z.object({
     userId :z.string() ,
     roomId:z.string() ,
     chatId:z.string(),
 })
 export type UpvoteMessageType = z.infer<Typeof UpvoteMessage>;


