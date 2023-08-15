<template>
  <v-card class="mx-auto" max-width="448">
    <v-layout>
      <v-app-bar color="#f3f3f3" density="compact">
        <!-- <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template> -->

        <v-app-bar-title class="d-flex justify-center align-center h-100"
          >Monitoring Suhu dan Kelembaban</v-app-bar-title
        >

        <!-- <template v-slot:append>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template> -->
      </v-app-bar>

      <v-main>
        <v-container align="center">
          <v-row dense>
            <v-card width="200" height="300">
              <v-img
                src="https://i.pinimg.com/564x/1b/92/93/1b92933ca1e59669c70336342dab2f0d.jpg"
                height="200px"
                cover
              ></v-img>

              <v-card-title> SUHU </v-card-title>

              <v-card-text class="py-0">
                <v-row align="center" no-gutters>
                  <v-col class="text-h5" data="io"> {{io}}&deg;C </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-spacer></v-spacer>

            <v-card width="200" height="300">
              <v-img
                src="https://cdn.icon-icons.com/icons2/527/PNG/512/Humidity_icon-icons.com_52507.png"
                height="200px"
                cover
              ></v-img>

              <v-card-title> KELEMBABAN </v-card-title>

              <v-card-text class="py-0">
                <v-row align="center" no-gutters>
                  <v-col class="text-h5"> 70% </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import SocketioService from "./services/socketio.service.js";
import { io } from 'socket.io-client';

export default {
  name: "App",
  components: {},
  data() {
    return {
      io:null,
    };
  },
  mounted() {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
    this.socket.on("test", (arg) => {
      alert ("hello");
      console.log(arg); // world
    });
  },
  beforeUnmount() {
    SocketioService.disconnect();
  },
};
</script>

<style></style>
