<template>
  <div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
      <h3>Dashboard</h3>
      <v-btn color="warning">
        View Orders
      </v-btn>
    </v-subheader>
    <br />
    <v-row>
      <v-col lg="7" cols="12">
        <v-alert dense text type="success">
          Login Successfully! Welcome to <strong>Mister Auto Backoffice</strong>
        </v-alert>
        <v-row>
          <v-col
            lg="6"
            cols="12"
            v-for="(item, index) in activityLog"
            :key="index"
          >
            <v-card elevation="2" class="rounded-lg">
              <v-card-text class="d-flex justify-space-between align-center">
                <div>
                  <strong>{{ item.title }}</strong> <br />
                  <span>Last 3 weeks</span>
                </div>
                <v-avatar
                  size="60"
                  :color="item.color"
                  style="border: 3px solid #444"
                >
                  <span style="color: white">{{ item.amount }} +</span>
                </v-avatar>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between">
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="5">
        <v-card>
          <v-card-title>Activities</v-card-title>
          <v-card-text class="py-0">
            <v-timeline align-top dense>
              <v-timeline-item color="indigo" small>
                <strong>5 Minuts ago</strong>
                <div class="text-caption">
                  You have new order please check this out
                </div>
              </v-timeline-item>
              <v-timeline-item color="green" small>
                <strong>35 Minuts ago</strong>
                <div class="text-caption mb-2">
                  A Product has delivered!
                </div>
              </v-timeline-item>

              <v-timeline-item color="indigo" small>
                <strong>44 Minuts ago</strong>
                <div class="text-caption">
                  You have new order please check this out
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Recent orders list</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn color="warning" dark class="mb-2">
                  New Order
                </v-btn>
              </v-toolbar>
            </template>
            <!-- eslint-disable-next-line -->
            <template v-slot:item.action="">
              <v-btn color="warning" outlined small shaped>View</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      activityLog: [
        {
          title: "Total Products",
          amount: 50,
          icon: "mdi-account",
          color: "cyan lighten-3",
        },
        {
          title: "Total Customer",
          amount: 3433,
          icon: "mdi-account-group-outline",
          color: "green darken-2",
        },
        {
          title: "Total Sale",
          amount: 3433,
          icon: "mdi-account-group-outline",
          color: "blue-grey darken-1",
        },
        {
          title: "Pending Orders",
          amount: 3433,
          icon: "mdi-account-group-outline",
          color: "deep-orange darken-1",
        },
      ],
      headers: [
        {
          text: "Réf",
          align: "start",
          sortable: false,
          value: "ref",
        },
        { text: "Label", value: "label" },
        { text: "Brand", value: "brand" },
        { text: "Capacity [litres]", value: "capacity" },
        { text: "Viscosity", value: "viscosity" },
        { text: "Price [€]", value: "price" },
        { text: "Actions", value: "action" },
      ],
      desserts: [
        {
          ref: "BOL-E011022",
          label: "Huile moteur BOLK 5W40 C3",
          brand: "TotalEnergies",
          price: 13.47,
          capacity: 5,
          viscosity: "5W40",
        },
        {
          ref: "BOL-D091010",
          label: "Huile moteur BOLK 0w30 PSA C2",
          brand: "ELF",
          price: 2.9,
          capacity: 1,
          viscosity: "5W47",
        },
        {
          ref: "BOL-D068910",
          label: "Huile moteur BOLK 5W30 C4",
          brand: "SHELL",
          price: 4.58,
          capacity: 2,
          viscosity: "5W69",
        },
        {
          ref: "BOL-D091013",
          label: "Huile moteur BOLK 5W30 C3",
          brand: "BOLK",
          price: 14.0,
          capacity: 5,
          viscosity: "5W90",
        },
        {
          ref: " BOL-D031015",
          label: "Huile moteur BOLK 10w40",
          brand: "TotalEnergies",
          price: 14.5,
          capacity: 5,
          viscosity: "5W40",
        },
        {
          ref: "550053738",
          label: "Huile moteur HELIX HX7 10W40",
          brand: "TotalEnergies",
          price: 5.5,
          capacity: 2,
          viscosity: "5W40",
        },
        {
          ref: "213683",
          label: "Huile moteur Quartz Ineo ECS 5W-30 C2",
          brand: "SHELL",
          price: 33.9,
          capacity: 5,
          viscosity: "5W30",
        },
        {
          ref: "216186",
          label: "Huile moteur Quartz Ineo FDE 0W-30",
          brand: "BOLK",
          price: 9.8,
          capacity: 1,
          viscosity: "0w30",
        },
        {
          ref: "550052838",
          label: "Huile moteur HELIX ULTRA 5w40",
          brand: "SHELL",
          price: 46.9,
          capacity: 5,
          viscosity: "5W40",
        },
        {
          ref: "213932",
          label: "Huile moteur Evolution FULLTECH MSX 5W-30",
          brand: "TotalEnergies",
          price: 42.5,
          capacity: 5,
          viscosity: "5W40",
        },
      ],
    };
  },
  methods: {
    onButtonClick(item) {
      console.log("click on " + item.no);
    },
  },
};
</script>

<style scoped>
.overlap-icon {
  position: absolute;
  top: -33px;
  text-align: center;
  padding-top: 12px;
}
</style>
