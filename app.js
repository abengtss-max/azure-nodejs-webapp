const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware for JSON parsing
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Azure Node.js App!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint (important for Azure)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// API endpoint
app.get('/api/info', (req, res) => {
  res.json({
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version,
    platform: process.platform
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Export for testing
module.exports = app;