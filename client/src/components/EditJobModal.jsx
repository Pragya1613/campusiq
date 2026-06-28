import { useEffect, useState } from "react";

function EditJobModal({
  isOpen,
  onClose,
  onSave,
  selectedJob,
}) {
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    package: "",
    eligibilityCgpa: "",
    requiredSkills: "",
    deadline: "",
    description: "",
  });

  useEffect(() => {
    if (selectedJob) {
      setFormData({
        title: selectedJob.title || "",
        companyName: selectedJob.companyName || "",
        location: selectedJob.location || "",
        package: selectedJob.package || "",
        eligibilityCgpa:
          selectedJob.eligibilityCgpa || "",
        requiredSkills:
          selectedJob.requiredSkills?.join(", ") ||
          "",
        deadline: selectedJob.deadline
          ? selectedJob.deadline.substring(0, 10)
          : "",
        description:
          selectedJob.description || "",
      });
    }
  }, [selectedJob]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...formData,
      package: Number(formData.package),
      eligibilityCgpa: Number(
        formData.eligibilityCgpa
      ),
      requiredSkills:
        formData.requiredSkills
          .split(",")
          .map((skill) =>
            skill.trim()
          ),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-5">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-8 max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold text-[#172554]">

            Edit Job

          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-red-500"
          >
            ×
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <div className="grid md:grid-cols-2 gap-4">

            <input
              name="companyName"
              placeholder="Company"
              value={
                formData.companyName
              }
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="number"
              name="package"
              placeholder="Package"
              value={formData.package}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

            <input
              type="number"
              name="eligibilityCgpa"
              placeholder="Minimum CGPA"
              value={
                formData.eligibilityCgpa
              }
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

          </div>

          <textarea
            rows="3"
            name="requiredSkills"
            placeholder="Required Skills"
            value={
              formData.requiredSkills
            }
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <textarea
            rows="5"
            name="description"
            placeholder="Job Description"
            value={
              formData.description
            }
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <div className="flex justify-end gap-4 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#172554] text-white hover:bg-[#0f1d46]"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditJobModal;