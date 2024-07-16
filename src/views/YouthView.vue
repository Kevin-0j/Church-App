<template>
  <v-app class="background-container">
    <NavBar />
    <v-container class="overlay mt-12">
      <h2 class="title">Youth Dashboard</h2>
      <v-row justify="center" class="functionality-row">
        <v-col cols="12" sm="6" md="4" class="d-flex justify-center">
          <v-card class="functionality-card" @click="navigateTo('YouthUpcomingEvents')">
            <v-icon class="icon">mdi-calendar</v-icon>
            <div class="text">Upcoming Events/Activities</div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="d-flex justify-center">
          <v-card class="functionality-card" @click="navigateTo('YouthChurchEvents')">
            <v-icon class="icon">mdi-bookmark</v-icon>
            <div class="text">Book Church Events</div>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" class="functionality-row">
        <v-col cols="12" sm="6" md="4" class="d-flex justify-center">
          <v-card class="functionality-card" @click="navigateTo('YouthPriestConsultation')">
            <v-icon class="icon">mdi-account-box</v-icon>
            <div class="text">Priest Consultation</div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="d-flex justify-center">
          <v-card class="functionality-card" @click="navigateTo('YouthPayTithes')">
            <v-icon class="icon">mdi-cash</v-icon>
            <div class="text">Pay Tithe/Offering</div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="d-flex justify-center">
          <v-card class="functionality-card" @click="navigateTo('UpdateUserInfo')">
            <v-icon class="icon">mdi-account-edit</v-icon>
            <div class="text">Update User Info</div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Update User Info Section -->
      <div v-if="showUpdateForm" class="padd mt-8">
        <h3>Update Profile</h3>
        <v-form @submit.prevent="updateUserInfo">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="user.name" label="Name" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="user.email" label="Email" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="user.phone" label="Phone"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="user.address" label="Address"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-select
                v-model="user.gender"
                :items="['Male', 'Female']"
                label="Gender"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-file-input v-model="photo" label="Profile Photo" accept="image/*"></v-file-input>
            </v-col>
          </v-row>
          <v-btn color="primary" type="submit">Update</v-btn>
        </v-form>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase'; // Adjust the path to your firebase config
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import NavBar from '@/components/Navbar.vue';

export default {
  components: {
    NavBar
  },
  name: 'YouthView',
  setup() {
    const user = ref({
      name: '',
      email: '',
      phone: '',
      address: '',
      gender: '',
    });
    const photo = ref(null);
    const showUpdateForm = ref(false);
    const auth = getAuth();

    const fetchUserInfo = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          user.value = {
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
            address: userData.address || '',
            gender: userData.gender || '',
          };
        }
      }
    };

    const updateUserInfo = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        if (photo.value) {
          const file = photo.value;
          const storageRefPath = storageRef(storage, `user_photos/${currentUser.uid}/${file.name}`);
          await uploadBytes(storageRefPath, file);
          const downloadURL = await getDownloadURL(storageRefPath);
          user.value.photoURL = downloadURL;
        }
        await updateDoc(userDocRef, {
          name: user.value.name,
          email: user.value.email,
          phone: user.value.phone,
          address: user.value.address,
          gender: user.value.gender,
          photoURL: user.value.photoURL || '',
        });
        alert('User information updated successfully');
      }
    };

    onMounted(fetchUserInfo);

    return {
      user,
      photo,
      showUpdateForm,
      updateUserInfo,
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push({ name: route });
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

.padd {
  padding: 16px;
}

.mt-8 {
  margin-top: 32px;
}

.text-center {
  text-align: center;
}

.mt-12 {
  margin-top: 96px;
}
</style>
