import express from 'express';
import { createCandidate, getAllCandidates, updateCandidateStatus, deleteCandidate } from '../controllers/candidateController.js';
import { upload } from '../middlewares/uploadMiddleware.js';
import { protect } from '../middlewares/authMiddleware.js';

const candidateRouter = express.Router();

candidateRouter.get('/get-all', protect, getAllCandidates);
candidateRouter.patch('/update/:id', protect, updateCandidateStatus);
candidateRouter.delete('/delete/:id', protect, deleteCandidate);
candidateRouter.post('/', protect, upload.single('resume'), createCandidate);

export default candidateRouter;
