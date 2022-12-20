<template>
  <div class="modal" :class="{ 'is-active': show }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">New Manual Transaction</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
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
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="create()">Save</button>
        <button class="button">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
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
    accountTextbox: ""
  }),
  computed: {
    selectedAccount: {
      get() {
        if (this.transactionNation.nationId !== undefined) {
          return this.accounts.find(account => account.id === this.transactionNation.nationId);
        } else {
          return null;
        }
      },
      set(val) {
        this.$log.debug(val);
        if (val === null) {
          this.$set(this.transactionBeingEdited, "nation", null);
        } else {
          this.$set(this.transactionBeingEdited, "nation", {
            nationId: val.id,
            nationName: val.nationName,
            rulerName: val.rulerName,
            allianceName: val.allianceName
          });
        }
      }
    },
    filteredAccounts() {
      return this.accounts.filter(account => account.rulerName.toLowerCase().indexOf(this.accountTextbox.toLowerCase()) >= 0);
    },
    transactionNation: {
      get() {
        if (this.transactionBeingEdited.nation) {
          return this.transactionBeingEdited.nation;
        } else {
          return {};
        }
      },
      set(val) {
        if (this.transactionBeingEdited === undefined) {
          return
        }

        this.transactionBeingEdited.nation = val;
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
    },
    accounts(val) {
      this.$log.debug(val);
    },
    transactionBeingEdited(val) {
      this.$log.debug(val);
    }
  },
  methods: {
    create() {
      this.$log.debug(this.transactionBeingEdited);
    }
  }
}
</script>