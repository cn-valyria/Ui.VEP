import {
  CLEAR_ACCOUNTS,
  ADD_ACCOUNTS,
  UPDATE_ACCOUNT,
  REMOVE_ACCOUNT
} from "./mutation-types";

export const state = () => ({
  accounts: []
});

export const mutations = {
  [CLEAR_ACCOUNTS](state) {
    state.accounts = [];
  },
  [ADD_ACCOUNTS](state, payload) {
    state.accounts = state.accounts.concat(payload);
  },
  [UPDATE_ACCOUNT](state, payload) {
    let allAccounts = [...state.accounts];
    const i = allAccounts.findIndex(a => a.id === payload.id);
    const updatedAccount = {
      ...allAccounts[i],
      role: payload.role,
      uniqueCode: payload.uniqueCode,
      discord: payload.discord,
      discordUniqueId: payload.discordUniqueId,
      hasForeignMinistry: payload.hasForeignMinistry,
      hasFederalAidCommission: payload.hasFederalAidCommission,
      hasDisasterReliefAgency: payload.hasDisasterReliefAgency
    };
    allAccounts = [...allAccounts.splice(0, i), updatedAccount, ...allAccounts.splice(i + 1)];
    state.accounts = allAccounts;
  },
  [REMOVE_ACCOUNT](state, payload) {
    let allAccounts = [...state.accounts];
    const i = allAccounts.findIndex(a => a.id === payload);
    const accounts = [...allAccounts];
    accounts.splice(i, 1);
    allAccounts = accounts;
    state.accounts = allAccounts
  }
};

export const actions = {
  loadAllAccounts(context) {
    const data = [
      {
        id: 1, 
        nationId: 100236, 
        nationName: "Azaroth", 
        rulerName: "Wolfprince", 
        discord: "", 
        discordUniqueId: 0, 
        uniqueCode: "79040", 
        role: "B", 
        alliance: "Freehold of The Wolves", 
        activity: 1, 
        strength: 449958, 
        infra: 23463.1, 
        tech: 65469.8, 
        warStatus: 1, 
        hasForeignMinistry: true, 
        hasFederalAidCommission: true, 
        hasDisasterReliefAgency: true, 
        slotsUsed: 6, 
        slotsFull: 6, 
        totalCashSent: 1242, 
        totalCashReceived: 0, 
        totalTechSent: 0, 
        totalTechReceived: 14500, 
        credit: 9900, 
        debt: 0, 
        cashSentTechCredit: 10200, 
        cashReceivedTechCredit: 0, 
        cashSentCashCredit: 918, 
        cashReceivedCashCredit: 0, 
        techSentCashCredit: 0, 
        techReceivedCashCredit: 27, 
        techSentTechCredit: 0, 
        techReceivedTechCredit: 300, 
        previousListOrder: 999
      }
    ];
    this.$log.info(data);
    context.commit(CLEAR_ACCOUNTS);
    context.commit(ADD_ACCOUNTS, data);
  }
};