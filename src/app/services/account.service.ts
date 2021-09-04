import { Injectable } from '@angular/core';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  getAllAccounts(): Account[] {
    return [
      {
        nationId: 12345,
        rulerName: "lilweirdward",
        nationName: "Land of Too Much Fun",
        discord: "lilweirdward:1342",
        discordId: 1,
        secretCode: "12345",
        role: "S",
        hasForeignMinistry: true,
        hasFederalAidCommission: true,
        hasDisasterReliefAgency: true
      },
      {
        nationId: 43278,
        rulerName: "Test Ruler #1",
        nationName: "Test Nation #1",
        discord: undefined,
        discordId: 0,
        secretCode: "43728",
        role: "B",
        hasForeignMinistry: true,
        hasFederalAidCommission: true,
        hasDisasterReliefAgency: true
      },
      {
        nationId: 432789,
        rulerName: "Another Rando",
        nationName: "Just a nation",
        discord: "fewui:1342",
        discordId: 2,
        secretCode: "29843",
        role: "B",
        hasForeignMinistry: true,
        hasFederalAidCommission: true,
        hasDisasterReliefAgency: false
      },
      {
        nationId: 12345,
        rulerName: "New Guy",
        nationName: "Smol Boi",
        discord: "mrrandomperson:1342",
        discordId: 0,
        secretCode: "92384",
        role: "S",
        hasForeignMinistry: true,
        hasFederalAidCommission: false,
        hasDisasterReliefAgency: false
      }
    ];
  }
}
