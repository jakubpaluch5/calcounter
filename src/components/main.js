import React, { useState } from 'react';
import mainpage from './mainpage';
import Landing from './landpage';
import register from './register';
import Secret from './secret';

import PrivateRoute from './PrivateRoute';
import { AuthContext } from "./context/auth";
import {Switch, Route} from 'react-router-dom';

  
function Main(props) {
    const [authTokens, setAuthTokens] = useState();
    
    const setTokens = (data) => {
      localStorage.setItem("tokens", JSON.stringify(data));
      setAuthTokens(data);
}
return (
    
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <Switch>
            <Route exact path="/" component={mainpage} />
            <Route exact path="/landpage" component={Landing} />
            <Route exact path="/register" component={register} />
            <PrivateRoute path="/secret" component={Secret} />
        </Switch>
    </AuthContext.Provider>
);
}
export default Main;