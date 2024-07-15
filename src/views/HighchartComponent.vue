<template>
    <highcharts :options="chartOptions"></highcharts>
  </template>
  
  <script>
  import { defineComponent, watch } from 'vue';
  import Highcharts from 'highcharts';
  
  export default defineComponent({
    name: 'HighchartComponent',
    props: {
      chartOptions: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      const options = { ...props.chartOptions };
  
      watch(
        () => props.chartOptions,
        (newVal) => {
          Object.assign(options, newVal);
        },
        { deep: true }
      );
  
      return {
        chartOptions: options
      };
    }
  });
  </script>
  
  <style scoped>
  </style>