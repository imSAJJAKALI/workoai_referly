import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addCandidate } from "../features/candidate/candidateSlice";

const ReferCandidate = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("jobTitle", data.jobTitle);
    if (data.resume[0]) {
      formData.append("resume", data.resume[0]);
    }

    try {
      await dispatch(addCandidate(formData)).unwrap();
      toast.success("Candidate referred successfully!");
      reset();
    } catch (err) {
      toast.error(err?.message || "Failed to refer candidate.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Refer a Candidate</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            {...register("fullName", { required: "Full name is required" })}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Sajjak Ali"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email format",
              },
            })}
            className="w-full mt-1 p-2 border rounded"
            placeholder="sajjak@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="text"
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Enter a valid 10-digit Indian number",
              },
            })}
            className="w-full mt-1 p-2 border rounded"
            placeholder="9876543210"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium">Job Title</label>
          <input
            type="text"
            {...register("jobTitle", { required: "Job title is required" })}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Frontend Developer"
          />
          {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle.message}</p>}
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block text-sm font-medium">Resume (PDF only)</label>
          <input
            type="file"
            accept=".pdf"
            {...register("resume", {
              validate: {
                isPdf: (files) =>
                  files.length === 0 || files[0].type === "application/pdf" || "Only PDF files allowed",
              },
            })}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.resume && <p className="text-red-500 text-sm">{errors.resume.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Referral
        </button>
      </form>
    </div>
  );
};

export default ReferCandidate;
