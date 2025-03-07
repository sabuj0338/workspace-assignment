import { useAuthStore } from "@/store/useAuthStore";
import { Navigate } from "react-router";

export default function WelcomePage() {
  const auth = useAuthStore((state) => state.auth);

  if (auth) {
    return <Navigate to="/dashboard/incoming-sample" />;
  } else {
    return <Navigate to="/login" />;
  }
}
