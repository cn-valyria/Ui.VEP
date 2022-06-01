<template>
  <div>
    <div class="container">
      <div class="section">
        <h1 class="title">VEP Accounts</h1>
        <h2 class="subtitle">Manage accounts enrolled in VEP, or enroll new accounts</h2>
      </div>
    </div>
    <div class="container">
      <div class="section table-container">
        <button class="button is-success" @click="createAccount()">Create</button>
        <table class="table is-hoverable">
          <thead>
            <tr>
              <th>Actions</th>
              <th>NationID</th>
              <th>Ruler</th>
              <th>Nation</th>
              <th>Discord</th>
              <th>DiscordID</th>
              <th>PSW</th>
              <th>VA</th>
              <th>AA</th>
              <th>Activity</th>
              <th>Strength</th>
              <th>Infra</th>
              <th>Tech</th>
              <th>War</th>
              <th>FM</th>
              <th>FAC</th>
              <th>DRA</th>
              <th>Free</th>
              <th>Full</th>
              <th>sCash</th>
              <th>sTech</th>
              <th>Credit</th>
              <th>Debt</th>
              <th>Balance</th>
              <th>ctB</th>
              <th>ctS</th>
              <th>ccB</th>
              <th>ccS</th>
              <th>tcB</th>
              <th>tcS</th>
              <th>ttB</th>
              <th>ttS</th>
              <th>Prv</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(account, i) in accounts" :key="i">
              <td>
                <div class="buttons are-small">
                  <button class="button is-info" @click="editAccount(account)">Edit</button>
                  <button class="button is-danger">Delete</button>
                </div>
              </td>
              <td>{{ account.nationId }}</td>
              <td>{{ account.rulerName }}</td>
              <td>{{ account.nationName }}</td>
              <td>{{ account.discord }}</td>
              <td>{{ account.discordUniqueId }}</td>
              <td>{{ account.uniqueCode }}</td>
              <td>{{ account.role }}</td>
              <td>FIX THIS</td>
              <td>{{ account.activity }}</td>
              <td>{{ account.strength }}</td>
              <td>{{ account.infra }}</td>
              <td>{{ account.tech }}</td>
              <td>{{ account.warStatus === 1 ? "WM" : "PM" }}</td>
              <td>{{ account.hasForeignMinistry }}</td>
              <td>{{ account.hasFederalAidCommission }}</td>
              <td>{{ account.hasDisasterReliefAgency }}</td>
              <td>{{ account.slotsFull - account.slotsUsed }}</td>
              <td>{{ account.slotsFull }}</td>
              <td>{{ account.totalCashSent - account.totalCashReceived }}</td>
              <td>{{ account.totalTechSent - account.totalTechReceived }}</td>
              <td>{{ account.credit }}</td>
              <td>FIX THIS</td>
              <td>FIX THIS</td>
              <td>{{ account.cashSentTechCredit }}</td>
              <td>{{ account.cashReceivedTechCredit }}</td>
              <td>{{ account.cashSentCashCredit }}</td>
              <td>{{ account.cashReceivedCashCredit }}</td>
              <td>{{ account.techSentCashCredit }}</td>
              <td>{{ account.techReceivedCashCredit }}</td>
              <td>{{ account.techSentTechCredit }}</td>
              <td>{{ account.techReceivedTechCredit }}</td>
              <td>{{ account.previousListOrder }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <AdminAccountEditDialog 
      :account="accountBeingEdited" 
      :show="editDialogIsVisible"
      @close="closeAccountEditDialog()" 
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'AccountsPage',
  data: () => ({
    editDialogIsVisible: false,
    accountBeingEdited: undefined
  }),
  computed: {
    ...mapState({
      accounts: state => state.admin.accounts.accounts
    })
  },
  created() {
    this.loadAllAccounts();
    this.$log.info(this.accounts);
  },
  methods: {
    ...mapActions({
      loadAllAccounts: 'admin/accounts/loadAllAccounts'
    }),
    createAccount() {
      this.accountBeingEdited = {};
      this.editDialogIsVisible = true;
    },
    editAccount(account) {
      this.accountBeingEdited = account;
      this.editDialogIsVisible = true;
    },
    closeAccountEditDialog() {
      this.accountBeingEdited = undefined;
      this.editDialogIsVisible = false;
    }
  }
}
</script>