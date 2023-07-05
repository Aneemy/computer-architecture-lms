import { Cryptor } from "./Cryptor.js";

export class Encrypt_Dencrypt {

    encryptor;
    decryptor;

    aimlength = 500;
    aimtime = 200;

    constructor(encryptorContext, DecryptorContext) {
        this.encryptor = new Cryptor(encryptorContext, true);
        this.decryptor = new Cryptor(DecryptorContext, false);
    }

    Draw() {
        this.encryptor.Draw();
        this.decryptor.Draw();
    }
}