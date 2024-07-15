<template>
    <v-app class="background-container">
      <v-container class="overlay">
        <h2 class="title">Update User Info</h2>
        <v-form @submit.prevent="updateUserInfo">
          <v-text-field
            v-model="user.name"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.email"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.phone"
            label="Phone"
          ></v-text-field>
          <v-btn type="submit" color="primary">Update</v-btn>
        </v-form>
      </v-container>
    </v-app>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { getAuth } from 'firebase/auth';
  import { doc, getDoc, updateDoc } from 'firebase/firestore';
  import { db } from '../firebase'; // Adjust the path to your Firebase configuration file
  
  export default {
    setup() {
      const user = ref({
        name: '',
        email: '',
        phone: '',
      });
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
            };
          }
        }
      };
  
      const updateUserInfo = async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDocRef = doc(db, 'users', currentUser.uid);
          await updateDoc(userDocRef, {
            name: user.value.name,
            email: user.value.email,
            phone: user.value.phone,
          });
          alert('User information updated successfully');
        }
      };
  
      onMounted(fetchUserInfo);
  
      return {
        user,
        updateUserInfo,
      };
    },
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
    color: black;
    margin-bottom: 20px;
  }
  
  .v-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.9);
  }
  
  .v-text-field {
    margin-bottom: 20px;
  }
  
  .v-btn {
    display: block;
    margin: 20px auto 0;
  }
  </style>