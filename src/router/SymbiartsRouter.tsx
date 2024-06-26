import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { MainRouter } from './MainRouter'

import { startChecking } from '../actions/auth'
import { LoginScreen } from '../components/auth/LoginScreen'

export const SymbiartsRouter = () => {
  const dispatch = useDispatch()
  const { checking, uid } = useSelector((state: any) => state.auth)

  useEffect(() => {
    dispatch(startChecking() as any)
  }, [dispatch])

  if (checking) {
    return <div>Checking...</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute uid={uid}>
              <LoginScreen />
            </PublicRoute>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoute uid={uid}>
              <MainRouter />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
