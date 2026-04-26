import { fileURLToPath } from "url"
import { resolve, dirname } from "path"
import fs from "fs"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = resolve(__dirname, '../data/projects.json');

export const loadDB = async () => {
    try {
        const dataDir = dirname(dbPath);
        if(!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true })
        }
        const data = fs.readFileSync(dbPath, 'utf-8');
        if (!data) {
            return []
        }
        return JSON.parse(data)
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log("Database file not found. Initializing empty database.")
            return [];
        } else console.error(error)
    }
}

export const saveDB = async (data) => {
    try {
        const dataDir = dirname(dbPath);
        if(!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true })
        }
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error(error)
    }
}