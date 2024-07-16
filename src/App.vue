<template>
  <div id="app">
    <v-app>
      <NavBar />
      <router-view/>
    </v-app>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import router from './router';
import NavBar from "./components/Navbar.vue";

export default {
  components: {
    NavBar
  },
  setup() {
    const isAuthenticated = ref(false);
    const auth = getAuth();

    const checkUserRole = async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          switch (userData.role) {
            case 'admin':
              router.push('/admin');
              break;
            case 'church member':
              router.push('/member');
              break;
            case 'priest':
              router.push('/priest');
              break;
            case 'youth member':
              router.push('/youth');
              break;
            default:
              router.push('/');
          }
        } else {
          router.push('/login');
        }
        isAuthenticated.value = true;
      } else {
        isAuthenticated.value = false;
        // Do not redirect to login here
      }
    };

    onBeforeMount(() => {
      onAuthStateChanged(auth, (user) => {
        checkUserRole(user);
      });
    });

    const logout = () => {
      auth.signOut().then(() => {
        router.push('/login');
        isAuthenticated.value = false;
      });
    };

    return {
      isAuthenticated,
      logout
    };
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

#nav-links {
  margin-top: 20px;
}
</style>
