<template>
  <v-app class="background-container">
    <v-container class="overlay">
      <h2 class="title">Update User Information</h2>
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
        <v-text-field
          v-model="user.address"
          label="Address"
        ></v-text-field>
        <v-select
          v-model="user.gender"
          :items="genders"
          label="Gender"
          required
        ></v-select>
        <v-file-input
          v-model="photo"
          label="Profile Photo"
          accept="image/*"
        ></v-file-input>
        <v-btn type="submit" color="primary">Update</v-btn>
      </v-form>
    </v-container>
  </v-app>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db, storage } from '../firebase'; // Adjust the path to your firebase config
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

export default {
  name: 'UpdateUserInfo',
  setup() {
    const user = ref({
      name: '',
      email: '',
      phone: '',
      address: '',
      gender: '',
      photoURL: '',
    });
    const genders = ref(['Male', 'Female', 'Other']);
    const photo = ref(null);
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
            photoURL: userData.photoURL || '',
          };
        } else {
          // If the document doesn't exist, initialize it
          await setDoc(doc(db, 'users', currentUser.uid), {
            name: '',
            email: currentUser.email,
            phone: '',
            address: '',
            gender: '',
            photoURL: '',
          });
          user.value = {
            name: '',
            email: currentUser.email,
            phone: '',
            address: '',
            gender: '',
            photoURL: '',
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
      genders,
      photo,
      updateUserInfo,
    };
  }
};
</script>

<style scoped>
.title {
  margin-bottom: 20px;
  text-align: center;
  color: yellow;
  font-size: 3rem;
  text-shadow: 2px 2px 5px black;
  animation: fadeIn 2s ease-in-out;
}
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
