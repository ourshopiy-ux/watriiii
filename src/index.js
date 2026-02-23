#!/usr/bin/env node

import 'dotenv/config.js';
import Telegraf from 'telegraf';
import { Groq } from 'groq-sdk';
import express from 'express';
import cors from 'cors';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Telegram Bot
const bot = new Telegraf(process.env.TELEGRAM_API_KEY);

// Initialize Groq AI
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Express server for running web apps
const app = express();
app.use(cors());
app.use(express.json());

// Storage for active projects
const projects = new Map();
const activeServers = new Map();

// Helper: Find available port
async function findAvailablePort(start = 3000) {
  let port = start;
  while (activeServers.has(port)) {
    port++;
  }
  return port;
}

// Helper: Generate React App
function generateReactApp(projectName, description) {
  const projectPath = path.join(__dirname, '../watar-projects', projectName);
  
  const packageJson = {
    name: projectName,
    version: '1.0.0',
    type: 'module',
    scripts: {
      start: 'react-scripts start',
      build: 'react-scripts build',
      test: 'react-scripts test',
    },
    dependencies: {
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      'react-scripts': '5.0.1',
    },
  };

  const appJsx = `import React, { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  return (
    <div className="App">
      <h1>${description}</h1>
      <p>Your app is running!</p>
    </div>
  );
}

export default App;`;

  const indexJsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;

  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${projectName}</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/index.jsx"></script>
</body>
</html>`;

  fs.ensureDirSync(projectPath);
  fs.ensureDirSync(path.join(projectPath, 'src'));
  fs.writeJsonSync(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 });
  fs.writeFileSync(path.join(projectPath, 'src', 'App.jsx'), appJsx);
  fs.writeFileSync(path.join(projectPath, 'src', 'index.jsx'), indexJsx);
  fs.writeFileSync(path.join(projectPath, 'index.html'), indexHtml);

  return projectPath;
}

// Start the application
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Web server running on http://localhost:${PORT}`);
});

bot.launch(() => {
  console.log('🤖 Telegram bot started');
  console.log('📝 Available commands: /start, /help, /servers, /status');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));