import { FillRect, DrawSimpleLine } from "../../Классы/Utility.js";
import { Core } from "./Core.js";
import { Minimizator } from "./Minimization.js";
export class Table {
    isDrawn;
    context;

    commonline;
    boldline;

    FontSize;
    start;
    finishx;
    finishy;

    finishLeft;

    xRightmove;
    xLeftmove;

    ymove;
    ystart;

    selecti = -1;
    selectj = -1;

    minimizator;

    constructor() {
        if (!Core.TableInit)
            Core.InitTable(2);
        this.isDrawn = false;
        this.minimizator = new Minimizator();
    }

    ChangeValue() {
        Core.Change(this.selectj, this.selecti);
        if (Core.TableOfTruth[this.selectj][this.selecti] == 1)
            this.minimizator.AddMiniterm(this.selectj, this.selecti);
        else
            this.minimizator.DelMiniterm(this.selectj, this.selecti);
    }

    Minimize() {
        return this.minimizator.Minimize();
    }

    Refresh(canva) {
        this.selecti = -1;
        this.selectj = -1;
        this.context = canva.getContext('2d');
        this.context.strokeStyle = '#000000';
        this.commonline = Math.min(canva.offsetHeight, canva.offsetWidth) / (5 * Core.TableOfTruth[0].length);
        this.boldline = Math.min(canva.offsetHeight, canva.offsetWidth) / (2 * Core.TableOfTruth[0].length);
        this.FontSize = this.boldline;
        this.start = this.commonline / 2;
        this.finishx = canva.offsetWidth - 2 * this.start;
        this.finishy = canva.offsetHeight - 2 * this.start;
        this.finishLeft = 2 * canva.offsetWidth / 3;

        this.xRightmove = (canva.offsetWidth - this.finishLeft - this.boldline / 2) / (Core.TableOfTruth.length);
        this.xLeftmove = (this.finishLeft - this.boldline / 2) / (Core.count);

        this.ymove = (canva.offsetHeight - this.commonline - this.boldline - 2 * this.FontSize) / (Core.TableOfTruth[0].length);
        this.ystart = 2 * this.FontSize + this.start + this.boldline - this.commonline / 2;

        this.context.font = "bold " + this.FontSize + "px serif";
        this.minimizator.Refresh();
    }

    ChangePos(x, y) {
        if (y > this.ystart && x > this.finishLeft + this.boldline / 2 - this.commonline / 2 && x < this.finishx && y < this.finishy) {
            let i = Math.floor((y - this.ystart) / this.ymove);
            let j = Math.floor((x - this.finishLeft - this.boldline / 2 + this.commonline / 2) / this.xRightmove);
            if (i != this.selecti || j != this.selectj) {
                if (this.selecti >= 0)
                    this.Select('white');
                this.selecti = i;
                this.selectj = j;
                this.Select('yellow');
            }
        }
        else {
            if (this.selecti >= 0) {
                this.Select('white');
                this.selecti = -1;
                this.selectj = -1;
            }
        }
    }

    Select(color) {
        if (this.selecti >= 0) {
            let x = this.finishLeft + this.xRightmove * this.selectj + this.boldline / 2;
            let y = this.ystart + this.ymove * this.selecti + this.commonline / 2;
            FillRect(this.context, color, x, x + this.xRightmove - this.commonline, y, y + this.ymove - this.commonline);
            this.context.fillStyle = 'black';
            this.context.fillText((Core.TableOfTruth[this.selectj][this.selecti] == '1') ? ("1") : ("0"), x + this.FontSize, y + this.FontSize);
        }
    }

    Draw(canva) {
        this.isDrawn = true;
        this.Refresh(canva);
        this.context.clearRect(0, 0, this.finishx + 2 * this.start, this.finishy + 2 * this.start);
        FillRect(this.context, 'yellow', this.start, this.finishx, this.start, this.start + this.ymove);
        this.context.fillStyle = 'black';
        this.context.lineWidth = this.boldline;
        let y = 2 * this.FontSize + this.start + this.boldline / 2;
        let x = this.start;
        let k = Math.pow(2, Core.count - 1);
        DrawSimpleLine(this.context, this.start, this.finishx, y, y);
        y += this.boldline / 2 - this.commonline / 2;
        DrawSimpleLine(this.context, this.finishLeft, this.finishLeft, this.start, this.finishy);
        this.context.lineWidth = this.commonline;
        for (let i = 0; i < Core.TableOfTruth[0].length; ++i) {
            y += this.ymove;
            DrawSimpleLine(this.context, this.start, this.finishx, y, y);
        }
        for (let i = 0; i < Core.count; ++i) {
            DrawSimpleLine(this.context, x, x, this.start, this.finishy);
            this.context.fillText("x" + (i + 1), x + this.FontSize, 1.5 * this.FontSize);
            let stop = k;
            for (let j = 0; j < Core.TableOfTruth[0].length; j++) {
                if (k > 0)
                    this.context.fillText('0', x + 1.5 * this.FontSize, this.ymove * j + this.FontSize + this.ystart + this.commonline / 2);
                else
                    this.context.fillText('1', x + 1.5 * this.FontSize, this.ymove * j + this.FontSize + this.ystart + this.commonline / 2);
                if (k == -stop + 1)
                    k = stop;
                else
                    --k;
            }
            k = stop / 2;
            x += this.xLeftmove;
        }
        x = this.finishLeft + this.boldline / 2 - this.commonline / 2;
        for (let i = 0; i < Core.TableOfTruth.length; ++i) {
            DrawSimpleLine(this.context, x + this.xRightmove, x + this.xRightmove, this.start, this.finishy);
            this.context.fillText("y" + (i + 1), x + this.FontSize, 1.5 * this.FontSize);
            for (let j = 0; j < Core.TableOfTruth[0].length; j++)
                this.context.fillText((Core.TableOfTruth[i][j] == '1') ? ("1") : ("0"), x + this.FontSize + this.commonline / 2, this.ymove * j + this.ystart + this.FontSize + this.commonline / 2);
            x += this.xRightmove;
        }
    }
}