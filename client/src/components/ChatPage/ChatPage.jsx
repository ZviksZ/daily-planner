import React                            from 'react';
import Chat                             from "./Chat/Chat.jsx";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Join                             from "./Join/Join.jsx";

const ChatPage = (props) => {
   return (
      <Router>
         <Route path="/joinChat" exact component={Join} />
         <Route path="/chat" component={Chat} />
      </Router>
   );
}

export default ChatPage;
