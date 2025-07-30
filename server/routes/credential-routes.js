import express from 'express';
import userAuth from '../middlewares/user-auth.js';
import { createCredential, deleteCredential, editCredential, getCredentials } from '../controllers/credential-controller.js';

const credentialRouter = express.Router();

router.post('/', userAuth, createCredential);
router.get('/', userAuth, getCredentials);
router.put('/:id', userAuth, editCredential);
router.delete('/:id', userAuth, deleteCredential);

export default credentialRouter;