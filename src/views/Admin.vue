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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Telephone</th>
            <th>Location</th>
            <th>Date added</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Emmanuel Arungwaefwe</td>
            <td>Male</td>
            <td>emanu@gmail.com</td>
            <td>0771445116</td>
            <td>Boroto</td>
            <td>2018-06-05</td>
            <td><a href="#">Edit</a> <a href="#">Delete</a></td>
          </tr>
          <tr>
            <td>Grace Mwasou</td>
            <td>Female</td>
            <td>grace@gmail.com</td>
            <td>0771445116</td>
            <td>Komolo</td>
            <td>2018-06-05</td>
            <td><a href="#">Edit</a> <a href="#">Delete</a></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- New Section for Live Mass Times -->
    <div class="padd mt-8">
      <h3>Live Mass Times</h3>
      <v-form @submit.prevent="addMassTime">
        <v-row>
          <v-col cols="12" sm="2">
            <v-text-field v-model="newMassTime.timeOfDay" label="Time of Day" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field v-model="newMassTime.dayDate" label="Day-Date" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field v-model="newMassTime.theme" label="Theme of the Day" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field v-model="newMassTime.celebrant" label="Celebrant" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-btn color="primary" type="submit">Add</v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-data-table :headers="massHeaders" :items="massTimes"></v-data-table>
    </div>

    <!-- New Section for Upcoming Events -->
    <div class="padd mt-8">
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
          <v-col cols="12" sm="2">
            <v-btn color="primary" type="submit">Add</v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-data-table :headers="eventHeaders" :items="events"></v-data-table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

export default {
  setup() {
    const newMassTime = ref({
      timeOfDay: '',
      dayDate: '',
      theme: '',
      celebrant: ''
    })
    const massTimes = ref([])
    const massHeaders = [
      { text: 'Time of Day', value: 'timeOfDay' },
      { text: 'Day-Date', value: 'dayDate' },
      { text: 'Theme', value: 'theme' },
      { text: 'Celebrant', value: 'celebrant' }
    ]

    const newEvent = ref({
      name: '',
      date: '',
      plea: ''
    })
    const events = ref([])
    const eventHeaders = [
      { text: 'Event Name', value: 'name' },
      { text: 'Date', value: 'date' },
      { text: 'Plea/Request', value: 'plea' }
    ]

    const fetchMassTimes = async () => {
      const querySnapshot = await getDocs(collection(db, 'liveMassTimes'))
      massTimes.value = querySnapshot.docs.map(doc => doc.data())
    }

    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, 'events'))
      events.value = querySnapshot.docs.map(doc => doc.data())
    }

    const addMassTime = async () => {
      try {
        await addDoc(collection(db, 'liveMassTimes'), newMassTime.value)
        fetchMassTimes()
        newMassTime.value = { timeOfDay: '', dayDate: '', theme: '', celebrant: '' }
      } catch (error) {
        console.error('Error adding mass time: ', error)
      }
    }

    const addEvent = async () => {
      try {
        await addDoc(collection(db, 'events'), newEvent.value)
        fetchEvents()
        newEvent.value = { name: '', date: '', plea: '' }
      } catch (error) {
        console.error('Error adding event: ', error)
      }
    }

    onMounted(() => {
      fetchMassTimes()
      fetchEvents()
    })

    return { newMassTime, massTimes, massHeaders, addMassTime, newEvent, events, eventHeaders, addEvent }
  }
}
</script>

<style scoped>
.head {
  background-color: #333;
  color: #fff;
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
</style>