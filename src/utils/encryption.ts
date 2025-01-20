import crypto from 'crypto';
import { SECRET } from './env';

export const encrypt = (password: string): string => { 
    const encrypted = crypto
        .pbkdf2Sync(password, SECRET, 1_000, 64, "sha512")
        .toString("hex");
    return encrypted;
}