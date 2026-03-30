import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { submitProject, mySubmission, listAllSubmissions, listPublicSubmissions } from "../controllers/submission.controller.js";

const r = Router({ mergeParams: true });
r.get("/public", listPublicSubmissions);
r.get("/mine", requireAuth, mySubmission);
r.post("/", requireAuth, submitProject);
r.get("/all", requireAuth, requireRole("ORGANIZER"), listAllSubmissions);
export default r;