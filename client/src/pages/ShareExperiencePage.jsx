import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PublicLayout from "../layouts/PublicLayout";
import { createExperience } from "../services/experienceService";

function ShareExperiencePage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    title: "",
    roleApplied: "",
    package: "",
    experience: "",
    interviewProcess: "",
    tips: "",
    anonymous: false,
  });

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      companyName,
      title,
      roleApplied,
      experience,
      interviewProcess,
    } = formData;

    if (
      !companyName.trim() ||
      !title.trim() ||
      !roleApplied.trim() ||
      !experience.trim() ||
      !interviewProcess.trim()
    ) {
      return toast.error("Please fill all required fields.");
    }

    try {
      setLoading(true);

      const res = await createExperience(formData);

      toast.success(
        res.message || "Experience shared successfully."
      );

      navigate("/experiences");
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to share experience."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-slate-50 py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

          <h1 className="text-3xl font-bold text-slate-800">
            Share Interview Experience
          </h1>

          <p className="text-slate-500 mt-2 mb-8">
            Help juniors by sharing your interview journey.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="block mb-2 font-medium text-slate-700">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g. Microsoft"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-slate-700">
                  Role Applied <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="roleApplied"
                  value={formData.roleApplied}
                  onChange={handleChange}
                  placeholder="e.g. SDE Intern"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Short title of your experience"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Package (Optional)
              </label>
              <input
                type="text"
                name="package"
                value={formData.package}
                onChange={handleChange}
                placeholder="e.g. 18 LPA"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Experience <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={6}
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Share your complete interview experience..."
                className="w-full border border-slate-300 rounded-lg px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Interview Process <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                name="interviewProcess"
                value={formData.interviewProcess}
                onChange={handleChange}
                placeholder="OA, Technical Round, HR Round..."
                className="w-full border border-slate-300 rounded-lg px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Tips (Optional)
              </label>
              <textarea
                rows={4}
                name="tips"
                value={formData.tips}
                onChange={handleChange}
                placeholder="Any tips for juniors..."
                className="w-full border border-slate-300 rounded-lg px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="anonymous"
                checked={formData.anonymous}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span className="text-slate-700">
                Share this experience anonymously
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? "Sharing..." : "Share Experience"}
            </button>

           </form>

        </div>
      </div>
    </PublicLayout>
  );
}

export default ShareExperiencePage;

