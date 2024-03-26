import { Navigate } from "react-router-dom"
import LoadingScreen from "./components/LoadingScreen/LoadingScreen"

const ProtectedRoute = ({isAuthenticated, children, reRouteTo, loading}) =>{
    
    if(loading){
        return <LoadingScreen/>
    }
    else if(!isAuthenticated && !loading){
        console.log(isAuthenticated)
        return <Navigate to={reRouteTo} replace />
    }
    return children
}

export default ProtectedRoute