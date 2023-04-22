import { createCipheriv, scrypt } from 'crypto';

const PASSWORD = process.env.ENCRYPT_PASS ?? '';
const ENCRYPT_SALT = process.env.ENCRYPT_SALT ?? '';

export async function encryptToken(value: string): Promise<string> {
  return new Promise((resolve) => {
    const algorithm = 'aes-192-cbc';

    scrypt(PASSWORD, ENCRYPT_SALT, 24, (err, key) => {
      if (err) throw err;

      // Then, we'll generate a random initialization vector
      const iv = Buffer.alloc(16, 0);
      const cipher = createCipheriv(algorithm, key, iv);

      let encrypted = cipher.update(value, 'utf8', 'hex');
      encrypted += cipher.final('hex');

      resolve(encrypted);
    });
  });
}
