import { Navigate } from "react-router-dom"

const ProtectedRoute = ({isAuthenticated, children}) =>{
    if(!isAuthenticated){
        return <Navigate to="/home" replace />
    }
    return children
}

export default ProtectedRoute