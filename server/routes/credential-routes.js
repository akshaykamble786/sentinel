import express from 'express';
import userAuth from '../middlewares/user-auth.js';
import { createCredential, deleteCredential, editCredential, getCredentials } from '../controllers/credential-controller.js';

const credentialRouter = express.Router();

credentialRouter.post('/', userAuth, createCredential);
credentialRouter.get('/', userAuth, getCredentials);
credentialRouter.put('/:id', userAuth, editCredential);
credentialRouter.delete('/:id', userAuth, deleteCredential);

export default credentialRouter;