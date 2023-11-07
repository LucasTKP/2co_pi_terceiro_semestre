import crypto from "crypto";

export function encryptId(id: string) {
    console.log(id)
    const cipher = crypto.createCipher('aes-128-cbc', process.env.NEXT_PUBLIC_KEY_ENCRIPT!);
    let encryptedId = cipher.update(id, 'utf8', 'hex');
    encryptedId += cipher.final('hex');
    return encryptedId;
}

export function decrypt(id: string) {
    const decipher = crypto.createDecipher('aes-128-cbc', process.env.NEXT_PUBLIC_KEY_ENCRIPT!);
    let decryptedText = decipher.update(id, 'hex', 'utf8');
    decryptedText += decipher.final('utf8');
    return decryptedText;
}