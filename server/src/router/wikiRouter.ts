import express from 'express'
import * as services from '../Services/routeService'
import { userValidationRules, handleValidationErrors } from '../middlewares/validateUser';

const router = express.Router();

router.get('/', services.frontPage);  // Front page route
router.post('/signup', services.signupLogic)

export default router;