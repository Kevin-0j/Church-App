<template>
    <v-container>
      <h2 class="title">Congregants Booked for Events</h2>
      <v-simple-table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Congregant</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(booking, index) in bookings" :key="index">
            <td>{{ booking.event }}</td>
            <td>{{ booking.congregant }}</td>
            <td>{{ booking.date }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'PriestCongregants',
    data() {
      return {
        bookings: [
          { event: 'Marriage', congregant: 'John Doe', date: '2024-07-10' },
          { event: 'Baptism', congregant: 'Jane Smith', date: '2024-08-15' },
          // Add more bookings as needed
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
  