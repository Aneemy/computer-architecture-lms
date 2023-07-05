export class Miniterm {
    value;
    name;
    count;

    constructor(value, name,count=value.length) {
        this.name = name.slice(0);
        this.value = value.slice(0);
        this.count=count;
    }

    Kley(miniterm) {
        let k = -1;
        let count = 0;
        for (let i = 0; i < this.value.length; ++i)
            if (this.value[i] != miniterm.value[i])
                if (k >= 0)
                    return false;
                else
                    k = i;
            else if (this.value[i] == 1)
                count++;
        if (k < 0)
            return false;
        else {
            var min = new Miniterm(this.value, (this.name + ',' + miniterm.name).split(',').sort().join(','),this.count-1);
            min.value[k] = '-';
            return [min, count];
        }
    }

    Count() {
        let count = 0;
        for (let symb of this.value)
            if (symb == '1')
                count++;
        return count;
    }

    reducer(str, val, i)
    {
        if (val=='-')
            return str;
        let x=(val==1)?('x'):('!x');
        return str + x + (i+1) + ' ';
    }

    IsDeMorgan()
    {
        let nol=0;
        let ed=0;
        for (let i=0;i< this.value.length;++i)
            if (this.value[i]=='1')
                ++ed;
            else if (this.value[i]=='0')
                ++nol;
        if (nol>ed+1)
            return true;
        else
            return false;
    }

    Out() {
        return this.value.reduce(this.reducer,'');
    }
}