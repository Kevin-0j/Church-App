<template>
    <v-container>
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
  .title {
    text-align: center;
    color: black;
    margin-bottom: 20px;
  }
  </style>
  