<template>
  <v-app class="background-container">
    <v-container class="overlay">
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
  </v-app>
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
  .background-container {
    background-image: url('@/assets/christiancounseling.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
    width: 100vw;
    position: relative;
  }
  .title {
    text-align: center;
    color: black;
    margin-bottom: 20px;
  }
  </style>
  