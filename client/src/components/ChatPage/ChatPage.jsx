import React                            from 'react';
import Chat                             from "./Chat/Chat.jsx";
import {BrowserRouter as Router, Route} from 'react-router-dom'

const ChatPage = () => {
   return (
      <Router>
         <Route exact path="/chat" component={Chat} />
      </Router>
   );

}

export default ChatPage;
