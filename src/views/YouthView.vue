<template>
  <v-app class="background-container">
    <v-container class="overlay">
      <h2 class="title">Youth Dashboard</h2>
      <v-row justify="center">
        <v-col cols="12" sm="6" md="3">
          <v-card class="functionality-card" @click="navigateTo('/youth/upcoming-events')">
            <v-icon class="icon">mdi-calendar</v-icon>
            <div class="text">Upcoming Events/Activities</div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card class="functionality-card" @click="navigateTo('/youth/book-church-events')">
            <v-icon class="icon">mdi-bookmark</v-icon>
            <div class="text">Book Church Events</div>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="6" md="3">
          <v-card class="functionality-card" @click="navigateTo('/youth/priest-consultation')">
            <v-icon class="icon">mdi-account-box</v-icon>
            <div class="text">Priest Consultation</div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card class="functionality-card" @click="navigateTo('/youth/pay-tithes')">
            <v-icon class="icon">mdi-cash</v-icon>
            <div class="text">Pay Tithe/Offering</div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'YouthView',
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
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

.functionality-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
  padding: 40px;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s;
}

.functionality-card:hover {
  transform: scale(1.05);
}

.icon {
  font-size: 60px;
  color: yellow;
}

.text {
  margin-top: 15px;
  font-size: 18px;
  color: white;
}
</style>
