<template>
  <v-app-bar app color="black" dark flat class="px-12">
    <v-btn>
      <v-icon color="yellow" left class="mr-2">fas fa-church</v-icon> Church
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn text @click="scroll('liveMassTimes')" class="text-yellow">Live Mass Times</v-btn>
    <v-btn text @click="scroll('adminHelp')">Admin Help</v-btn>
    <v-btn text @click="scroll('makeAnOffering')">Make an Offering</v-btn>
    <v-btn text @click="scroll('seeUpcomingEvents')" class="text-yellow">See Upcoming Events</v-btn>
    <v-btn text @click="scroll('testimonials')">Testimonials</v-btn>
    <v-btn text v-if="!isAuthenticated" @click="login">Login</v-btn>
    <v-btn text v-else @click="logout">Logout</v-btn>
  </v-app-bar>
</template>

<script>
import { ref } from 'vue';
import { getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { googleProvider } from '../firebase';

export default {
  name: 'NavBar',
  setup() {
    const isAuthenticated = ref(false);
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      isAuthenticated.value = !!user;
    });

    const login = async () => {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error("Error logging in:", error);
      }
    };

    const logout = async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    return { isAuthenticated, login, logout };
  },
  methods: {
    scroll(refName) {
      const element = document.getElementById(refName);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
};
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>