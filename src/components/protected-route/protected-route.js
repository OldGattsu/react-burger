import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../store/actions/user'

import { Route, Redirect } from 'react-router-dom'

export default function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();
  const { isLoggedIn, isUserLoaded } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(getUser());
    }
  }, [isLoggedIn, dispatch]);

  if (!isLoggedIn && !isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={() =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to='/login'
          />
        )
      }
    />
  )
}
