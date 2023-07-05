import {DrawRect,DrawSimpleLine} from "./Utility.js";

export class Element {
    static ids=0;
    id;
    context;
    constructor(context) {
        this.context=context;
        this.id=Element.ids++;
    }

    LineToConnect(elem,color,proc)
    {
        let xy1=this.GetConnectXY(elem);
        let xy2=elem.GetConnectXY(this);
        let xrange=xy2[0]-xy1[0];
        let yrange=xy2[1]-xy1[1];
        
        this.context.strokeStyle = color;
        if (yrange!=0 && xrange!=0)
        {
            let g2=Math.abs(yrange)/(Math.abs(xrange)+Math.abs(yrange));
            let g1=1-g2;
            let p1=Math.atan(g1/g2-0.5)/Math.PI+0.5;
            let g3=g1*p1;
            let per = proc>g3? 1: proc/g3;
            proc-=g3;
            DrawSimpleLine(this.context,xy1[0],xy1[0]+xrange*p1*per,xy1[1],xy1[1]);
            if (proc>0)
            {
                per = proc>g2? 1: proc/g2;
                proc-=g2;
                DrawSimpleLine(this.context,xy1[0]+xrange*p1,xy1[0]+xrange*p1,xy1[1],xy1[1]+yrange*per);
                if (proc>0)
                {
                    g3=g1-g3;
                    per = proc>g3? 1: proc/g3;
                    DrawSimpleLine(this.context,xy1[0]+xrange*p1,xy1[0]+xrange*p1+xrange*(1-p1)*per,xy1[1]+yrange,xy1[1]+yrange);
                }
            }
        }
        else
            DrawSimpleLine(this.context,xy1[0],xy1[0]+xrange*proc,xy1[1],xy1[1]+yrange*proc)
    }
}