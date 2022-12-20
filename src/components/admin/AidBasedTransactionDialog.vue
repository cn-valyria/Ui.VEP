<template>
  <div class="modal" :class="{ 'is-active': show }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Update Transaction</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section v-if="transactionBeingEdited !== undefined" class="modal-card-body">
        <div class="content">
          <h2>Aid-Based Data</h2>
          <fieldset disabled>
            <div class="field">
              <label class="label">Aid ID</label>
              <div class="control">
                <input
                  v-model="transactionBeingEdited.aidId"
                  class="input"
                  type="text" 
                  placeholder="The CN-generated ID for the aid between two nations" 
                />
              </div>
            </div>
            <h5>Sent By</h5>
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <label class="label">Nation Name</label>
                  <div class="control">
                    <input :value="transactionBeingEdited.sentBy && transaction.sentBy.nationName || ''" class="input" type="text" />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Ruler Name</label>
                  <div class="control">
                    <input :value="transactionBeingEdited.sentBy && transaction.sentBy.rulerName || ''" class="input" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <h5>Received By</h5>
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <label class="label">Nation Name</label>
                  <div class="control">
                    <input :value="transactionBeingEdited.receivedBy && transaction.receivedBy.nationName || ''" class="input" type="text" />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Ruler Name</label>
                  <div class="control">
                    <input :value="transactionBeingEdited.receivedBy && transaction.receivedBy.rulerName || ''" class="input" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="field">
              <label class="label">Aid Status</label>
              <div class="control is-expanded">
                <div class="select is-fullwidth">
                  <select>
                    <option *ngFor="let status of (aidStatusNames | enumToArray)" [ngValue]="toAidStatusValue(status)">
                      {{ status }}</option>
                  </select>
                </div>
              </div>
            </div> -->
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <label class="label">Money</label>
                  <div class="control">
                    <input v-model="transactionBeingEdited.money" class="input" type="text" />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Technology</label>
                  <div class="control">
                    <input v-model="transactionBeingEdited.technology" class="input" type="text" />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Soldiers</label>
                  <div class="control">
                    <input v-model="transactionBeingEdited.soldiers" class="input" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <label class="label">Starts On</label>
                  <div class="control">
                    <input v-model="transactionBeingEdited.startsOn" class="input" type="text" />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Ends On</label>
                  <div class="control">
                    <input v-model="transactionBeingEdited.endsOn" class="input" type="text" />
                  </div>
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
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <label class="label">Cash Moved (Cash)</label>
                <div class="control">
                  <input v-model="transactionBeingEdited.cashMovedCashCredit" class="input" type="text" />
                </div>
              </div>
              <div class="field">
                <label class="label">Cash Moved (Tech)</label>
                <div class="control">
                  <input v-model="transactionBeingEdited.cashMovedTechCredit" class="input" type="text" />
                </div>
              </div>
              <div class="field">
                <label class="label">Tech Moved (Cash)</label>
                <div class="control">
                  <input v-model="transactionBeingEdited.techMovedCashCredit" class="input" type="text" />
                </div>
              </div>
              <div class="field">
                <label class="label">Tech Moved (Tech)</label>
                <div class="control">
                  <input v-model="transactionBeingEdited.techMovedTechCredit" class="input" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">Save</button>
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
    }
  },
  data: () => ({
    transactionBeingEdited: Object
  }),
  watch: {
    transaction(val) {
      this.$log.debug(val);
      this.transactionBeingEdited = { ...val };
    }
  }
}
</script>