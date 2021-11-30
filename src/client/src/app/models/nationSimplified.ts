export class NationSimplified {
    nationId: number;
    nationName: string;
    rulerName: string;
    allianceName: string;

    constructor(nationId: number = 0, nationName: string = "", rulerName: string = "", allianceName: string = "") {
        this.nationId = nationId;
        this.nationName = nationName;
        this.rulerName = rulerName;
        this.allianceName = allianceName;
    }
}