import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const routeCondition = rest.routeCondition;
  const path = rest.redirectPath;
  //React.useEffect(() => console.log(rest));
  return (
    <Route
      {...rest}
      render={props => {
        if (routeCondition) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{ pathname: path, state: { alertMsg: rest.alertMsg } }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
