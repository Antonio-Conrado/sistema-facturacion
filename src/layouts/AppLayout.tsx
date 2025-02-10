import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '@/components/Utils/Spinner';
import useAuth from '@/hooks/useAuth';
import Nav from '@/components/Utils/Nav';
import SideBar from '@/components/SideBar/SideBar';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBusinessDataAPI } from '@/api/businessData/businessData';
import { getUser } from '@/api/user/user';

export default function AppLayouts() {
    const { userAuth, loading, isError } = useAuth();
    const [isLargeScreen, setIsLargeScreen] = useState(
        window.innerWidth > 1024,
    );
    const [isOpenSideBar, setIsOpenSideBar] = useState(false);

    //show sidebar
    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useQuery({
        queryKey: ['businessData'],
        queryFn: getBusinessDataAPI,
    });
    const userData = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser({ id: userAuth.id }),
    });
    //fetch
    if (isError) return <Navigate to="/login" />;
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner />
            </div>
        );
    }
    if (userData.isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (userAuth.id > 0)
        return (
            <>
                <div>
                    {/* Sidebar */}
                    <SideBar
                        setIsOpenSideBar={setIsOpenSideBar}
                        isLargeScreen={isLargeScreen}
                        isOpenSideBar={isOpenSideBar}
                    />

                    <div
                        className={`${
                            isLargeScreen ? 'ml-[245px] mx-2' : 'mx-2'
                        }`}
                    >
                        <Nav
                            toggleSidebar={() =>
                                setIsOpenSideBar(!isOpenSideBar)
                            }
                            isLargeScreen={isLargeScreen}
                        />
                        <main className="mt-20 py-5">
                            <Outlet />
                        </main>
                    </div>
                </div>
            </>
        );
}
