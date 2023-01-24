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
              <p class="title">Transactions Per Day</p>
              <div class="content">
                <ApexChart width="100%" type="line" :options="options" :series="series"></ApexChart>
              </div>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">Foo</p>
              <p class="subtitle">Bar</p>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">Third column</p>
              <p class="subtitle">With some content</p>
              <div class="content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
              </div>
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
  components: {
    ApexChart: () => import('vue-apexcharts')
  },
  data: () => ({
    options: {
      chart: {
        toolbar: {
          show: false
        }
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        categories: ["Jan-19", "Jan-20", "Jan-21", "Jan-22", "Jan-23"]
      },
      yaxis: {
        min: 0,
        max: 6,
        tickAmount: 5
      }
    },
    series: [
      {
        name: "Transactions",
        data: [3, 2, 5, 1, 2]
      }
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