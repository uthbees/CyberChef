import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '../tmp/recipes.db');

export async function openDb() {
    return open({
        filename: dbPath,
        driver: sqlite3.Database,
    });
}
