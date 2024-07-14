<template>
   <v-app class="background-container">
    <v-container class="overlay">
      <h2 class="title">Upcoming Church Events</h2>
      <v-simple-table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Date</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(event, index) in events" :key="index">
            <td>{{ event.name }}</td>
            <td>{{ event.date }}</td>
            <td>{{ event.location }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>
  </v-app>
  </template>
  
  <script>
  export default {
    name: 'PriestUpcomingEvents',
    data() {
      return {
        events: [
          { name: 'Christmas Mass', date: '2024-12-25', location: 'Church A' },
          { name: 'Easter Vigil', date: '2024-04-20', location: 'Church B' },
          // Add more events as needed
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
  