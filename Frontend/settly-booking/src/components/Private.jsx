import React from 'react'
import { Navigate } from 'react-router-dom'
function Protected({ children }) {
  if (!localStorage.getItem('isLogin_chirag')||localStorage.getItem('isLogin_chirag')==null) {
    return <Navigate to="/signup" replace />
  }
  return children
}
export default Protected