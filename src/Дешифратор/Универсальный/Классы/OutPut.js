import { Miniterm } from "./Miniterm.js";
import { Core } from "./Core.js";
import { FillRect,DrawText, DrawSimpleLine } from "../../Классы/Utility.js";

export class OutPut {
    constructor (canva) {
        this.context = canva.getContext('2d');
        this.context.strokeStyle = '#000000';
        this.context.lineWidth = Math.min(canva.offsetHeight, canva.offsetWidth) / (40 * Core.count);
        this.FontSize = Math.round(Math.min(canva.offsetHeight, canva.offsetWidth) / (4 * Core.count));
        this.context.font = "bold " + this.FontSize + "px serif";

        this.start = Math.min(canva.offsetHeight, canva.offsetWidth) / (30 * Core.count);
        this.height = canva.offsetHeight - 2 * this.start;
        this.width = canva.offsetWidth - 2 * this.start;

        this.cleanImage = this.context.getImageData(0, 0, this.width + 2 * this.start, this.height + 2 * this.start);
    }
    Clear() {
        this.context.strokeStyle = '#000000';
        this.context.putImageData(this.cleanImage, 0, 0);
    }
    DrawMiniterm(start,y,miniterm,no,bigsize,smallsize){
        if (miniterm.IsDeMorgan())
        {
            var operator='\\/';
            var vno=true;
        }
        else
        {
            var operator='/\\';
            var vno=false;  
        }
        let x=start;
        if (vno)
            x=DrawText(this.context,x,y,'(',bigsize);
        let b=false;
        for (let i=0;i<miniterm.value.length;++i)
        {
            let buf=x;
            if (miniterm.value[i]!='-')
            {
                if (b)
                    buf=DrawText(this.context,buf,y,operator,bigsize);
                buf=DrawText(this.context,buf,y,'X',bigsize);
                buf=DrawText(this.context,buf,y,i+1,smallsize);
                if (miniterm.value[i]=='0' != vno)
                    DrawSimpleLine(this.context,x,buf,y-bigsize*0.7,y-bigsize*0.7);   
                x=buf;
                b=true;
            }
        }
        if (vno)
            x=DrawText(this.context,x,y,')',bigsize);
        if (vno!=no)
            DrawSimpleLine(this.context,start,x,y-bigsize*1,y-bigsize*1);
        return DrawText(this.context,x,y,'  ',bigsize);
    }

    Draw(){
        this.Clear();
        let Tab=this.height / (2*Core.DNFS.length);
        let big = Tab/1.5;
        let small=big/3;
        let y=0;
        for (let i=0;i<Core.DNFS.length;++i)
        {
            y+=Tab;
            let x=this.start;
            let b=false;
            for (let miniterm of Core.DNFS[i])
            {
                if (b)
                    x=DrawText(this.context,x,y,Core.globalnos[i]?'/\\  ':'\\/  ',big);
                x=this.DrawMiniterm(x,y,miniterm,Core.globalnos[i],big,small);
            }
            if (Core.globalnos[i])
                DrawSimpleLine(this.context,this.start,x,y-big*1.2,y-big*1.2);
        }
    }
}