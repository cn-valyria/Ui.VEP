<template>
  <div>
    <p class="title">VEP Accounts</p>
    <div class="content">
      <ApexChart width="100%" type="pie" :options="options" :series="series"></ApexChart>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: []
  },
  components: {
    ApexChart: () => import('vue-apexcharts')
  },
  computed: {
    options() {
      return {
        labels: this.data.map(x => x.role)
      };
    },
    series() {
      return this.data.map(x => x.count);
    }
  }
}
</script>