import mongoose from 'mongoose';

const credentialSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  site: {
    type: String,
    required: true
  },
  platform: { 
    type: String, 
    enum: ["Logins", "Addresses", "Identity"], 
    required: true 
  },
  category: { 
    type: String, 
    default: "Important"
  },
  name: { 
    type: String, 
    required: true 
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  lastAutofill: {
    type: Date,
    default: null
  }
}, { timestamps: true });

export default mongoose.model('Credential', credentialSchema);