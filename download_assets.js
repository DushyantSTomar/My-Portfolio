import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectImages = {
    "retail-eazy": [
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-4.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-5.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-1.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-2.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-3.webp"
    ],
    "eazy-office": [
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/Easy-Office-3.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/Easy-Office-4.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/Easy-Office-6.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/Easy-Office-1.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/Easy-Office-2.webp"
    ],
    "eazy-erp": [
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-3-1.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-4-1.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-6.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-1-1.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-2-1.webp"
    ],
    "green-samriddhi": [
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-1-2.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-7.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-2-2.webp"
    ],
    "crompton-parivaar": [
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-4-2.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-5-1.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-6-1.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-3-2.webp"
    ],
    "sales-algeria": [
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/OQ-8.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/OQ.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/OQ7.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/OQ-1-scaled.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/OQ-2-scaled.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/OQ-3-scaled.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/OQ-4-scaled.webp"
    ],
    "ooredoo-qatar": [
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/Test.jpeg",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-14-at-9.33.14-PM.jpeg",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-14-at-9.33.15-PM.jpeg",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/Login.jpeg",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/master.jpeg"
    ],
    "smartfren-viva": [
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-6-2.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-7-1.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-8.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-1-3.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-2-3.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-3-3.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-4-3.webp",
        "https://dushyantsinghtomar.com/wp-content/uploads/2025/12/unnamed-5-2.webp"
    ]
};

const baseDir = path.join(process.cwd(), 'public', 'assets', 'projects');

async function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { }); // Delete the file async. (But we don't check result)
            reject(err);
        });
    });
}

async function main() {
    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true });
    }

    for (const [project, urls] of Object.entries(projectImages)) {
        const projectDir = path.join(baseDir, project);
        if (!fs.existsSync(projectDir)) {
            fs.mkdirSync(projectDir, { recursive: true });
        }

        console.log(`Downloading images for ${project}...`);
        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            const ext = path.extname(url).split('?')[0] || '.webp'; // Handle query params or default
            const filename = `${i + 1}${ext}`;
            const dest = path.join(projectDir, filename);
            try {
                await downloadImage(url, dest);
                // console.log(`  Downloaded ${filename}`);
            } catch (err) {
                console.error(`  Failed to download ${url}:`, err.message);
            }
        }
    }
}

main().then(() => console.log('All downloads complete.')).catch(console.error);
