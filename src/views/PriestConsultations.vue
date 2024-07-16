<template>
  <v-app class="background-container">
    <v-container class="overlay">
      <h2 class="title">Consultations Booked</h2>
      <v-card class="table-card">
        <v-simple-table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(consultation, index) in consultations" :key="index">
              <td>{{ consultation.name }}</td>
              <td>{{ consultation.email }}</td>
              <td>{{ consultation.date }}</td>
              <td>{{ consultation.time }}</td>
              <td>{{ consultation.role }}</td>
              <td>
                <v-btn small color="green" @click="acceptConsultation(consultation, index)">Accept</v-btn>
                <v-btn small color="red" @click="declineConsultation(consultation, index)">Decline</v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import { ref, onMounted } from 'vue';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the path to your Firebase configuration

export default {
  name: 'PriestConsultations',
  setup() {
    const consultations = ref([]);

    const fetchConsultations = async () => {
      const querySnapshot = await getDocs(collection(db, 'consultations'));
      consultations.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };

    const acceptConsultation = async (consultation, index) => {
      try {
        await updateDoc(doc(db, 'consultations', consultation.id), { status: 'accepted' });
        consultations.value.splice(index, 1); // Remove the consultation from the list
        alert(`Accepted consultation for ${consultation.name}`);
      } catch (error) {
        console.error('Error accepting consultation: ', error);
      }
    };

    const declineConsultation = async (consultation, index) => {
      try {
        await updateDoc(doc(db, 'consultations', consultation.id), { status: 'declined' });
        consultations.value.splice(index, 1); // Remove the consultation from the list
        alert(`Declined consultation for ${consultation.name}`);
      } catch (error) {
        console.error('Error declining consultation: ', error);
      }
    };

    onMounted(fetchConsultations);

    return {
      consultations,
      acceptConsultation,
      declineConsultation
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #fff;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 900px;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  color: #FFD700;
  margin-bottom: 20px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.table-card {
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.v-simple-table {
  font-size: 1.2rem;
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
  background-color: #f5f5f5;
}
</style>
