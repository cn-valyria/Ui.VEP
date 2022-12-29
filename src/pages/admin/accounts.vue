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
        <b-table :data="accounts">
          <b-table-column field="id" label="Actions" v-slot="props">
            <div class="buttons are-small">
              <button class="button is-info" @click="editAccount(props.row)">Edit</button>
              <button
                class="button is-danger"
                :class="{ 'is-loading': accountIdBeingDeleted === props.row.id }"
                @click="deleteAccountById(props.row.id)"
              >
                Delete
              </button>
            </div>
          </b-table-column>
          <b-table-column field="nationId" label="Nation" v-slot="props">
            {{ props.row.rulerName }} of {{ props.row.nationName }}
          </b-table-column>
          <b-table-column field="allianceName" label="Alliance" v-slot="props">
            {{ props.row.allianceName }}
          </b-table-column>
          <b-table-column field="role" label="Role" v-slot="props">
            {{ roles.find(r => r.code === props.row.role).description }}
          </b-table-column>
          <b-table-column field="credit" label="Credit" v-slot="props">
            {{ props.row.credit }}
          </b-table-column>
          <b-table-column field="debt" label="Debt" v-slot="props">
            {{ props.row.debt }}
          </b-table-column>
          <b-table-column field="slotsUsed" label="Slots Free" v-slot="props">
            {{ props.row.slotsFull - props.row.slotsUsed }}
          </b-table-column>
          <b-table-column field="slotsFull" label="Slots Full" v-slot="props">
            {{ props.row.slotsFull }}
          </b-table-column>
          <b-table-column field="previousListOrder" label="Previous List Order" v-slot="props">
            {{ props.row.previousListOrder }}
          </b-table-column>
        </b-table>
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
import { accountRoles } from '~/infrastructure/dataLists';

export default {
  name: 'AdminAccountsPage',
  data: () => ({
    editDialogIsVisible: false,
    accountBeingEdited: undefined,
    accountIdBeingDeleted: 0,
    roles: accountRoles
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
      loadAllAccounts: "admin/accounts/loadAllAccounts",
      deleteAccount: "admin/accounts/deleteAccount"
    }),
    createAccount() {
      this.accountBeingEdited = {};
      this.editDialogIsVisible = true;
    },
    editAccount(account) {
      this.accountBeingEdited = account;
      this.editDialogIsVisible = true;
    },
    async deleteAccountById(accountId) {
      this.accountIdBeingDeleted = accountId;

      try {
        await this.deleteAccount(accountId);
      } catch (e) {
        this.$log.error(e);
        this.$toast.error("VEP encountered an error while deleting the account. Please try again, or contact @lilweirdward if the error persists.");
      }

      this.accountIdBeingDeleted = 0;
    },
    closeAccountEditDialog() {
      this.accountBeingEdited = undefined;
      this.editDialogIsVisible = false;
    }
  }
}
</script>