import { encrypt, decrypt } from '../config/aes-util.js';
import Credential from '../models/credential-model.js';

export const createCredential = async (req, res) => {
    try {
        const { site, username, password, notes } = req.body;
        if (!site || !username || !password) {
            return res.status(400).json({ success: false, message: 'Site, username, and password are required.' });
        }
        const encryptedPassword = encrypt(password);
        const credential = new Credential({
            userId: req.userId,
            site,
            username,
            password: encryptedPassword,
            notes
        });
        await credential.save();
        res.status(201).json({ success: true, credential: { ...credential.toObject(), password } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to save credential.' });
    }
}

export const getCredentials = async (req, res) => {
    try {
        const credentials = await Credential.find({ userId: req.userId }).sort({ updatedAt: -1 });
        const decrypted = credentials.map(c => ({
            ...c.toObject(),
            password: decrypt(c.password)
        }));
        res.json({ success: true, credentials: decrypted });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch credentials.' });
    }
}

export const editCredential = async (req, res) => {
    try {
        const { site, username, password, notes } = req.body;
        const update = {};
        if (site) update.site = site;
        if (username) update.username = username;
        if (password) update.password = encrypt(password);
        if (notes !== undefined) update.notes = notes;
        const credential = await Credential.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            { $set: update },
            { new: true }
        );
        if (!credential) {
            return res.status(404).json({ success: false, message: 'Credential not found.' });
        }
        res.json({ success: true, credential: { ...credential.toObject(), password: password ? password : decrypt(credential.password) } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update credential.' });
    }
}

export const deleteCredential = async (req, res) => {
    try {
        const credential = await Credential.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        if (!credential) {
            return res.status(404).json({ success: false, message: 'Credential not found.' });
        }
        res.json({ success: true, message: 'Credential deleted.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete credential.' });
    }
}