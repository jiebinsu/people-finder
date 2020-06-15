import express from "express";
import peopleController from "../../controllers/people";

const router = express.Router();

router.route("/people").get(peopleController.getPeopleFromLondon);

export default router;
