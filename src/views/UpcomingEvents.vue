<template>
  <v-app class="background-container">
    <NavBar />
    <v-container class="overlay">
      <h1 class="title">Upcoming Events/Activities</h1>
      <v-card class="table-card mt-4">
        <v-simple-table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Place</th>
              <th>Plea/Request</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in events" :key="event.id">
              <td>{{ event.name }}</td>
              <td>{{ event.date }}</td>
              <td>{{ event.time }}</td>
              <td>{{ event.place }}</td>
              <td>{{ event.plea }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default {
  name: 'UpcomingEvents',
  setup() {
    const events = ref([]);

    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        events.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching events: ', error);
      }
    };

    onMounted(fetchEvents);

    return { events };
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
