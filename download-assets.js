import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

const assets = [
  "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/Dushyant-Portfolio-Logo-1.webp",
  "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/Mobile-Hero-.webp",
  "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/Docker.webp",
  "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/Express-JS.webp",
  "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/Java-Script.webp",
  "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/Node-js.webp",
  "https://dushyantsinghtomar.com/wp-content/uploads/2025/11/Android-Studio.png",
  "https://dushyantsinghtomar.com/wp-content/uploads/2025/11/CSS-3.png",
  "https://dushyantsinghtomar.com/wp-content/uploads/2025/11/Firebase.png",
  "https://dushyantsinghtomar.com/wp-content/uploads/2025/11/HTML-5.png",
  "https://dushyantsinghtomar.com/wp-content/uploads/2025/11/Mongo-DB.png",
  "https://dushyantsinghtomar.com/wp-content/uploads/2025/11/React.png",
  "https://dushyantsinghtomar.com/wp-content/uploads/2025/11/Redux-Toolkit.png",
  "https://dushyantsinghtomar.com/wp-content/uploads/2025/11/Type-Script.png",
  "https://dushyantsinghtomar.com/wp-content/uploads/2025/11/VS-Code.png",
  "https://dushyantsinghtomar.com/wp-content/uploads/2025/11/X-Code.png",
  "http://dushyantsinghtomar.com/wp-content/uploads/2025/12/retail-Eazy-.png",
  "http://dushyantsinghtomar.com/wp-content/uploads/2025/12/Untitled-design-2.webp",
  "http://dushyantsinghtomar.com/wp-content/uploads/2025/12/Easy-ERp.png",
  "http://dushyantsinghtomar.com/wp-content/uploads/2025/12/Green-Samriddhi.png",
  "http://dushyantsinghtomar.com/wp-content/uploads/2025/12/Crompton-Parivaar.png",
  "http://dushyantsinghtomar.com/wp-content/uploads/2025/12/Ooredoo-Qatar-1-1.png",
  "http://dushyantsinghtomar.com/wp-content/uploads/2025/12/Ooredoo-Algeria.png",
  "http://dushyantsinghtomar.com/wp-content/uploads/2025/12/smartfren-Viva.png"
];

const destDir = path.join('/Users/dushyanttomar/Desktop/durgaAI_modal/public/assets');
if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

async function download(url) {
  const filename = path.basename(url);
  const destPath = path.join(destDir, filename);

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    if (fs.existsSync(destPath)) {
        // console.log('Skipping existing', filename);
        return;
    }
    const fileStream = fs.createWriteStream(destPath);
    await finished(Readable.fromWeb(res.body).pipe(fileStream));
    console.log('Downloaded ' + filename);
  } catch (err) {
    console.error('Error downloading ' + filename + ': ' + err.message);
  }
}

// Run sequentially to avoid rate limiting
async function run() {
    for (const url of assets) {
        await download(url);
    }
}
run();
