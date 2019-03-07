const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    // Make sure that the req is made by an admin
    if (context.auth.token.admin !== true)
        return { error: true, message: 'Du har inte tillåtelse till detta.' };
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true,
        });
    }).then(() => {
        return {
            message: `${data.email} är nu en admin!`
        };
    }).catch(err => err);
});
