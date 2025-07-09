import Candidate from '../models/candidatesModel.js';
import { isValidEmail, isValidPhone } from '../utils/validator.js';

import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../config/s3Client.js";

export const createCandidate = async (req, res) => {
  try {
    const { fullName, email, phone, jobTitle } = req.body;
    const file = req.file;

    if (!fullName || !email || !phone || !jobTitle || !file) {
      return res.status(400).json({ message: "All fields including resume are required." });
    }

    if (!isValidEmail(email)) return res.status(400).json({ message: "Invalid email format." });
    if (!isValidPhone(phone)) return res.status(400).json({ message: "Invalid phone number." });

    // Upload resume to S3
    const fileName = `resumes/${Date.now()}-${file.originalname}`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read", 
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const resume = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    // Save candidate in DB
    const candidate = await Candidate.create({
      fullName,
      email,
      phone,
      jobTitle,
      resume,
      status: "Pending",
    });

    res.status(201).json({ message: "Candidate referred successfully.", candidate });
  } catch (error) {
    console.error("Error uploading to S3 or saving candidate:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

export const updateCandidateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Reviewed', 'Hired'].includes(status))
      return res.status(400).json({ message: 'Invalid status.' });

    const updated = await Candidate.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Candidate not found.' });

    res.status(200).json({ message: 'Status updated.', candidate: updated });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

export const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    await Candidate.findByIdAndDelete(id);
    res.status(200).json({ message: 'Candidate deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};