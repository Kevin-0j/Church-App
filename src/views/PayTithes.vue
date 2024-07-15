<template>
  <v-app id="make-an-offering">
    <NavBar />
    <v-container fluid class="d-flex align-center justify-center fill-height">
      <div class="text-center">
        <h1 class="text-white">Make an Offering</h1>
        <p class="text-light-grey">Your contributions help us serve the community better</p>
        <div id="paypal-container-7WTKZMG3REXXC" class="mt-8"></div>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'MakeAnOfferingView',
  mounted() {
    this.loadPayPalScript();
  },
  methods: {
    loadPayPalScript() {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=BAA8bdtv7Mc09PP_QXMSKoh9eJQE9hIUi0xIx80EO0MxkwvlDu3iXPdS3zJU1aqkF60Z4onLvA8MlhDwNY&components=hosted-buttons&disable-funding=venmo&currency=USD';
      script.onload = this.initializePayPalButtons;
      script.onerror = () => {
        console.error('Failed to load PayPal SDK script');
      };
      document.head.appendChild(script);
    },
    initializePayPalButtons() {
      if (window.paypal && window.paypal.HostedButtons) {
        window.paypal.HostedButtons({
          hostedButtonId: "7WTKZMG3REXXC",
        }).render("#paypal-container-7WTKZMG3REXXC");
      } else {
        console.error('PayPal HostedButtons is not available');
      }
    }
  }
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
  background-color: #333;
  color: #fff;
}
.text-light-grey {
  color: #d3d3d3;
}
.text-white {
  color: white;
}
.mt-8 {
  margin-top: 32px;
}
.text-center {
  text-align: center;
}
</style>
