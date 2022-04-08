module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'e97be2ec9b34e79775184cca30c0abb5'),
  },
});
