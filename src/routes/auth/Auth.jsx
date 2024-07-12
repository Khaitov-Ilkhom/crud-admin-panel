import { Outlet } from "react-router-dom"
import "./Auth.scss";

const Auth = () => {
  return (
    <div>
       <div className="auth-container">
            <Outlet />
       </div>
    </div>
  )
}

export default Auth