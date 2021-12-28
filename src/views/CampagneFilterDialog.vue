<template>
  <v-dialog v-model="dialog" scrollable max-width="300px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn flat icon color="primary" v-bind="attrs" v-on="on">
        <v-icon>mdi-filter-variant</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Campagnes Filter</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px;">
        <v-form ref="form">
          <v-text-field v-model="country" label="Country"></v-text-field>

          <v-select v-model="device" :items="devices" label="Device"></v-select>

          <v-select
            v-model="userType"
            :items="usersTypes"
            label="User Type"
          ></v-select>

          <v-select v-model="status" :items="status" label="Statut"></v-select>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Search
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CompagneFilerDialog",
  data() {
    return {
      dialogm1: "",
      dialog: false,
      usersTypes: ["Pro", "Particulier"],
      status: ["En Cours", "A Venir"],
      devices: ["All", "Mobile"],
    };
  },
};
</script>
