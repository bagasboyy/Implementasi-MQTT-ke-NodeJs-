<template>
  <v-container>
    <v-layout  class="rounded rounded-md">
      <v-app-bar density="compact">
          <v-app-bar-title class="d-flex justify-center align-center h-100"
            >Monitoring Suhu dan Kelembaban</v-app-bar-title
          >
        </v-app-bar>

      <v-main class="d-flex align-center justify-center" style="min-height: 800px;">
        <v-card-item class="d-flex justify-center" align="center">
          <v-row dense justify="center">
            <v-col sm="5" md="6">
              <v-card width="300" height="400">
                <v-img
                  src="https://i.pinimg.com/564x/1b/92/93/1b92933ca1e59669c70336342dab2f0d.jpg"
                  height="300px"
                ></v-img>

                <v-card-title> SUHU </v-card-title>

                <v-card-text class="py-0">
                  <v-row align="center" no-gutters>
                    <v-col class="text-h5"> {{ suhu }}&deg;C </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col sm="5" md="6">
              <v-card width="300" height="400">
                <v-img
                  src="https://cdn.icon-icons.com/icons2/527/PNG/512/Humidity_icon-icons.com_52507.png"
                  height="300px"
                ></v-img>

                <v-card-title> KELEMBABAN </v-card-title>

                <v-card-text class="py-0">
                  <v-row align="center" no-gutters>
                    <v-col class="text-h5"> {{ kelembaban }}% </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-item>
      </v-main>

      <v-footer app name="footer">
          <v-col class="d-flex justify-center"> CopyRight@2023 </v-col>
        </v-footer>
    </v-layout>
  </v-container>
</template>

<script>
// import SocketioService from "./services/socketio.service.js";
import { io } from "socket.io-client";

export default {
  name: "App",
  components: {},
  data() {
    return {
      io: null,
      suhu: "",
      kelembaban: "",
    };
  },
  mounted() {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
    this.socket.on("test", (msg) => {
      console.log(msg); // world
      this.suhu = msg.split(" ")[0];
      this.kelembaban = msg.split(" ")[2];
    });

    // setInterval(() => {
    //   this.suhu=Math.floor((Math.random() * 50) + 1);
    //   this.kelembaban=Math.floor((Math.random() * 100) + 1);
    // }, 3000);
  },
};
</script>

<style>
#app {
  background: url('https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wtd8?ver=2d1f')
    no-repeat center center fixed !important;
  background-size: cover;
}
</style>
