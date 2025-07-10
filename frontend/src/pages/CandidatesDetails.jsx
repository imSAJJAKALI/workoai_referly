import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CandidateDetails = () => {
  const { id } = useParams();
  const { list: candidates, loading } = useSelector((state) => state.candidates);

  const candidate = candidates.find((c) => c._id === id);

  if (loading) return <p className="text-center mt-4 text-blue-600">Loading...</p>;
  if (!candidate) return <p className="text-center mt-4 text-red-600">Candidate not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">{candidate.fullName}</h2>
        <p><strong>Email:</strong> {candidate.email}</p>
        <p><strong>Phone:</strong> {candidate.phone}</p>
        <p><strong>Job Title:</strong> {candidate.jobTitle}</p>
        <p><strong>Status:</strong> {candidate.status}</p>
        <p><strong>Created:</strong> {new Date(candidate.createdAt).toLocaleString()}</p>

        {/* Resume Viewer */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Resume</h3>
          <div className="w-full h-[600px] border rounded overflow-hidden">
            <iframe
              src={candidate.resume}
              title="Candidate Resume"
              width="100%"
              height="100%"
              className="rounded"
              allow="autoplay"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;
