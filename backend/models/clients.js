const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactPerson: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    organization: { type: String },
    industry: { type: String },
    size: { type: String },
    location: { type: String },
    communicationHistory: [{
        channel: { type: String },
        timestamp: { type: Date, default: Date.now },
        notes: { type: String }
    }],
    billingInformation: {
        billingAddress: { type: String },
        paymentTerms: { type: String },
        invoicingPreferences: { type: String },
        outstandingBalance: { type: Number, default: 0 }
    },
    caseHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cases' }],
    documents: [{
        name: { type: String },
        description: { type: String },
        uploadDate: { type: Date, default: Date.now },
    }],
    relationshipType: { type: String, enum: ['retained', 'prospective', 'former'] },
    conflictsChecking: {
        conflicts: [{ type: String }],
        checksPerformed: { type: Boolean, default: false },
        resolutionSteps: { type: String }
    },
    clientPortalAccess: {
        username: { type: String },
        password: { type: String },
    },
    statutoryRequirements: {
        intakeForm: { type: String },
        engagementLetter: { type: String },
        disclosureStatement: { type: String },
    },
    clientPreferences: {
        communicationMethod: { type: String },
        caseUpdates: { type: String },
        billingFormat: { type: String },
    },
    referralSource: { type: String },
}, { timestamps: true });

const Client = mongoose.model('clients', clientSchema);

module.exports = Client;
