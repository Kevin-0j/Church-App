<template>
  <v-app>
    <NavBar />
    <v-container>
      <h1 class="title">Youth Church Events</h1>
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
  name: ' ChurchEvents',
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
.title {
  margin-bottom: 20px;
  text-align: center;
}
</style>
