export class List {
    begin;
    end;
    size;

    constructor () {
        this.begin = {val:null,bef:null,next:this.end};
        this.end = {val:null,bef:this.begin,next:null};
        this.begin.next= this.end;
        this.size=0;
    }

    push (value) {
        if (this.size==0)
            this.begin.val=value;
        else 
        {
            this.end.val=value;
            this.end=this.end.next= {val:null,bef:this.end,next:null};
        }
        this.size++;
    }

    

    AddList (list) {
        if (list.size!=0)
            if (this.size!=0)
            {
                let b = this.end.bef;
                b.next=list.begin;
                list.begin.bef=b;
                this.end=list.end;
            }
            else
            {
                this.begin=list.begin;
                this.end=list.end;
            }
        this.size+=list.size;
    }

    [Symbol.iterator](){
        var iter = (this.size==0)?this.end:this.begin;
        return {
           next() {
                let out={value:iter.val, done: false};
                iter=iter.next;
                out.done=(iter==this.end);
                return out;
           }
        }
    }

    Out () {
        let out=[];
        for (let it of this)
            out.push(it);
        return out;
    }
}