<template>
  <div>
    <div class="head">
      <h1>Welcome Admin</h1>
    </div>
    <div class="padd mt-4">
      <div class="stats">
        <div>
          <h3>Members registered last month</h3>
          <p>30</p>
          <p class="text-caption">+20% month over month</p>
        </div>
        <div>
          <h3>Money collected last month</h3>
          <p>Ksh 44,500.30</p>
          <p class="text-caption">+33% month over month</p>
        </div>
        <div>
          <h3>Activities done</h3>
          <p>50</p>
          <p class="text-caption">-8% month over month</p>
        </div>
      </div>
      <div class="charts mt-8">
        <div>
          <h3>Report on tithes collected in a month</h3>
          <div class="chart-placeholder">[Chart]</div>
        </div>
        <div>
          <h3>Report on number of church members registered in a month</h3>
          <div class="chart-placeholder">[Chart]</div>
        </div>
      </div>
    </div>
    <div class="padd mt-8">
      <h3>Church Members List</h3>
      <p class="subheading">Data sourced from Firebase:</p>
      <v-data-table
        :headers="userHeaders"
        :items="users"
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

    <!-- Section for Live Mass Times -->
    <div class="padd mt-8 section">
      <h3>Live Mass Times</h3>
      <v-form @submit.prevent="addMassTime">
        <v-row>
          <v-col cols="12" sm="3">
            <v-text-field v-model="newMassTime.timeOfDay" label="Time of Day" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field v-model="newMassTime.dayDate" label="Day-Date" required></v-text-field>
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

    <!-- Section for Upcoming Events -->
    <div class="padd mt-8 section">
      <h3>Upcoming Events</h3>
      <v-form @submit.prevent="addEvent">
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field v-model="newEvent.name" label="Event Name" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field v-model="newEvent.date" label="Date" required></v-text-field>
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

    <!-- Edit User Dialog -->
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
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default {
  setup() {
    const users = ref([]);
    const userHeaders = [
      { text: 'Name', value: 'name' },
      { text: 'Gender', value: 'gender' },
      { text: 'Email', value: 'email' },
      { text: 'Telephone', value: 'phone' },
      { text: 'Location', value: 'address' },
      { text: 'Date added', value: 'dateAdded' },
      { text: 'Action', value: 'action', sortable: false }
    ];

    const newMassTime = ref({
      timeOfDay: '',
      dayDate: '',
      theme: '',
      celebrant: ''
    });
    const massTimes = ref([]);
    const massHeaders = [
      { text: 'Time of Day', value: 'timeOfDay' },
      { text: 'Day-Date', value: 'dayDate' },
      { text: 'Theme', value: 'theme' },
      { text: 'Celebrant', value: 'celebrant' }
    ];

    const newEvent = ref({
      name: '',
      date: '',
      plea: ''
    });
    const events = ref([]);
    const eventHeaders = [
      { text: 'Event Name', value: 'name' },
      { text: 'Date', value: 'date' },
      { text: 'Plea/Request', value: 'plea' }
    ];

    const editedUser = ref({});
    const editDialog = ref(false);

    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      users.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };

    const fetchMassTimes = async () => {
      const querySnapshot = await getDocs(collection(db, 'liveMassTimes'));
      massTimes.value = querySnapshot.docs.map(doc => doc.data());
    };

    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, 'events'));
      events.value = querySnapshot.docs.map(doc => doc.data());
    };

    const addMassTime = async () => {
      try {
        await addDoc(collection(db, 'liveMassTimes'), newMassTime.value);
        fetchMassTimes();
        newMassTime.value = { timeOfDay: '', dayDate: '', theme: '', celebrant: '' };
      } catch (error) {
        console.error('Error adding mass time: ', error);
      }
    };

    const addEvent = async () => {
      try {
        await addDoc(collection(db, 'events'), newEvent.value);
        fetchEvents();
        newEvent.value = { name: '', date: '', plea: '' };
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
          address: editedUser.value.address
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

    onMounted(() => {
      fetchUsers();
      fetchMassTimes();
      fetchEvents();
    });

    return {
      users,
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
      closeDialog
    };
  }
};
</script>

<style scoped>
.head {
  background-color: #333;
  color: #fff;
  padding: 16px;
}
.padd {
  padding: 16px;
}
.mt-4 {
  margin-top: 16px;
}
.mt-8 {
  margin-top: 32px;
}
.mt-16 {
  margin-top: 64px;
}
.stats {
  display: flex;
  justify-content: space-between;
}
.charts {
  display: flex;
  justify-content: space-between;
}
.chart-placeholder {
  width: 100%;
  height: 200px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  border: 1px solid #ddd;
}
th {
  background-color: #333;
  color: #fff;
}
.section {
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
}
.text-center {
  text-align: center;
}
.subheading {
  margin-bottom: 16px;
  font-size: 14px;
  color: #666;
}
</style>