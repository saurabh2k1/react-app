// import React, { Component, ReactElement, ReactNode } from "react"
// import { useAuth } from "../../auth/AuthContext"
// import { Navigate, Route, RouteProps } from "react-router-dom";

// interface ProtectedRouteProps extends RouteProps {
//     component: React.ComponentType<any>;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({component: Component, ...rest}) => {
//     const {isLoggedIn} = useAuth();

//     console.log(isLoggedIn);
//     return (
//         <Route {...rest}
//             render={props => isLoggedIn ? (<Component {...props} />):(<Navigate to="/login" />)} />
//     );
// }

// export default ProtectedRoute;

export {};