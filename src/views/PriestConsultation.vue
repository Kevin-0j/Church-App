<template>
  <v-app class="background-container">
    <NavBar />
    <v-container class="overlay">
      <h1 class="title">Priest Consultation</h1>
      <v-form @submit.prevent="submitForm">
        <v-text-field v-model="name" label="Your Name" required />
        <v-text-field v-model="email" label="Email" required type="email" />
        <v-text-field v-model="date" label="Preferred Date" required type="date" />
        <v-text-field v-model="time" label="Preferred Time" required type="time" />
        <v-btn type="submit" color="primary">Book Consultation</v-btn>
      </v-form>
      <!-- Table for displaying consultations -->
      <v-card class="table-card mt-4">
        <v-simple-table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Role</th> <!-- Added Role Column -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="consultation in consultations" :key="consultation.id">
              <td>{{ consultation.name }}</td>
              <td>{{ consultation.email }}</td>
              <td>{{ consultation.date }}</td>
              <td>{{ consultation.time }}</td>
              <td>{{ consultation.status }}</td>
              <td>{{ consultation.role }}</td> <!-- Display Role -->
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase'; // Adjust the path to your Firebase configuration

export default {
  name: 'PriestConsultation',
  setup() {
    const name = ref('');
    const email = ref('');
    const date = ref('');
    const time = ref('');
    const consultations = ref([]);

    const submitForm = async () => {
      try {
        await addDoc(collection(db, 'consultations'), {
          name: name.value,
          email: email.value,
          date: date.value,
          time: time.value,
          status: 'Pending',
          role: 'Church Member' // Added Role Field
        });
        alert(`Consultation booked on ${date.value} at ${time.value}`);
        await fetchConsultations(); // Refresh the consultations list after booking
      } catch (error) {
        console.error('Error booking consultation: ', error);
      }
    };

    const fetchConsultations = async () => {
      try {
        if (email.value) {
          const q = query(collection(db, 'consultations'), where('email', '==', email.value));
          const querySnapshot = await getDocs(q);
          consultations.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (error) {
        console.error('Error fetching consultations: ', error);
      }
    };

    watch(email, (newEmail) => {
      if (newEmail) {
        fetchConsultations();
      }
    });

    onMounted(() => {
      const user = auth.currentUser;
      if (user && user.email) {
        email.value = user.email;
        fetchConsultations();
      }
    });

    return {
      name,
      email,
      date,
      time,
      submitForm,
      consultations,
      fetchConsultations
    };
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
.title {
  margin-bottom: 20px;
  text-align: center;
}
.table-card {
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  padding: 20px;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
.v-simple-table {
  width: 100%;
  color: white;
}
thead th {
  background-color: #FFD700;
  color: black;
  padding: 15px;
  text-align: left;
}
tbody td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
