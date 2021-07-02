import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { firebase } from '../firebase/firebase-config';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';
import { Loading } from '../components/Loading';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return (
      <Loading />
    );
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path='/auth'
            isAuthenticated={isLoggedIn}
            component={AuthRouter}
          />
          <PrivateRoute
            exact path='/'
            isAuthenticated={isLoggedIn}
            component={JournalScreen}
          />
          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  )
}
