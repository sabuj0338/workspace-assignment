import * as React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import Loader from "./components/Loader";
import { useAuthStore } from "./store/useAuthStore";

const AppLayout = React.lazy(() => import("./components/layout/AppLayout"));
const LoginPage = React.lazy(() => import("./pages/auth/login-page"));
const ForgotPasswordPage = React.lazy(
  () => import("./pages/auth/forget-password-page")
);
const IncomingSamplePage = React.lazy(
  () => import("./pages/dashboard/incoming-sample-page")
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
  return <Outlet />;
  const auth = useAuthStore((state) => state.auth);
  const logout = useAuthStore((state) => state.logout);

  const roles = auth?.user?.roles?.map((it) => it);
  const isAdmin = roles?.includes("admin") || roles?.includes("super-admin");

  if (auth && isTokenExpired(auth.access_token)) {
    logout();
    return <Navigate to="/login" />;
  }

  if (auth && isAdmin) {
    return <Outlet />;
  }

  if (auth && auth.user?.email_verified_at) {
    return <Outlet />;
  } else if (auth && auth.user?.email_verified_at == undefined) {
    return <Navigate to="/verify-email" />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default function App() {
  return (
    <React.Suspense fallback={<Loader className="min-h-screen"/>}>
      <Routes>
        <Route path="" element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />

        <Route
          path="dashboard/*"
          element={
            <AppLayout>
              <PrivateOutlet />
            </AppLayout>
          }
        >
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
