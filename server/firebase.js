const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
};

// Initialize Firebase only if credentials are provided
if (serviceAccount.projectId && serviceAccount.privateKey && serviceAccount.clientEmail) {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log('Firebase initialized successfully');
    }
} else {
    console.warn('Firebase credentials not found. Please check your .env file.');
}

const db = admin.firestore();

module.exports = {
    admin,
    db
};
