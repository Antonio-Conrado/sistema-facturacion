import useAuth from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

type ValidateRoleProps = {
    children: React.ReactNode;
    roles: string[];
};

export default function ValidateRole({ children, roles }: ValidateRoleProps) {
    const { userAuth } = useAuth();
    const hasRole = roles ? roles.includes(userAuth.roles.name) : false;
    if (!hasRole) {
        return <Navigate to={'/401'} />;
    }

    return children;
}
