import mongoose from 'mongoose';

// Define the data structure and field types for a company
const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  industry: String,
});

// Export existing model or create a new one if it doesn't exist
export default mongoose.models.Company || mongoose.model('Company', CompanySchema);