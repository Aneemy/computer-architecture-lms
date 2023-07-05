import { Element } from "./Element.js";
import { DrawSelect, DrawSimpleLine, DrawReverseSelect } from "./Utility.js";

export class Wire extends Element {
    x;
    text;
    linewidth;
    y;
    height;
    fontsize;
    textwidth;
    no;
    connect;

    constructor(context, lineWidth, y, height, fontsize, x, text, start,no) {
        super(context);
        this.linewidth = lineWidth;
        this.y = y;
        this.height = height;
        this.fontsize = fontsize;
        this.connect = new Map();
        this.text = text;
        this.no=no;
        context.font = "bold " + this.fontsize + "px serif";
        this.textwidth = context.measureText(text).width;
        if (start)
            this.x = x + Math.max(2 * this.linewidth, this.textwidth / 2) + this.linewidth;
        else
            this.x = x - Math.max(2 * this.linewidth, this.textwidth / 2) - this.linewidth;
    }

    Draw() {
        this.context.strokeStyle = '#000000';
        this.context.font = "bold " + this.fontsize + "px serif";
        if (this.no)
            DrawSimpleLine(this.context,this.x - this.textwidth / 2,this.x + this.textwidth / 2,this.y+this.linewidth,this.y+this.linewidth);
        this.context.fillText(this.text, this.x - this.textwidth / 2, this.y + this.fontsize);
        this.context.beginPath();
        this.context.arc(this.x, this.y + this.fontsize + 2 * this.linewidth, this.linewidth, 0, 2 * Math.PI);
        this.context.moveTo(this.x, this.y + this.fontsize + 3 * this.linewidth);
        this.context.lineTo(this.x, this.height);
        this.context.stroke();
    }

    GetBigger(elem) {
        let y = this.connect.get(elem);
        let list = [];
        for (let con of this.connect.values())
            if (con < y)
                list.push(con);
        return (list.length == 0) ? (this.y + this.fontsize + 3 * this.linewidth) : (Math.max(...list));
    }

    IsComplete(contacts) {
        for (let connects of this.connect.keys()) {
            let flag = false;
            for (let contact of contacts)
                if (contact == connects) {
                    flag = true;
                    break;
                }
            if (!flag)
                return false;
        }
        return true;
    }

    SelectForContact(color, elem, to, p) {
        let y = this.connect.get(elem);
        this.context.strokeStyle = color;
        DrawSimpleLine(this.context, this.x, this.x, y, y + (to - y) * p);
    }

    Select(color, p, stop = 0) {
        if (stop == 0)
            stop = this.height;
        this.context.strokeStyle = color;
        DrawSelect(this.context, this.x - Math.max(2 * this.linewidth, this.textwidth / 2) - this.linewidth, this.y,
            this.x + Math.max(2 * this.linewidth, this.textwidth / 2) + this.linewidth, this.y + this.fontsize + this.linewidth,
            this.y + this.fontsize + 2 * this.linewidth, (p < 0.4) ? (p / 0.4) : (1));
        p -= 0.4;
        if (p > 0) {
            let ystart = this.y + this.fontsize + 3 * this.linewidth;
            let ymove = stop - ystart;
            this.context.beginPath();
            this.context.moveTo(this.x, ystart);
            this.context.lineTo(this.x, ystart + ymove * p / 0.6);
            this.context.stroke();
        }
    }

    SelectReverse(color, p) {
        this.context.strokeStyle = color;
        DrawReverseSelect(this.context, this.x - Math.max(2 * this.linewidth, this.textwidth / 2) - this.linewidth, this.y,
            this.x + Math.max(2 * this.linewidth, this.textwidth / 2) + this.linewidth, this.y + this.fontsize + this.linewidth,
            this.y + this.fontsize + 2 * this.linewidth, p);
    }

    GetStartY() {
        return this.y + this.fontsize + 3 * this.linewidth;
    }

    GetStart() {
        return this.x - Math.max(2 * this.linewidth, this.textwidth / 2) - this.linewidth;
    }

    GetFinish() {
        return this.x + Math.max(2 * this.linewidth, this.textwidth / 2) + this.linewidth;
    }

    AddConnect(y, elem) {
        this.connect.set(elem, y);
    }

    GetConnectXY(elem) {
        return [this.x, this.connect.get(elem)];
    }

    AddLink(block,flag)
    {
        block.AddConnect(this,flag);
        this.AddConnect(block.GetConnectXY(this)[1], block);
        this.LineToConnect(block, '#000000', 1);
    }
}