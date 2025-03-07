import * as React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import Loader from "./components/Loader";
import { useAuthStore } from "./store/useAuthStore";

const AppLayout = React.lazy(() => import("./components/layout/AppLayout"));
const WelcomePage = React.lazy(() => import("./pages/welcome-page"));
const LoginPage = React.lazy(() => import("./pages/auth/login-page"));
const RegisterPage = React.lazy(() => import("./pages/auth/register-page"));
const ForgotPasswordPage = React.lazy(
  () => import("./pages/auth/forget-password-page")
);
const IncomingSamplePage = React.lazy(
  () => import("./pages/dashboard/incoming-sample-page")
);
const DashboardPage = React.lazy(
  () => import("./pages/dashboard/dashboard-page")
);
const OutgoingSamplePage = React.lazy(
  () => import("./pages/dashboard/outgoing-sample-page")
);
const TeamsPage = React.lazy(() => import("./pages/dashboard/teams-page"));
const NewEmployeeFormPage = React.lazy(
  () => import("./pages/employee/new-employee-form-page")
);
const ProfilePage = React.lazy(() => import("./pages/profile/profile-page"));
const EditProfilePage = React.lazy(
  () => import("./pages/profile/edit-profile-page")
);
const NotFoundPage = React.lazy(() => import("./pages/404"));

function isTokenExpired(token: string) {
  const expiry = JSON.parse(atob(token.split(".")[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
}

function PrivateOutlet() {
  const auth = useAuthStore((state) => state.auth);
  const logout = useAuthStore((state) => state.logout);

  const roles = auth?.user?.roles?.map((it) => it);
  const isAdmin = roles?.includes("admin") || roles?.includes("super-admin");

  if (auth && isTokenExpired(auth.tokens.access.token)) {
    logout();
    return <Navigate to="/login" />;
  }

  if (auth && isAdmin) {
    return <Outlet />;
  }

  if (auth) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default function App() {
  return (
    <React.Suspense fallback={<Loader className="min-h-screen" />}>
      <Routes>
        <Route path="" element={<WelcomePage />} />

        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />

        <Route
          path="dashboard/*"
          element={
            <AppLayout>
              <PrivateOutlet />
            </AppLayout>
          }
        >
          <Route path="" element={<DashboardPage />} />
          <Route path="incoming-sample" element={<IncomingSamplePage />} />
          <Route path="outgoing-sample" element={<OutgoingSamplePage />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="employee/new" element={<NewEmployeeFormPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/edit" element={<EditProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </React.Suspense>
  );
}
