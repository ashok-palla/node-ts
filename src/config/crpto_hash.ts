var crypto = require("crypto");
export let return_hash_key: any = (secret: string, data: object) => {
    try {
        var cipher = crypto.createCipher('aes-256-cbc', secret)
        var crypted = cipher.update(JSON.stringify(data), 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    }
    catch (exception) { return 'invalid'; }
};
export let return_hash_data: any = (secret: string, hash: string) => {
    try {
        var decipher = crypto.createDecipher('aes-256-cbc', secret)
        var data = decipher.update(hash, 'hex', 'utf8')
        data += decipher.final('utf8');
        return data;
    }
    catch (exception) { return 'invalid'; }
};