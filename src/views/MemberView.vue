<template>
  <v-container>
    <h2 class="title">Member Dashboard</h2>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="3">
        <v-card class="functionality-card" @click="navigate('UpcomingEvents')">
          <v-icon class="icon">mdi-calendar</v-icon>
          <div class="text">Upcoming Events/Activities</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="functionality-card" @click="navigate('BookEvents')">
          <v-icon class="icon">mdi-bookmark</v-icon>
          <div class="text">Book Church Events</div>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="3">
        <v-card class="functionality-card" @click="navigate('PriestConsultation')">
          <v-icon class="icon">mdi-account-box</v-icon>
          <div class="text">Priest Consultation</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="functionality-card" @click="navigate('PayTithes')">
          <v-icon class="icon">mdi-cash</v-icon>
          <div class="text">Pay Tithe/Offering</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const navigate = (route) => {
      router.push({ name: route })
    }
    return { navigate }
  }
}
</script>

<style scoped>
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