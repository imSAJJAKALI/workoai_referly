import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom"
import {
  fetchCandidates,
  deleteCandidate,
  updateCandidateStatus,
} from "../features/candidate/candidateSlice";
import toast from "react-hot-toast";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { list: candidates, loading } = useSelector(
    (state) => state.candidates
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCandidate(id))
      .unwrap()
      .then(() => toast.success("Candidate deleted"))
      .catch((err) => toast.error(err || "Failed to delete"));
  };

const handleStatusChange = (id, status) => {
  dispatch(updateCandidateStatus({ id, status }))
    .unwrap()
    .then(() => {
      toast.success("Status updated");
      dispatch(fetchCandidates()); // ✅ fetch only after success
    })
    .catch((err) => toast.error(err || "Failed to update"));
};


  const filteredCandidates = candidates?.filter((candidate) => {
    const jobTitle = candidate?.jobTitle?.toLowerCase() || "";
    const status = candidate?.status?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();
    return jobTitle.includes(term) || status.includes(term);
  });

  return (
    <div className="p-4 max-w-7xl mx-auto mb-20 ">
      <h2 className="text-2xl font-bold mb-4">Referred Candidates</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by job title or status"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-1/2 mb-6 p-2 border rounded shadow-sm"
      />

      {/* Loading */}
      {loading && <p className="text-blue-500">Loading candidates...</p>}

      {/* Candidates Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filteredCandidates?.map((candidate) => (
          <div
    key={candidate._id}
    
    className="block bg-white p-4 rounded shadow hover:shadow-md transition hover:scale-[1.01]"
  >
            <Link to={`/candidate/${candidate._id}`}>
            <h3 className="text-lg font-semibold">
              {candidate?.fullName || "N/A"}
            </h3>
            <p className="text-sm text-gray-600">
              Job: {candidate?.jobTitle || "N/A"}
            </p>
            <span className="text-blue-600">
              {candidate?.status || "Pending"}
            </span>
          </Link>
            {/* Actions */}
            <div className="flex items-center justify-between mt-4">
              {/* Delete */}
              <button
                onClick={() => handleDelete(candidate._id)}
                className="text-red-600 hover:underline text-sm"
              >
                Delete
              </button>

              {/* Update Status Dropdown */}
              <select
                value={candidate.status}
                onChange={(e) =>
                  handleStatusChange(candidate?._id, e.target.value)
                }
                className="text-sm p-1 border rounded"
              >
                <option>Pending</option>
                <option>Reviewed</option>
                <option>Hired</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {!filteredCandidates.length && !loading && (
        <p className="text-center text-gray-500 mt-6">No candidates found.</p>
      )}
    </div>
  );
};

export default Dashboard;
