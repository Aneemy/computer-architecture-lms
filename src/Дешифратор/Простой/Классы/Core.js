export class Core {
    static TableOfTruth;
    static TableInit=false;
    
    constructor ()
    {}

    static InitTable(x) {
        this.TableInit = true;
        this.TableOfTruth = new Array(x);
        let ss = Math.ceil(Math.log2(x));
        for (let i = 0; i < this.TableOfTruth.length; i++) {
            this.TableOfTruth[i] = new Array(ss).fill(0);
        }
    }

    static Change(i, j) {
        this.TableOfTruth[i][j] = (this.TableOfTruth[i][j] + 1) % 2;
    }
}