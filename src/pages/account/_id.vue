<template>
  <div>
    <section class="hero is-light is-medium">
      <div class="hero-body">
        <p class="title">
          <span class="has-text-weight-bold">lilweirdward</span> of Land of Too Much Fun
        </p>
        <p class="subtitle">
          <b-taglist>
            <b-tag type="is-dark">Seller</b-tag>
            <b-tag type="is-dark">CCC</b-tag>
          </b-taglist>
        </p>
      </div>
    </section>
    <div class="container">
      <div class="section">
        <div class="content is-large has-text-centered">
          <h3>Your Current Balance</h3>
          <h1 class="has-text-success">$27M Cash (Credit)</h1>
          <p class="has-text-grey-lighter is-uppercase">Your nation is due $27M Cash from other VEP accounts.</p>
        </div>
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
              <b-table :data="acceptableSenders" :columns="acceptableSendersColumns"></b-table>
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
              <b-table :data="creditHistory" :columns="creditHistoryColumns"></b-table>
            </div>
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountPage",
  data: () => ({
    acceptableSenders: [
      { nation: "javaswiller of swillerland", alliance: "Freehold of the Wolves", slotsFree: 6, discord: "javaswiller#2586" }
    ],
    acceptableSendersColumns: [
      { field: "nation", label: "Nation" },
      { field: "alliance", label: "Alliance" },
      { field: "slotsFree", label: "Slots Free" },
      { field: "discord", label: "Discord Tag" }
    ],
    creditHistory: [
      { nation: "n/a", type: "Credit", money: "n/a", tech: "n/a", balanceChangeSummary: "+$27m received", sentOn: "n/a" }
    ],
    creditHistoryColumns: [
      { field: "nation", label: "Other Nation" },
      { field: "type", label: "Type" },
      { field: "money", label: "Money" },
      { field: "tech", label: "Tech" },
      { field: "balanceChangeSummary", label: "Balance Change" },
      { field: "sentOn", "label": "Sent On"}
    ]
  })
}
</script>