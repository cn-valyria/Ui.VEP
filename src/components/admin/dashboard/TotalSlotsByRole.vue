<template>
  <div>
    <p class="title">Total Aid Slots</p>
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
        plotOptions: {
          horizontal: false
        },
        xaxis: {
          categories: this.data.map(x => x.role)
        },
        yaxis: {
          title: {
            text: "Total Aid Slots"
          }
        },
        fill: {
          opacity: 1
        }
      };
    },
    series() {
      return [
        {
          name: "Total Aid Slots",
          data: this.data.map(x => x.totalSlots)
        }
      ]
    }
  }
}
</script>