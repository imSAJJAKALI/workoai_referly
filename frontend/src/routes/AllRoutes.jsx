import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoutes";
import ReferCandidate from "../pages/ReferCandidate";
import ErrorBoundary from "../pages/ErrorBoundary";
import CandidateDetails from "../pages/CandidatesDetails";


const AllRoutes = () => {
  return (
    <ErrorBoundary>
    <Routes>
      <Route path="/register" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/refer"
        element={
          <PrivateRoute>
            <ReferCandidate />
          </PrivateRoute>
        }
      />
      <Route
        path="/candidate/:id"
        element={
          <PrivateRoute>
            <CandidateDetails />
          </PrivateRoute>
        }
      />
    </Routes>
    </ErrorBoundary>
  );
};

export default AllRoutes;
