export class Core {
    static TableOfTruth;
    static TableInit = false;
    static count;
    static DNFS;
    static globalnos;
    constructor() { }

    static InitTable(x) {
        this.TableInit = true;
        this.count = x;
        this.TableOfTruth = new Array(Math.ceil(Math.log2(x)));
        let ss = Math.pow(2, x);
        for (let i = 0; i < this.TableOfTruth.length; i++) {
            this.TableOfTruth[i] = new Array(ss).fill(0);
        }
    }

    static Change(i, j) {
        this.TableOfTruth[i][j] = (this.TableOfTruth[i][j] + 1) % 2;
    }
}