<template>
  <div class="admin-container">
    <div class="head">
      <h1>Welcome Admin</h1>
    </div>
    <div class="stats-container padd mt-4">
      <div class="stat-item">
        <h3>Members registered last month</h3>
        <p class="stat-value">{{ userCount }}</p>
        <p class="stat-caption">+20% month over month</p>
      </div>
      <div class="stat-item">
        <h3>Money collected last month</h3>
        <p class="stat-value">Ksh 44,500.30</p>
        <p class="stat-caption">+33% month over month</p>
      </div>
      <div class="stat-item">
        <h3>Activities done</h3>
        <p class="stat-value">10</p>
        <p class="stat-caption">-8% month over month</p>
      </div>
    </div>
    <div class="charts-container padd mt-8">
      <div class="chart-item">
        <h3>Report on tithes collected in a month</h3>
        <HighchartComponent :chartOptions="titheChartOptions" />
      </div>
      <div class="chart-item">
        <h3>Report on number of church members registered in a month</h3>
        <HighchartComponent :chartOptions="userChartOptions" />
      </div>
      <div class="chart-item">
        <h3>Report on messages sent to admin</h3>
        <HighchartComponent :chartOptions="messageChartOptions" />
      </div>
    </div>
    <div class="members-list padd mt-8">
      <h3>Church Members List</h3>
      <p class="subheading">Data sourced from Firebase:</p>
      <v-data-table
        :headers="userHeaders"
        :items="churchMembers"
        item-key="id"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:item.action="{ item }">
          <v-btn small @click="editUser(item)">Edit</v-btn>
          <v-btn small color="error" @click="deleteUser(item.id)">Delete</v-btn>
        </template>
      </v-data-table>
    </div>
    <div class="priests-list padd mt-8">
      <h3>Priests List</h3>
      <p class="subheading">Data sourced from Firebase:</p>
      <v-data-table
        :headers="userHeaders"
        :items="priests"
        item-key="id"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:item.action="{ item }">
          <v-btn small @click="editUser(item)">Edit</v-btn>
          <v-btn small color="error" @click="deleteUser(item.id)">Delete</v-btn>
        </template>
      </v-data-table>
    </div>
    <div class="mass-times padd mt-8 section">
      <h3>Live Mass Times</h3>
      <v-form @submit.prevent="addMassTime">
        <v-row>
          <v-col cols="12" sm="3">
            <v-text-field v-model="newMassTime.date" label="Date" required type="date"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field v-model="newMassTime.time" label="Time" required type="time"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field v-model="newMassTime.theme" label="Theme of the Day" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field v-model="newMassTime.celebrant" label="Celebrant" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" class="text-center">
            <v-btn color="primary" type="submit">Add Mass Time</v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-data-table :headers="massHeaders" :items="massTimes" hide-default-footer class="elevation-1 mt-4"></v-data-table>
    </div>
    <div class="upcoming-events padd mt-8 section">
      <h3>Upcoming Events</h3>
      <v-form @submit.prevent="addEvent">
        <v-row>
          <v-col cols="12" sm="2">
            <v-text-field v-model="newEvent.name" label="Event Name" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field v-model="newEvent.date" label="Date" required type="date"></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field v-model="newEvent.time" label="Time" required type="time"></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field v-model="newEvent.place" label="Place" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field v-model="newEvent.plea" label="Plea/Request" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" class="text-center">
            <v-btn color="primary" type="submit">Add Event</v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-data-table :headers="eventHeaders" :items="events" hide-default-footer class="elevation-1 mt-4"></v-data-table>
    </div>
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title>Edit User</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateUser">
            <v-text-field v-model="editedUser.name" label="Name" required></v-text-field>
            <v-text-field v-model="editedUser.gender" label="Gender" required></v-text-field>
            <v-text-field v-model="editedUser.email" label="Email" required></v-text-field>
            <v-text-field v-model="editedUser.phone" label="Telephone" required></v-text-field>
            <v-text-field v-model="editedUser.address" label="Location" required></v-text-field>
            <v-text-field v-model="editedUser.role" label="Role" required></v-text-field>
            <v-btn type="submit" color="primary">Save</v-btn>
            <v-btn @click="closeDialog">Cancel</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import HighchartComponent from './HighchartComponent.vue';

export default {
  components: {
    HighchartComponent
  },
  setup() {
    const churchMembers = ref([]);
    const priests = ref([]);
    const users = ref([]);
    const userCount = ref(0);
    const messageCount = ref(0);
    const userHeaders = [
      { text: 'Name', value: 'name' },
      { text: 'Gender', value: 'gender' },
      { text: 'Email', value: 'email' },
      { text: 'Telephone', value: 'phone' },
      { text: 'Location', value: 'address' },
      { text: 'Role', value: 'role' },
      { text: 'Date added', value: 'dateAdded' },
      { text: 'Action', value: 'action', sortable: false }
    ];

    const newMassTime = ref({
      date: '',
      time: '',
      theme: '',
      celebrant: ''
    });
    const massTimes = ref([]);
    const massHeaders = [
      { text: 'Date', value: 'date' },
      { text: 'Time', value: 'time' },
      { text: 'Theme of the Day', value: 'theme' },
      { text: 'Celebrant', value: 'celebrant' }
    ];

    const newEvent = ref({
      name: '',
      date: '',
      time: '',
      place: '',
      plea: ''
    });
    const events = ref([]);
    const eventHeaders = [
      { text: 'Event Name', value: 'name' },
      { text: 'Date', value: 'date' },
      { text: 'Time', value: 'time' },
      { text: 'Place', value: 'place' },
      { text: 'Plea/Request', value: 'plea' }
    ];

    const editedUser = ref({});
    const editDialog = ref(false);

    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      churchMembers.value = usersData.filter(user => user.role === 'church member' || user.role === 'youth member');
      priests.value = usersData.filter(user => user.role === 'priest');
      users.value = usersData;
      userCount.value = usersData.length;
    };

    const fetchMassTimes = async () => {
      const querySnapshot = await getDocs(collection(db, 'liveMassTimes'));
      massTimes.value = querySnapshot.docs.map(doc => doc.data());
    };

    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, 'events'));
      events.value = querySnapshot.docs.map(doc => doc.data());
    };

    const fetchMessages = async () => {
      const querySnapshot = await getDocs(collection(db, 'messages'));
      messageCount.value = querySnapshot.docs.length;
    };

    const addMassTime = async () => {
      try {
        await addDoc(collection(db, 'liveMassTimes'), newMassTime.value);
        fetchMassTimes();
        newMassTime.value = { date: '', time: '', theme: '', celebrant: '' };
      } catch (error) {
        console.error('Error adding mass time: ', error);
      }
    };

    const addEvent = async () => {
      try {
        await addDoc(collection(db, 'events'), newEvent.value);
        fetchEvents();
        newEvent.value = { name: '', date: '', time: '', place: '', plea: '' };
      } catch (error) {
        console.error('Error adding event: ', error);
      }
    };

    const editUser = (user) => {
      editedUser.value = { ...user };
      editDialog.value = true;
    };

    const updateUser = async () => {
      try {
        const userDocRef = doc(db, 'users', editedUser.value.id);
        await updateDoc(userDocRef, {
          name: editedUser.value.name,
          gender: editedUser.value.gender,
          email: editedUser.value.email,
          phone: editedUser.value.phone,
          address: editedUser.value.address,
          role: editedUser.value.role
        });
        fetchUsers();
        closeDialog();
      } catch (error) {
        console.error('Error updating user: ', error);
      }
    };

    const deleteUser = async (userId) => {
      try {
        await deleteDoc(doc(db, 'users', userId));
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user: ', error);
      }
    };

    const closeDialog = () => {
      editDialog.value = false;
    };

    // Real-time listeners
    onMounted(() => {
      const usersCollection = collection(db, 'users');
      onSnapshot(usersCollection, (snapshot) => {
        const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        churchMembers.value = usersData.filter(user => user.role === 'church member' || user.role === 'youth member');
        priests.value = usersData.filter(user => user.role === 'priest');
        users.value = usersData;
        userCount.value = usersData.length;
        updateUserChart();
      });

      const messagesCollection = collection(db, 'messages');
      onSnapshot(messagesCollection, (snapshot) => {
        messageCount.value = snapshot.docs.length;
        updateMessageChart();
      });

      fetchMassTimes();
      fetchEvents();
    });

    const titheChartOptions = ref({
      chart: {
        type: 'line',
        backgroundColor: '#333'
      },
      title: {
        text: 'Tithes Collected',
        style: {
          color: '#fff'
        }
      },
      series: [{
        data: [1, 2, 3, 4, 5],
        color: '#FFD700'
      }]
    });

    const userChartOptions = ref({
      chart: {
        type: 'line',
        backgroundColor: '#333'
      },
      title: {
        text: 'Users Registered',
        style: {
          color: '#fff'
        }
      },
      series: [{
        data: [],
        color: '#FFD700'
      }]
    });

    const messageChartOptions = ref({
      chart: {
        type: 'pie',
        backgroundColor: '#333'
      },
      title: {
        text: 'Messages to Admin',
        style: {
          color: '#fff'
        }
      },
      plotOptions: {
        pie: {
          dataLabels: {
            color: '#fff'
          },
          colors: ['#FFD700'] // This sets the color of the pie slices to yellow
        }
      },
      series: [{
        data: [{
          name: 'Messages',
          y: messageCount.value,
          color: '#FFD700' // This sets the color of the data points to yellow
        }],
      }]
    });

    const updateUserChart = () => {
      userChartOptions.value.series[0].data = users.value.map(user => ({
        name: user.name,
        y: 1
      }));
    };

    const updateMessageChart = () => {
      messageChartOptions.value.series[0].data = [
        { name: 'Messages', y: messageCount.value }
      ];
    };

    return {
      churchMembers,
      priests,
      users,
      userCount,
      messageCount,
      userHeaders,
      newMassTime,
      massTimes,
      massHeaders,
      addMassTime,
      newEvent,
      events,
      eventHeaders,
      addEvent,
      editedUser,
      editDialog,
      editUser,
      updateUser,
      deleteUser,
      closeDialog,
      titheChartOptions,
      userChartOptions,
      messageChartOptions
    };
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.admin-container {
  font-family: 'Roboto', sans-serif;
  background-color: #0d0d0d;
  color: #fff;
  padding: 32px;
  border-radius: 16px;
}

.head {
  background-color: #000;
  color: #FFD700;
  padding: 24px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 24px;
}

.stats-container {
  display: flex;
  justify-content: space-between;
  background-color: #333;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.stat-item {
  background-color: #000;
  color: #FFD700;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  flex: 1;
  margin: 0 12px;
}

.stat-item h3 {
  color: #fff;
  font-weight: bold;
}

.stat-value {
  color: #FFD700;
  font-size: 24px;
  font-weight: bold;
}

.stat-caption {
  color: #bbb;
  font-size: 14px;
}

.charts-container {
  display: flex;
  justify-content: space-between;
  background-color: #333;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.chart-item {
  background-color: #000;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  flex: 1;
  margin: 0 12px;
}

.members-list,
.priests-list,
.mass-times,
.upcoming-events {
  background-color: #333;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 24px;
}

.section {
  background-color: #444;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.v-data-table {
  border-radius: 8px;
  background-color: #444;
  color: #FFD700;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  
}

.text-center {
  text-align: center;
}

.subheading {
  font-size: 14px;
  color: #bbb;
  margin-bottom: 24px;
}

.v-btn {
  border-radius: 8px;
}

.v-card {
  border-radius: 8px;
}
</style>
