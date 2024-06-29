<template>
    <div>
      <h2>Pay Tithes/Offerings</h2>
      <form @submit.prevent="payTithes">
        <label for="amount">Amount:</label>
        <input type="number" v-model="amount" required />
        <button type="submit">Pay</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        amount: 0,
      };
    },
    methods: {
      payTithes() {
        // Logic to process payment
        console.log(`Paying tithes: ${this.amount}`);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styles here */
  </style>
  