import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { resetStatuses } from '../../store/actions/user'

import { Route, Redirect, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch()
  const location = useLocation()

  const { isLoggedIn, isUserLoaded, logoutFulfilled } = useSelector((state) => {
    return {
      isLoggedIn: state.user.isLoggedIn,
      isUserLoaded: state.user.isUserLoaded,
      logoutFulfilled: state.user.logoutFulfilled,
    }
  })

  useEffect(() => {
    if (logoutFulfilled) {
      dispatch(resetStatuses('logout'))
    }
  }, [dispatch, logoutFulfilled])

  if (!isUserLoaded) return null

  return (
    <Route
      {...rest}
      render={() =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: location,
              },
            }}
          />
        )
      }
    />
  )
}
