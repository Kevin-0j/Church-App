<template>
  <v-app class="background-container">
    <NavBar />
    <v-container class="overlay">
      <h1 class="title">Book Church Events</h1>
      <v-form @submit.prevent="submitForm">
        <v-text-field v-model="name" label="Your Name" required />
        <v-text-field v-model="email" label="Email" required type="email" />
        <v-select v-model="event" :items="events" label="Select Event" required />
        <v-text-field v-model="date" label="Date" required type="date" />
        <v-text-field v-model="time" label="Time" required type="time" />
        <v-btn type="submit" color="primary">Book Event</v-btn>
      </v-form>
      <!-- Table for displaying bookings -->
      <v-card class="table-card mt-4">
        <v-simple-table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Role</th> <!-- Added Role Column -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in bookings" :key="booking.id">
              <td>{{ booking.event }}</td>
              <td>{{ booking.date }}</td>
              <td>{{ booking.time }}</td>
              <td>{{ booking.status }}</td>
              <td>{{ booking.role }}</td> <!-- Display Role -->
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
  name: 'ChurchEvents',
  setup() {
    const name = ref('');
    const email = ref('');
    const event = ref('');
    const date = ref('');
    const time = ref('');
    const events = ref(['Sacrament of Holy Matrimony', 'Sacrament of the Eucharist','Sacrament of Baptism','Sacrament of Confirmation','Sacrament of Holy Orders','Sacrament of Anointing of the Sick','Sacrament of Penance','Funeral' ]);
    const bookings = ref([]);

    const submitForm = async () => {
      try {
        await addDoc(collection(db, 'bookings'), {
          name: name.value,
          email: email.value,
          event: event.value,
          date: date.value,
          time: time.value,
          status: 'Pending',
          role: 'Church Member' // Added Role Field
        });
        alert(`Event booked: ${event.value}`);
        await fetchBookings(); // Refresh the bookings list after booking
      } catch (error) {
        console.error('Error booking event: ', error);
      }
    };

    const fetchBookings = async () => {
      try {
        if (email.value) {
          const q = query(collection(db, 'bookings'), where('email', '==', email.value));
          const querySnapshot = await getDocs(q);
          bookings.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (error) {
        console.error('Error fetching bookings: ', error);
      }
    };

    watch(email, (newEmail) => {
      if (newEmail) {
        fetchBookings();
      }
    });

    onMounted(() => {
      const user = auth.currentUser;
      if (user && user.email) {
        email.value = user.email;
        fetchBookings();
      }
    });

    return {
      name,
      email,
      event,
      date,
      time,
      events,
      submitForm,
      bookings,
      fetchBookings
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
