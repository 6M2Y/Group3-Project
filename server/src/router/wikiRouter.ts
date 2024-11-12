import express from 'express'
import * as services from '../Services/routeService'
// import { userValidationRules, handleValidationErrors } from '../Utils/validateUser';

const router = express.Router();

router.get('/', services.frontPage);  // Front page route
router.post('/signin', services.signin)
router.post('/signup', services.signupLogic)
router.post('/google-auth', services.signinWithGoogle)

export default router;