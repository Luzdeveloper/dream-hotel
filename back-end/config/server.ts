module.exports = ({ env }) => ({
  host: env('HOST', 'localhost'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', ['f3g7h8j2k9l1m0n3o5p', 'q2w3e4r5t6y7u8i9o0p']),
  },
});