<template>
    <v-app>
      <NavBar />
      <v-container>
        <h1 class="title">Upcoming Events/Activities</h1>
        <v-list>
          <v-list-item
            v-for="event in events"
            :key="event.id"
            @click="viewEvent(event.id)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ event.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ event.date }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'UpcomingEvents',
    data() {
      return {
        events: [
          { id: 1, title: 'Church Service', date: '2024-07-10' },
          { id: 2, title: 'Community Gathering', date: '2024-07-15' }
        ]
      }
    },
    methods: {
      viewEvent(id) {
        this.$router.push({ name: 'EventDetails', params: { id } });
      }
    }
  }
  </script>
  
  <style scoped>
  .title {
    margin-bottom: 20px;
    text-align: center;
  }
  </style>
  