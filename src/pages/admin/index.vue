<template>
  <div>
    <div class="container">
      <div class="section">
        <h1 class="title">VEP Dashboard</h1>
      </div>
    </div>
    <div class="container">
      <div class="section">
        <nav class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Total Accounts</p>
              <p class="title">15</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Buyer to Seller Ratio</p>
              <p class="title">1.14</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Total Aid Transactions</p>
              <p class="title">5</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Available Credit</p>
              <p class="title">0</p>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div class="container">
      <div class="section">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <admin-dashboard-total-transactions-tile :data="transactionsPerDay" />
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <admin-dashboard-pending-credit-tile :data="pendingCreditByAlliance" />
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <admin-dashboard-accounts-by-role :data="accountsByRole" />
            </article>
          </div>
        </div>
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <admin-dashboard-total-slots-by-role :data="totalSlotsByRole" />
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <admin-dashboard-free-slots-by-list :data="freeSlotsByList" />
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <admin-dashboard-accounts-by-alliance :data="accountsByAlliance" />
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AdminIndex',
  data: () => ({
    transactionsPerDay: [
      { date: "Jan-19", transactions: 3 },
      { date: "Jan-20", transactions: 2 },
      { date: "Jan-21", transactions: 5 },
      { date: "Jan-22", transactions: 1 },
      { date: "Jan-23", transactions: 2 }
    ],
    pendingCreditByAlliance: [
      {
        alliance: "NATO",
        pendingCredit: [
          { dateRange: "0-2 Days", credit: 27 },
          { dateRange: "3-5 Days", credit: 9 },
          { dateRange: "6-8 Days", credit: 0 },
          { dateRange: "9+ Days", credit: 9 }
        ]
      },
      {
        alliance: "CCC",
        pendingCredit: [
          { dateRange: "0-2 Days", credit: 36 },
          { dateRange: "3-5 Days", credit: 18 },
          { dateRange: "6-8 Days", credit: 9 },
          { dateRange: "9+ Days", credit: 0 }
        ]
      },
      {
        alliance: "FTW",
        pendingCredit: [
          { dateRange: "0-2 Days", credit: 9 },
          { dateRange: "3-5 Days", credit: 9 },
          { dateRange: "6-8 Days", credit: 9 },
          { dateRange: "9+ Days", credit: 9 }
        ]
      }
    ],
    accountsByRole: [
      { role: "Buyer", count: 8 },
      { role: "Seller", count: 7 },
      { role: "On Hold", count: 2 }
    ],
    totalSlotsByRole: [
      { role: "Buyer", totalSlots: 48 },
      { role: "Seller", totalSlots: 42 },
      { role: "Donor", totalSlots: 0 },
      { role: "Farm", totalSlots: 0 }
    ],
    freeSlotsByList: [
      { list: "Outgoing Cash", freeSlots: 12 },
      { list: "Incoming Cash", freeSlots: 5 },
      { list: "Outgoing Tech", freeSlots: 11 },
      { list: "Incoming Tech", freeSlots: 5 }
    ],
    accountsByAlliance: [
      { allianceName: "NATO", count: 10 },
      { allianceName: "Christian Coalition of Countries", count: 4 },
      { allianceName: "Freehold of The Wolves", count: 3 }
    ]
  }),
  computed: {
    ...mapGetters({
      loggedInUser: "loggedInUser"
    })
  },
  created() {
    if (!this.loggedInUser.roles.some(role => role.name === "Admin")) {
      this.$log.warn("Tried to access an admin page without the admin role.");
      this.$router.push("/");
    }
  }
}
</script>