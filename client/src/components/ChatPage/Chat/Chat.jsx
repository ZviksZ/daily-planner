import cn                           from "classnames";
import React, {useState, useEffect} from 'react'
import io                           from 'socket.io-client'
import styles                       from "../../PatternsPage/PatternsPage.module.scss";
import InfoBar                      from "../InfoBar/InfoBar";
import Input                        from "../Input/Input";
import Messages                     from "../Messages/Messages";
import { MdChat }                   from "react-icons/md";
import './Chat.scss'

let socket;

const Chat = ({login}) => {
   const [name, setName] = useState(login || 'defaultUser')
   const [room, setRoom] = useState('daily planner chat')
   const [users, setUsers] = useState([]);
   const [message, setMessage] = useState('')
   const [messages, setMessages] = useState([])
   const [chatMode, setChatMode] = useState(false)

   const ENDPOINT = 'http://localhost:5000/'

   useEffect(() => {

      socket = io(ENDPOINT);

      socket.emit('join', { name, room }, (error) => {
         if(error) {
            alert(error);
         }
      });

   }, [ENDPOINT, login]);

   useEffect(() => {
      socket.on('message', (message) => {
         setMessages([...messages, message ]);
      });

      socket.on('roomData', ({ users }) => {
         setUsers(users);
      })

      return () => {
         socket.emit('disconnect');

         socket.off();
      }

   }, [messages])

   const sendMessage = (e) => {
      e.preventDefault()

      if (message) {
         socket.emit('sendMessage', message, () => setMessage(''))
      }
   }

   return (
      <div className="outerContainer">
         {
            chatMode ? <div className="container">
               <InfoBar room={room} users={users} closeChat={() => setChatMode(false)}/>
               <Messages messages={messages} name={name}/>
               <Input setMessage={setMessage} sendMessage={sendMessage} message={message}/>
            </div>
               : <div className="chatBtn">
                  <MdChat onClick={() => setChatMode(true)}
                          className="editBtn"
                          size={'2.8rem'}/>
               </div>


         }
      </div>
   )
}

export default Chat
