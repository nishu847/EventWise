import { Router } from "express";
import { createEvent, deleteEvent, getallEvents, getParticularEvent, updateEvent } from "../controller/events.js";
import { verifyJWT } from "../middleware/authVerify.js";
import { authorize } from "../middleware/roleAuth.js";
const router=Router();

router.route("/").get(getallEvents);
router.route("/create").post(createEvent);
router.route("/edit/:eventId").put(updateEvent)
router.route("/:eventId").delete(deleteEvent)
router.route("/:eventId").get(getParticularEvent)
export default router