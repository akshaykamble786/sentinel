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
    enum: ["Logins", "Addresses", "Financials"], 
    required: true 
  },
  category: { 
    type: String, 
    enum: ["Important", "Social media", "Streaming", "Sports"], 
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
  }
}, { timestamps: true });

export default mongoose.model('Credential', credentialSchema);