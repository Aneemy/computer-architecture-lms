import { DrawSimpleLine } from "../../Классы/Utility.js";
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

    StartAnimationEncrypt(color, i, progress = 0, finish = 0) {
        let self = this;
        if (progress == 0)
            setTimeout(function () { self.StartAnimationEncrypt(color, i, progress + 1, Math.max(...self.encryptor.wires[i].connect.values())) }, 1);
        else if (progress <= this.aimlength) {
            this.encryptor.wires[i].Select(color, progress / this.aimlength, finish);
            setTimeout(function () { self.StartAnimationEncrypt(color, i, progress + 1, finish) }, this.aimtime / progress);
        }
        else if (progress < 2 * this.aimlength) {
            for (var connector of this.encryptor.wires[i].connect.keys())
                this.encryptor.wires[i].LineToConnect(connector, color, (progress - this.aimlength) / this.aimlength);
            setTimeout(function () { self.StartAnimationEncrypt(color, i, progress + 1) }, this.aimtime / (progress - self.aimlength + 1));
        }
        else {
            let list = [];
            for (var block of this.encryptor.wires[i].connect.keys()) {
                block.Select(color);
                for (let j = 0; j < this.encryptor.blocks.length; ++j)
                    if (block == this.encryptor.blocks[j])
                        list.push(this.decryptor.blocks[j]);
            }
            setTimeout(function () { self.encryptor.Clear() }, 1000);
            this.StartAnimationDecrypt(color, list);
        }
    }

    StartAnimationDecrypt(color, blocks, progress = 0, next = []) {
        let self = this;
        if (progress == 0) {
            for (var block of blocks)
                block.Select(color);
            setTimeout(function () { self.StartAnimationDecrypt(color, blocks, progress + 1) }, 300);
        }
        else if (progress < this.aimlength) {
            for (var block of blocks)
                for (var wire of block.connectR.keys())
                    block.LineToConnect(wire, color, progress / this.aimlength);
            setTimeout(function () { self.StartAnimationDecrypt(color, blocks, progress + 1) }, this.aimtime / progress);
        }
        else if (progress == this.aimlength) {
            let next = [];
            for (var block of blocks)
                for (var wire of block.connectR.keys())
                    next.push(wire.GetBigger(block));
            setTimeout(function () { self.StartAnimationDecrypt(color, blocks, progress + 1, next) }, 1);
        }
        else if (progress < 2 * this.aimlength) {
            let p = (progress - this.aimlength) / this.aimlength;
            let k = 0;
            for (var block of blocks)
                for (var wire of block.connectR.keys())
                    wire.SelectForContact(color, block, next[k++], p);
            setTimeout(function () { self.StartAnimationDecrypt(color, blocks, progress + 1, next) }, this.aimtime / (progress - self.aimlength + 1));
        }
        else if (progress == 2 * this.aimlength) {
            let boo = false;
            for (var wire of Array.from(this.decryptor.wires).reverse())
                if (wire.IsComplete(blocks)) {
                    if (!boo) {
                        let wi = wire;
                        setTimeout(function () { self.StartAnimationDecrypt(color, wi, progress + 1) }, 1);
                        boo = true;
                    }
                    wire.context.strokeStyle = 'red';
                    let y = Math.max(...wire.connect.values());
                    DrawSimpleLine(wire.context, wire.x, wire.x, y, wire.GetStartY());
                }
        }
        else if (progress < 2.5 * this.aimlength) {
            console.log(blocks.text);
            blocks.SelectReverse('red', (progress - 2 * this.aimlength) / this.aimlength * 2);
            setTimeout(function () { self.StartAnimationDecrypt(color, blocks, progress + 1) }, 1);
        }
        else {
            setTimeout(function () { self.decryptor.Clear() }, 3000);
        }
    }
}