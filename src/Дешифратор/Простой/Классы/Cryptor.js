import { Core } from "./Core.js";
import { Block } from "../../Классы/Block.js";
import { Wire } from "../../Классы/Wire.js";

export class Cryptor {

    IsEncrypt = false;
    cleanImage;
    context;

    FontSize;

    start;
    starty;
    height;
    width;
    Tab;

    wires;
    blocks;
    constructor(canva, isencrypt) {
        this.IsEncrypt = isencrypt;
        this.context = canva.getContext('2d');
        this.context.strokeStyle = '#000000';
        this.context.lineWidth = Math.min(canva.offsetHeight, canva.offsetWidth) / (10 * Core.TableOfTruth.length);

        this.FontSize = Math.round(Math.min(canva.offsetHeight, canva.offsetWidth) / (2 * Core.TableOfTruth.length));
        this.context.font = "bold " + this.FontSize + "px serif";

        this.start = Math.min(canva.offsetHeight, canva.offsetWidth) / (4 * Core.TableOfTruth.length);
        this.starty = this.start + this.FontSize + this.context.lineWidth;
        this.height = canva.offsetHeight - 2 * this.start;
        this.width = canva.offsetWidth - 2 * this.start;
        this.Tab = (this.height - 3 * this.context.lineWidth - this.FontSize) / (6 * Core.TableOfTruth[0].length + 1);

        this.wires = new Array(Core.TableOfTruth.length);
        this.blocks = new Array(Core.TableOfTruth[0].length);
    }

    Clear() {
        this.context.strokeStyle = '#000000';
        this.context.putImageData(this.cleanImage, 0, 0);
    }

    DrawScheme(i, x) {
        this.wires[i] = new Wire(this.context, this.context.lineWidth, this.start, this.height, this.FontSize, x, "x" + (i + 1),this.IsEncrypt,false);
        this.wires[i].Draw(this.context);
        for (let j = 0; j < Core.TableOfTruth[0].length; j++) {
            if ((Core.TableOfTruth[i][j]) == '1') {
                this.blocks[j].AddConnect(this.wires[i],this.IsEncrypt);
                this.wires[i].AddConnect(this.blocks[j].GetConnectXY(this.wires[i])[1], this.blocks[j]);
                this.wires[i].LineToConnect(this.blocks[j], '#000000', 1);
            }
        }
    }

    Draw() {
        var Blockx = (this.IsEncrypt) ? (3 * this.width / 4) : (this.start);
        let y = this.Tab + this.start + 3 * this.context.lineWidth + this.FontSize;
        for (let i = 0; i < Core.TableOfTruth[0].length; i++) {
            this.blocks[i] = new Block(this.context,false, this.context.lineWidth, 5 * this.Tab, this.width / 4, this.FontSize, Blockx, y, "y" + i,true);
            this.blocks[i].Draw();
            this.blocks[i].AddZap(Core.TableOfTruth.reduce(function (sum, elem) { return sum + elem[i]; }, 0),this.IsEncrypt);
            y += 6 * this.Tab;
        }
        let xstart = (this.IsEncrypt) ? (this.start) : (this.start + this.width);
        for (let i = 0; i < Core.TableOfTruth.length; ++i) {
            this.DrawScheme(i, xstart);
            xstart = (this.IsEncrypt) ? (this.wires[i].GetFinish()) : (this.wires[i].GetStart());
        }
        this.cleanImage = this.context.getImageData(0, 0, this.width + 2 * this.start, this.height + 2 * this.start);
    }

}