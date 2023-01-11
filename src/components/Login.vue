<template>
  <b-modal v-model="show" has-modal-card>
    <template #default="props">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">VEP Login Portal</p>
          <button type="button" class="delete" @click="props.close"></button>
        </header>
        <section class="modal-card-body">
          <b-field grouped>
            <b-field
              label="Nation ID"
              :type="{ 'is-danger': nationIdOrRulerNameIsMissing }"
              :message="{ 'Nation ID or Ruler Name is required.': nationIdOrRulerNameIsMissing }"
            >
              <b-input type="text" v-model="nationId"></b-input>
            </b-field>
            <b-field
              label="Ruler Name"
              :type="{ 'is-danger': nationIdOrRulerNameIsMissing }"
              :message="{ 'Nation ID or Ruler Name is required.': nationIdOrRulerNameIsMissing }"
            >
              <b-input type="text" v-model="rulerName"></b-input>
            </b-field>
          </b-field>
          <b-field
            label="Unique Code"
            :type="{ 'is-danger': uniqueCodeIsMissing }"
            :message="{ 'Unique Code is required.': uniqueCodeIsMissing }"
          >
            <b-input type="text" v-model="uniqueCode"></b-input>
          </b-field>
          <b-checkbox>Remember Me</b-checkbox>
        </section>
        <footer class="modal-card-foot">
          <b-button label="Close" @click="props.close" />
          <b-button type="is-primary" label="Log In" @click="login()" />
        </footer>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  data: () => ({
    nationId: "",
    rulerName: "",
    uniqueCode: "",
    nationIdOrRulerNameIsMissing: false,
    uniqueCodeIsMissing: false
  }),
  methods: {
    login() {
      if (!this.formIsValid()) {
        return;
      }
    },
    formIsValid() {
      this.nationIdOrRulerNameIsMissing = (this.nationId.length === 0 && this.rulerName.length === 0);
      this.uniqueCodeIsMissing = this.uniqueCode.length === 0;

      return this.nationIdOrRulerNameIsMissing || this.uniqueCodeIsMissing
    }
  }
}
</script>