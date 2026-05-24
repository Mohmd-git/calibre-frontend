import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AdminVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      // ✅ store token
      localStorage.setItem("adminToken", token);

      // ✅ redirect to dashboard
      navigate("/admin", { replace: true });
    } else {
      navigate("/admin-login", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <p>Verifying...</p>
    </div>
  );
};

export default AdminVerify;