export class Prospect {
    nationId: number;
    nationName: string;
    rulerName: string;

    constructor(nationId: number = 0, nationName: string = "", rulerName: string = "") {
        this.nationId = nationId;
        this.nationName = nationName;
        this.rulerName = rulerName;
    }
}