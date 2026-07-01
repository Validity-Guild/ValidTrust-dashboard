const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

try {
  console.log('Running npm install with --legacy-peer-deps...');
  const out = execSync('npm.cmd install --legacy-peer-deps', { encoding: 'utf-8', maxBuffer: 1024 * 1024 * 10 });
  fs.writeFileSync(path.join(logDir, 'install.log'), out);
  console.log('✅ Done!');
} catch (e) {
  fs.writeFileSync(path.join(logDir, 'install.log'), e.stdout ? e.stdout.toString() : e.toString());
  if (e.stderr) fs.writeFileSync(path.join(logDir, 'install.err'), e.stderr.toString());
  console.error('❌ Failed', e.message);
}
