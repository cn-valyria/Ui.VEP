<template>
  <div>
    <section class="hero is-light is-medium">
      <div class="hero-body">
        <p class="title">
          <span class="has-text-weight-bold">{{ account.rulerName }}</span> of {{ account.nationName }}
        </p>
        <p class="subtitle">
          <b-field grouped group-multiline>
            <div class="control">
              <ChipAccountRole :code="account.role"></ChipAccountRole>
            </div>
            <div class="control">
              <ChipAllianceAcronym :allianceName="account.allianceName"></ChipAllianceAcronym>
            </div>
          </b-field>
        </p>
      </div>
    </section>
    <div class="container">
      <div class="section">
        <AccountBalance :credit="account.credit" :debt="account.debt" :role="account.role"></AccountBalance>
      </div>
    </div>
    <div class="container">
      <div class="section">
        <b-collapse class="card" animation="slide">
          <template #trigger>
            <div class="card-header">
              <p class="card-header-title">Acceptable Senders</p>
            </div>
          </template>
          <div class="card-content">
            <div class="content">
              <p>Please use this tool to verify VEP enrollment of incoming aid senders that you don't recognize before accepting it.</p>
              <p>IMPORTANT: Do not use this list to send aid. It should only be used to verify that nations sending you aid are doing so legitimately.</p>
              <b-table :data="aidList">
                <b-table-column field="nation" label="Nation" v-slot="props">
                  {{ props.row.nation.rulerName }} of {{ props.row.nation.nationName }}
                </b-table-column>
                <b-table-column field="nation.allianceName" label="Alliance" v-slot="props">
                  {{ props.row.nation.allianceName }} <ChipAllianceAcronym :allianceName="props.row.nation.allianceName"></ChipAllianceAcronym>
                </b-table-column>
                <b-table-column field="slotsFree" label="Slots Free" v-slot="props">
                  {{ props.row.slotsFree }}
                </b-table-column>
                <b-table-column field="discord" label="Discord Tag" v-slot="props">
                  {{ props.row.discord }}
                </b-table-column>
              </b-table>
            </div>
          </div>
        </b-collapse>
      </div>
    </div>
    <div class="container">
      <div class="section">
        <b-collapse class="card" animation="slide">
          <template #trigger>
            <div class="card-header">
              <p class="card-header-title">Credit History</p>
            </div>
          </template>
          <div class="card-content">
            <div class="content">
              <p>
                Your entire history of credit changes, as recorded in the VEP. This history includes both aid-based transactions, as well as manually-
                configured credits or debts that may have been added to your account by an admin. Please contact VEP Management if you have any 
                concerns about your credit history.
              </p>
              <b-table :data="creditHistory">
                <b-table-column field="otherNation" column="Other Nation" v-slot="props">
                  {{ props.row.otherNation !== null ? `${props.row.otherNation.rulerName} of ${props.row.otherNation.nationName}` : "VEP Management" }}
                </b-table-column>
                <b-table-column field="type" label="Type" v-slot="props">
                  {{ props.row.type }}
                </b-table-column>
                <b-table-column field="status" label="Status" v-slot="props">
                  {{ toAidStatusDescription(props.row.status) }}
                </b-table-column>
                <b-table-column field="money" label="Money" v-slot="props">
                  {{ props.row.money !== null ? props.row.money : "N/A" }}
                </b-table-column>
                <b-table-column field="technology" label="Tech" v-slot="props">
                  {{ props.row.technology !== null ? props.row.technology : "N/A" }}
                </b-table-column>
                <b-table-column field="balanceChangeType" label="Credit Change" v-slot="props">
                  FINISH THIS
                </b-table-column>
                <b-table-column field="sentOn" label="Sent On" v-slot="props">
                  {{ props.row.sentOn !== null ? props.row.sentOn.split('T')[0] : "N/A" }}
                </b-table-column>
              </b-table>
            </div>
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { accountRoles } from '~/infrastructure/dataLists';

export default {
  name: "AccountPage",
  data: () => ({
    roles: accountRoles
  }),
  computed: {
    ...mapState({
      account: state => state.account.account,
      aidList: state => state.account.aidList
    }),
    ...mapGetters({
      creditHistory: "account/creditHistory"
    }),
    accountId() {
      const parsedId = parseInt(this.$route.params.id);
      return isNaN(parsedId) ? 0 : parsedId;
    }
  },
  async created() {
    await this.loadAccount(this.accountId);

    // TODO: Fix this to be dynamically driven by the account role
    await this.loadAidList(1);
    await this.loadTransactionHistory({ rulerName: this.account.rulerName })
  },
  methods: {
    ...mapActions({
      loadAccount: "account/loadAccount",
      loadAidList: "account/loadAidList",
      loadTransactionHistory: "account/loadTransactionHistory"
    }),
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