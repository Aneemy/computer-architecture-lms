import { Core } from "./Core.js";
import { Block } from "../../Классы/Block.js";
import { Wire } from "../../Классы/Wire.js";
import {FillRect} from "../../Классы/Utility.js";

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

    mult;
    globalno;

    wires;

    constructor(canva, isencrypt) {
        this.IsEncrypt = isencrypt;
        this.context = canva.getContext('2d');
        this.context.strokeStyle = '#000000';
        this.context.lineWidth = Math.min(canva.offsetHeight, canva.offsetWidth) / (60 * Core.count);

        this.FontSize = Math.round(Math.min(canva.offsetHeight, canva.offsetWidth) / (4 * Core.count));
        this.context.font = "bold " + this.FontSize + "px serif";

        this.start = Math.min(canva.offsetHeight, canva.offsetWidth) / (30 * Core.count);
        this.starty = this.start + this.FontSize + this.context.lineWidth;
        this.height = canva.offsetHeight - 2 * this.start;
        this.width = canva.offsetWidth - 2 * this.start;

        this.wires = new Array(Core.count);
        this.mult=this.IsEncrypt?-1:1;
    }

    Clear() {
        this.context.strokeStyle = '#000000';
        this.context.putImageData(this.cleanImage, 0, 0);
    }

    Analyse() {
        let globno=0;
        let count=0
        let nos=new Array(Core.DNFS.length);
        let ns=new Array(Core.DNFS.length);
        for (let i=0;i<Core.DNFS.length;++i) {
            let no=0;
            nos[i]=new Array(Core.DNFS[i].size);
            let e=0;
            for (let miniterm of Core.DNFS[i])
            {
                let n=miniterm.IsDeMorgan();
                console.log(n);
                no+=n;
                nos[i][e]=n;
                count++;
                e++;
            }
            if (no>Core.DNFS[i].size/2+1)
            {
                ++globno;
                ns[i]=true;
            }
            else
                ns[i]=false; 
        }
        this.globalno=globno>Core.DNFS.length/2+1;
        return [ns,nos,count];
    }

    Connection(miniterm,block,DeMorg,x)
    {
        for (let i=0;i<miniterm.value.length;++i)
        {
            if (miniterm.value[i]=='-')
                continue;
            if ((!miniterm.value[i] != this.globalno) != DeMorg)
            {
                let size=this.IsEncrypt?block.TabL:block.TabR;
                let newblock=new Block(this.context,false, this.context.lineWidth,size/3, this.width / 16, this.FontSize, x,block.GetConnect(this.IsEncrypt)-1*size/6, '',this.IsEncrypt); 
                this.wires[i].AddLink(newblock,this.IsEncrypt);
                newblock.Draw();
                newblock.AddLink(block,!this.IsEncrypt);
            }
            else
                this.wires[i].AddLink(block,this.IsEncrypt);
        }
    }

    Blocks(no,mas,operator,block,ystart,size,tab,x)
    {
        block.AddZap(mas.length,this.IsEncrypt)
        let blocks=new Array(mas.length);
        if (mas.length==1)
        {
            if (mas[0]!=no)
            {
                if (mas[0])
                    operator=operator[1]+operator[0];
                blocks[0]=new Block(this.context,false, this.context.lineWidth, size/2, this.width / 16, this.FontSize, x+this.mult*this.width / 16, ystart+size/4, '',!this.IsEncrypt); 
                blocks[0].Draw();
                blocks[0].AddLink(block,!this.IsEncrypt);
            }  
            else
                blocks[0]=block;
        }
        for (let i = 0; i < mas.length; ++i)
        {
            if (mas[i])
                operator=operator[1]+operator[0];
            blocks[i]=new Block(this.context,false, this.context.lineWidth, size, this.width / 8, this.FontSize, x+3*this.mult*this.width / 16, ystart, operator,!this.IsEncrypt);
            blocks[i].Draw();
            if (mas[i] != no)
            {
                let newblock=new Block(this.context,false, this.context.lineWidth, size/2, this.width / 16, this.FontSize, x+this.mult*this.width / 16, ystart+size/4, '   ',!this.IsEncrypt); 
                blocks[i].AddLink(newblock,!this.IsEncrypt);
                newblock.AddLink(block,!this.IsEncrypt);
                newblock.Draw();
            }
            else    
                blocks[i].AddLink(block,!this.IsEncrypt);
            ystart+=size+tab;
        }
        return blocks;
    }

    Draw() {
        FillRect(this.context,'#ffffff',this.start,this.start+this.width,this.start,this.start+this.height);
        this.context.fillStyle = '#000000';
        let out=this.Analyse();
        Core.globalnos=out[0];
        let xstart = (this.IsEncrypt) ? (this.start) : (this.start + this.width);
        for (let i = 0; i < Core.count; ++i) {
            this.wires[i] = new Wire(this.context, this.context.lineWidth, this.start, this.height, this.FontSize, xstart, "x" + (i + 1), this.IsEncrypt,this.globalno);
            this.wires[i].Draw(this.context);
            xstart = (this.IsEncrypt) ? (this.wires[i].GetFinish()) : (this.wires[i].GetStart());
        }
        let xf=xstart;
        xstart=(this.IsEncrypt) ? (this.start + this.width) : (this.start);  
        let newblocks=new Array(0);
        let BigTab = (this.height - 3 * this.context.lineWidth - this.FontSize)/out[0].length;
        let y=3 * this.context.lineWidth + this.FontSize;
        let blocks=this.Blocks(false,out[0],'\\/',new Block(this.context,true),y+3*BigTab/8,BigTab/4,3*BigTab/4,xstart); 
        let tabs=new Array(blocks.length);
        for (let i = 0; i < blocks.length; ++i)
        {
            let Tab=BigTab/(1+6*out[1][i].length);
            tabs[i]=Tab;
            newblocks.push(this.Blocks(out[0][i],out[1][i],'/\\',blocks[i],y+Tab,5*Tab,Tab,blocks[i].GetX(this.IsEncrypt)));
            y+=BigTab;
        }
        for (let i=0;i<Core.DNFS.length;++i)
        {
            let j=0;
            for (let miniterm of Core.DNFS[i])
            {
                newblocks[i][j].AddZap(miniterm.count,this.IsEncrypt);
                this.Connection(miniterm,newblocks[i][j],out[1][i][j],xf);
                ++j;
            }
        }

        this.cleanImage = this.context.getImageData(0, 0, this.width + 2 * this.start, this.height + 2 * this.start);
    }

}