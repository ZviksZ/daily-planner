import React, {useEffect}        from 'react';
import {connect}       from "react-redux";
import Loader                    from "./components/common/Loader/Loader.jsx";
import {localStorageUser}        from "./redux/authReducer.js";
import {useRoutes}               from "./routes"

const App = ({token, localStorageUser,ready}) => {
   const isAuthenticated = !!token
   const routes = useRoutes(isAuthenticated)
   
   useEffect(() => {
      localStorageUser()
   }, [])
   
   if (!ready) {
      return <Loader/>
   }

   return (
      <>
         {routes}
      </>
   )
}

let mapStateToProps = (state) => {
   return {
      token: state.authPage.token,
      userId: state.authPage.userId,
      ready: state.authPage.ready
   }
}

export default connect(mapStateToProps, {localStorageUser})(App)