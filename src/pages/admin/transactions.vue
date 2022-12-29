<template>
  <div>
    <div class="container">
      <div class="section">
        <h1 class="title">VEP Transactions</h1>
        <h2 class="subtitle">Manage every transaction that VEP tracks, as well as manual balance adjustments</h2>
      </div>
    </div>
    <div class="container">
      <div class="section">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Sent By</label>
              <div class="control">
                <input class="input" type="search" placeholder="Nation, Ruler, or Alliance name" />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Received By</label>
              <div class="control">
                <input class="input" type="search" placeholder="Nation, Ruler, or Alliance name" />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Since</label>
              <div class="control">
                <input class="input" type="date" />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Until</label>
              <div class="control">
                <input class="input" type="date" />
              </div>
            </div>
          </div>
        </div>
        <div class="tabs is-boxed">
          <ul>
            <li :class="{ 'is-active': currentTab === TRANSACTION_TYPES.aidBased }">
              <a @click="changeTab(TRANSACTION_TYPES.aidBased)">
                <span>Aid-Based</span>
              </a>
            </li>
            <li :class="{ 'is-active': currentTab === TRANSACTION_TYPES.manual }">
              <a @click="changeTab(TRANSACTION_TYPES.manual)">
                <span>Manual</span>
              </a>
            </li>
          </ul>
        </div>
        <div v-if="currentTab === TRANSACTION_TYPES.aidBased" class="table-container">
          <b-table :data="aidBasedTransactions" :loading="tableIsLoading">
            <b-table-column field="id" label="Actions" width="140px" v-slot="props">
              <div class="buttons are-small">
                <button class="button is-info" @click="editTransaction(props.row, TRANSACTION_TYPES.aidBased)">View</button>
                <button
                  class="button is-danger"
                  :class="{ 'is-loading': transactionIdBeingDeleted === props.row.id }"
                  @click="deleteTransactionById(props.row.id)"
                >
                  Delete
                </button>
              </div>
            </b-table-column>
            <b-table-column field="sentBy" label="Sent By" v-slot="props">
              {{ props.row.sentBy.rulerName }} of {{ props.row.sentBy.nationName }}
            </b-table-column>
            <b-table-column field="receivedBy" label="Received By" v-slot="props">
              {{ props.row.receivedBy.rulerName }} of {{ props.row.receivedBy.nationName }}
            </b-table-column>
            <b-table-column field="code" label="Role Pairing" v-slot="props">
              {{ props.row.code.sendingRole }}{{ props.row.code.receivingRole}}
            </b-table-column>
            <b-table-column field="status" label="Status" v-slot="props">
              {{ toAidStatusDescription(props.row.status) }}
            </b-table-column>
            <b-table-column field="money" label="Money" v-slot="props">
              {{ props.row.money }}
            </b-table-column>
            <b-table-column field="technology" label="Tech" v-slot="props">
              {{ props.row.technology }}
            </b-table-column>
            <b-table-column field="reason" label="Reason" v-slot="props">
              {{ props.row.reason }}
            </b-table-column>
            <b-table-column field="startsOn" label="Sent On" v-slot="props">
              {{ props.row.startsOn.split('T')[0] }}
            </b-table-column>
            <template #empty>
              <div class="has-text-centered">No transactions currently loaded</div>
            </template>
          </b-table>
        </div>
        <div v-if="currentTab === TRANSACTION_TYPES.manual" class="table-container">
          <button class="button is-success" @click="createTransaction()">Create</button>
          <b-table :data="manualTransactions" :loading="tableIsLoading">
            <b-table-column field="id" label="Actions" width="140px" v-slot="props">
              <div class="buttons are-small">
                <button class="button is-info" @click="editTransaction(props.row, TRANSACTION_TYPES.manual)">Edit</button>
                <button
                  class="button is-danger"
                  :class="{ 'is-loading': transactionIdBeingDeleted === props.row.id }"
                  @click="deleteTransactionById(props.row.id)"
                >
                  Delete
                </button>
              </div>
            </b-table-column>
            <b-table-column field="nation" label="Account" v-slot="props">
              {{ props.row.nation.rulerName }} of {{ props.row.nation.nationName }}
            </b-table-column>
            <b-table-column field="adjustmentType" label="Adjustment Type" v-slot="props">
              {{ props.row.adjustmentType }}
            </b-table-column>
            <b-table-column field="reason" label="Reason" v-slot="props">
              {{ props.row.reason }}
            </b-table-column>
            <b-table-column field="accountCode" label="Role" v-slot="props">
              {{ props.row.accountCode }}
            </b-table-column>
            <b-table-column field="classification" label="Classification" v-slot="props">
              {{ classifications.find(c => c.id === props.row.classification).description }}
            </b-table-column>
            <b-table-column field="rate" label="Rate" v-slot="props">
              {{ props.row.rate }}
            </b-table-column>
            <template #empty>
              <div class="has-text-centered">No transactions currently loaded</div>
            </template>
          </b-table>
        </div>
        <div class="columns">
          <div class="column is-four-fifths">
            <nav class="pagination is-centered" role="navigation" aria-label="pagination">
              <a class="pagination-previous" @click="changePage(currentPage - 1)">Previous</a>
              <a class="pagination-next" @click="changePage(currentPage + 1)">Next</a>
              <ul class="pagination-list">
                <li>
                  <a class="pagination-link" :class="{ 'is-current': currentPage === 1 }" @click="changePage(1)">
                    1
                  </a>
                </li>
                <li v-if="currentPage <= 3 && totalPages >= 2">
                  <a class="pagination-link" :class="{ 'is-current': currentPage === 2 }" @click="changePage(2)">
                    2
                  </a>
                </li>
                <li v-if="currentPage <= 3 && totalPages >= 3">
                  <a class="pagination-link" :class="{ 'is-current': currentPage === 3 }" @click="changePage(3)">
                    3
                  </a>
                </li>
                <li v-if="currentPage <= 3 && totalPages >= 4">
                  <a class="pagination-link" @click="changePage(4)">4</a>
                </li>
                <li v-if="currentPage <= 3 && totalPages >= 5">
                  <a class="pagination-link" @click="changePage(5)">5</a>
                </li>
                <li v-if="currentPage <= 3 && totalPages >= 7">
                  <span class="pagination-link">&hellip;</span>
                </li>
                <li v-if="currentPage > 3 && totalPages > 6 && totalPages - currentPage > 2">
                  <span class="pagination-link">&hellip;</span>
                </li>
                <li v-if="currentPage > 3 && totalPages > 6 && totalPages - currentPage > 2">
                  <a class="pagination-link" @click="changePage(currentPage - 1)">
                    {{ currentPage - 1 }}
                  </a>
                </li>
                <li v-if="currentPage > 3 && totalPages > 6 && totalPages - currentPage > 2">
                  <a class="pagination-link is-current">
                    {{ currentPage }}
                  </a>
                </li>
                <li v-if="currentPage > 3 && totalPages > 6 && totalPages - currentPage > 2">
                  <a class="pagination-link" @click="changePage(currentPage + 1)">
                    {{ currentPage + 1 }}
                  </a>
                </li>
                <li v-if="currentPage > 3 && totalPages > 6 && totalPages - currentPage > 2">
                  <span class="pagination-link">&hellip;</span>
                </li>
                <li v-if="totalPages > 6 && totalPages - currentPage <= 2">
                  <span class="pagination-link">&hellip;</span>
                </li>
                <li v-if="totalPages > 6 && totalPages - currentPage <= 2">
                  <a class="pagination-link" @click="changePage(totalPages - 4)">
                    {{ totalPages - 4 }}
                  </a>
                </li>
                <li v-if="totalPages > 6 && totalPages - currentPage <= 2">
                  <a class="pagination-link" @click="changePage(1)">
                    {{ totalPages - 3 }}
                  </a>
                </li>
                <li v-if="totalPages > 6 && totalPages - currentPage <= 2">
                  <a
                    class="pagination-link" 
                    :class="{ 'is-current': currentPage === totalPages } - 2"
                    @click="changePage(totalPages - 2)"
                  >
                    {{ totalPages - 2 }}
                  </a>
                </li>
                <li v-if="totalPages > 6 && totalPages - currentPage <= 2">
                  <a
                    class="pagination-link"
                    :class="{ 'is-current': currentPage === totalPages } - 1"
                    @click="changePage(totalPages - 1)"
                  >
                    {{ totalPages - 1 }}
                  </a>
                </li>
                <li v-if="totalPages >= 6">
                  <a
                    class="pagination-link"
                    :class="{ 'is-current': currentPage === totalPages }"
                    @click="changePage(totalPages)"
                  >
                    {{ totalPages }}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div class="column">
            <div class="select">
              <select v-model="limit">
                <option v-for="option in limitOptions" :key="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AdminAidBasedTransactionDialog
      :show="aidBasedDialogIsVisible" 
      :transaction="transactionBeingEdited" 
      @close="closeDialog(TRANSACTION_TYPES.aidBased)"
    />
    <AdminManualTransactionDialog 
      :show="manualDialogIsVisible" 
      :transaction="transactionBeingEdited" 
      :accounts="accounts" 
      @close="closeDialog(TRANSACTION_TYPES.manual)"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { TRANSACTION_TYPES } from "~/infrastructure/constants";
import { transactionClassifications } from '~/infrastructure/dataLists';

export default {
  name: "AdminTransactionsPage",
  data: () => ({
    TRANSACTION_TYPES,
    currentTab: TRANSACTION_TYPES.aidBased,
    currentPage: 1,
    limit: 25,
    limitOptions: [ 10, 25, 100, 500 ],
    tableIsLoading: false,
    aidBasedDialogIsVisible: false,
    manualDialogIsVisible: false,
    transactionBeingEdited: undefined,
    transactionIdBeingDeleted: 0,
    classifications: transactionClassifications
  }),
  computed: {
    ...mapState({
      currentTransactionsPage: state => state.admin.transactions.currentTransactionsPage,
      accounts: state => state.admin.accounts.accounts
    }),
    ...mapGetters({
      aidBasedTransactions: "admin/transactions/aidBasedTransactions",
      manualTransactions: "admin/transactions/manualTransactions"
    }),
    totalPages() {
      return Math.ceil(this.currentTransactionsPage.totalCount / 100);
    },
    tabIsAidBased() {
      return this.currentTab === TRANSACTION_TYPES.aidBased;
    },
    tabIsManual() {
      return this.currentTab === TRANSACTION_TYPES.manual;
    }
  },
  async created() {
    await this.changePage(1);
    this.$log.info(this.currentTransactionsPage);

    await this.loadAllAccounts();
    this.$log.info(this.accounts);
  },
  methods: {
    ...mapActions({
      reloadCurrentTransactionsPage: "admin/transactions/reloadCurrentTransactionsPage",
      deleteTransaction: "admin/transactions/deleteTransaction",
      loadAllAccounts: "admin/accounts/loadAllAccounts"
    }),
    async changePage(newPageNumber) {
      this.tableIsLoading = true;
      this.currentPage = newPageNumber;
      try {
        await this.reloadCurrentTransactionsPage({
          type: this.currentTab,
          filter: {},
          limit: this.limit,
          offset: this.limit * (this.currentPage - 1)
        });
      } catch (e) {
        this.$log.error(e);
        this.$toast.error("The current page failed to load");
      }

      this.tableIsLoading = false;
    },
    async changeTab(tabName) {
      if (this.currentTab === tabName) {
        this.$log.warn("The same tab that is already active was clicked, so nothing will happen.");
        return;
      }

      this.currentTab = tabName;
      await this.changePage(1);
    },
    toAidStatusDescription(statusId) {
      switch (statusId) {
        case 1: return "Pending";
        case 2: return "Approved";
        case 3: return "Cancelled";
        case 4: return "Expired";
        default: return "Unknown";
      }
    },
    createTransaction() {
      this.transactionBeingEdited = {};
      this.manualDialogIsVisible = true;
    },
    editTransaction(transaction, transactionType) {
      this.transactionBeingEdited = transaction;

      if (transactionType === TRANSACTION_TYPES.aidBased) {
        this.aidBasedDialogIsVisible = true;
      } else if (transactionType === TRANSACTION_TYPES.manual) {
        this.manualDialogIsVisible = true;
      }
    },
    async deleteTransactionById(id) {
      this.transactionIdBeingDeleted = id;

      try {
        await this.deleteTransaction(id);
      } catch (e) {
        this.$log.error(e);
        this.$toast.error("VEP encountered an error while deleting the transaction. Please try again, or contact @lilweirdward if the error persists.");
      }

      this.transactionIdBeingDeleted = 0;
      await this.changePage(this.currentPage);
    },
    closeDialog(transactionType) {
      if (transactionType === TRANSACTION_TYPES.aidBased) {
        this.aidBasedDialogIsVisible = false;
      } else if (transactionType === TRANSACTION_TYPES.manual) {
        this.manualDialogIsVisible = false;
      }
      
      this.transactionBeingEdited = undefined;
      this.changePage(this.currentPage);
    }
  }
}
</script>