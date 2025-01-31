
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "@/components/Utils/Spinner";
import useAuth from "@/hooks/useAuth";
import TemporaryDrawer from "@/components/Utils/SideBar";

export default function AppLayouts() {
    const { userAuth, loading, isError } = useAuth();

    if (isError) return <Navigate to="/login" />//invalid token
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center ">
                <Spinner />
            </div>
        )
    }
    if (userAuth.id > 0) return (
        <div className="min-h-screen px-0">
            {userAuth.status ? (
                <div className="flex">
                    <TemporaryDrawer />
                    <div className="px-5 bg-white  min-h-screen flex-1">
                        <Outlet />
                    </div>
                </div>


            ) :
                <Navigate to="/login" />
            }
        </div>
    );

}
