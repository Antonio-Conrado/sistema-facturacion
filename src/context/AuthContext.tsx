import { createContext, ReactNode, useEffect, useState } from 'react';
import { userAuthType } from '../types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserAuth } from '@/api/auth/auth';
import { useNavigate } from 'react-router-dom';
import { initialAuthState } from '../data/index';

type AuthContextType = {
    userAuth: userAuthType;
    setAuth: React.Dispatch<React.SetStateAction<userAuthType>>;
    loading: boolean;
    isError: boolean;
    setTokenJWT: React.Dispatch<React.SetStateAction<string | null>>;
};

const initialValues: AuthContextType = {
    userAuth: initialAuthState,
    setAuth: () => {},
    loading: true,
    isError: false,
    setTokenJWT: () => '',
};

const AuthContext = createContext<AuthContextType>(initialValues);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const [userAuth, setAuth] = useState<userAuthType>(initialValues.userAuth);
    const [loading, setLoading] = useState(true);
    const [tokenJWT, setTokenJWT] = useState<string | null>(
        localStorage.getItem('token'),
    );

    const queryClient = useQueryClient();
    const { data, isError } = useQuery({
        queryKey: ['userAuth'],
        queryFn: getUserAuth,
        retry: 2,
        enabled: !!tokenJWT, // Enable the query only if there is a token
    });

    useEffect(() => {
        if (!tokenJWT) {
            setAuth(initialValues.userAuth);
            navigate('/login');
            setLoading(true);
            return;
        }
        if (isError) {
            queryClient.invalidateQueries({ queryKey: ['userAuth'] });
        }
        if (data) {
            setLoading(false);
            setAuth(data);
        }
    }, [data, tokenJWT, setTokenJWT]);

    return (
        <AuthContext.Provider
            value={{ userAuth, setAuth, loading, isError, setTokenJWT }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
export default AuthProvider;
