import { BrowserRouter, Routes, Route } from 'react-router-dom';

//context
import AuthProvider from './context/AuthContext';
import NotificationProvider from './context/NotificationContext';
//validate if has access to route with role
import ValidateRole from './components/authRole/ValidateRole';
//layouts
import AuthLayouts from './layouts/AuthLayouts';
import AppLayouts from './layouts/AppLayout';
// views 401 && 404
import Views404 from './views/Views404';
import Views401 from './views/Views401';
//views Auth
import LoginViews from './views/auth/LoginViews';
import RegisterViews from './views/auth/RegisterViews';
import ForgotPasswordViews from './views/auth/ForgotPasswordViews';
import ResetPasswordViews from './views/auth/ResetPassword';
import ConfirmAccountViews from './views/auth/ConfirmAccountViews';
// views App
import DashboardViews from './views/app/DashboardViews';
import SalesViews from './views/app/sales/SalesViews';
import BusinessDataView from './views/app/businessData/BusinessDataView';
import UserView from './views/app/businessData/UserView';
import SecurityView from './views/app/Security/SecurityView';
import CategoryView from './views/app/catalogs/CategoryView';
import SupplierView from './views/app/catalogs/SupplierView';
import ProductView from './views/app/products/ProductView';
import PurchaseHistoryView from './views/app/purchases/PurchaseHistoryView';
import PurchaseDetailView from './views/app/purchases/PurchaseView';
import { Role } from './data';
import RegisterPurchaseView from './views/app/purchases/RegisterPurchaseView';
import SaleHistoryView from './views/app/sales/SaleHistoryView';
import SaleDetailView from './views/app/sales/SaleView';

export default function Router() {
    return (
        <NotificationProvider>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        {/* AUTHENTICATION */}
                        <Route element={<AuthLayouts />}>
                            <Route path="/login" element={<LoginViews />} />
                            <Route
                                path="/registrar"
                                element={<RegisterViews />}
                            />
                            <Route
                                path="/olvide-password"
                                element={<ForgotPasswordViews />}
                            />
                            <Route
                                path="/confirmar-cuenta"
                                element={<ConfirmAccountViews />}
                            />
                            <Route
                                path="/resetear-password"
                                element={<ResetPasswordViews />}
                            />
                        </Route>

                        {/* APP */}
                        <Route path="/" element={<AppLayouts />}>
                            {/* dashboard views */}
                            <Route
                                index
                                element={
                                    <ValidateRole roles={[Role.admin]}>
                                        <DashboardViews />
                                    </ValidateRole>
                                }
                            />

                            {/* sales */}
                            <Route
                                path="/ventas"
                                element={
                                    <ValidateRole
                                        roles={[Role.admin, Role.employee]}
                                    >
                                        <SalesViews />
                                    </ValidateRole>
                                }
                            />

                            <Route
                                path="/historial-ventas"
                                element={
                                    <ValidateRole
                                        roles={[Role.admin, Role.employee]}
                                    >
                                        <SaleHistoryView />
                                    </ValidateRole>
                                }
                            />

                            <Route
                                path="/historial-ventas/:id"
                                element={
                                    <ValidateRole
                                        roles={[Role.admin, Role.employee]}
                                    >
                                        <SaleDetailView />
                                    </ValidateRole>
                                }
                            />

                            {/* Product */}
                            <Route
                                path="productos"
                                element={
                                    <ValidateRole
                                        roles={[Role.admin, Role.employee]}
                                    >
                                        <ProductView />
                                    </ValidateRole>
                                }
                            />

                            {/* Purchases */}
                            <Route
                                path="compras"
                                element={
                                    <ValidateRole
                                        roles={[Role.admin, Role.employee]}
                                    >
                                        <RegisterPurchaseView />
                                    </ValidateRole>
                                }
                            />
                            <Route
                                path="historial-compras"
                                element={
                                    <ValidateRole
                                        roles={[Role.admin, Role.employee]}
                                    >
                                        <PurchaseHistoryView />
                                    </ValidateRole>
                                }
                            />
                            <Route
                                path="historial-compras/:id"
                                element={
                                    <ValidateRole
                                        roles={[Role.admin, Role.employee]}
                                    >
                                        <PurchaseDetailView />
                                    </ValidateRole>
                                }
                            />

                            {/* catalogs */}
                            <Route
                                path="/catalogos/categorias"
                                element={
                                    <ValidateRole
                                        roles={[Role.admin, Role.employee]}
                                    >
                                        <CategoryView />
                                    </ValidateRole>
                                }
                            />
                            <Route
                                path="/catalogos/proveedores"
                                element={
                                    <ValidateRole
                                        roles={[Role.admin, Role.employee]}
                                    >
                                        <SupplierView />
                                    </ValidateRole>
                                }
                            />

                            {/* Security */}
                            <Route
                                path="/seguridad"
                                element={
                                    <ValidateRole roles={[Role.admin]}>
                                        <SecurityView />
                                    </ValidateRole>
                                }
                            />

                            {/* business Data */}
                            <Route
                                path="/configuracion/informacion-personal"
                                element={
                                    <ValidateRole
                                        roles={[Role.admin, Role.employee]}
                                    >
                                        <UserView />
                                    </ValidateRole>
                                }
                            />
                            <Route
                                path="/configuracion/datos-negocio"
                                element={
                                    <ValidateRole roles={[Role.admin]}>
                                        <BusinessDataView />
                                    </ValidateRole>
                                }
                            />
                        </Route>

                        {/* views alternatives */}
                        <Route element={<AppLayouts />}>
                            <Route path="*" element={<Views404 />} />
                            <Route path="/401" element={<Views401 />} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </NotificationProvider>
    );
}
