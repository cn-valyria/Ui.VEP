<template>
  <div class="modal" :class="{ 'is-active': show }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ transactionBeingEdited.id !== undefined ? "Update" : "New"}} Manual Transaction</p>
        <button class="delete" aria-label="close" @click="close()"></button>
      </header>
      <section class="modal-card-body">
        <div class="content">
          <h2>Manual Data</h2>
          <fieldset :disabled="isInUpdateState">
            <b-field label="Account">
              <b-autocomplete
                v-model="accountTextbox"
                placeholder="No account selected"
                :data="filteredAccounts"
                field="rulerName"
                @select="option => (selectedAccount = option)"
              ></b-autocomplete>
            </b-field>
          </fieldset>
          <fieldset disabled>
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <label class="label">Nation Name</label>
                  <div class="control">
                    <input v-model="transactionNation.nationName" class="input" type="text" />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Ruler Name</label>
                  <div class="control">
                    <input v-model="transactionNation.rulerName" class="input" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div class="field">
              <div class="label">Alliance Name</div>
              <div class="control">
                <input v-model="transactionNation.allianceName" class="input" type="text" />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div class="field">
              <label class="label">Adjustment Type</label>
              <div class="control is-expanded">
                <div class="select is-fullwidth">
                  <select v-model="transactionBeingEdited.adjustmentType">
                    <option disabled value=""></option>
                    <option v-for="adjType of adjustmentTypes">
                      {{ adjType }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </fieldset>
          <div class="field">
            <label class="label">Reason</label>
            <div class="control">
              <input v-model="transactionBeingEdited.reason" class="input" type="text" />
            </div>
          </div>
          <h2>Transaction Metadata</h2>
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <label class="label">Classification</label>
                <div class="control">
                  <input v-model="transactionBeingEdited.classification" class="input" type="text" />
                </div>
              </div>
              <div class="field">
                <label class="label">Rate</label>
                <div class="control">
                  <input v-model="transactionBeingEdited.rate" class="input" type="text" />
                </div>
              </div>
            </div>
          </div>
          <fieldset disabled>
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <label class="label">Cash Moved <br />(Cash)</label>
                  <div class="control">
                    <input v-model="transactionBeingEdited.cashMovedCashCredit" class="input" type="text" />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Cash Moved <br />(Tech)</label>
                  <div class="control">
                    <input v-model="transactionBeingEdited.cashMovedTechCredit" class="input" type="text" />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Tech Moved <br />(Cash)</label>
                  <div class="control">
                    <input v-model="transactionBeingEdited.techMovedCashCredit" class="input" type="text" />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Tech Moved <br />(Tech)</label>
                  <div class="control">
                    <input v-model="transactionBeingEdited.techMovedTechCredit" class="input" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="save()">Save</button>
        <button class="button" @click="close()">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { ADJUSTMENT_TYPES, ERROR_MESSAGES } from '~/infrastructure/constants';

export default {
  props: {
    show: Boolean,
    transaction: {
      type: Object,
      default: () => ({})
    },
    accounts: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    transactionBeingEdited: Object,
    accountTextbox: "",
    adjustmentTypes: [ADJUSTMENT_TYPES.credit, ADJUSTMENT_TYPES.debt]
  }),
  computed: {
    selectedAccount: {
      get() {
        const txn = this.transactionBeingEdited;
        if (txn.nation === undefined || txn.nation === null) {
          return undefined;
        }

        return this.accounts.find(account => account.nationId === txn.nation.nationId);
      },
      set(val) {
        this.$log.debug(val);
        if (val === null) {
          this.$set(this.transactionBeingEdited, "nation", null);
        } else {
          this.$set(this.transactionBeingEdited, "nation", {
            nationId: val.nationId,
            nationName: val.nationName,
            rulerName: val.rulerName,
            allianceName: val.allianceName
          });
        }
        this.recalculateCredits();
      }
    },
    filteredAccounts() {
      return this.accounts.filter(account => account.rulerName.toLowerCase().indexOf(this.accountTextbox.toLowerCase()) >= 0);
    },
    transactionNation() {
      if (this.transactionBeingEdited.nation) {
        return this.transactionBeingEdited.nation;
      } else {
        return {};
      }
    },
    isInUpdateState() {
      return this.transactionBeingEdited !== undefined && this.transactionBeingEdited.id !== undefined;
    }
  },
  watch: {
    transaction(val) {
      this.$log.debug(val);
      this.transactionBeingEdited = { ...val };

      // Update the account textbox if the loaded transaction already has an account defined
      if (this.selectedAccount !== undefined) {
        this.accountTextbox = this.selectedAccount.rulerName;
      }

      // Recalculate the credits when the transaction changes, since they're always readonly
      this.recalculateCredits();
    },
    'transactionBeingEdited.adjustmentType'(val) {
      this.recalculateCredits();
    },
    'transactionBeingEdited.rate'(val) {
      this.recalculateCredits();
    }
  },
  methods: {
    ...mapActions({
      createTransaction: "admin/transactions/createTransaction",
      updateTransaction: "admin/transactions/updateTransaction"
    }),
    async save() {
      const txn = this.transactionBeingEdited;
      this.$log.debug(txn);

      try {
        const payload = {
          aidId: null,
          sendingNationId: txn.adjustmentType === ADJUSTMENT_TYPES.credit ? txn.nation.nationId : null,
          receivingNationId: txn.adjustmentType === ADJUSTMENT_TYPES.debt ? txn.nation.nationId : null,
          reasonOverride: txn.reason,
          lu: this.selectedAccount.role,
          classification: parseInt(txn.classification),
          rate: parseInt(txn.rate),
          cashMovedCashCredit: txn.cashMovedCashCredit,
          cashMovedTechCredit: txn.cashMovedTechCredit,
          techMovedCashCredit: txn.techMovedCashCredit,
          techMovedTechCredit: txn.techMovedTechCredit
        };

        if (txn.id !== undefined) {
          payload.id = txn.id;
          await this.updateTransaction(payload);
        } else {
          await this.createTransaction(payload);
        }
      } catch (e) {
        this.$log.error(e);
        this.$toast.error(ERROR_MESSAGES.default);
      }

      this.$emit("close");
      this.$toast.success("Transaction saved successfully!");
    },
    close() {
      this.accountTextbox = "";
      this.$emit("close");
    },
    recalculateCredits() {
      const txn = this.transactionBeingEdited;
      this.$log.debug(txn);
      if (txn.nation === undefined || txn.nation === null) {
        this.zeroOutCredits(txn);
        return;
      }

      if (this.selectedAccount === undefined) {
        this.zeroOutCredits(txn);
        return;
      }

      const rate = parseInt(txn.rate);
      if (isNaN(rate) || rate === 0) {
        this.zeroOutCredits(txn);
      } else if (txn.adjustmentType === ADJUSTMENT_TYPES.credit) {
        switch (this.selectedAccount.role) {
          case "B":
          case "W":
            this.updateCredits(txn, rate, rate / 9 * 100, 0, 0);
            break;
          case "S":
          case "N":
          case "Q":
            this.updateCredits(txn, 0, 0, rate, rate / 9 * 100);
            break;
          default:
            this.zeroOutCredits(txn);
            break;
        }
      } else if (txn.adjustmentType === ADJUSTMENT_TYPES.debt) {
        switch (this.selectedAccount.role) {
          case "B":
          case "W":
            this.updateCredits(txn, 0, 0, rate, rate / 9 * 100);
            break;
          case "S":
          case "N":
          case "Q":
            this.updateCredits(txn, rate, rate / 9 * 100, 0, 0);
            break;
          default:
            this.zeroOutCredits(txn);
            break;
        }
      } else {
        this.zeroOutCredits(txn);
      }

      this.$log.debug(this.transactionBeingEdited);
    },
    updateCredits(txn, cc, ct, tc, tt) {
      txn.cashMovedCashCredit = cc;
      txn.cashMovedTechCredit = ct;
      txn.techMovedCashCredit = tc;
      txn.techMovedTechCredit = tt;
    },
    zeroOutCredits(txn) {
      this.updateCredits(txn, 0, 0, 0, 0);
    }
  }
}
</script>