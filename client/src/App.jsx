import React                     from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import Loader                    from "./components/TodosPage/TodosPage.jsx";
import {useAuth}                 from "./hooks/auth.hook.js";
import {useRoutes}               from "./routes"
import {AuthContext}             from "./context/AuthContext";

function App() {
   const {token, login, logout, userId, ready} = useAuth()
   const isAuthenticated = !!token
   const routes = useRoutes(isAuthenticated)

   if (!ready) {
      return <Loader/>
   }

   return (      
      <AuthContext.Provider value={{
         token, login, logout, userId, isAuthenticated
      }}>
         <Router>            
            {routes}
         </Router>
      </AuthContext.Provider>

   );
}

export default App;
