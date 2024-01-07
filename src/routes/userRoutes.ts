import express from 'express'
import { deleteProfile, getAllUsers, loadUser, login, logoutUser, register, updateProfile } from '../controllers/userCtrl';
import { isAuthenticatedUser } from '../middlewares/auth';

const router = express.Router();

router.route('/users').get(getAllUsers);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logoutUser);
router.route('/me').get(isAuthenticatedUser, loadUser);
router.route('/update').put(isAuthenticatedUser,updateProfile);
router.route('/delete').delete(isAuthenticatedUser, deleteProfile);

export default router;