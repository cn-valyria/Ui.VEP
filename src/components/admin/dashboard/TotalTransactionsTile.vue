<template>
  <div>
    <p class="title">Total Transactions</p>
    <div class="content">
      <ApexChart width="100%" type="line" :options="options" :series="series"></ApexChart>
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
        chart: {
          toolbar: {
            show: false
          }
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: {
          categories: this.data.map(x => x.date)
        }
      };
    },
    series() {
      return [
        {
          name: "Transactions",
          data: this.data.map(x => x.transactions)
        }
      ];
    }
  }
}
</script>