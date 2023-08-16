<template>
  <v-card>
    <v-layout>
      <v-theme-provider theme="dark">
        <!-- uses the high-contrast theme -->
        <v-app-bar density="compact">
          <!-- <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-ico
        </template> -->

          <v-app-bar-title class="d-flex justify-center align-center h-100"
            >Monitoring Suhu dan Kelembaban</v-app-bar-title
          >

          <!-- <template v-slot:append>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template> -->
        </v-app-bar>
      </v-theme-provider>

      <v-main>
        <v-card-item
          class="d-flex justify-center mb-6 bg-surface-variant"
          align="center"
        >
          <v-row dense justify="center">
            <v-col sm="5" md="6">
              <v-card width="200" height="300">
                <v-img
                  src="https://i.pinimg.com/564x/1b/92/93/1b92933ca1e59669c70336342dab2f0d.jpg"
                  height="200px"
                  cover
                ></v-img>

                <v-card-title> SUHU </v-card-title>

                <v-card-text class="py-0">
                  <v-row align="center" no-gutters>
                    <v-col class="text-h5"> {{ suhu }}&deg;C </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <!-- <v-spacer></v-spacer> -->

            <v-col sm="5" md="6">
              <v-card width="200" height="300">
                <v-img
                  src="https://cdn.icon-icons.com/icons2/527/PNG/512/Humidity_icon-icons.com_52507.png"
                  height="200px"
                  cover
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
        <v-table density="compact">
          <thead>
            <tr>
              <th class="text-left">Kota</th>
              <th class="text-left">Suhu</th>
              <th class="text-left">Kelembaban</th>
              <th class="text-left">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ name }}</td>
              <td>{{ suhu }}&deg;C</td>
              <td>{{ kelembaban }}%</td>
              <td>{{ date }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-main>

      <v-theme-provider theme="dark">
        <!-- uses the high-contrast theme -->
        <v-footer app name="footer">
          <v-btn class="mx-auto" variant="text" @click="print('footer')">
            CopyRight@2023
          </v-btn>
        </v-footer>
      </v-theme-provider>
    </v-layout>
  </v-card>
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
      date: "",
      name: "",
    };
  },
  mounted() {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
    this.socket.on("test", (msg) => {
      console.log(msg); // world
      this.suhu = msg.split(" ")[0];
      this.kelembaban = msg.split(" ")[2];
    });
    // this.suhu=this.io.split("")
    // setInterval(() => {
    //   this.suhu=Math.floor((Math.random() * 50) + 1);
    //   this.kelembaban=Math.floor((Math.random() * 100) + 1);
    // }, 3000);
  },
  // beforeUnmount() {
  //   SocketioService.disconnect();
  // },
};
</script>

<style></style>
