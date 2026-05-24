import { useEffect, useState } from "react";
import { UserPlus, GraduationCap, Award, Upload, Image as ImageIcon, Loader2, Trash2, FileText, CheckCircle2, X, Pencil } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { Toaster, toast } from "react-hot-toast";

export default function AddResult() {
  const [results, setResults] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    percentage: "",
    className: "",
    board: "",
    passingYear: "",
    topperRank: "",
    studentPhoto: null,
    showOnHome: false, // NEW: Track homepage status
  });

  const fetchResults = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/results");
      setResults(res.data);
    } catch (err) {
      console.error("Error fetching results:", err);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // NEW LOGIC: Count how many students are on the home page Hall of Fame
  const homeResultCount = results.filter((r) => r.showOnHome).length;
  // Disable checkbox if we aren't already showing this student, and 4 slots are taken
  const isHomeDisabled = !form.showOnHome && homeResultCount >= 4;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Please upload an image file (PNG/JPG)");
    }

    if (file.size > 500 * 1024) {
      return Swal.fire({
        title: "Photo Too Large!",
        text: "To save server space, student photos must be under 500KB.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    }

    // ✅ STORE FILE DIRECTLY (Removed Base64 Reader)
    setForm({ ...form, studentPhoto: file }); 
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    if (value.length <= 4) {
      setForm({ ...form, passingYear: value });
    }
  };

  const validateForm = () => {
    if (!form.name.trim()) { toast.error("Student name is required"); return false; }
    if (!form.percentage || form.percentage > 100) { toast.error("Enter a valid percentage (0-100)"); return false; }
    if (!form.className || !form.board) { toast.error("Select Class and Board"); return false; }
    if (String(form.passingYear).length !== 4) { toast.error("Passing year must be 4 digits"); return false; }
    if (!form.studentPhoto && !editId) { toast.error("Please upload a student photo"); return false; }
    return true;
  };

  const resetForm = () => {
    setForm({ name: "", percentage: "", className: "", board: "", passingYear: "", topperRank: "", studentPhoto: null, showOnHome: false });
    setEditId(null);
  };

  // ✅ UPDATED HANDLESUBMIT TO USE FORMDATA
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const loadToast = toast.loading(editId ? "Updating result..." : "Publishing result...");

    try {
      const formData = new FormData();

      formData.append("studentName", form.name);
      formData.append("score", form.percentage + "%");
      formData.append("course", `Class ${form.className} | ${form.board}`);
      formData.append("year", Number(form.passingYear));
      formData.append("topperRank", form.topperRank);
      formData.append("showOnHome", form.showOnHome);

      if (form.studentPhoto) {
        formData.append("image", form.studentPhoto); // ⭐ IMAGE
      }

      if (editId) {
        await axios.put(`http://localhost:5000/api/results/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success(`${form.name}'s result updated!`, { id: loadToast });
      } else {
        await axios.post("http://localhost:5000/api/results", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success(`${form.name}'s result published!`, { id: loadToast });
      }

      resetForm();
      fetchResults();
    } catch (err) {
      toast.error("Error saving result.", { id: loadToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (res) => {
    const [classPart, boardPart] = res.course ? res.course.split(" | ") : ["", ""];
    const parsedClass = classPart ? classPart.replace("Class ", "") : "";
    const parsedBoard = boardPart || "";
    
    const parsedPercentage = res.score ? res.score.replace("%", "") : "";

    setForm({
      name: res.studentName || "",
      percentage: parsedPercentage,
      className: parsedClass,
      board: parsedBoard,
      passingYear: res.year ? String(res.year) : "", 
      topperRank: res.topperRank || "",
      studentPhoto: res.image || null,
      showOnHome: res.showOnHome || false // NEW: Populate home status
    });

    setEditId(res._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Remove this student from the Wall of Fame? This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", 
      cancelButtonColor: "#64748b",  
      confirmButtonText: "Yes, delete record",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      background: "#ffffff",
      customClass: {
        popup: "rounded-3xl border border-slate-100 shadow-2xl",
        title: "text-xl font-bold text-slate-800",
        confirmButton: "rounded-xl px-6 py-2.5 font-semibold",
        cancelButton: "rounded-xl px-6 py-2.5 font-semibold"
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/results/${id}`);
          toast.success("Record deleted successfully");
          if (editId === id) resetForm(); 
          fetchResults();
        } catch (err) {
          toast.error("Error deleting record");
        }
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 p-6 bg-[#f8fafc] min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />

      {/* HEADER */}
      <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Result Management</h2>
          <p className="text-sm text-slate-500">Upload, edit, and manage academic achievements.</p>
        </div>
        <div className="bg-blue-50 p-3 rounded-full text-blue-600">
          <Award size={28} />
        </div>
      </div>

      {/* FORM SECTION */}
      <section className={`bg-white p-8 rounded-3xl border shadow-sm transition-colors ${editId ? 'border-blue-300 ring-4 ring-blue-50' : 'border-slate-100'}`}>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${editId ? 'bg-blue-100' : 'bg-blue-50'}`}>
                {editId ? <Pencil className="text-blue-600" size={20} /> : <UserPlus className="text-blue-600" size={20} />}
              </div>
              <h3 className="font-bold text-slate-800 text-lg">
                {editId ? "Update Student Record" : "Add Student Result"}
              </h3>
            </div>
            {editId && (
              <span className="text-xs font-bold bg-blue-100 text-blue-600 px-3 py-1 rounded-full animate-pulse">
                Editing Mode
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Photo Upload */}
            <div className="flex flex-col items-center justify-center space-y-3 border-2 border-dashed border-slate-200 rounded-3xl p-6 bg-slate-50/50 group">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Student Photo</label>
              <div className="relative w-40 h-40 bg-white rounded-full border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
                {form.studentPhoto ? (
                  <>
                    {/* ✅ PREVIEW FIX: Checks if image is string URL from DB, or raw File object from local upload */}
                    <img 
                      src={typeof form.studentPhoto === "string" ? form.studentPhoto : URL.createObjectURL(form.studentPhoto)} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                    />
                    <button 
                      type="button"
                      onClick={() => setForm({...form, studentPhoto: null})}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    >
                      <X className="text-white" size={24} />
                    </button>
                  </>
                ) : (
                  <label className="flex flex-col items-center cursor-pointer">
                    <ImageIcon size={40} className="text-slate-300 group-hover:text-blue-400 transition-colors" />
                    <span className="text-[10px] text-slate-400 mt-2 font-bold uppercase">Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                )}
              </div>
            </div>

            {/* Input Fields */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Student Name</label>
                <input
                  required
                  placeholder="Full Name"
                  className="w-full border border-slate-200 p-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Percentage (%)</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  placeholder="e.g. 95.5"
                  className="w-full border border-slate-200 p-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50"
                  value={form.percentage}
                  onChange={(e) => setForm({ ...form, percentage: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2">
                  <GraduationCap size={14} /> Class & Board
                </label>
                <div className="flex gap-2">
                  <select
                    required
                    className="w-1/2 border border-slate-200 p-3 rounded-2xl outline-none bg-white"
                    value={form.className}
                    onChange={(e) => setForm({ ...form, className: e.target.value })}
                  >
                    <option value="">Class</option>
                    {[10, 12].map((val) => <option key={val} value={val}>{val}th</option>)}
                  </select>
                  <select
                    required
                    className="w-1/2 border border-slate-200 p-3 rounded-2xl outline-none bg-white"
                    value={form.board}
                    onChange={(e) => setForm({ ...form, board: e.target.value })}
                  >
                    <option value="">Board</option>
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State Board">State Board</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Passing Year</label>
                <input
                  required
                  type="number"
                  placeholder="e.g. 2024"
                  className="w-full border border-slate-200 p-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50"
                  value={form.passingYear}
                  onChange={handleYearChange}
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-blue-600 uppercase flex items-center gap-1 tracking-widest">
                  🏆 Topper Rank (Optional)
                </label>
                <select
                  className="w-full border border-blue-100 bg-blue-50/30 p-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100"
                  value={form.topperRank}
                  onChange={(e) => setForm({ ...form, topperRank: e.target.value })}
                >
                  <option value="">Regular Result</option>
                  <option value="1">1st Rank (Gold)</option>
                  <option value="2">2nd Rank (Silver)</option>
                  <option value="3">3rd Rank (Bronze)</option>
                </select>
              </div>
            </div>
          </div>

          {/* NEW SECTION: Show on Home Page Checkbox */}
          <div className={`flex items-center justify-between p-4 border rounded-2xl transition-colors ${form.showOnHome ? 'border-blue-400 bg-blue-50/50' : 'border-slate-200 bg-slate-50'}`}>
            <div>
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2 cursor-pointer">
                🌟 Show in "Hall of Fame" on Home Page
              </label>
              <p className="text-xs text-slate-500 mt-0.5">
                Display this top student on the front page. ({homeResultCount}/4 slots used)
              </p>
              {isHomeDisabled && (
                <p className="text-[10px] text-red-500 font-bold mt-1">Maximum 4 students allowed. Uncheck an existing one to add this.</p>
              )}
            </div>
            <input
              type="checkbox"
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              checked={form.showOnHome}
              disabled={isHomeDisabled}
              onChange={(e) => setForm({ ...form, showOnHome: e.target.checked })}
            />
          </div>

          {/* DYNAMIC BUTTON CLUSTER */}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 text-white font-bold py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.99]
                ${editId ? 'bg-blue-700 shadow-blue-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'}`}
            >
              {isSubmitting ? (
                <><Loader2 size={20} className="animate-spin" /> Processing...</>
              ) : (
                <>{editId ? "Update Result" : <><UserPlus size={20} /> Publish Result</>}</>
              )}
            </button>
            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-8 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all active:scale-[0.99]"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* TABLE SECTION */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-4">
          <FileText className="text-blue-600" size={20} />
          <h3 className="font-bold text-slate-800 text-lg">Wall of Fame Records</h3>
          <span className="bg-blue-100 text-blue-600 text-xs px-2.5 py-1 rounded-full font-bold">{results.length} Students</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-[0.15em] border-b border-slate-100">
                  <th className="px-6 py-5 font-bold">Student Info</th>
                  <th className="px-6 py-5 font-bold">Performance</th>
                  <th className="px-6 py-5 font-bold">Class Details</th>
                  <th className="px-6 py-5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {results.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-12 text-slate-400 text-sm italic">
                      No results found in the database.
                    </td>
                  </tr>
                ) : (
                  results.map((res) => (
                    <tr key={res._id} className={`transition-colors group ${editId === res._id ? 'bg-blue-50/50' : 'hover:bg-slate-50/50'}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={res.image || "https://via.placeholder.com/100"} 
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm bg-slate-100" 
                            alt="" 
                          />
                          <div>
                            <p className="text-sm font-bold text-slate-800">{res.studentName}</p>
                            {res.topperRank && (
                              <span className="text-[9px] font-bold bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                🏆 Rank #{res.topperRank} Topper
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 size={16} className="text-green-500" />
                          <span className="text-sm font-black text-slate-700">{res.score}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs text-slate-600 font-bold uppercase tracking-tight">{res.course}</p>
                        <p className="text-[10px] text-slate-400">Batch of {res.year || "N/A"}</p>
                        
                        {/* NEW: Visual indicator if they are on the Home Page */}
                        {res.showOnHome && (
                          <span className="mt-2 text-[9px] text-blue-600 font-bold flex items-center gap-1 bg-blue-50 w-max px-2 py-0.5 rounded-md uppercase tracking-wider">
                            <Award size={10}/> Home Page
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(res)} 
                            className="p-2.5 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"
                            title="Edit Result"
                          >
                            <Pencil size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(res._id)}
                            className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                            title="Delete Result"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}