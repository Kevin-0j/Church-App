<template>
  <v-app class="background-container">
    <v-container class="overlay">
      <h2 class="title">Priest Schedule</h2>
      <v-form @submit.prevent="submitForm">
        <v-text-field v-model="newSchedule.event" label="Event" required />
        <v-text-field v-model="newSchedule.time" label="Time" required type="time" />
        <v-text-field v-model="newSchedule.date" label="Date" required type="date" />
        <v-text-field v-model="newSchedule.place" label="Place" required />
        <v-btn type="submit" color="primary">{{ isEditing ? 'Update Schedule' : 'Add Schedule' }}</v-btn>
        <v-btn v-if="isEditing" @click="cancelEdit" color="secondary">Cancel</v-btn>
      </v-form>
      <v-card class="table-card mt-4">
        <v-simple-table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Time</th>
              <th>Date</th>
              <th>Place</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(schedule, index) in schedules" :key="schedule.id">
              <td>{{ schedule.event }}</td>
              <td>{{ schedule.time }}</td>
              <td>{{ schedule.date }}</td>
              <td>{{ schedule.place }}</td>
              <td>
                <v-btn small color="error" @click="editSchedule(schedule, index)">Modify</v-btn>
                <v-btn small color="success" @click="markCompleted(schedule.id)">Complete</v-btn>
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
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export default {
  name: 'PriestSchedule',
  setup() {
    const schedules = ref([]);
    const newSchedule = ref({ event: '', time: '', date: '', place: '', completed: false });
    const isEditing = ref(false);
    const currentIndex = ref(-1);
    const currentDocId = ref(null);

    const fetchSchedules = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'schedules'));
        schedules.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching schedules: ', error);
      }
    };

    const submitForm = async () => {
      try {
        if (isEditing.value) {
          await updateDoc(doc(db, 'schedules', currentDocId.value), { ...newSchedule.value });
          schedules.value[currentIndex.value] = { id: currentDocId.value, ...newSchedule.value };
          isEditing.value = false;
        } else {
          const docRef = await addDoc(collection(db, 'schedules'), { ...newSchedule.value });
          schedules.value.push({ id: docRef.id, ...newSchedule.value });
        }
        newSchedule.value = { event: '', time: '', date: '', place: '', completed: false };
      } catch (error) {
        console.error('Error submitting schedule: ', error);
      }
    };

    const editSchedule = (schedule, index) => {
      newSchedule.value = { ...schedule };
      isEditing.value = true;
      currentIndex.value = index;
      currentDocId.value = schedule.id;
    };

    const cancelEdit = () => {
      newSchedule.value = { event: '', time: '', date: '', place: '', completed: false };
      isEditing.value = false;
    };

    const markCompleted = async (id) => {
      try {
        await deleteDoc(doc(db, 'schedules', id));
        schedules.value = schedules.value.filter(schedule => schedule.id !== id);
      } catch (error) {
        console.error('Error marking schedule as completed: ', error);
      }
    };

    onMounted(fetchSchedules);

    return {
      schedules,
      newSchedule,
      isEditing,
      submitForm,
      editSchedule,
      cancelEdit,
      markCompleted
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
  text-align: center;
  color: black;
  margin-bottom: 20px;
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
