import { LOAD_ACCOUNT, LOAD_LIST, LOAD_TRANSACTIONS } from "./mutation-types";

export const state = () => ({
  account: {},
  aidList: [],
  transactionHistory: []
});

export const mutations = {
  [LOAD_ACCOUNT](state, payload) {
    state.account = payload;
  },
  [LOAD_LIST](state, payload) {
    state.aidList = payload;
  },
  [LOAD_TRANSACTIONS](state, payload) {
    state.transactionHistory = payload;
  }
};

export const actions = {
  // TODO: Refactor because this is a shitty way to load the account
  async loadAccount(context, accountId) {
    const response = await this.$axios.get("accounts");
    this.$log.debug(response);

    const account = response.data.find(a => a.id === accountId);
    if (account) {
      context.commit(LOAD_ACCOUNT, account);
    } else {
      throw new Error(`No account could be found for ID ${accountId}`);
    }
  },
  async loadAidList(context, listId) {
    const response = await this.$axios.get("lists");
    this.$log.debug(response);

    const aidList = response.data.find(l => l.id === listId);
    if (aidList) {
      context.commit(LOAD_LIST, aidList.recipients);
    } else {
      throw new Error(`No aid list could be found for ID ${listId}`);
    }
  },
  // TODO: Refactor because this is an even shittier way to load transaction history
  async loadTransactionHistory(context, { rulerName }) {
    const params = new URLSearchParams();
    params.append("sentBy", rulerName);
    params.append("receivedBy", rulerName);
    params.append("limit", 500);

    const response = await this.$axios.get(`transactions/all?${params.toString()}`);
    this.$log.debug(response);
    context.commit(LOAD_TRANSACTIONS, response.data.results);
  }
};

export const getters = {
  creditHistory: state => {
    const account = state.account;
    if (account.nationId === undefined) {
      return [];
    }
    
    const transactions = state.transactionHistory;
    return transactions.map(txn => ({
      id: txn.id,
      otherNation: buildOtherNation(txn, account),
      type: buildTransactionType(txn, account),
      status: txn.status,
      rate: txn.rate,
      money: txn.aidId === null ? null : txn.money,
      technology: txn.aidId === null ? null : txn.technology,
      balanceChangeType: buildBalanceChangeType(txn, account),
      sentOn: txn.startsOn
    }));
  }
};

function buildOtherNation(txn, account) {
  if (txn.aidId === null) {
    return null;
  } else if (txn.sentBy.nationId !== account.nationId) {
    return txn.sentBy;
  } else if (txn.receivedBy.nationId !== account.nationId) {
    return txn.receivedBy;
  } else {
    throw new Error("Unable to find a valid nation for the given transaction and account.");
  }
}

function buildTransactionType(txn, account) {
  const incoming = "Incoming";
  const outgoing = "Outgoing";

  if (txn.aidId === null) {
    return txn.sentBy !== null ? outgoing : incoming;
  } else if (txn.sentBy.nationId === account.nationId) {
    return outgoing;
  } else if (txn.receivedBy.nationId === account.nationId) {
    return incoming;
  } else {
    throw new Error("Unable to determine the transaction type for the given transaction and account.");
  }
}

function buildBalanceChangeType(txn, account) {
  const credit = "Credit";
  const debt = "Debt";

  if (txn.aidId === null) {
    return txn.sentBy !== null ? credit : debt;
  } else if (txn.sentBy.nationId === account.nationId) {
    return credit;
  } else if (txn.receivedBy.nationId === account.nationId) {
    return debt;
  } else {
    throw new Error("Unable to determine the balance change type for the given transaction and account.");
  }
}