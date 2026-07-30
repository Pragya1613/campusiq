import { useEffect, useState } from "react";
import { useParams, Link , useNavigate} from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import LoadingSkeleton from "../components/interview/LoadingSkeleton";
import toast from "react-hot-toast";

import {
  getExperienceById,
  toggleUpvote,
  deleteExperience,
} from "../services/experienceService";

import CommentSection from "../components/interview/CommentSection";

function ExperienceDetailsPage() {
  // ==========================
  // Hooks
  // ==========================

  const { id } = useParams();

  const navigate = useNavigate();

  const [experience, setExperience] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==========================
  // Fetch Experience
  // ==========================

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getExperienceById(id);

        setExperience(data);
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            "Failed to load interview experience."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id]);

  // ==========================
  // Upvote
  // ==========================

  const handleUpvote = async () => {
    try {
      const data = await toggleUpvote(id);

    setExperience((prev) => ({
      ...prev,
      upvoteCount: data.upvoteCount,
      upvoted: data.upvoted,
    }));

    } catch (err) {
      console.error(err);
    }
  };

  
  const handleDelete = async () => {
  if (
    !window.confirm(
      "Delete this interview experience?"
    )
  )
    return;

  try {
    const data = await deleteExperience(id);

    toast.success(data.message);

    navigate(
      `/experiences/${encodeURIComponent(
        companyName
      )}`
    );
  } catch (err) {
    console.error(err);

    toast.error(
      err.response?.data?.message ||
        "Failed to delete experience."
    );
  }
};

  // ==========================
  // Loading
  // ==========================

  if (loading) {
    return (
      <PublicLayout>
        <div className="max-w-5xl mx-auto py-10 px-6">
          <LoadingSkeleton />
        </div>
      </PublicLayout>
    );
  }

  // ==========================
  // Error
  // ==========================

  if (error) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <h2 className="text-red-600 text-xl font-semibold">
            {error}
          </h2>
        </div>
      </PublicLayout>
    );
  }

  const {
    companyName,
    title,
    roleApplied,
    package: salaryPackage,
    experience: experienceText,
    interviewProcess,
    tips,
    anonymous,
    student,
    createdAt,
    upvoteCount,
    commentCount,
  } = experience;

  return (
    <PublicLayout>
      <div className="min-h-screen bg-slate-50 py-10">
        <div className="max-w-5xl mx-auto px-6">

          {/* Back Button */}

          <Link
            to={`/experiences/${encodeURIComponent(companyName)}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
          >
            <i className="fa-solid fa-arrow-left"></i>

            Back to Experiences
          </Link>

          {/* Card */}

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

            {/* Header */}

            <div className="flex justify-between items-start flex-wrap gap-5">

              <div>

                <h1 className="text-3xl font-bold text-slate-800">
                  {title}
                </h1>

                <p className="text-slate-500 mt-2">
                  {companyName}
                </p>

              </div>

              <div className="text-right">

                <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">
                  {roleApplied}
                </span>

              </div>

            </div>

            {/* Student */}

            <div className="mt-8 flex items-center gap-3">

              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">

                <i className="fa-solid fa-user text-blue-600"></i>

              </div>

              <div>

                <h3 className="font-semibold text-slate-800">
                  {anonymous
                    ? "Anonymous"
                    : student?.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {new Date(createdAt).toLocaleDateString()}
                </p>

              </div>

            </div>

            {/* Package */}

            {salaryPackage && (
              <div className="mt-8">

                <h2 className="font-semibold text-slate-700 mb-2">
                  Package
                </h2>

                <p className="text-green-700 font-medium">
                  {salaryPackage}
                </p>

              </div>
            )}

            {/* Experience */}

            <div className="mt-8">

              <h2 className="text-xl font-semibold mb-3">
                Experience
              </h2>

              <p className="text-slate-700 leading-8 whitespace-pre-line">
                {experienceText}
              </p>

            </div>

            {/* Interview Process */}

            <div className="mt-8">

              <h2 className="text-xl font-semibold mb-3">
                Interview Process
              </h2>

              <p className="text-slate-700 leading-8 whitespace-pre-line">
                {interviewProcess}
              </p>

            </div>

            {/* Tips */}

            {tips && (
              <div className="mt-8">

                <h2 className="text-xl font-semibold mb-3">
                  Tips
                </h2>

                <p className="text-slate-700 leading-8 whitespace-pre-line">
                  {tips}
                </p>

              </div>
            )}

            {/* Footer */}

            <div className="mt-10 flex gap-6 items-center">

              <button
                onClick={handleUpvote}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
              >
              <i
                className={`fa-${
                  experience.upvoted ? "solid" : "regular"
                } fa-thumbs-up`}
              ></i>

                {upvoteCount}
              </button>

              <div className="flex items-center gap-2 text-slate-700">

                <i className="fa-solid fa-comments"></i>

                {commentCount} Comments

              </div>

            </div>


            {experience.isOwner && (
              <div className="mt-8 flex gap-4">
            
                <Link
                  to={`/edit-experience/${experience._id}`}
                  className="px-5 py-3 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition flex items-center gap-2"
                >
                  <i className="fa-solid fa-pen"></i>
                  Edit
                </Link>
            
                <button
                  onClick={handleDelete}
                  className="px-5 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2"
                >
                  <i className="fa-solid fa-trash"></i>
                  Delete
                </button>


                
            
              </div>
            )}

            <CommentSection experienceId={id} />

          </div>

        </div>
      </div>
    </PublicLayout>
  );
}

export default ExperienceDetailsPage;