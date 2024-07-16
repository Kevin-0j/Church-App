<template>
  <v-app class="background-container">
    <NavBar />
    <v-container class="overlay mt-12">
      <h2 class="title">Member Dashboard</h2>
      <v-row justify="center" class="functionality-row">
        <v-col cols="12" sm="6" md="4" class="d-flex justify-center">
          <v-card class="functionality-card" @click="navigate('UpcomingEvents')">
            <v-icon class="icon">mdi-calendar</v-icon>
            <div class="text">Upcoming Events/Activities</div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="d-flex justify-center">
          <v-card class="functionality-card" @click="navigate('BookEvents')">
            <v-icon class="icon">mdi-bookmark</v-icon>
            <div class="text">Book Church Events</div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="d-flex justify-center">
          <v-card class="functionality-card" @click="navigate('PriestConsultation')">
            <v-icon class="icon">mdi-account-box</v-icon>
            <div class="text">Priest Consultation</div>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" class="functionality-row">
        <v-col cols="12" sm="6" md="4" class="d-flex justify-center">
          <v-card class="functionality-card" @click="navigate('PayTithes')">
            <v-icon class="icon">mdi-cash</v-icon>
            <div class="text">Pay Tithe/Offering</div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="d-flex justify-center">
          <v-card class="functionality-card" @click="navigate('UpdateUserInfo')">
            <v-icon class="icon">mdi-account-edit</v-icon>
            <div class="text">Update User Info</div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { useRouter } from 'vue-router';
import NavBar from '@/components/Navbar.vue';

export default {
  components: {
    NavBar
  },
  setup() {
    const router = useRouter();
    const navigate = (route) => {
      router.push({ name: route });
    };
    return { navigate };
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

.overlay {
  position: relative;
  z-index: 1;
}

.title {
  text-align: center;
  color: yellow;
  font-size: 3rem;
  margin-bottom: 40px;
  text-shadow: 2px 2px 5px black;
  animation: fadeIn 2s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.functionality-row {
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
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.functionality-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
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

.mt-12 {
  margin-top: 96px;
}
</style>
