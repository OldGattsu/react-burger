import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../store/actions/user'

import { Route, Redirect } from 'react-router-dom'

export default function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();
  const { isLoggedIn, isUserLoaded, user } = useSelector((state) => state.user);

  // useEffect(() => {
  //     dispatch(getUser());
  // }, [isLoggedIn, user, dispatch]);

  if (!isUserLoaded) {
    return null;
  }
  console.log(isLoggedIn)
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
