import React, {useEffect} from 'react';
import {connect}          from "react-redux";
import Loader             from "./components/common/Loader/Loader";
import {localStorageUser} from "./redux/authReducer";
import {useRoutes}        from "./routes"

const App = ({token, localStorageUser, ready}: any) => {
   const isAuthenticated = !!token
   const routes = useRoutes(isAuthenticated)

   useEffect(() => {
      localStorageUser()
   }, [localStorageUser])

   if (!ready) {
      return <Loader/>
   }

   return (
      <>
         {routes}
      </>
   )
}

let mapStateToProps = (state: any) => {
   return {
      token: state.authPage.token,
      userId: state.authPage.userId,
      ready: state.authPage.ready
   }
}

export default connect(mapStateToProps, {localStorageUser})(App)
