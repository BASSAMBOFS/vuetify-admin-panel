<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn x-small color="primary" v-bind="attrs" v-on="on">
        <v-icon left>mdi-crosshairs</v-icon>
        Open Products List
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dense dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Product List</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="onSave()">
            Save
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="filteredproducts"
        show-select
        item-key="name"
      >
        <template v-slot:header="">
          <tr class="grey lighten-3">
            <th>
              <v-icon>mdi-filter-variant</v-icon>
            </th>
            <th v-for="header in headers" :key="header.text">
              <div v-if="filters.hasOwnProperty(header.value)">
                <v-autocomplete
                  flat
                  hide-details
                  multiple
                  attach
                  chips
                  dense
                  clearable
                  :items="columnValueList(header.value)"
                  v-model="filters[header.value]"
                >
                  <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index < 5">
                      <span>
                        {{ item }}
                      </span>
                    </v-chip>
                    <span v-if="index === 5" class="grey--text caption">
                      (+{{ filters[header.value].length - 5 }} others)
                    </span>
                  </template>
                </v-autocomplete>
              </div>
            </th>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ProductListingFilter",
  data: () => ({
    dialog: false,
    selected: [],
    headers: [
      {
        text: "Name",
        align: "left",
        value: "name",
      },
      { text: "Réf", value: "ref" },
      { text: "Familles", value: "familles" },
      { text: "Générique", value: "generique" },
      { text: "Marque", value: "marque" },
    ],
    filters: {
      name: [],
      ref: [],
      familles: [],
      generique: [],
      marque: [],
    },
    products: [
      {
        value: false,
        name: "Jeu de 4 plaquettes de frein à disque",
        ref: "BOL-I010361",
        familles: "Famille A",
        generique: "Generique A",
        marque: "Marque A",
      },
      {
        value: false,
        name: "Liquide de frein DOT 4 - 1 Litre",
        ref: "BOL-I010361",
        familles: "Famille B",
        generique: "Generique B",
        marque: "Marque B",
      },
      {
        value: false,
        name: "Kit hiver 5 pièces",
        ref: "BOL-I010361",
        familles: "Famille C",
        generique: "Generique C",
        marque: "Marque C",
      },
      {
        value: false,
        name: "Balai d'essuie-glace",
        ref: "BOL-I010361",
        familles: "Famille D",
        generique: "Generique D",
        marque: "Marque D",
      },
      {
        value: false,
        name: "Kit d'embrayage plus volant moteur",
        ref: "BOL-I010361",
        familles: "Famille E",
        generique: "Generique E",
        marque: "Marque E",
      },
      {
        value: false,
        name: "Disque de frein",
        ref: "BOL-I010361",
        familles: "Famille A",
        generique: "Generique A",
        marque: "Marque A",
      },
      {
        value: false,
        name: "Triangle de suspension",
        ref: "BOL-I010361",
        familles: "Famille B",
        generique: "Generique B",
        marque: "Marque B",
      },
      {
        value: false,
        name: "Vérin de coffre",
        ref: "BOL-I010361",
        familles: "Famille B",
        generique: "Generique B",
        marque: "Marque B",
      },
      {
        value: false,
        name: "Huile moteur",
        ref: "BOL-I010361",
        familles: "Famille C",
        generique: "Generique C",
        marque: "Marque C",
      },
      {
        value: false,
        name: "Kit de distribution",
        ref: "BOL-I010361",
        familles: "Famille D",
        generique: "Generique D",
        marque: "Marque D",
      },
    ],
  }),
  computed: {
    filteredproducts() {
      return this.products.filter((d) => {
        return Object.keys(this.filters).every((f) => {
          return this.filters[f].length < 1 || this.filters[f].includes(d[f]);
        });
      });
    },
  },

  methods: {
    columnValueList(val) {
      return this.products.map((d) => d[val]);
    },
    onSave() {
      this.$emit("onSave", this.selected);

      this.dialog = false;
    },
  },
};
</script>
