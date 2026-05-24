import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, FileText, FolderOpen, LayoutDashboard, LogOut } from "lucide-react"; 
import AddCourse from "./AddCourse";
import AddResult from "./AddResult";
import AddMaterial from "./AddMaterial";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("courses");
  const navigate = useNavigate();

  // ✅ SIMPLE TOKEN CHECK (ONLY THIS)
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin-login");
    }
  }, [navigate]);

  // ✅ CLEAN LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  const menuItems = [
    { id: "courses", label: "Courses", icon: <BookOpen size={20} /> },
    { id: "results", label: "Results", icon: <FileText size={20} /> },
    { id: "materials", label: "Study Material", icon: <FolderOpen size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 text-blue-600">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <LayoutDashboard size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-800">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                activeTab === item.id
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-gray-800 capitalize">
            Manage {activeTab}
          </h2>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-gray-800">Admin User</p>
              <p className="text-[10px] text-gray-500">Super Admin</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center text-xl">
              👤
            </div>
          </div>
        </header>

        <div className="p-8 max-w-5xl">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 min-h-[400px]">
            <div className="p-8">
              {activeTab === "courses" && <AddCourse />}
              {activeTab === "results" && <AddResult />}
              {activeTab === "materials" && <AddMaterial />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}