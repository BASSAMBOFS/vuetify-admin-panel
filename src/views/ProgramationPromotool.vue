<template>
  <div class="programation">
    <v-card>
      <v-card-title>
        <h5>Paramètres Géneral</h5>
      </v-card-title>
      <v-divider></v-divider>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                outlined
                dense
                :items="country"
                label="Country"
                prepend-icon="mdi-map-marker"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Start Date - End Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    dense
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable range>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                    Select
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-select
                outlined
                dense
                :items="devices"
                label="Device"
                prepend-icon="mdi-cellphone-link"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-radio-group
                prepend-icon="mdi-brightness-percent"
                v-model="promoCode"
                row
              >
                <template v-slot:label>
                  <h3>Promotion :</h3>
                </template>

                <v-radio value="true">
                  <template v-slot:label>
                    <h4>Avec Code</h4>
                  </template>
                </v-radio>
                <v-radio value="false">
                  <template v-slot:label>
                    <h4>Sans Code</h4>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-show="promoCode == 'true'"
                label="Code Promo"
                prepend-icon="mdi-ticket-percent"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    <br />
    <template v-for="(condition, conditionIndex) in conditions">
      <v-card v-bind:key="condition.id" class="mt-4">
        <v-card-title>
          <h5>Condition {{ condition.id }}</h5>
          <v-spacer></v-spacer>
          <v-btn
            v-show="condition.id != 1"
            icon
            color="red lighten-1"
            @click="deleteCondition(conditionIndex)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn icon color="primary" @click="addCondition(conditions.length)">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container>
          <v-form>
            <v-row>
              <v-col cols="12" md="4">
                <v-select
                  outlined
                  dense
                  :items="clientTypes"
                  v-model="condition.clientType"
                  label="Client's Type"
                  prepend-icon="mdi-account-tie"
                ></v-select>
              </v-col>
              <v-col cols="12" md="8">
                <v-select
                  outlined
                  dense
                  :items="products"
                  v-model="condition.product"
                  label="Procudts"
                  prepend-icon="mdi-view-list"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-select
                  outlined
                  dense
                  :items="operations"
                  label="Basket is"
                  prepend-icon="mdi-cart-arrow-down"
                ></v-select>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field
                  outlined
                  dense
                  label="Total Panier"
                  prepend-icon="mdi-cart-minus"
                  append-icon="mdi-currency-eur"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>

          <template>
            <v-expansion-panels
              v-bind:key="effect.id"
              v-for="(effect, effectIndex) in condition.effects"
            >
              <v-expansion-panel class="mt-2">
                <v-expansion-panel-header>
                  <h4>Effect</h4>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      v-show="effect.effectId != 1"
                      text
                      color="red lighten-1"
                      @click="deleteEffect(conditionIndex, effectIndex)"
                    >
                      Delete
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="addEffect(conditionIndex, effect.length)"
                    >
                      Add Effect
                    </v-btn>
                  </v-card-actions>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </template>
        </v-container>
      </v-card>
    </template>
  </div>
</template>

<script>
export default {
  name: "ProgramationPromotool",
  components: {},
  data: () => ({
    country: ["Maroc", "France", "Espagne", "Brazil", "Italie", "Portugal"],
    devices: ["All", "Mobile", "Desktop"],
    date: "",
    menu: false,
    promoCode: "true",
    conditions: [
      {
        id: 1,
        product: "",
        clientType: "",
        operation: "",
        totalPanier: "",
        effects: [
          {
            effectId: 1,
          },
        ],
      },
    ],
    products: ["Valeo", "Pneu", "Chaines à neige", "Huile Moteur"],
    clientTypes: ["Pro", "Particulier"],
    operations: [
      "Greater than '>'",
      "Greater than or equal to '≥'",
      "Less than '<'",
      "Less than or equal to '≤'",
      "Equal to '='",
    ],
  }),
  methods: {
    addCondition(length) {
      this.conditions.push({
        id: length + 1,
        product: "",
        clientType: "",
        operation: "",
        totalPanier: "",
        effects: [
          {
            effectId: 1,
          },
        ],
      });
    },
    deleteCondition(conditionIndex) {
      this.conditions.splice(conditionIndex, 1);
    },
    addEffect(conditionIndex, effectLength) {
      this.conditions[conditionIndex].effects.push({
        effectId: effectLength + 1,
      });
    },
    deleteEffect(conditionIndex, effectIndex) {
      this.conditions[conditionIndex].effects.splice(effectIndex, 1);
    },
  },
};
</script>

<style scoped>
.expansionpanelheader {
  flex: unset !important;
}
</style>
