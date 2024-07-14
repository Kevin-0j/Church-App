<template>
    <v-app class="background-container">
      <NavBar />
      <v-container class="overlay">
        <h1 class="title">Book Church Events</h1>
        <v-form @submit.prevent="submitForm">
          <v-text-field v-model="name" label="Your Name" required />
          <v-text-field v-model="email" label="Email" required type="email" />
          <v-select v-model="event" :items="events" label="Select Event" required />
          <v-btn type="submit" color="primary">Book Event</v-btn>
        </v-form>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'ChurchEvents',
    data() {
      return {
        name: '',
        email: '',
        event: '',
        events: ['Wedding', 'Baptism', 'Funeral', 'Mass']
      }
    },
    methods: {
      submitForm() {
        // Handle form submission
        alert(`Event booked: ${this.event}`);
      }
    }
  }
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
    margin-bottom: 20px;
    text-align: center;
  }

  </style>
  