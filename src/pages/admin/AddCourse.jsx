import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Trash2, Link as LinkIcon, Upload, X, FileText, Zap, Bookmark, Pencil } from "lucide-react";
import Swal from "sweetalert2";
import { Toaster, toast } from "react-hot-toast";

export default function AddCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isCustomType, setIsCustomType] = useState(false);
  
  // NEW: State to track if we are editing an existing course
  const [editId, setEditId] = useState(null); 

  const [form, setForm] = useState({
    title: "",
    tag: "",
    targetClass: "", 
    playlistLink: "",
    duration: "",
    description: "",
    image: "", 
    badge: "",       
    videoType: "",
    showOnHome: false // NEW: Track homepage status
  });

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // NEW LOGIC: Count how many courses are on the home page
  const homeCourseCount = courses.filter((c) => c.showOnHome).length;
  // Disable checkbox if we aren't already showing this course, and 4 slots are taken
  const isHomeDisabled = !form.showOnHome && homeCourseCount >= 4;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Please upload an image file (PNG/JPG)");
    }

    if (file.size > 500 * 1024) {
      return Swal.fire({
        title: "File Too Large!",
        text: "To save server space, thumbnails must be under 500KB.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    }

    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const validateForm = () => {
    if (!form.title.trim()) { toast.error("Title is required"); return false; }
    if (!form.tag) { toast.error("Please select a broad category"); return false; }
    if (!form.targetClass) { toast.error("Please select a specific class"); return false; }
    if (!form.playlistLink.includes("youtube.com") && !form.playlistLink.includes("youtu.be")) {
      toast.error("Please enter a valid YouTube link");
      return false;
    }
    if (!form.videoType?.trim()) { toast.error("Please select or enter a Content Type"); return false; }
    if (!imagePreview && !form.image) { toast.error("Please upload a thumbnail"); return false; }
    return true;
  };

  const resetForm = () => {
    setForm({ title: "", tag: "", targetClass: "", playlistLink: "", duration: "", description: "", image: "", badge: "", videoType: "", showOnHome: false });
    setImagePreview(null);
    setSelectedFile(null);
    setIsCustomType(false);
    setEditId(null);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setLoading(true);
  const loadToast = toast.loading(editId ? "Updating resource..." : "Publishing resource...");

  try {
    const formData = new FormData();

    // TEXT FIELDS
    formData.append("title", form.title);
    formData.append("tag", form.tag);
    formData.append("targetClass", form.targetClass);
    formData.append("playlistLink", form.playlistLink);
    formData.append("duration", form.duration);
    formData.append("description", form.description);
    formData.append("badge", form.badge);
    formData.append("videoType", form.videoType);
    formData.append("showOnHome", form.showOnHome);

    // IMAGE FILE ✅
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    if (editId) {
      await axios.put(`http://localhost:5000/api/courses/${editId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("Resource Updated Successfully!", { id: loadToast });
    } else {
      await axios.post("http://localhost:5000/api/courses", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("Resource Published Successfully!", { id: loadToast });
    }

    resetForm();
    fetchCourses();
  } catch (err) {
    toast.error(err.response?.data?.message || "Error saving resource", { id: loadToast });
  } finally {
    setLoading(false);
  }
};
  const handleEdit = (course) => {
    const standardTypes = ["Full Chapter", "One-Shot Revision", "PYQ Solving", "Exam Strategy", ""];
    if (!standardTypes.includes(course.videoType)) {
      setIsCustomType(true);
    } else {
      setIsCustomType(false);
    }

    setForm({
      title: course.title || "",
      tag: course.tag || "",
      targetClass: course.targetClass || "",
      playlistLink: course.playlistLink || "",
      duration: course.duration || "",
      description: course.description || "",
      image: course.image || "",
      badge: course.badge || "",
      videoType: course.videoType || "",
      showOnHome: course.showOnHome || false // Populate home status
    });
    
    setImagePreview(course.image || null);
    setEditId(course._id);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to remove this resource?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", 
      cancelButtonColor: "#64748b",  
      confirmButtonText: "Yes, delete it",
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
          await axios.delete(`http://localhost:5000/api/courses/${id}`);
          toast.success("Resource removed from catalog");
          if (editId === id) resetForm();
          fetchCourses();
        } catch (err) {
          toast.error("Failed to delete resource.");
        }
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 p-6 bg-[#f8fafc] min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Academic Content Manager</h2>
        <p className="text-sm text-slate-500">Add, edit, or remove video lessons and playlists from the portal.</p>
      </div>

      <section>
        <form onSubmit={handleSubmit} className={`bg-white p-8 rounded-3xl border shadow-sm space-y-6 transition-colors ${editId ? 'border-blue-300 ring-4 ring-blue-50' : 'border-slate-100'}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${editId ? 'bg-blue-100' : 'bg-blue-50'}`}>
                {editId ? <Pencil className="text-blue-600" size={20} /> : <Plus className="text-blue-600" size={20} />}
              </div>
              <h3 className="font-bold text-slate-800 text-lg">
                {editId ? "Update Content" : "Create New Content"}
              </h3>
            </div>
            {editId && (
              <span className="text-xs font-bold bg-blue-100 text-blue-600 px-3 py-1 rounded-full animate-pulse">
                Editing Mode
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                Thumbnail <span className="text-[10px] text-blue-500 lowercase">(Max 500KB)</span>
              </label>
              {imagePreview ? (
                <div className="relative group w-full h-48 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-inner">
                  <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button 
                      type="button"
                      onClick={() => {setImagePreview(null); setSelectedFile(null); form.image = "";}}
                      className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/40 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-blue-50/50 hover:border-blue-300 transition-all group relative">
                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-blue-50 rounded-full mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6 text-blue-500" />
                    </div>
                    <p className="text-sm text-slate-600 font-semibold">Drop image here</p>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 500KB</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              )}
            </div>

            <div className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Resource Title</label>
                <input
                  required
                  className="w-full border border-slate-200 p-3.5 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-50 transition-all"
                  placeholder="e.g. Complete Biology"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category</label>
                  <select
                    required
                    className="w-full border border-slate-200 p-3.5 rounded-2xl text-sm outline-none bg-white focus:ring-4 focus:ring-blue-50"
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    <option value="Class 5-10">Class 5-10</option>
                    <option value="Class 11-12 Science">Class 11-12 Science</option>
                    <option value="Class 11-12 Commerce">Class 11-12 Commerce</option>
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest text-blue-600">Specific Class</label>
                  <select
                    required
                    className="w-full border border-blue-200 p-3.5 rounded-2xl text-sm outline-none bg-blue-50/30 focus:ring-4 focus:ring-blue-100"
                    value={form.targetClass}
                    onChange={(e) => setForm({ ...form, targetClass: e.target.value })}
                  >
                    <option value="">Exact Class...</option>
                    <option value="Class 5">Class 5</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11 (Sci)">Class 11 (Sci)</option>
                    <option value="Class 11 (Com)">Class 11 (Com)</option>
                    <option value="Class 12 (Sci)">Class 12 (Sci)</option>
                    <option value="Class 12 (Com)">Class 12 (Com)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                    <Bookmark size={12} className="text-blue-500"/> Content Type
                  </label>
                  {!isCustomType ? (
                    <select
                      required
                      className="w-full border border-slate-200 p-3.5 rounded-2xl text-sm outline-none bg-white focus:ring-4 focus:ring-blue-50"
                      value={form.videoType}
                      onChange={(e) => {
                        if (e.target.value === "Other") {
                          setIsCustomType(true);
                          setForm({ ...form, videoType: "" }); 
                        } else {
                          setForm({ ...form, videoType: e.target.value });
                        }
                      }}
                    >
                      <option value="">Select Type</option>
                      <option value="Full Chapter">Full Chapter</option>
                      <option value="One-Shot Revision">One-Shot Revision</option>
                      <option value="PYQ Solving">PYQ Solving</option>
                      <option value="Exam Strategy">Exam Strategy</option>
                      <option value="Other">Other (Type custom)</option>
                    </select>
                  ) : (
                    <div className="relative">
                      <input
                        required
                        autoFocus
                        type="text"
                        className="w-full border border-slate-200 p-3.5 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-50 pr-10 transition-all"
                        placeholder="Enter custom type..."
                        value={form.videoType}
                        onChange={(e) => setForm({ ...form, videoType: e.target.value })}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomType(false);
                          setForm({ ...form, videoType: "" });
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                    <Zap size={12} className="text-yellow-500 fill-current" /> Highlight Badge
                  </label>
                  <select
                    className="w-full border border-slate-200 p-3.5 rounded-2xl text-sm outline-none bg-white focus:ring-4 focus:ring-blue-50"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  >
                    <option value="Standard">Standard</option>
                    <option value="🔥 Trending">🔥 Trending</option>
                    <option value="⭐ Top Pick">⭐ Top Pick</option>
                    <option value="🚀 Fast Track">🚀 Fast Track</option>
                    <option value="🎯 Exam Special">🎯 Exam Special</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                <LinkIcon size={14} /> Video or Playlist Link
              </label>
              <input
                required
                className="w-full border border-slate-200 p-4 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-50 transition-all"
                placeholder="YouTube Video or Playlist URL"
                value={form.playlistLink}
                onChange={(e) => setForm({ ...form, playlistLink: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex justify-between items-center">
                Duration & Specs
              </label>
              <input
                 className="w-full border border-slate-200 p-4 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-50 transition-all"
                 placeholder="e.g. 25 Hours | 15 Videos"
                 value={form.duration}
                 onChange={(e) => setForm({ ...form, duration: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex justify-between items-center">
              Short Description
              <span className="text-[10px] text-slate-400 font-normal">{(form.description || "").length}/150 chars</span>
            </label>
            <textarea
              className="w-full border border-slate-200 p-4 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-50 transition-all resize-none h-14"
              placeholder="Brief summary of the course..."
              maxLength={150}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          {/* NEW SECTION: Show on Home Page Checkbox */}
          <div className={`flex items-center justify-between p-4 border rounded-2xl transition-colors ${form.showOnHome ? 'border-blue-400 bg-blue-50/50' : 'border-slate-200 bg-slate-50'}`}>
            <div>
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2 cursor-pointer">
                🏠 Show in "Premier Courses" on Home Page
              </label>
              <p className="text-xs text-slate-500 mt-0.5">
                Display this course on the front page. ({homeCourseCount}/4 slots used)
              </p>
              {isHomeDisabled && (
                <p className="text-[10px] text-red-500 font-bold mt-1">Maximum 4 courses allowed. Uncheck an existing course to add this one.</p>
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

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 text-white font-bold py-4 rounded-2xl transition-all shadow-xl disabled:opacity-70 active:scale-[0.99] ${editId ? 'bg-blue-700 shadow-blue-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'}`}
            >
              {loading ? "Processing..." : (editId ? "Update Course" : "Publish to Portal")}
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
        <div className="flex items-center justify-between px-4">
           <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
             <FileText size={20} className="text-blue-600" />
             Live Catalog <span className="bg-blue-100 text-blue-600 text-xs px-2.5 py-1 rounded-full">{courses.length}</span>
           </h3>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-[0.15em] border-b border-slate-100">
                <th className="px-6 py-5 font-bold">Content Details</th>
                <th className="px-6 py-5 font-bold">Class & Format</th>
                <th className="px-6 py-5 font-bold">Status</th>
                <th className="px-6 py-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {courses.map((c) => (
                <tr key={c._id} className={`transition-colors group ${editId === c._id ? 'bg-blue-50/50' : 'hover:bg-slate-50/50'}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-10 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 relative">
                        <img src={c.image || "/placeholder.jpg"} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 line-clamp-1">{c.title}</p>
                        <p className="text-[10px] text-blue-500 font-medium">
                            {c.badge !== "Standard" ? c.badge : (c.playlistLink?.includes("list=") ? "Full Series" : "Single Video")}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1 rounded-full font-bold uppercase tracking-wide">
                        {c.targetClass || c.tag} 
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {c.videoType}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-[11px] font-medium">
                      <span className="text-slate-500">⏳ {c.duration || "N/A"}</span>
                      {/* Show visual indicator in table if on home page */}
                      {c.showOnHome && (
                         <span className="text-blue-600 flex items-center gap-1"><Zap size={10}/> Home Page</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(c)} 
                        className="p-2.5 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        title="Edit Course"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(c._id)} 
                        className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Delete Course"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}