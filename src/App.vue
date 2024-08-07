<template>
  <div id="app">
    <v-app>
      <v-app-bar app color="black" dark flat class="px-12">
        <v-btn>
          <v-icon color="yellow" left class="mr-2">fas fa-church</v-icon> Church
        </v-btn>

        <v-spacer></v-spacer>
        <v-btn text @click="scroll('liveMassTimes')" class="text-yellow">Live Mass Times</v-btn>

        <v-btn text @click="scroll('contact')">Admin Help</v-btn>
        <v-btn text @click="navigate('MakeAnOffering')">Make an Offering</v-btn>
        <v-btn text @click="scroll('seeUpcomingEvents')">See Upcoming Events</v-btn>
        <v-btn text @click="scroll('testimonials')">Testimonials</v-btn>
        <v-btn text v-if="isAuthenticated" @click="logout">Log Out</v-btn>
        <v-btn text v-else @click="navigateToLogin">Login</v-btn>
      </v-app-bar>

      <div id="nav-links">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>

      <router-view/>
    </v-app>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebase'
import router from './router'

export default {
  setup() {
    const isAuthenticated = ref(false)
    const isAdmin = ref(false)
    const auth = getAuth()

    const checkUserRole = async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          const userData = userDoc.data()
          isAdmin.value = userData.role === 'admin'
          if (isAdmin.value) {
            router.push('/admin');  // Redirect to admin page if user is admin
          } else if (userData.role === 'church member') {
            router.push('/member');  // Redirect to member page if user is church member
          } else if (userData.role === 'priest') {
            router.push('/priest');  // Redirect to priest page if user is priest
          } else if (userData.role === 'youth member') {
              router.push('/youth');  // Redirect to priest page if user is priest
          }
        } else {
          isAdmin.value = false
        }
        isAuthenticated.value = true
      } else {
        isAuthenticated.value = false
        isAdmin.value = false
      }
    };

    onBeforeMount(() => {
      onAuthStateChanged(auth, (user) => {
        checkUserRole(user);
      });
    });

    const logout = () => {
      auth.signOut().then(() => {
        router.push('/login');  // Redirect to login page after logout
        isAuthenticated.value = false; // Ensure this is set to false on logout
      });
    };

    const navigate = (routeName) => {
      router.push({ name: routeName });
    };

    const navigateToLogin = () => {
      router.push('/login'); // Ensure the route name matches the route defined in your router
    };

    return { isAuthenticated, isAdmin, logout, navigate, navigateToLogin };
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