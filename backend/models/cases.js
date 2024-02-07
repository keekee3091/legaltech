const mongoose = require('mongoose');

const casesSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ['employment', 'rental', 'partnership', 'other'], required: true },
    status: { type: String, enum: ['draft', 'under review', 'executed', 'terminated'], default: 'draft' },
    expirationDate: { type: Date },
    caseNumber: { type: String, unique: true, required: true },
    jurisdiction: { type: String },
    court: { type: String },
    judge: { type: String },
    lawyers: [{ type: String }],
    filingDate: { type: Date },
    hearingDates: [{ type: Date }],
    outcome: { type: String },
    notes: { type: String },
    keyDates: [{
        title: { type: String },
        date: { type: Date }
    }],
    attachments: [{
        filename: { type: String },
        url: { type: String }
    }],
    parties: [{
        name: { type: String, required: true },
        role: { type: String },
        contactDetails: {
            email: { type: String },
            phone: { type: String },
            address: { type: String }
        }
    }],
    customFields: [{
        name: { type: String },
        value: { type: String }
    }],
    versionHistory: [{
        versionNumber: { type: Number },
        changes: { type: String },
        modifiedBy: { type: String },
        timestamp: { type: Date, default: Date.now }
    }],
    notifications: [{
        type: { type: String },
        date: { type: Date }
    }],
    auditTrail: [{
        action: { type: String },
        user: { type: String },
        timestamp: { type: Date, default: Date.now }
    }],
}, { timestamps: true });

const Case = mongoose.model('cases', casesSchema);

module.exports = Case;
