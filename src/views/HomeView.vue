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
            <div class="image-container">
              <v-img :src="i1" class="circular-image" contain></v-img>
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
            <v-col cols="12" md="4">
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
            </v-col>
            <v-col cols="12" md="4">
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
            </v-col>
            <v-col cols="12" md="4">
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
          <v-col cols="12" md="4">
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                :elevation="isHovering ? 12 : 2"
                :class="{ 'on-hover': isHovering }"
                v-bind="props"
              >
                <v-img :src="i2" height="225px" cover></v-img>
              </v-card>
            </v-hover>
          </v-col>
          <v-col cols="12" md="4">
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                :elevation="isHovering ? 12 : 2"
                :class="{ 'on-hover': isHovering }"
                v-bind="props"
              >
                <v-img :src="i5" height="225px" cover></v-img>
              </v-card>
            </v-hover>
          </v-col>
          <v-col cols="12" md="4">
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                :elevation="isHovering ? 12 : 2"
                :class="{ 'on-hover': isHovering }"
                v-bind="props"
              >
                <v-img :src="i9" height="225px" cover></v-img>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" id="testimonials" class="mt-16">
        <div class="pre">
          <h2>Testimonials</h2>
          <v-row>
            <v-col cols="12" sm="4">
              <v-card class="mx-auto" max-width="344" height="">
                <v-img :src="i3" height="200px" cover></v-img>
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
                <v-img :src="i6" height="200px" cover></v-img>
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
                <v-img :src="i7" height="200px" cover></v-img>
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
      <v-col cols="12" class="mt-16">
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" md="6" id="live-mass-times">
            <div class="text-center mt-8">
              <h2>Live Mass Times</h2>
              <div style="width: 120px; margin: 0 auto">
                <v-slider
                  v-model="slider2"
                  color="yellow"
                  label="track-color"
                ></v-slider>
              </div>
            </div>
            <div class="padd">
              <v-card>
                <v-card-text>
                  <v-sheet
                    color="primary"
                    height="90"
                    elevation="15"
                    tile
                  ></v-sheet>
                  <v-row class="fill-height">
                    <v-col
                      v-for="(week, index) in weeks"
                      :key="index"
                      cols="12"
                      md="6"
                      class="text-center"
                    >
                      <v-sheet
                        class="pt-8"
                        color="primary"
                        height="90"
                        elevation="15"
                        tile
                      >
                        {{ week }}
                      </v-sheet>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
          <v-col cols="12" md="6" id="events">
            <div class="text-center mt-8">
              <h2>Upcoming Events</h2>
              <div style="width: 120px; margin: 0 auto">
                <v-slider
                  v-model="slider2"
                  color="yellow"
                  label="track-color"
                ></v-slider>
              </div>
              <div class="mt-4">
                <v-img :src="i4" height="300px" contain></v-img>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-container>
    <FooterView />
  </v-app>
</template>

<script>
import { ref } from "vue";
import NavBar from "../components/Navbar.vue";
import FooterView from "../views/FooterView.vue";
import i1 from "@/assets/i1.jpg";
import i2 from "@/assets/i2.png";
import i3 from "@/assets/i3.jpg";
import i4 from "@/assets/i4.png";
import i5 from "@/assets/i5.png";
import i6 from "@/assets/i6.jpg";
import i7 from "@/assets/i7.jpg";
import i8 from "@/assets/i8.jpg";
import i9 from "@/assets/i9.png";

export default {
  components: {
    NavBar,
    FooterView,
  },
  setup() {
    const slider2 = ref(0);
    const weeks = [
      "Sunday: 8:00 AM - 9:00 AM",
      "Monday: 8:00 AM - 9:00 AM",
      "Tuesday: 8:00 AM - 9:00 AM",
      "Wednesday: 8:00 AM - 9:00 AM",
      "Thursday: 8:00 AM - 9:00 AM",
      "Friday: 8:00 AM - 9:00 AM",
      "Saturday: 8:00 AM - 9:00 AM",
    ];

    return {
      i1,
      i2,
      i3,
      i4,
      i5,
      i6,
      i7,
      i8,
      i9,
      slider2,
      weeks,
    };
  },
};
</script>

<style scoped>
.head {
  background-color: #000;
  padding: 100px 0;
}

.head h1 {
  font-size: 48px;
  font-weight: 700;
}

.head .text-grey {
  color: #777;
}

.head .text-white {
  color: #fff;
}

.head .text-yellow {
  color: #FBDF7E;
}

.image-container {
  text-align: center;
}

.circular-image {
  border-radius: 50%;
}

.egg {
  text-align: center;
}

.padd {
  padding: 30px;
}

.imgHover .on-hover {
  transform: scale(1.05);
  transition: 0.3s;
}

.fill-height {
  height: 100%;
}

.pt-8 {
  padding-top: 8px;
}

.mt-16 {
  margin-top: 16px;
}

.mt-8 {
  margin-top: 8px;
}

.mt-4 {
  margin-top: 4px;
}

.text-center {
  text-align: center;
}
</style>
