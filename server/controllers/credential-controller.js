import { encrypt, decrypt } from '../config/aes-util.js';
import Credential from '../models/credential-model.js';
import Category from '../models/category-model.js';

export const createCredential = async (req, res) => {
    try {
        const { site, username, password, notes, name, platform, category } = req.body;

        if (!site || !username || !password || !name || !platform || !category) {     
            return res.status(400).json({ success: false, message: 'Missing details' });
        }

        let existingCategory = await Category.findOne({ 
            userId: req.userId, 
            name: category.trim() 
        });

        if (!existingCategory) {
            existingCategory = new Category({
                userId: req.userId,
                name: category.trim(),
                color: '#3B82F6',
                isDefault: false
            });
            await existingCategory.save();
        }

        const encryptedPassword = encrypt(password);

        const credential = new Credential({
            userId: req.userId,
            site,
            username,
            password: encryptedPassword,
            notes,
            name,
            platform,
            category: existingCategory.name
        });

        await credential.save();
        res.status(201).json({ success: true, credential: { ...credential.toObject(), password } });
    } catch (err) {
        console.error('Error creating credential:', err);
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
       const { site, username, password, notes, name, platform, category } = req.body;
        const update = {};
        
        if (site) update.site = site;
        if (username) update.username = username;
        if (password) update.password = encrypt(password);
        if (notes !== undefined) update.notes = notes;
        if (name) update.name = name;
        if (platform) update.platform = platform;
        
        if (category) {
            let existingCategory = await Category.findOne({ 
                userId: req.userId, 
                name: category.trim() 
            });

            if (!existingCategory) {
                existingCategory = new Category({
                    userId: req.userId,
                    name: category.trim(),
                    color: '#3B82F6', 
                    isDefault: false
                });
                await existingCategory.save();
            }
            
            update.category = existingCategory.name;
        }

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

export const searchCredentials = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query || query.trim() === '') {
            const credentials = await Credential.find({ userId: req.userId }).sort({ updatedAt: -1 });
            const decrypted = credentials.map(c => ({
                ...c.toObject(),
                password: decrypt(c.password)
            }));
            return res.json({ success: true, credentials: decrypted });
        }

        const searchRegex = new RegExp(query, 'i');
        const credentials = await Credential.find({
            userId: req.userId,
            $or: [
                { site: searchRegex },
                { name: searchRegex },
                { username: searchRegex },
                { notes: searchRegex },
                { category: searchRegex }
            ]
        }).sort({ updatedAt: -1 });

        const decrypted = credentials.map(c => ({
            ...c.toObject(),
            password: decrypt(c.password)
        }));
        
        res.json({ success: true, credentials: decrypted });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to search credentials.' });
    }
}

export const recordAutofill = async (req, res) => {
    try {
        const { site, username } = req.body;
        if (!site) {
            return res.status(400).json({ success: false, message: 'Missing site' });
        }

        // Normalize incoming origin hostname (strip www)
        let originHost = null;
        try {
            originHost = new URL(site).hostname.replace(/^www\./, '');
        } catch (_) {
            originHost = site;
        }

        // Fetch user's credentials and find best match by hostname and optional username
        const all = await Credential.find({ userId: req.userId }).sort({ updatedAt: -1 });
        const candidates = all.filter((c) => {
            try {
                if (!c.site) return false;
                const host = new URL(c.site).hostname.replace(/^www\./, '');
                const hostMatches = host === originHost || host.endsWith('.' + originHost) || originHost.endsWith('.' + host);
                const usernameMatches = typeof username === 'string' && username.trim() !== '' ? c.username === username : true;
                return hostMatches && usernameMatches;
            } catch (_) {
                return false;
            }
        });

        if (candidates.length === 0) {
            return res.status(404).json({ success: false, message: 'Credential not found.' });
        }

        // Prefer exact hostname match; fallback to first candidate
        const exact = candidates.find((c) => {
            try {
                return new URL(c.site).hostname.replace(/^www\./, '') === originHost;
            } catch (_) {
                return false;
            }
        });
        const target = exact || candidates[0];

        target.lastAutofill = new Date();
        await target.save();

        res.json({ success: true, credential: { ...target.toObject(), password: decrypt(target.password) } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to record autofill.' });
    }
}