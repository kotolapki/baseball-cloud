import React, {useEffect} from 'react';
import 'assets/css/fonts.css';
import 'assets/css/normalize.css';
import 'assets/css/reset.css';
import 'assets/css/common.css';
import {Switch, Route, Redirect} from "react-router-dom";
import SignInPage from 'navigation/pages/SignInPage';
import TermsPage from 'navigation/pages/TermsPage';
import PrivacyPage from 'navigation/pages/PrivacyPage';
import RestorePasswordPage from 'navigation/pages/RestorePasswordPage';
import SignUpPage from 'navigation/pages/SignUpPage';
import ProfilePage from 'navigation/pages/ProfilePage';
import LeaderBoard from 'navigation/pages/LeaderBoard';
import {AppRoutes} from 'navigation/routes';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {actions} from 'store';
import Network from 'navigation/pages/Network';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const localAccessData = localStorage.getItem('accessData');
  const localUserData = localStorage.getItem('user');

  useEffect(() => {
    if (!localAccessData) {
      for (const route in AppRoutes.privateRoutes) {
        if (history.location.pathname === AppRoutes.privateRoutes[route as keyof typeof AppRoutes.privateRoutes]) {
          history.push(AppRoutes.publicRoutes.signIn);
        }
      }
    } 
    
    if (localAccessData && localUserData) {
      const parsedAccessData = JSON.parse(localAccessData);
      const parsedUserData = JSON.parse(localUserData);
      dispatch(actions.auth.setAccessUserData({...parsedAccessData, user: parsedUserData}));


      for (const route in AppRoutes.publicRoutes) {
        if (history.location.pathname === AppRoutes.publicRoutes[route as keyof typeof AppRoutes.publicRoutes]) {
          history.push(AppRoutes.privateRoutes.profile);
        }
      }
    }
  }, [dispatch, history, localAccessData, localUserData]);

  return (
    <Switch>
      <Route exact path='/'>
        {localAccessData ? 
        (<Redirect to={AppRoutes.privateRoutes.profile}/>)
        :
        (<Redirect to={AppRoutes.publicRoutes.signIn}/>)
        }
      </Route>
      <Route path={AppRoutes.publicRoutes.signIn} component={SignInPage}/>
      <Route path={AppRoutes.publicRoutes.signUp} component={SignUpPage}/>
      <Route path={AppRoutes.publicRoutes.restorePassword} component={RestorePasswordPage}/>
      <Route path={AppRoutes.publicRoutes.terms} component={TermsPage}/>
      <Route path={AppRoutes.publicRoutes.privacy} component={PrivacyPage}/>
      <Route path={AppRoutes.privateRoutes.profile} component={ProfilePage}/>
      <Route path={AppRoutes.privateRoutes.leaderBoard} component={LeaderBoard}/>
      <Route path={AppRoutes.privateRoutes.network} component={Network}/>
    </Switch>
  );
}

export default App;