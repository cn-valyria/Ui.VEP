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
            <!-- <div class="dropdown">
                    <div class="dropdown-trigger">
                        <div class="field">
                            <label class="label">Sent By</label>
                            <div class="control">
                                <input class="input" type="search" placeholder="Nation or Ruler name" />
                            </div>
                        </div>
                    </div>
                    <div class="dropdown-menu" role="menu">
                        <div class="dropdown-content">
                            <p class="is-size-6" style="padding: 0 12px">Nations</p>
                            <span class="dropdown-item">lilweirdward of Land of Too Much Fun</span>
                            <span class="dropdown-item">Lord Draculea of Transylvania</span>
                            <hr class="dropdown-divider" />
                            <p class="is-size-6" style="padding: 0 12px">Alliances</p>
                            <span class="dropdown-item">Christian Coalition of Countries</span>
                        </div>
                    </div>
                </div> -->
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
            <li class="is-active"> <!-- [class.is-active]="currentTab === transactionType.AidBased" -->
              <a>
                <span>Aid-Based</span>
              </a>
            </li>
            <li>
              <a>
                <span>Manual</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="table-container"> <!-- v-if="currentTab === transactionType.AidBased" -->
          <table class="table">
            <thead>
              <tr>
                <th>Actions</th>
                <th>Sending Ruler</th>
                <th>Receiving Ruler</th>
                <th>Status</th>
                <th>Money</th>
                <th>Tech</th>
                <th>Sold</th>
                <th>Reason</th>
                <th>Aid ID</th>
                <th>Start</th>
                <th>Ends</th>
                <th>Lu</th>
                <th>Cc</th>
                <th>Rate</th>
                <th>CT</th>
                <th>CC</th>
                <th>TC</th>
                <th>TT</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(transaction, i) in transactions" :key="i">
                <td>
                  <div class="buttons are-small">
                    <button class="button is-info">Edit</button>
                  </div>
                </td>
                <td>{{ transaction.sentBy.rulerName || "" }}</td>
                <td>{{ transaction.receivedBy.rulerName || "" }}</td>
                <td>{{ toAidStatusDescription(transaction.status) }}</td>
                <td>{{ transaction.money }}</td>
                <td>{{ transaction.technology }}</td>
                <td>{{ transaction.soldiers }}</td>
                <td>{{ transaction.reason }}</td>
                <td>{{ transaction.aidId || "" }}</td>
                <td>{{ transaction.startsOn }}</td>
                <td>FIX THIS</td>
                <td>{{ (transaction.code && transaction.code.sendingRole + transaction.code.receivingRole) || "" }}</td>
                <td>{{ transaction.classification }}</td>
                <td>{{ transaction.rate }}</td>
                <td>{{ transaction.cashMovedTechCredit }}</td>
                <td>{{ transaction.cashMovedCashCredit }}</td>
                <td>{{ transaction.techMovedCashCredit }}</td>
                <td>{{ transaction.techMovedTechCredit }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="false" class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Actions</th>
                <th>Ruler Name</th>
                <th>Nation Name</th>
                <th>Adjustment Type</th>
                <th>Reason</th>
                <th>Lu</th>
                <th>Cc</th>
                <th>Rate</th>
                <th>CT</th>
                <th>CC</th>
                <th>TC</th>
                <th>TT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="buttons are-small">
                    <button class="button is-info">Edit</button>
                    <button class="button is-danger">Delete</button>
                  </div>
                </td>
                <td>FIX THIS</td><!-- {{ transaction.nation.rulerName }} -->
                <td>FIX THIS</td><!-- {{ transaction.nation.nationName }} -->
                <td>FIX THIS</td><!-- {{ adjustmentTypeNames[transaction.adjustmentType] }} -->
                <td>FIX THIS</td><!-- {{ transaction.reason }} -->
                <td>FIX THIS</td><!-- {{ transaction.accountCode }} -->
                <td>FIX THIS</td><!-- {{ transaction.classification }} -->
                <td>FIX THIS</td><!-- {{ transaction.rate }} -->
                <td>FIX THIS</td><!-- {{ transaction.cashMovedTechCredit }} -->
                <td>FIX THIS</td><!-- {{ transaction.cashMovedCashCredit }} -->
                <td>FIX THIS</td><!-- {{ transaction.techMovedCashCredit }} -->
                <td>FIX THIS</td><!-- {{ transaction.techMovedTechCredit }} -->
              </tr>
            </tbody>
          </table>
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
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "TransactionsPage",
  data: () => ({
    currentPage: 1,
    limit: 25,
    limitOptions: [ 10, 25, 100, 500 ]
  }),
  computed: {
    ...mapState({
      currentTransactionsPage: state => state.admin.transactions.currentTransactionsPage
    }),
    transactions() {
      return this.currentTransactionsPage.data;
    },
    totalPages() {
      return Math.ceil(this.currentTransactionsPage.totalCount / 100);
    }
  },
  async created() {
    await this.changePage(1);
    this.$log.info(this.currentTransactionsPage);
  },
  methods: {
    ...mapActions({
      reloadCurrentTransactionsPage: "admin/transactions/reloadCurrentTransactionsPage"
    }),
    async changePage(newPageNumber) {
      this.currentPage = newPageNumber;
      await this.reloadCurrentTransactionsPage({
        filter: {},
        limit: this.limit,
        offset: this.limit * (this.currentPage - 1)
      });
    },
    toAidStatusDescription(statusId) {
      switch (statusId) {
        case 1: return "Pending";
        case 2: return "Approved";
        case 3: return "Cancelled";
        case 4: return "Expired";
        default: return "Unknown";
      }
    }
  }
}
</script>