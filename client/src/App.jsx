import React, {useEffect}        from 'react';
import {connect, Provider}       from "react-redux";
import {BrowserRouter as Router} from 'react-router-dom'
import Loader                    from "./components/common/Loader/Loader.jsx";
import {localStorageUser}        from "./redux/authReducer.js";
import store                     from "./redux/store.js";
import {useRoutes}               from "./routes"

const App = ({token, localStorageUser}) => {
   const isAuthenticated = !!token
   const routes = useRoutes(isAuthenticated)
   
   useEffect(() => {
      localStorageUser()
   }, [])
   /*if (!ready) {
      return <Loader/>
   }*/

   return (
      <>
         {routes}
      </>
   )
}

let mapStateToProps = (state) => {
   return {
      token: state.authPage.token,
      userId: state.authPage.userId
   }
}

const AppContainer = connect(mapStateToProps, {localStorageUser})(App)

const RootComponent = () => {
   return (
      <Router>
         <Provider store={store}>
            <AppContainer/>
         </Provider>
      </Router>
   )
}


export default RootComponent;