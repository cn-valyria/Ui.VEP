import {
  RELOAD_TRANSACTIONS_PAGE,
  UPDATE_TRANSACTION,
  REMOVE_TRANSACTION
} from "./mutation-types"

export const state = () => ({
  currentTransactionsPage: {
    totalCount: 0,
    data: []
  }
});

export const mutations = {
  [RELOAD_TRANSACTIONS_PAGE](state, { data, totalCount }) {
    state.currentTransactionsPage.data = data;
    state.currentTransactionsPage.totalCount = totalCount;
  },
  [UPDATE_TRANSACTION](state, payload) {
    // TODO: things
  },
  [REMOVE_TRANSACTION](state, payload) {
    // TODO: things
  }
};

export const actions = {
  async reloadCurrentTransactionsPage(context, { type, filter, limit, offset }) {
    const params = toURLSearchParams(filter, limit, offset);
    const response = await this.$axios.get(`transactions/${type}${params.toString().length > 0 ? "?" + params.toString() : ""}`);
    this.$log.debug(response);
    context.commit(RELOAD_TRANSACTIONS_PAGE, {
      data: response.data.results,
      totalCount: response.data.totalCount
    });
  }
};

function toURLSearchParams(filter, limit, offset) {
  const params = new URLSearchParams();
  if (filter) {
    if (filter.sentBy) params.append("sentBy", filter.sentBy);
    if (filter.receivedBy) params.append("receivedBy", filter.receivedBy);
    if (filter.sentSince) params.append("sentSince", filter.sentSince.toDateString());
    if (filter.sentUntil) params.append("sentUntil", filter.sentUntil.toDateString());
  }
  if (limit) params.append("limit", limit.toString());
  if (offset) params.append("offset", offset.toString());

  return params;
}

export const getters = {
  aidBasedTransactions: state => {
    // Currently we don't need to do any mapping, so just return the array if all of it has Aid IDs
    const data = state.currentTransactionsPage.data;
    return data.some(txn => txn.aidId === null) ? [] : data;
  },
  manualTransactions: state => {
    const data = state.currentTransactionsPage.data;
    return data.some(txn => txn.aidId !== null) 
      ? []
      : data.map(txn => ({
        id: txn.id,
        nation: txn.sentBy !== undefined ? txn.sentBy : txn.receivedBy,
        // txn.sentBy !== undefined ? AdjustmentType.Credit : AdjustmentType.Debt,
        reason: txn.reason,
        accountCode: (txn.code?.sendingRole ?? "") + (txn.code?.receivingRole ?? ""),
        classification: txn.classification,
        rate: txn.rate,
        cashMovedTechCredit: txn.cashMovedTechCredit,
        cashMovedCashCredit: txn.cashMovedCashCredit,
        techMovedCashCredit: txn.techMovedCashCredit,
        techMovedTechCredit: txn.techMovedTechCredit
      }));
  }
}