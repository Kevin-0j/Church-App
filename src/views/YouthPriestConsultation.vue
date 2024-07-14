<template>
    <v-app class ="background-container">
      <NavBar />
      <v-container class="overlay">
        <h1 class="title">Priest Consultation</h1>
        <v-form @submit.prevent="submitForm">
          <v-text-field v-model="name" label="Your Name" required />
          <v-text-field v-model="email" label="Email" required type="email" />
          <v-text-field v-model="date" label="Preferred Date" required type="date" />
          <v-text-field v-model="time" label="Preferred Time" required type="time" />
          <v-btn type="submit" color="primary">Book Consultation</v-btn>
        </v-form>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'PriestConsultation',
    data() {
      return {
        name: '',
        email: '',
        date: '',
        time: ''
      }
    },
    methods: {
      submitForm() {
        // Handle form submission
        alert(`Consultation booked on ${this.date} at ${this.time}`);
      }
    }
  }
  </script>
  
  <style scoped>
  
  .title {
    margin-bottom: 20px;
    text-align: center;
  }
  </style>
  