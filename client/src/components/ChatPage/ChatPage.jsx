import React                            from 'react';
import {connect}                        from "react-redux";
import Chat                             from "./Chat/Chat.jsx";
import {BrowserRouter as Router, Route} from 'react-router-dom'

const ChatPage = ({email}) => {
   return (
       <Chat login={email}/>
   );

}
let mapStateToProps = (state) => {
   return {
      email: state.authPage.email
   }
}

export default connect(mapStateToProps, {})(ChatPage)
