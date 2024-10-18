import express from 'express';
import os from 'os';
import cors from 'cors';
import path from 'path';
import open from 'open';

const app = express();
const PORT = 3000;

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Function to get CPU utilization
function getCpuUsage() {
  const cpus = os.cpus();
  let totalIdle = 0, totalTick = 0;

  cpus.forEach(core => {
    for (let type in core.times) {
      totalTick += core.times[type];
    }
    totalIdle += core.times.idle;
  });

  const idle = totalIdle / cpus.length;
  const total = totalTick / cpus.length;

  return 100 - (100 * idle / total);
}

// API endpoint to get CPU usage
app.get('/cpu', (req, res) => {
  const cpuUsage = getCpuUsage();
  res.json({ cpuUsage: cpuUsage.toFixed(2) });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);

  open(`http://localhost:${PORT}`);
});
