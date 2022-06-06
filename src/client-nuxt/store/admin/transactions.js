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
  async reloadCurrentTransactionsPage(context, { filter, limit, offset }) {
    const params = toURLSearchParams(filter, limit, offset);
    const response = await this.$axios.get(`transactions${params.toString().length > 0 ? "?" + params.toString() : ""}`);
    this.$log.debug(response);
    context.commit(RELOAD_TRANSACTIONS_PAGE, {
      data: response.data.aidBasedTransactions.results,
      totalCount: response.data.aidBasedTransactions.totalCount
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