<template>
  <v-app-bar app color="black" dark flat class="px-12">
    <v-btn @click="goHome">
      <v-icon color="yellow" left class="mr-2">fas fa-church</v-icon> Church
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn text @click="scroll('liveMassTimes')" class="text-yellow"> Mass Times</v-btn>
    <v-btn text @click="scroll('contact')">Admin Help</v-btn>
    <v-btn text @click="navigateTo('/make-an-offering')">Make an Offering</v-btn>
    <v-btn text @click="scroll('seeUpcomingEvents')">See Upcoming Events</v-btn>
    <v-btn text @click="scroll('testimonials')">Testimonials</v-btn>
    <v-btn text v-if="isAuthenticated" @click="logout">Log Out</v-btn>
    <v-btn text v-else @click="navigateTo('/login')">Login</v-btn>
    <v-btn text v-else @click="navigateTo('/register')">Register</v-btn>
  </v-app-bar>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import router from '../router';

export default {
  name: 'NavBar',
  setup() {
    const isAuthenticated = ref(false);
    const auth = getAuth();

    onBeforeMount(() => {
      onAuthStateChanged(auth, (user) => {
        isAuthenticated.value = !!user;
      });
    });

    const logout = () => {
      auth.signOut().then(() => {
        router.push('/login');
        isAuthenticated.value = false;
      });
    };

    const navigateTo = (route) => {
      router.push(route);
    };

    const goHome = () => {
      router.push({ name: 'Home' });
    };

    return { isAuthenticated, logout, navigateTo, goHome };
  },
  methods: {
    scroll(refName) {
      const element = document.getElementById(refName);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
};
</script>

<style>
/* Add any additional styles if necessary */
</style>
