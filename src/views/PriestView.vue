<template>
  <v-container>
    <h2 class="title">Priest Dashboard</h2>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="3">
        <v-card class="functionality-card" @click="navigateTo('PriestSchedule')">
          <v-icon class="icon">mdi-calendar-clock</v-icon>
          <div class="text">View Schedule</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="functionality-card" @click="navigateTo('PriestUpcomingEvents')">
          <v-icon class="icon">mdi-calendar"></v-icon>
          <div class="text">Upcoming Church Events</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="functionality-card" @click="navigateTo('PriestCongregants')">
          <v-icon class="icon">mdi-account-group</v-icon>
          <div class="text">View Congregants</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PriestView',
  methods: {
    navigateTo(route) {
      this.$router.push({ name: route });
    }
  }
};
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
