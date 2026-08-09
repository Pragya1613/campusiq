import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import PublicLayout from "../layouts/PublicLayout";

import {
  getAIScanHistory,
  getAIScanById,
  deleteAIScan,
} from "../services/aiService";

import AIScanCard from "../components/ai/AIScanCard";
import AIReviewModal from "../components/ai/AIReviewModal";
import ConfirmModal from "../components/ConfirmModal";

function AIScanPage() {
  const [loading, setLoading] = useState(true);

  const [scans, setScans] = useState([]);

  const [selectedScan, setSelectedScan] = useState(null);

  const [showReviewModal, setShowReviewModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  useEffect(() => {
    fetchAIScans();
  }, []);

  const fetchAIScans = async () => {
    try {
      const response = await getAIScanHistory();

      console.log("AI Scan History:", response);

      setScans(response.data);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load AI Scan history."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleViewReport = async (id) => {
    try {
      const response = await getAIScanById(id);

      setSelectedScan(response.data);

      setShowReviewModal(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load report."
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAIScan(selectedDeleteId);

      toast.success("AI Report deleted successfully.");

      setShowDeleteModal(false);

      setSelectedDeleteId(null);

      fetchAIScans();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete report."
      );
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-12">

          {/* =========================
              PAGE HEADER
          ========================= */}

          <div className="mb-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

              <div>
                <p className="text-sm font-semibold tracking-[0.22em] text-orange-500 uppercase mb-3">
                  AI RESUME ANALYSIS
                </p>

                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#172554]">
                  AI Resume Scans
                </h1>

                <p className="mt-3 text-base lg:text-lg text-slate-500 max-w-2xl">
                  View your saved AI resume reports and placement
                  analysis in one place.
                </p>
              </div>

              {/* Scan count */}
              {!loading && scans.length > 0 && (
                <div className="flex items-center gap-2 self-start md:self-auto bg-white border border-slate-200 rounded-full px-4 py-2.5 shadow-sm">
                  <i className="fa-solid fa-file-lines text-blue-500"></i>

                  <span className="text-sm font-medium text-slate-600">
                    {scans.length}{" "}
                    {scans.length === 1 ? "Scan" : "Scans"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* =========================
              MAIN CONTENT
          ========================= */}

          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 lg:p-8">

            {/* Section heading */}

            <div className="flex items-center gap-4 mb-7 pb-5 border-b border-slate-100">

              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <i className="fa-solid fa-file-waveform text-xl text-[#172554]"></i>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#172554]">
                  Your Resume Analysis
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Review your previous AI-powered resume reports.
                </p>
              </div>

            </div>

            {/* =========================
                EMPTY STATE
            ========================= */}

            {!loading && scans.length === 0 && (
              <div className="border border-dashed border-slate-300 rounded-2xl p-12 lg:p-16 text-center bg-slate-50/60">

                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mx-auto">

                  <i className="fa-solid fa-file-circle-xmark text-3xl text-slate-400"></i>

                </div>

                <h2 className="text-xl lg:text-2xl font-bold text-[#172554] mt-5">
                  No Resume Analysis Found
                </h2>

                <p className="text-slate-500 mt-2 max-w-md mx-auto">
                  Analyze your resume to generate your first AI
                  report.
                </p>

              </div>
            )}

            {/* =========================
                LOADING
            ========================= */}

            {loading && (
              <div className="py-16 text-center">

                <div className="w-10 h-10 border-4 border-slate-200 border-t-[#172554] rounded-full animate-spin mx-auto"></div>

                <p className="mt-4 text-sm font-medium text-slate-500">
                  Loading your AI reports...
                </p>

              </div>
            )}

            {/* =========================
                SCAN CARDS
            ========================= */}

            {!loading && scans.length > 0 && (
              <div className="space-y-6">

                {scans.map((scan, index) => (
                  <AIScanCard
                    key={scan._id}
                    scan={scan}
                    serial={index + 1}
                    onView={handleViewReport}
                    onDelete={(id) => {
                      setSelectedDeleteId(id);

                      setShowDeleteModal(true);
                    }}
                  />
                ))}

              </div>
            )}

          </div>
        </div>
      </div>

      {/* =========================
          AI REVIEW MODAL
      ========================= */}

      <AIReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        data={selectedScan}
      />

      {/* =========================
          DELETE CONFIRMATION
      ========================= */}

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete AI Report"
        message="Are you sure you want to delete this AI report?"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </PublicLayout>
  );
}

export default AIScanPage;