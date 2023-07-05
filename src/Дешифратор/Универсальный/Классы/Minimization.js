import { Miniterm } from "./Miniterm.js";
import { Core } from "./Core.js";
import { CopySet,CopyMap, MultMaps } from "../../Классы/Utility.js";

export class Minimizator {
    Miniterms;
    MinitermsStorage;
    construnctor() {
        this.Refresh();
    }

    Refresh() {
        this.Miniterms = new Array(Core.TableOfTruth.length);
        this.MinitermsStorage = new Array(Core.TableOfTruth[0].length);
        let Stop = new Array(Core.count);
        let iter = new Array(Core.count);
        let k = Math.pow(2, Core.count - 1);
        for (let i = 0; i < this.Miniterms.length; ++i)
            this.Miniterms[i] = new Map();
        for (let i = 0; i < Core.count; ++i) {
            Stop[i] = k;
            iter[i] = Stop[i];
            k /= 2;
        }
        for (let j = 0; j < this.MinitermsStorage.length; ++j) {
            let val = new Array(Core.count);
            let count = 0;
            for (let i = 0; i < iter.length; ++i) {
                if (iter[i] > 0)
                    val[i] = 0;
                else {
                    count++;
                    val[i] = 1;
                }
                iter[i] = (iter[i] == -Stop[i] + 1) ? (Stop[i]) : (iter[i] - 1);
            }
            this.MinitermsStorage[j] = [new Miniterm(val, 'M' + j), count];
        }
    }

    DelMiniterm(i, j) {
        this.Miniterms[i].get(this.MinitermsStorage[j][1]).delete(this.MinitermsStorage[j][0].name + i);
        if (this.Miniterms[i].get(this.MinitermsStorage[j][1]).size == 0)
            this.Miniterms[i].delete(this.MinitermsStorage[j][1]);
    }

    AddMiniterm(i, j) {
        let newname = this.MinitermsStorage[j][0].name + i;
        if (!this.Miniterms[i].has(this.MinitermsStorage[j][1]))
            this.Miniterms[i].set(this.MinitermsStorage[j][1], new Map());
        this.Miniterms[i].get(this.MinitermsStorage[j][1]).set(newname, new Miniterm(this.MinitermsStorage[j][0].value, newname));
    }

    SimpleKley(newminiterms, miniterm, miniterms, names, nameschecked) {
        let flag = false;
        for (let min of miniterms.values()) {
            let val = min.Kley(miniterm);
            if (val !== false) {
                if (!newminiterms.has(val[1]))
                    newminiterms.set(val[1], new Map());
                newminiterms.get(val[1]).set(val[0].name, val[0]);
                flag = true;
                if (names.has(min.name))
                    names.delete(min.name);
                if (!nameschecked.has(min.name))
                    nameschecked.set(min.name, min);
            }
            else if (!names.has(min.name) && !nameschecked.has(min.name))
                names.set(min.name, min);
        }
        return flag;
    }

    OutMiniterms(miniterms)
    {
        let srt = '';
        if (miniterms.size>0)
            for (let min of miniterms.values())
                srt = srt + min.Out() + " V ";
        console.log(srt);
    }

    Kley(miniterms) {
        let newminiterms = new Map();
        let simpleImplikants = new Map();
        let names;
        let k = 0;
        while (!miniterms.has(k))
            ++k;
        let namesnew = miniterms.get(k);
        let nameschecked;
        for (let j = k; j < Core.count; j++) {
            names = namesnew;
            namesnew = new Map();
            nameschecked = new Map();
            if (miniterms.has(j))
                for (let miniterm of miniterms.get(j).values())
                    if (((!miniterms.has(j + 1) || !this.SimpleKley(newminiterms, miniterm, miniterms.get(j + 1), namesnew, nameschecked)) 
                         && names.has(miniterm.name)) && !simpleImplikants.has(miniterm.name))
                        simpleImplikants.set(miniterm.name,miniterm);
        }
        return [newminiterms, simpleImplikants];
    }

    CheckUsles(min,miniterms)
    {
        let x = false;
        for (let name of min.name.split(','))
            if (miniterms.has(name)) {
                miniterms.delete(name);
                x = true;
            }
        if (miniterms.size == 0)
            return [min];
        else
            return x;
    }

    Pokr(simples, miniterms) {
        for (let name of simples.keys()) {
            let min=simples.get(name);
            simples.delete(name);
            var collection = CopySet(miniterms);
            var val =this.CheckUsles(min,collection);
            if (val === true)
            {
                var val2 = this.Pokr(CopyMap(simples), collection);
                if (val2 !== false)
                    return [min, ...val2];   
            }
            else if (val !== false)
                return val;
        }
        return false;
    }

    GetTrueImplikants(simpleImplikants,collection)
    {
        let check=new Map();
        for (let key of simpleImplikants.keys())
        {
            for (let name of key.split(','))
                if (!check.has(name))
                    check.set(name,key);
                else
                    check.set(name,false);
            }
        let out=new Set();
        for (let key of check.keys())
            if (check.get(key)!==false)
            {
                if (simpleImplikants.has(check.get(key))&&!out.has(simpleImplikants.get(check.get(key))))
                {
                    out.add(simpleImplikants.get(check.get(key)));
                    simpleImplikants.delete(check.get(key));
                }
                for (let name of check.get(key).split(','))
                    if (collection.has(name))
                        collection.delete(name);
            }    
        return out;
    }

    Minimize() {
        let DNFS=new Array(0);
        for (let i = 0; i < Core.TableOfTruth.length; ++i) {
            let simples = new Map();
            let miniterms = this.Miniterms[i];
            let out=new Set();
            if (miniterms.size!=0)
            {
                while (true) {
                    let val = this.Kley(miniterms);
                    MultMaps(simples,val[1]);
                    if (val[0].size == 0)
                        break;
                    miniterms = val[0];
                }
                //this.OutMiniterms(simples);
                let collection = new Set();
                for (let terms of this.Miniterms[i].values())
                    for (let mini of terms.keys())
                        collection.add(mini);
                out=this.GetTrueImplikants(simples,collection);
                let out2 = this.Pokr(simples, collection);
                if (out2.length>0)
                    for (let val of out2)
                        out.add(val);
                this.OutMiniterms(out);
            }
            if (out.size!=0)
                DNFS.push(out);
        }
        return DNFS;
    }

}

