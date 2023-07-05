import { FillPoly, FillRect, DrawSimpleLine } from "../../Классы/Utility.js";
import { Core } from "./Core.js";

export class Table {
    context;

    FontSize;
    start;
    finishx;
    finishy;
    xmove;
    ymove;

    constructor(canva) {
        if (!Core.TableInit)
            Core.InitTable(10);
        this.context = canva.getContext('2d');
        this.context.strokeStyle = '#000000';
        this.context.lineWidth = Math.min(canva.offsetHeight, canva.offsetWidth) / (5 * Core.TableOfTruth.length);
        this.FontSize = Math.min(canva.offsetHeight, canva.offsetWidth) / Core.TableOfTruth.length;
        this.start = this.context.lineWidth / 2;
        this.finishx = canva.offsetWidth - this.start;
        this.finishy = canva.offsetHeight - this.start;
        this.xmove = (canva.offsetWidth - this.context.lineWidth) / (Core.TableOfTruth[0].length + 1);
        this.ymove = (canva.offsetHeight - this.context.lineWidth) / (Core.TableOfTruth.length + 1);

        this.context.font = "bold " + this.FontSize + "px serif";
    }

    SelectRow(i, color1, color2) {
        let y1 = i * this.ymove + 2 * this.start;
        let y2 = (i + 1) * this.ymove;
        for (let j = 0; j < Core.TableOfTruth[0].length; j++) {
            let x1 = this.xmove * (j + 1) + 2 * this.start;
            let x2 = x1 + this.xmove - 2 * this.start;
            if (Core.TableOfTruth[i - 1][j] == 1) {
                FillRect(this.context, color2, x1, x2, y1, y2);
                this.context.fillStyle = 'black';
                this.context.fillText("1", this.xmove * (j + 1) + this.FontSize, this.ymove * i + this.FontSize);
            }
            else {
                FillRect(this.context, color1, x1, x2, y1, y2);
                this.context.fillStyle = 'black';
                this.context.fillText("0", this.xmove * (j + 1) + this.FontSize, this.ymove * i + this.FontSize);
            }
        }
    }

    Draw() {
        FillPoly(this.context, 'yellow', [this.finishx, this.start, this.finishx, this.start + this.ymove, this.start + this.xmove, this.start + this.ymove, this.start + this.xmove, this.finishy, this.start, this.finishy, this.start, this.start]);
        this.context.fillStyle = 'black';
        for (let i = 1; i < Core.TableOfTruth.length + 2; i++) {
            let y = this.ymove * i + this.start;
            DrawSimpleLine(this.context, this.start, this.finishx, y, y);
        }
        for (let i = 1; i < Core.TableOfTruth[0].length + 2; i++) {
            let x = this.xmove * i + this.start;
            DrawSimpleLine(this.context, x, x, this.start, this.finishy);
        }
        for (let j = 0; j < Core.TableOfTruth[0].length; j++)
            this.context.fillText("y" + (j + 1), this.xmove * (j + 1) + this.FontSize / 2, this.FontSize);
        for (let i = 0; i < Core.TableOfTruth.length; i++) {
            this.context.fillText("x" + (i + 1), this.FontSize / 2, this.ymove * (i + 1) + this.FontSize);
            for (let j = 0; j < Core.TableOfTruth[i].length; j++)
                this.context.fillText((Core.TableOfTruth[i][j] == 1) ? ("1") : ("0"), this.xmove * (j + 1) + this.FontSize, this.ymove * (i + 1) + this.FontSize);
        }
    }
}