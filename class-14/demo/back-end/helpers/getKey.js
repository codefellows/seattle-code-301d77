'use strict';

const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: 'https://dev-4rwdhvtd.us.auth0.com/.well-known/jwks.json'
});

module.exports = (header, callback) => {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}
