import React                     from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useAuth}                 from "./hooks/auth.hook.js";
import {useRoutes}               from "./routes"
import {AuthContext}             from "./context/AuthContext";

function App() {
   const {token, login, logout, userId, ready} = useAuth()
   const isAuthenticated = !!token
   console.log(isAuthenticated)
   const routes = useRoutes(isAuthenticated)

   if (!ready) {
      return <div>no no no</div>
   }

   return (      
      <AuthContext.Provider value={{
         token, login, logout, userId, isAuthenticated
      }}>
         <Router>
            <div className="main__wrapper-outer">
               {routes}
            </div>
         </Router>
      </AuthContext.Provider>

   );
}

export default App;
