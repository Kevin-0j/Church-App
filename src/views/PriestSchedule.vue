<template>
    <v-container>
      <h2 class="title">Priest Schedule</h2>
      <v-simple-table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Church</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(schedule, index) in schedules" :key="index">
            <td>{{ schedule.time }}</td>
            <td>{{ schedule.church }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'PriestSchedule',
    data() {
      return {
        schedules: [
          { time: '08:00 AM', church: 'Church A' },
          { time: '10:00 AM', church: 'Church B' },
          // Add more schedules as needed
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .title {
    text-align: center;
    color: black;
    margin-bottom: 20px;
  }
  </style>
  