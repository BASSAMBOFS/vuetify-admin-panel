<template>
  <div class="promotool">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
      <h3>Campagnes</h3>
      <v-btn color="primary">
        Export Opérations
      </v-btn>
    </v-subheader>
    <br />
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          style="padding-top: unset;"
        ></v-text-field>
        <!-- <v-btn flat icon color="primary">
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn> -->
        <CompagneFilerDialog></CompagneFilerDialog>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="campagnes"
        :search="search"
        items-per-page="5"
      >
        <!-- eslint-disable-next-line -->
        <template v-slot:item.active="{ item }">
          <v-icon :color="getColor(item.active)" dark>
            mdi-circle-medium
          </v-icon>
        </template>
        <!-- eslint-disable-next-line -->
        <template v-slot:item.action="">
          <v-btn color="primary" outlined small shaped>Edit</v-btn>
        </template>
        <!-- eslint-disable-next-line -->
        <template v-slot:item.startDate="{ item }">
          <b>{{ item.startDate }}</b>
        </template>
        <!-- eslint-disable-next-line -->
        <template v-slot:item.endDate="{ item }">
          <b>{{ item.endDate }}</b>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import CompagneFilerDialog from "./CampagneFilterDialog.vue";
export default {
  name: "CampagnePromotool",
  components: { CompagneFilerDialog },
  data() {
    return {
      search: "",
      headers: [
        { text: "Active", value: "active" },
        { text: "Libellé", value: "libelle" },
        { text: "Statut", value: "statut" },
        { text: "Country", value: "country" },
        { text: "Code", value: "code" },
        { text: "Starting Date", value: "startDate" },
        { text: "Ending Date", value: "endDate" },
        { text: "Device", value: "device" },
        { text: "Actions", value: "action", sortable: false },
      ],
      campagnes: [
        {
          active: "Yes",
          libelle: "SUPER Code",
          statut: "En cours",
          country: "France",
          code: "SUPER",
          startDate: "08-09-2021",
          endDate: "08-09-2022",
          device: "All",
        },
        {
          active: "No",
          libelle: "Code Brasil",
          statut: "En cours",
          country: "Brasil",
          code: "SECOM10",
          startDate: "11-07-2021",
          endDate: "08-09-2021",
          device: "Mobile",
        },
        {
          active: "Yes",
          libelle: "Code Maroc",
          statut: "A venir",
          country: "Maroc",
          code: "---",
          startDate: "01-01-2022",
          endDate: "30-07-2022",
          device: "All",
        },
        {
          active: "No",
          libelle: "Holla Code",
          statut: "En cours",
          country: "Spain",
          code: "FESTA",
          startDate: "03-03-2022",
          endDate: "11-07-2022",
          device: "All",
        },
        {
          active: "Yes",
          libelle: "GERLO30 Code",
          statut: "A venir",
          country: "Portugal",
          code: "---",
          startDate: "03-02-2022",
          endDate: "30-10-2022",
          device: "Mobile",
        },
        {
          active: "No",
          libelle: "J'adore code",
          statut: "A venir",
          country: "France",
          code: "JADORE",
          startDate: "08-12-2021",
          endDate: "20-04-2022",
          device: "All",
        },
        {
          active: "Yes",
          libelle: "Belgique Code",
          statut: "En cours",
          country: "Belgique",
          code: "---",
          startDate: "03-01-2022",
          endDate: "10-07-2022",
          device: "Mobile",
        },
        {
          active: "No",
          libelle: "Code France",
          statut: "A venir",
          country: "France",
          code: "HAPPY",
          startDate: "04-04-2021",
          endDate: "30-12-2022",
          device: "All",
        },
        {
          active: "Yes",
          libelle: "Dima Rabeh",
          statut: "En cours",
          country: "Maroc",
          code: "ARA-BERE3",
          startDate: "01-08-2022",
          endDate: "30-07-2022",
          device: "All",
        },
        {
          active: "No",
          libelle: "FESTA",
          statut: "A venir",
          country: "Spain",
          code: "---",
          startDate: "03-03-2022",
          endDate: "11-07-2022",
          device: "All",
        },
      ],
    };
  },
  methods: {
    getColor(active) {
      if (active == "Yes") return "green";
      else return "red";
    },
  },
};
</script>
