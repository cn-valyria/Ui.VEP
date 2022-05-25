<template>
  <div class="modal" :class="{ 'is-active': show }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ account.rulerName }}'s Account</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <div class="content">
          <h2>Account Data</h2>
            <fieldset :disabled="account !== undefined">
                <div class="field">
                    <label class="label">Nation ID</label>
                    <div class="control">
                        <input v-model="accountBeingEdited.nationId" class="input" type="text" placeholder="The account's NationID" />
                    </div>
                    <!-- <p class="help is-danger">{{ prospectSearchError }}</p> -->
                </div>
            </fieldset>
            <fieldset disabled>
                <div class="field is-horizontal">
                    <div class="field-body">
                        <div class="field">
                            <label class="label">Nation Name</label>
                            <div class="control">
                                <input v-model="accountBeingEdited.nationName" class="input" type="text" />
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Ruler Name</label>
                            <div class="control">
                                <input v-model="accountBeingEdited.rulerName" class="input" type="text" />
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
            <fieldset v-if="account !== undefined">
                <div class="field">
                    <label class="label">Role</label>
                    <div class="control is-expanded">
                        <div class="select is-fullwidth">
                          <select v-model="accountBeingEdited.role">
                            <option disabled value=""></option>
                            <option v-for="role of roles" :key="role.code" :value="role.code">{{ role.description }}</option>
                          </select>
                            <!-- <select formControlName="role">
                                <option v-for="role of roles" :value="role">{{ role }}</option>
                            </select> -->
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Secret Code</label>
                    <div class="control">
                        <input v-model="accountBeingEdited.uniqueCode" class="input" type="text" />
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-body">
                        <div class="field">
                            <label class="label">Discord ID</label>
                            <div class="control">
                                <input v-model="accountBeingEdited.discord" class="input" type="text" placeholder="e.g. username:1234" />
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Discord Discriminator</label>
                            <div class="control">
                                <input v-model="accountBeingEdited.discordUniqueId" class="input" type="text" placeholder="e.g. 318737615257993226" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <label class="label">Has Foreign Ministry?</label>
                        <label class="radio">
                            <input v-model="accountBeingEdited.hasForeignMinistry" value="true" type="radio" name="hasForeignMinistry" />
                            Yes
                        </label>
                        <label class="radio">
                            <input v-model="accountBeingEdited.hasForeignMinistry" value="false" type="radio" name="hasForeignMinistry" />
                            No
                        </label>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <label class="label">Has Federal Aid Commission?</label>
                        <label class="radio">
                            <input v-model="accountBeingEdited.hasFederalAidCommission" value="true" type="radio" name="hasFederalAidCommission" />
                            Yes
                        </label>
                        <label class="radio">
                            <input v-model="accountBeingEdited.hasFederalAidCommission" value="false" type="radio" name="hasFederalAidCommission" />
                            No
                        </label>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <label class="label">Has Disaster Relief Agency?</label>
                        <label class="radio">
                            <input v-model="accountBeingEdited.hasDisasterReliefAgency" value="true" type="radio" name="hasDisasterReliefAgency" />
                            Yes
                        </label>
                        <label class="radio">
                            <input v-model="accountBeingEdited.hasDisasterReliefAgency" value="false" type="radio" name="hasDisasterReliefAgency" />
                            No
                        </label>
                    </div>
                </div>
                <h2>Transactional Data</h2>
                <fieldset disabled>
                    <div class="field is-horizontal">
                        <div class="field-body">
                            <div class="field">
                                <label class="label">Slots Free</label>
                                <div class="control">
                                    <input :value="accountBeingEdited.slotsFull - accountBeingEdited.slotsUsed" class="input" type="text" />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Slots Full</label>
                                <div class="control">
                                    <input :value="accountBeingEdited.slotsFull" class="input" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-body">
                            <div class="field">
                                <label class="label">Credit</label>
                                <div class="control">
                                    <input :value="accountBeingEdited.credit" class="input" type="text" />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Debt</label>
                                <div class="control">
                                    <input :value="accountBeingEdited.debt" class="input" type="text" />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Balance</label>
                                <div class="control">
                                    <input :value="accountBeingEdited.balance" class="input" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-body">
                            <div class="field">
                                <label class="label">Cash Sent (Cash)</label>
                                <div class="control">
                                    <input :value="accountBeingEdited.cashSentCashCredit" class="input" type="text" />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Cash Rec'd (Cash)</label>
                                <div class="control">
                                    <input :value="accountBeingEdited.cashReceivedCashCredit" class="input" type="text" />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Tech Sent (Cash)</label>
                                <div class="control">
                                    <input :value="accountBeingEdited.techSentCashCredit" class="input" type="text" />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Tech Rec'd (Cash)</label>
                                <div class="control">
                                    <input :value="accountBeingEdited.techReceivedCashCredit" class="input" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-body">
                            <div class="field">
                                <label class="label">Cash Sent (Tech)</label>
                                <div class="control">
                                    <input :value="accountBeingEdited.cashSentTechCredit" class="input" type="text" />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Cash Rec'd (Tech)</label>
                                <div class="control">
                                    <input :value="accountBeingEdited.cashReceivedTechCredit" class="input" type="text" />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Tech Sent (Tech)</label>
                                <div class="control">
                                    <input :value="accountBeingEdited.techSentTechCredit" class="input" type="text" />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Tech Rec'd (Tech)</label>
                                <div class="control">
                                    <input :value="accountBeingEdited.techReceivedTechCredit" class="input" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </fieldset>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="updateAccount()">Save</button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    account: {
      type: Object,
      default: () => ({})
    },
  },
  data: () => ({
    accountBeingEdited: Object,
    roles: [
      { code: "B", description: "Buyer" },
      { code: "S", description: "Seller" },
      { code: "D", description: "Cash Donor" },
      { code: "F", description: "Tech Farm" },
      { code: "C", description: "Cash Collector" },
      { code: "R", description: "Tech Receiver" },
      { code: "N", description: "Probationary Seller" },
      { code: "P", description: "Temporary Donor" },
      { code: "V", description: "Temporary Collector" },
      { code: "Q", description: "Temporary Farm" },
      { code: "W", description: "Temporary Receiver" },
      { code: "H", description: "On Hold" },
    ]
  }),
  watch: {
    account(val) {
      this.$log.debug(val);
      this.accountBeingEdited = { ...val };
    }
  },
  methods: {
    updateAccount() {
      this.$log.debug(this.accountBeingEdited);
    }
  }
}
</script>