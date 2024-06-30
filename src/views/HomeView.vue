<template>
  <v-app id="home">
    <NavBar />
    <v-container fluid>
      <div class="head">
        <v-row>
          <v-col cols="5">
            <div style="position: relative" class="mt-16">
              <h1 class="text-grey">Welcome,</h1>
              <h1 class="text-white">To Our Church</h1>
              <span class="text-grey">A Place of Worship & Community</span><br />
              <v-btn tile dark class="text-yellow mt-8" variant="outlined">
                Contact Us
              </v-btn>
            </div>
          </v-col>
          <v-col cols="2">
            <div
              style="
                position: absolute;
                z-index: 9999;
                bottom: 0;
                margin-left: auto;
                margin-right: auto;
                left: 0;
                right: 0;
                text-align: center;
              "
              class="mt-16"
            >
              <v-icon>fas fa-angle-double-down</v-icon>
            </div>
          </v-col>
          <v-col cols="5">
            <div style="position: relative; z-index: 9999" class="mt-16">
              <v-img src="" contain max-height="300"></v-img> <!-- Image source left blank -->
            </div>
          </v-col>
        </v-row>
      </div>
      <v-col cols="12" class="mt-16" id="about">
        <div>
          <v-row>
            <v-col cols="12" sm="6">
              <div class="egg">
                <v-img src="" max-height="300" class=""></v-img> <!-- Image source left blank -->
              </div>
            </v-col>
            <v-col cols="12" sm="6">
              <h5 class="mt-16">About Us</h5>
              <div style="width: 120px">
                <v-slider
                  v-model="slider2"
                  color="yellow"
                  label="track-color"
                ></v-slider>
              </div>
              <h4 class="mt-n4">A Community of Faith</h4>
              <h4 class="">Serving with Love</h4>
              <p class="text-grey">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Aspernatur, ullam perspiciatis fugiat temporibus laboriosam
                accusamus tempora repellendus sequi sed cum dolorum vero est.
                Placeat dicta architecto reiciendis est veniam. Unde.
              </p>
              <br />
              <p class="text-grey">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Aspernatur, ullam perspiciatis fugiat temporibus laboriosam
                accusamus tempora repellendus sequi sed cum dolorum vero est.
                Placeat dicta architecto reiciendis est veniam. Unde.
              </p>
              <v-btn tile dark color="yellow" class="mt-4">
                Learn More
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <div class="text-center mt-4">
        <h2>What We Do</h2>
        <div style="width: 120px; margin: 0 auto">
          <v-slider
            v-model="slider2"
            color="yellow"
            label="track-color"
          ></v-slider>
        </div>
      </div>
      <v-col cols="12" class="padd" id="portfolio">
        <div class="first" id="project">
          <v-row>
            <v-col cols="12">
              <div class="child">
                <v-btn
                  icon="fas fa-church"
                  color="#FBDF7E"
                  class="text-white"
                ></v-btn>
                <h3 class="ml-3 mt-4">Worship Services</h3>
                <p class="text-grey ml-3 mt-4 text-caption">
                  Lorem, ipsum dolor sit amet <br />consectetur adipisicing
                  <br />consectetur adipis
                </p>
              </div>
              <div class="child">
                <v-btn
                  icon="fas fa-hands-helping"
                  color="#FBDF7E"
                  class="text-white"
                ></v-btn>
                <h3 class="ml-3 mt-4">Community Outreach</h3>
                <p class="text-grey ml-3 mt-4 text-caption">
                  Lorem, ipsum dolor sit amet <br />consectetur adipisicing
                  <br />consectetur adipis
                </p>
              </div>
              <div class="child">
                <v-btn
                  icon="fas fa-book"
                  color="#FBDF7E"
                  class="text-white"
                ></v-btn>
                <h3 class="ml-3 mt-4">Bible Study</h3>
                <p class="text-grey ml-3 mt-4 text-caption">
                  Lorem, ipsum dolor sit amet <br />consectetur adipisicing
                  <br />consectetur adipis
                </p>
              </div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </div>
      </v-col>
      <v-col cols="12" sm="12" id="services">
        <div class="d-flex justify-center mb-6">
          <v-btn color="#FBDF7E" class="mr-2">All</v-btn>
          <v-btn class="mr-2" variant="tonal">Worship Services</v-btn>
          <v-btn class="mr-2" variant="tonal">Community Outreach</v-btn>
          <v-btn class="mr-2" variant="tonal">Bible Study</v-btn>
          <v-btn variant="tonal">Other Ministries</v-btn>
        </div>
      </v-col>
      <v-col cols="12" class="imgHover">
        <v-row class="fill-height" align="center" justify="center">
          <template v-for="(item, i) in items" :key="i">
            <v-col cols="12" md="4">
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                  :elevation="isHovering ? 12 : 2"
                  :class="{ 'on-hover': isHovering }"
                  v-bind="props"
                >
                  <v-img :src="item.img" height="225px" cover></v-img>
                </v-card>
              </v-hover>
            </v-col>
          </template>
        </v-row>
      </v-col>
      <v-col cols="12" id="testimonials" class="mt-16"> <!-- Added margin-top -->
        <div class="pre">
          <h2>Testimonials</h2>
          <v-row>
            <v-col cols="12" sm="4">
              <v-card class="mx-auto" max-width="344" height="">
                <v-img src="" height="200px" cover></v-img> <!-- Image source left blank -->
                <v-card-title> We provide you the best </v-card-title>
                <v-card-subtitle>
                  By Church Team | 06 Jun 2024
                </v-card-subtitle>
                <v-card-text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                  rem saepe sapiente deleniti, odio non laborum fuga.
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card class="mx-auto" max-width="344" height="">
                <v-img src="" height="200px" cover></v-img> <!-- Image source left blank -->
                <v-card-title> We provide you the best </v-card-title>
                <v-card-subtitle>
                  By Church Team | 06 Jun 2024
                </v-card-subtitle>
                <v-card-text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                  rem saepe sapiente deleniti, odio non laborum fuga.
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card class="mx-auto" max-width="344" height="">
                <v-img src="" height="200px" cover></v-img> <!-- Image source left blank -->
                <v-card-title> We provide you the best </v-card-title>
                <v-card-subtitle>
                  By Church Team | 06 Jun 2024
                </v-card-subtitle>
                <v-card-text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                  rem saepe sapiente deleniti, odio non laborum fuga.
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12" sm="12" class="px-16 mt-16" id="contact"> <!-- Added margin-top -->
        <v-row>
          <v-col cols="12" sm="4">
            <div class="child">
              <h1>Contact info.</h1>
              <v-btn
                icon="fas fa-map-marker-alt"
                color=""
                class="mt-10"
                variant="outlined"
              ></v-btn>
              <br />
              <span class="text-caption">Your Street Address, yourArea </span>
              <br />
              <v-btn
                icon="fas fa-phone-alt"
                color=""
                class="mt-10"
                variant="outlined"
              ></v-btn>
              <br />
              <span class="text-caption">00235 - 6521</span>
              <br />
              <v-btn
                icon="fas fa-envelope"
                color=""
                class="mt-10"
                variant="outlined"
              ></v-btn>
              <br />
              <span class="text-caption">kevin.ojwang@strathmore.edu</span>
              <br />
            </div>
          </v-col>
          <v-col cols="12" sm="8">
            <h1 class="mt-8">Send your message</h1>
            <v-divider></v-divider>
            <span class="text-caption">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              fugiat officia, odio eaque exercitationem libero nesciunt placeat,
              repellat obcaecati sed tenetur! Est labore aliquam amet
              consequatur necessitatibus fugit obcaecati facilis!
            </span>
            <v-row class="mt-10">
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="message.name"
                  label="Name"
                  persistent-hint
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="message.email"
                  label="Email"
                  persistent-hint
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              v-model="message.content"
              label="Message"
              persistent-hint
              variant="outlined"
            ></v-text-field>
            <v-btn color="#FBDF7E" class="mt-4" @click="sendMessage">Send</v-btn>
          </v-col>
        </v-row>
      </v-col>

      <!-- New Sections -->
      <section id="liveMassTimes" class="section">
        <h2>Live Mass Times</h2>
        <v-row>
          <v-col cols="3"><strong>Time of the Day</strong></v-col>
          <v-col cols="3"><strong>Date</strong></v-col>
          <v-col cols="3"><strong>Theme of the Day</strong></v-col>
          <v-col cols="3"><strong>Celebrant</strong></v-col>
        </v-row>
        <v-data-table :headers="massHeaders" :items="massTimes"></v-data-table>
      </section>
      
      <section id="makeAnOffering" class="section">
        <router-link to="/make-an-offering">Make an Offering</router-link>
      </section>
      
      <section id="seeUpcomingEvents" class="section">
        <h2>Upcoming Events</h2>
        <v-row>
          <v-col cols="4"><strong>Event Name</strong></v-col>
          <v-col cols="4"><strong>Date</strong></v-col>
          <v-col cols="4"><strong>Plea/Request</strong></v-col>
        </v-row>
        <v-data-table :headers="eventHeaders" :items="events"></v-data-table>
      </section>
    </v-container>
  </v-app>
</template>

<script>
import { ref, onMounted } from 'vue'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

export default {
  data() {
    return {
      slider2: 0,
      items: [
        { img: 'img1.jpg' },
        { img: 'img2.jpg' },
        { img: 'img3.jpg' }
      ],
      focus: new Date(),
      events: [],
      message: { name: '', email: '', content: '' },
      massHeaders: [
        { text: 'Time of Day', value: 'timeOfDay' },
        { text: 'Day-Date', value: 'dayDate' },
        { text: 'Theme', value: 'theme' },
        { text: 'Celebrant', value: 'celebrant' }
      ],
      massTimes: [],
      eventHeaders: [
        { text: 'Event Name', value: 'name' },
        { text: 'Date', value: 'date' },
        { text: 'Plea/Request', value: 'plea' }
      ]
    }
  },
  setup() {
    const focus = ref(new Date())
    const events = ref([])
    const message = ref({ name: '', email: '', content: '' })
    const massHeaders = [
      { text: 'Time of Day', value: 'timeOfDay' },
      { text: 'Day-Date', value: 'dayDate' },
      { text: 'Theme', value: 'theme' },
      { text: 'Celebrant', value: 'celebrant' }
    ]
    const massTimes = ref([])
    const eventHeaders = [
      { text: 'Event Name', value: 'name' },
      { text: 'Date', value: 'date' },
      { text: 'Plea/Request', value: 'plea' }
    ]

    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, 'events'))
      events.value = querySnapshot.docs.map(doc => doc.data())
    }

    const fetchMassTimes = async () => {
      const querySnapshot = await getDocs(collection(db, 'liveMassTimes'))
      massTimes.value = querySnapshot.docs.map(doc => doc.data())
    }

    const sendMessage = async () => {
      try {
        await addDoc(collection(db, 'messages'), message.value)
        alert('Message sent successfully!')
        message.value = { name: '', email: '', content: '' }
      } catch (error) {
        alert('Error sending message: ' + error.message)
      }
    }

    onMounted(() => {
      fetchEvents()
      fetchMassTimes()
    })

    return { focus, events, message, massHeaders, massTimes, eventHeaders, sendMessage }
  }
}
</script>

<style scoped>
.head {
  background-color: #333;
  color: #fff;
}
.text-grey {
  color: grey;
}
.text-white {
  color: white;
}
.text-yellow {
  color: yellow;
}
.text-caption {
  font-size: 12px;
}
.mt-4 {
  margin-top: 16px;
}
.mt-8 {
  margin-top: 32px;
}
.mt-9 {
  margin-top: 36px;
}
.mt-10 {
  margin-top: 40px;
}
.mt-16 {
  margin-top: 64px;
}
.mt-n4 {
  margin-top: -16px;
}
.padd {
  padding: 16px;
}
.px-16 {
  padding-left: 64px;
  padding-right: 64px;
}
.hire {
  background-color: #f7f7f7;
  padding: 64px;
}
.child {
  text-align: center;
}
.fill-height {
  height: 100%;
}
.on-hover {
  background-color: #f7f7f7;
}
.v-container {
  padding: 16px 0 16px 0;
}
.head {
  position: relative;
  text-align: center;
  padding: 12px;
  margin-bottom: 6px;
  height: 400px;
  width: 100%;
  color: white;
}
.head:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 50%;
  background: black;
  transform: skew(0deg, 6deg);
}
.head:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 50%;
  background: black;
  transform: skew(0deg, -6deg);
}
.egg {
  display: block;
  margin-left: 100px;
  margin-top: 50px;
  width: 356px;
  height: 300px;
  background-color: #fbdf7e;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
}
.first {
  width: 100%;
  height: 280px;
  text-align: center;
  padding: 2rem 2rem;
}
.child {
  display: inline-block;
  padding: 2rem 1rem;
  vertical-align: middle;
  text-align: center;
  margin-right: 8px;
}
.imgHover {
  padding: 0 200px;
}
.pre {
  width: 100%;
  height: 380px;
  text-align: center;
  padding: 0 200px;
  background-color: #f5f5f5;
}
.hire {
  width: 100%;
  height: 200px;
  padding: 0 200px;
  background-color: #e9e9e9;
  margin-top: -24px;
}
.section {
  padding: 20px;
  border-bottom: 1px solid #ddd;
}

.section h2 {
  margin-bottom: 20px;
}

#testimonials v-card {
  margin-bottom: 20px;
}

#seeUpcomingEvents v-data-table {
  margin-top: 20px;
}
</style>