import { Navigate } from 'react-router-dom'

export default function RequireAuth({ children }) {
  const access_token = localStorage.access_token

  if (!access_token) return <Navigate to='/login' replace />

  return children
}
