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
  async loadAllAccounts(context) {
    const response = await this.$axios.get("accounts");
    this.$log.info(response);
    context.commit(CLEAR_ACCOUNTS);
    context.commit(ADD_ACCOUNTS, response.data);
  }
};