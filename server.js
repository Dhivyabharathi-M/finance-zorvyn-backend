const app = require('./src/app');
require('./src/config/db'); // Initialize DB

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});