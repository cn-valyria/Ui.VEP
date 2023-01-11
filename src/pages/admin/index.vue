<template>
  <div class="container">
    <div class="section">
      <h1 class="title">VEP Admin Portal</h1>
      <p>Admin page works!</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AdminIndex',
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