<template>
  <div id="app">
    <v-app>
      <v-app-bar app color="black" dark flat class="px-12" v-if="$store.state.user">
        <v-btn>
          <v-icon color="yellow" left class="mr-2">fas fa-church</v-icon> Church
        </v-btn>

        <v-spacer></v-spacer>
        <v-btn text @click="scroll('liveMassTimes')" class="text-yellow">Live Mass Times</v-btn>
        <v-btn text @click="scroll('adminHelp')">Admin Help</v-btn>
        <v-btn text @click="scroll('makeAnOffering')">Make an Offering</v-btn>
        <v-btn text @click="scroll('seeUpcomingEvents')">See Upcoming Events</v-btn>
        <v-btn text @click="scroll('testimonials')">Testimonials</v-btn>
        <v-btn text @click="$store.dispatch('logout')">Log Out</v-btn>
      </v-app-bar>

      <div id="nav-links" v-if="$store.state.user">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>

      <router-view/>
    </v-app>
  </div>
</template>

<script>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })

    return { store }
  },
  methods: {
    scroll(refName) {
      const element = document.getElementById(refName);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#nav-links {
  margin-top: 20px;
}
</style>
