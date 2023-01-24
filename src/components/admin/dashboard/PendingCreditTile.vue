<template>
  <div>
    <p class="title">Pending Credit</p>
    <div class="content">
      <ApexChart width="100%" type="bar" :options="options" :series="series"></ApexChart>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: []
  },
  components: {
    ApexChart: () => import("vue-apexcharts")
  },
  computed: {
    options() {
      return {
        chart: {
          stacked: true,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              total: {
                enabled: true,
                offsetX: 0
              }
            }
          }
        },
        xaxis: {
          categories: this.data.map(x => x.alliance)
        }
      };
    },
    series() {
      const dateRanges = this.data[0].pendingCredit.map(x => x.dateRange);
      return dateRanges.map(rangeName => ({
        name: rangeName,
        data: this.data.map(x => x.pendingCredit.find(row => row.dateRange === rangeName).credit)
      }));
    }
  }
}
</script>