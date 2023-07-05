import {DrawRect,FillRect,DrawSimpleLine} from "./Utility.js";
import {Element} from "./Element.js";

export class Block extends Element{
    x;
    y;
    text;
    no;

    empty=false;

    linewidth;
    height;
    width;
    fontsize;

    TabL;
    TabR;

    zapL;
    zapR;

    connectL;
    connectR;

    constructor (context,empty=false,linewidth=0,height=0,width=0,fontsize=0,x=0,y=0,text=0,start=0,no=false) {
        super(context);
        if (!empty)
        {
            this.linewidth=linewidth;
            this.height=height;
            this.width=width;
            this.fontsize=fontsize;
            this.connectL=new Map();
            this.connectR=new Map();
            this.TabL=this.height;
            this.TabR=this.height;
            this.text=text;
            this.x=start?x:x-width;
            this.y=y;
            this.zapL=0;
            this.zapR=0;
            this.no=no;
        }
        this.empty=empty;
    }

    Draw() {
        //console.log(this.x,this.y,this.width,this.height);
        this.context.font = "bold " + this.fontsize + "px serif";
        DrawRect(this.context,this.x,this.y,this.width,this.height);
        let TextWidth=this.context.measureText(this.text).width;
        this.context.fillText(this.text, this.x+this.width/2-TextWidth/2, this.y+this.height/2+this.fontsize/2);
        if (this.no)
            DrawSimpleLine(this.context,this.x+this.width/2-TextWidth/2,this.x+this.width/2+TextWidth/2,this.y+this.height/2-this.fontsize/2,this.y+this.height/2-this.fontsize/2);
    }

    Select(color)
    {
        FillRect(this.context,color,this.x+this.linewidth/2,this.x+this.width-this.linewidth/2,this.y+this.linewidth/2,this.y+this.height-this.linewidth/2);
    }

    AddZap(zap,side)
    {
        if (!this.empty)
        {
            if (side)
            {
                this.TabL=this.height/(this.connectL.size+zap+1);
                this.zapL=zap;
            }
            else
            {
                this.TabR=this.height/(this.connectR.size+zap+1);
                this.zapR=zap;
            }
        }
    }

    #AddConnect(connect,NewTab,elem)
    {
        for (var cords of connect.values())
            cords*=connect.size/(connect.size+1);
        connect.set(elem,this.height-NewTab);
    }

    #AddConnectL(elem)
    {
        if (this.zapL==0)
        {          
            this.TabL=this.height/(this.connectL.size+2);
            this.#AddConnect(this.connectL,this.TabL,elem);
        }
        else
        {
            this.zapL--;
            this.connectL.set(elem,this.TabL*(1+this.connectL.size));
        }
    }

    #AddConnectR(elem)
    {
        if (this.zapR==0)
        {
            this.TabR=this.height/(this.connectR.size+2);
            this.#AddConnect(this.connectR,this.TabR,elem);
        }
        else
        {
            this.zapR--;
            this.connectR.set(elem,this.TabR*(1+this.connectR.size));
        }
    }

    AddConnect(elem,flag)
    {
        if (flag)
            this.#AddConnectL(elem);
        else
            this.#AddConnectR(elem); 
    }

    GetConnectXY(elem)
    {
        if (this.connectL.has(elem))
            return [this.x,this.connectL.get(elem)+this.y];
        else
            return [this.x+this.width,this.connectR.get(elem)+this.y];
    }

    GetX(side)
    {
        return side? this.x: this.x+this.width;
    }

    GetConnect(flag)
    {
        return this.y+(flag?this.TabL*(1+this.connectL.size) :this.TabR*(1+this.connectR.size));
    }

    AddLink(block,flag)
    {
        if (!this.empty && !block.empty)
        {
            this.AddConnect(block,flag);
            block.AddConnect(this,!flag);
            block.LineToConnect(this, '#000000', 1);
        }
    }
}