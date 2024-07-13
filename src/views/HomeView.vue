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
              <v-img :src="i1" class="placeholder-image"></v-img>
              <v-btn tile dark class="text-yellow mt-8" variant="outlined" @click="scrollToContact">
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
            <div class="image-container">
              <v-img :src="i7" class="circular-image" contain></v-img>
            </div>
          </v-col>
        </v-row>
      </div>
      <v-col cols="12" class="mt-16" id="about">
        <div>
          <v-row>
            <v-col cols="12" sm="6">
              <div class="egg">
                <v-img :src="i2" class=""></v-img>
              </div>
            </v-col>
            <v-col cols="12" sm="6">
              <h5 class="mt-16">About Us</h5>
              <v-img :src="i4" class="placeholder-image"></v-img>
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
                Within our community of faith, we strive to serve with unwavering love and compassion. Guided by our beliefs, 
                we embrace each opportunity to uplift and support one another. 
                Together, we seek to create a welcoming environment 
                where everyone can find solace and strength in their journey of faith.
              </p>
              <br />
              <p class="text-grey">
                Our dedication to service extends beyond our walls, reaching out to those in need with empathy and kindness. 
                Through shared experiences and steadfast support, we cultivate a place where faith flourishes and hearts are nourished.
                 Together, we embody the spirit of love and unity, 
                 making a meaningful difference in our community and beyond.
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
                  Join us for our uplifting worship services where we  <br /> praise and  come together to
                  <br />seek guidance.
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
                  Our community outreach programs strive to make a   <br />offering support and positive impact,
                  <br />compassion to those in need.
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
                  Dive deeper into scripture with our engaging Bible    <br />where we explore and discuss study sessions,
                  <br />the teachings of faith and wisdom.
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
      <v-col cols="12" id="testimonials" class="mt-16">
        <div class="pre">
          <h2>Testimonials</h2>
          <v-row>
            <v-col cols="12" sm="4" v-for="(testimonial, index) in testimonials" :key="index">
              <v-card class="mx-auto" max-width="344" height="">
                <v-img :src="testimonial.img" height="200px" cover></v-img>
                <v-card-title>{{ testimonial.title }}</v-card-title>
                <v-card-subtitle>
                  {{ testimonial.subtitle }}
                </v-card-subtitle>
                <v-card-text>
                  {{ testimonial.text }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12" sm="12" class="px-16 mt-16" id="contact">
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
              <span class="text-caption">Nairobi CBD, Kenyatta </span>
              <br />
              <v-btn
                icon="fas fa-phone-alt"
                color=""
                class="mt-10"
                variant="outlined"
              ></v-btn>
              <br />
              <span class="text-caption">+254 717342431</span>
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
              Welcome to our church community. We strive to serve with love and faith,
               providing a place of worship and support for all.
                Your feedback is valuable to us!
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
      <section id="events" class="section mt-16">
        <v-row>
          <v-col cols="12">
            <h2 class="text-center mb-6">Our Events</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <div class="section-content" id="liveMassTimes">
              <h3>Live Mass Times</h3>
              <v-data-table
                :headers="massHeaders"
                :items="massTimes"
                :items-per-page="5"
                class="elevation-1"
                hide-default-footer
              ></v-data-table>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="section-content" id="seeUpcomingEvents">
              <h3>Upcoming Events</h3>
              <v-data-table
                :headers="eventHeaders"
                :items="events"
                :items-per-page="5"
                class="elevation-1"
                hide-default-footer
              ></v-data-table>
            </div>
          </v-col>
        </v-row>
      </section>
    </v-container>
    <FooterView />
  </v-app>
</template>

<script>
import { ref, onMounted } from 'vue'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import NavBar from "../components/Navbar.vue"
import FooterView from "../views/FooterView.vue"
import i1 from "@/assets/i1.jpg"
import i2 from "@/assets/i2.png"
import i3 from "@/assets/i3.jpg"
import i4 from "@/assets/i4.png"
import i5 from "@/assets/i5.png"
import i6 from "@/assets/i6.jpg"
import i7 from "@/assets/i7.jpg"
import i8 from "@/assets/i8.jpg"
import i9 from "@/assets/i9.png"

export default {
  components: {
    NavBar,
    FooterView
  },
  data() {
    return {
      slider2: 0,
      items: [
        { img: i2 },
        { img: i9 },
        { img: i5 }
      ],
      testimonials: [
        { img: i3, title: "We provide you the best", subtitle: "By Mrs Esther | 07 Jun 2024", text: "Our church has been a beacon of hope and strength for me. The sermons inspire and uplift me every week. I feel blessed to have found such a loving community where I can grow spiritually." },
        { img: i6, title: "We provide you the best", subtitle: "By Our Children | 16 July 2024", text: "We love our Sunday School classes! It's so much fun learning about Jesus and making new friends. Our teachers are the best—they make learning about God exciting!" },
        { img: i8, title: "We provide you the best", subtitle: "By James Family | 12 March 2024", text: "Joining this church was the best decision we ever made. We've been welcomed with open arms and have found genuine friendships here." }
      ],
      focus: new Date(),
      events: [],
      message: { name: '', email: '', content: '' },
      massHeaders: [
        { text: 'Time of the Day', value: 'timeOfDay' },
        { text: 'Day-Date', value: 'dayDate' },
        { text: 'Theme of the Day', value: 'theme' },
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
      { text: 'Time of the Day', value: 'timeOfDay' },
      { text: 'Day-Date', value: 'dayDate' },
      { text: 'Theme of the Day', value: 'theme' },
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

    const scrollToContact = () => {
      const contactSection = document.getElementById('contact');
      contactSection.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToSection = (sectionId) => {
      const section = document.getElementById(sectionId);
      section.scrollIntoView({ behavior: 'smooth' });
    };

    onMounted(() => {
      fetchEvents()
      fetchMassTimes()
    })

    return { focus, events, message, massHeaders, massTimes, eventHeaders, sendMessage, scrollToContact, scrollToSection }
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
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 9999;
  margin-top: 32px;
  padding: 16px;
}
.circular-image {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
}
.egg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  width: 300px;
  height: 300px;
  background-color: #fbdf7e;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}
.egg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
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
.section-content {
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}
.section-content h3 {
  font-weight: bold;
  margin-bottom: 16px;
}
.placeholder-image {
  width: 100%;
  height: auto;
  margin-top: 16px;
}
#testimonials v-card {
  margin-bottom: 20px;
}
#seeUpcomingEvents v-data-table {
  margin-top: 20px;
}
</style>