<template>
  <v-app-bar app color="black" dark flat class="px-12">
    <v-btn>
      <v-icon color="yellow" left class="mr-2">fas fa-church</v-icon> Church
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn text @click="scroll('liveMassTimes')" class="text-yellow">Live Mass Times</v-btn>
    <v-btn text @click="scroll('adminHelp')">Admin Help</v-btn>
    <v-btn text @click="scroll('makeAnOffering')">Make an Offering</v-btn>
    <v-btn text @click="scroll('seeUpcomingEvents')">See Upcoming Events</v-btn>
    <v-btn text @click="scroll('testimonials')">Testimonials</v-btn>
    <v-btn text @click="scroll('logOut')">Log Out</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavBar',
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

<style>
/* Add any additional styles if necessary */
</style>
