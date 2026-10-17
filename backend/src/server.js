const { createApp } = require('./app');

const PORT = process.env.PORT || 3000;

createApp().listen(PORT, () => {
  console.log(`GreenBox API démarrée sur http://localhost:${PORT} (env: ${process.env.APP_ENV || 'dev'})`);
});
