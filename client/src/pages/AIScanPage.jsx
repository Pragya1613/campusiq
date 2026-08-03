import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import PublicLayout from "../layouts/PublicLayout";
import { getAIScanHistory,
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

      const response =
        await getAIScanHistory();

      console.log("AI Scan History:", response);

      setScans(response.data);

    }

    catch (error) {

      console.error(error);

      toast.error(

        error.response?.data?.message ||

        "Failed to load AI Scan history."

      );

    }

    finally {

      setLoading(false);

    }

  };



const handleViewReport = async (id) => {

  try {

    const response =
      await getAIScanById(id);

    setSelectedScan(response.data);

    setShowReviewModal(true);

  }
  catch (error) {

    toast.error(

      error.response?.data?.message ||

      "Failed to load report."

    );

  }
};



const handleDelete = async () => {

  try {

    await deleteAIScan(selectedDeleteId);

    toast.success(
      "AI Report deleted successfully."
    );

    setShowDeleteModal(false);

    setSelectedDeleteId(null);

    fetchAIScans();

  }

  catch (error) {

    toast.error(

      error.response?.data?.message ||

      "Failed to delete report."

    );

  }

};



return (

  <PublicLayout>

    <div className="max-w-6xl mx-auto py-12 px-6">

      {/* Header */}

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10">

        <div className="text-center">

          <div className="w-24 h-24 rounded-3xl bg-slate-100 flex items-center justify-center mx-auto">

            <i className="fa-solid fa-file-waveform text-4xl text-[#172554]"></i>

          </div>

          <h1 className="text-5xl font-bold text-[#172554] mt-6">

            AI Resume Scans

          </h1>

          <p className="text-slate-500 mt-3">

            View all your saved AI resume reports and placement analysis.

          </p>

        </div>

        {/* Empty */}

        {!loading && scans.length === 0 && (

          <div className="mt-12 border rounded-2xl p-14 text-center">

            <i className="fa-solid fa-file-circle-xmark text-6xl text-slate-400"></i>

            <h2 className="text-2xl font-semibold mt-5">

              No Resume Analysis Found

            </h2>

            <p className="text-slate-500 mt-2">

              Analyze your resume to generate your first AI report.

            </p>

          </div>

        )}

        {/* Loading */}

        {loading && (

          <div className="mt-10 text-center">

            Loading...

          </div>

        )}

        {/* Cards */}

        {!loading && scans.length > 0 && (

          <div className="mt-12 space-y-6">

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



    <AIReviewModal
      isOpen={showReviewModal}
      onClose={() => setShowReviewModal(false)}
      data={selectedScan}
    />
          
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