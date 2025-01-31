import useAuth from "@/hooks/useAuth"
import { Navigate } from "react-router-dom"

type ValidateRoleProps = {
    children: React.ReactNode
    roles: number[]
}

export default function ValidateRole({ children, roles }: ValidateRoleProps) {
    const {userAuth} = useAuth()
    const hasRole = roles ? roles.includes(userAuth.roleId) : false
    if(!hasRole){
        <Navigate to={'/401'} />
        return
    }

    return children
}