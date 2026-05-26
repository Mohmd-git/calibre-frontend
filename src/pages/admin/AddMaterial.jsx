import { useEffect, useState } from "react";
import axios from "axios";
import { FilePlus, Trash2, BookOpen, GraduationCap, Upload, FileText, Plus, Loader2, Pencil, X } from "lucide-react";
import Swal from "sweetalert2";
import { Toaster, toast } from "react-hot-toast";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function AddMaterial() {
  const [materials, setMaterials] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    subject: "",
    classLevel: "",
    board: "",
    files: [],
  });

  const fetchMaterials = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/materials`);
      setMaterials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  // ✅ ADD FILE SLOT
  const addFileSlot = () => {
    setForm({
      ...form,
      files: [...form.files, { fileName: "", fileObject: null }],
    });
  };

  const removeFile = (index) => {
    const updatedFiles = form.files.filter((_, i) => i !== index);
    setForm({ ...form, files: updatedFiles });
  };

  // ✅ UPDATED FILE UPLOAD (REAL FILE STORE)
  const handleLocalFileUpload = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return Swal.fire({
        title: "File Too Large!",
        text: "Documents must be under 5MB.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
      "image/jpeg"
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload PDF, Word, or Images.");
      return;
    }

    const updatedFiles = [...form.files];
    updatedFiles[index] = {
      fileName: file.name,
      fileObject: file, // ⭐ IMPORTANT
    };

    setForm({ ...form, files: updatedFiles });
  };

  // ✅ VALIDATION UPDATED (Fixed to properly return false)
  const validateForm = () => {
    if (!form.title.trim()) { toast.error("Material title required"); return false; }
    if (!form.subject.trim()) { toast.error("Subject required"); return false; }
    if (!form.classLevel) { toast.error("Select class"); return false; }
    if (!form.board) { toast.error("Select board"); return false; }
    if (form.files.length === 0) { toast.error("Add at least 1 file slot"); return false; }

    const hasEmptyFiles = form.files.some(f => !f.fileObject);
    if (hasEmptyFiles) { toast.error("Please upload documents for all open slots, or remove the empty slots."); return false; }

    return true;
  };

  const resetForm = () => {
    setForm({ title: "", subject: "", classLevel: "", board: "", files: [] });
    setEditId(null);
  };

  // ✅ MAIN UPDATED SUBMIT (FORMDATA + API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const loadToast = toast.loading(editId ? "Updating material..." : "Uploading material...");

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("subject", form.subject);
      formData.append("classLevel", form.classLevel);
      formData.append("board", form.board);

      // ⭐ FILES
      form.files.forEach(file => {
        formData.append("files", file.fileObject);
      });

      if (editId) {
        await axios.put(`${API_URL}/api/materials/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Material Updated!", { id: loadToast });
      } else {
        await axios.post(`${API_URL}/api/materials`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Material Uploaded!", { id: loadToast });
      }

      resetForm();
      fetchMaterials();
    } catch (err) {
      toast.error("Upload failed. Please try again.", { id: loadToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title,
      subject: item.subject,
      classLevel: item.classLevel,
      board: item.board,
      files: [], // Reset files for safety (requires re-uploading on edit for now)
    });
    setEditId(item._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ✅ ADDED SWEETALERT DELETION CONFIRMATION
  const handleDelete = (id) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this study material?",
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
          await axios.delete(`${API_URL}/api/materials/${id}`);
          toast.success("Material deleted successfully");
          if (editId === id) resetForm(); 
          fetchMaterials();
        } catch (err) {
          toast.error("Error deleting material");
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
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Study Material Management</h2>
          <p className="text-sm text-slate-500">Upload notes, question papers, and resources for students.</p>
        </div>
        <div className="bg-blue-50 p-3 rounded-full text-blue-600">
          <BookOpen size={28} />
        </div>
      </div>

      {/* FORM SECTION */}
      <section className={`bg-white p-8 rounded-3xl border shadow-sm transition-colors ${editId ? 'border-blue-300 ring-4 ring-blue-50' : 'border-slate-100'}`}>
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${editId ? 'bg-blue-100' : 'bg-blue-50'}`}>
                {editId ? <Pencil className="text-blue-600" size={20} /> : <FilePlus className="text-blue-600" size={20} />}
              </div>
              <h3 className="font-bold text-slate-800 text-lg">
                {editId ? "Update Material" : "Upload New Material"}
              </h3>
            </div>
            {editId && (
              <span className="text-xs font-bold bg-blue-100 text-blue-600 px-3 py-1 rounded-full animate-pulse">
                Editing Mode
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Title */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase">Document Title</label>
              <input
                required
                placeholder="e.g. Chapter 1: Thermodynamics Notes"
                className="w-full border border-slate-200 p-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            {/* Subject */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase">Subject</label>
              <input
                required
                placeholder="e.g. Physics"
                className="w-full border border-slate-200 p-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
            </div>

            {/* Class Level */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2">
                <GraduationCap size={14} /> Class / Grade
              </label>
              <select
                required
                className="w-full border border-slate-200 p-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 bg-white"
                value={form.classLevel}
                onChange={(e) => setForm({ ...form, classLevel: e.target.value })}
              >
                <option value="">Select Class</option>
                {["5", "6", "7", "8", "9", "10", "11 Science", "11 Commerce", "12 Science", "12 Commerce", "Competitive Exams"].map((val) => (
                  <option key={val} value={val}>{val.includes("Science") || val.includes("Commerce") || val.includes("Competitive") ? val : `Class ${val}th`}</option>
                ))}
              </select>
            </div>

            {/* Board */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2">
                <BookOpen size={14} /> Board
              </label>
              <select
                required
                className="w-full border border-slate-200 p-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 bg-white"
                value={form.board}
                onChange={(e) => setForm({ ...form, board: e.target.value })}
              >
                <option value="">Select Board</option>
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="State Board">State Board</option>
                <option value="All Boards">All Boards / Generic</option>
              </select>
            </div>
          </div>

          {/* FILE UPLOAD SECTION */}
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-800">Attached Files</h4>
                <p className="text-xs text-slate-500">Upload PDFs, Word documents, or Images (Max 5MB each)</p>
              </div>
              <button 
                type="button" 
                onClick={addFileSlot}
                className="flex items-center gap-1.5 bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
              >
                <Plus size={16} /> Add Slot
              </button>
            </div>

            {form.files.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-slate-300 rounded-2xl text-slate-400 text-sm font-medium">
                No files added yet. Click "Add Slot" to upload.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {form.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2 bg-blue-50 text-blue-500 rounded-lg shrink-0">
                        <FileText size={20} />
                      </div>
                      <div className="overflow-hidden">
                        {file.fileObject ? (
                          <p className="text-sm font-bold text-slate-700 truncate w-32 md:w-48">{file.fileName}</p>
                        ) : (
                          <label className="text-sm font-bold text-blue-600 hover:underline cursor-pointer">
                            Browse File...
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) => handleLocalFileUpload(index, e)}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => removeFile(index)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors shrink-0"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DYNAMIC BUTTON CLUSTER */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 text-white font-bold py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.99]
                ${editId ? 'bg-blue-700 shadow-blue-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'}`}
            >
              {isSubmitting ? (
                <><Loader2 size={20} className="animate-spin" /> Processing...</>
              ) : (
                <>{editId ? "Update Material" : <><Upload size={20} /> Publish Material</>}</>
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
          <h3 className="font-bold text-slate-800 text-lg">Resource Library</h3>
          <span className="bg-blue-100 text-blue-600 text-xs px-2.5 py-1 rounded-full font-bold">{materials.length} Documents</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-[0.15em] border-b border-slate-100">
                  <th className="px-6 py-5 font-bold">Material Info</th>
                  <th className="px-6 py-5 font-bold">Class Details</th>
                  <th className="px-6 py-5 font-bold">Attachments</th>
                  <th className="px-6 py-5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {materials.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-12 text-slate-400 text-sm italic">
                      No materials found in the library.
                    </td>
                  </tr>
                ) : (
                  materials.map((m) => (
                    <tr key={m._id} className={`transition-colors group ${editId === m._id ? 'bg-blue-50/50' : 'hover:bg-slate-50/50'}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                            <BookOpen size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800 line-clamp-1">{m.title}</p>
                            <p className="text-xs text-slate-500">{m.subject}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs text-slate-600 font-bold uppercase tracking-tight">Class {m.classLevel}</p>
                        <p className="text-[10px] text-slate-400">{m.board}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold">
                          <FileText size={14} className="text-blue-500" />
                          {m.files?.length || 0} Files
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(m)} 
                            className="p-2.5 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"
                            title="Edit Material"
                          >
                            <Pencil size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(m._id)}
                            className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                            title="Delete Material"
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