import express from "express";
import peopleController from "../../controllers/people";
import catchAsync from "../../middlewares/async-handler";

const router = express.Router();

router.route("/people").get(catchAsync(peopleController.getPeopleFromLondon));

export default router;
