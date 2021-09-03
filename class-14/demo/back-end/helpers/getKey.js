'use strict';

const jwksClient = require('jwks-rsa');

// get yours from Auth0 dashboard
// must match the domain used in AuthProvider on React side
const domain = 'dev-in7xzmle.us.auth0.com';

const client = jwksClient({
  jwksUri: `https://${domain}/.well-known/jwks.json`
});

module.exports = (header, callback) => {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}
