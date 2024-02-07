const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['lawyer', 'paralegal', 'admin', 'client'], required: true },
    name: { type: String },
    contactDetails: {
        phone: { type: String },
        address: { type: String },
        organization: { type: String },
        professionalQualifications: { type: String },
        barAssociationMembership: { type: String }
    },
    practiceAreas: [{ type: String }],
    documentPreferences: {
        formatting: { type: String },
        language: { type: String },
        citationStyle: { type: String }
    },
    documentTemplates: [{ name: String, content: String }],
    cases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cases' }],
    clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'clients' }],
    activityLogs: [{ action: String, timestamp: Date }],
    notificationPreferences: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false }
    },
    integrationPreferences: {
        eDiscovery: { type: Boolean, default: false },
        legalResearch: { type: Boolean, default: false },
        billingSoftware: { type: Boolean, default: false }
    },
    subscription: {
        plan: { type: String },
        status: { type: String },
        nextBillingDate: { type: Date },
        paymentMethod: { type: String },
        invoices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }]
    },
    securitySettings: {
        dataEncryption: { type: Boolean, default: true },
        twoFactorAuth: { type: Boolean, default: false },
        consentManagement: { type: Boolean, default: true }
    }
}, { timestamps: true });

const User = mongoose.model('users', userSchema);

module.exports = User;
