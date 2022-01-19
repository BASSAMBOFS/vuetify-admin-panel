<template>
  <div class="programation">
    <v-subheader class="py-0 pl-0 d-flex justify-space-between rounded-lg">
      <h3>Paramètres Géneral</h3>
    </v-subheader>
    <v-card>
      <v-system-bar window height="20" color="blue-grey lighten-4">
      </v-system-bar>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                outlined
                dense
                clearable
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
                :items="devicesList"
                item-text="name"
                @change="deviceSelected"
                multiple
                chips
                label="Devices"
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
    <v-subheader class="py-0 pl-0 d-flex justify-space-between rounded-lg">
      <h3>Conditions</h3>
      <v-btn small color="primary" @click="addCondition(conditions.length)">
        <v-icon left>mdi-plus</v-icon>
        Ajouter Une Condition
      </v-btn>
    </v-subheader>

    <template v-for="(condition, conditionIndex) in conditions">
      <v-card v-bind:key="condition.id" class="mt-4">
        <v-system-bar window height="30'" color="blue-grey lighten-4">
          <h4>Condition N°{{ condition.id }}</h4>
          <v-spacer></v-spacer>
          <v-btn
            v-show="condition.id != 1"
            icon
            color="red"
            @click="deleteCondition(conditionIndex)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-system-bar>
        <v-divider></v-divider>
        <v-container>
          <v-form>
            <v-row>
              <v-col cols="12" md="12">
                <v-select
                  clearable
                  outlined
                  dense
                  :items="clientTypes"
                  v-model="condition.clientType"
                  label="Client's Type"
                  prepend-icon="mdi-account-tie"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  outlined
                  dense
                  v-model="condition.minimumThreshold"
                  type="number"
                  label="Seuil minimum"
                  prepend-icon="mdi-cart"
                  append-icon="mdi-currency-eur"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  clearable
                  outlined
                  dense
                  v-model="condition.offreType"
                  :items="offreTypes"
                  label="Type D'offre"
                  prepend-icon="mdi-format-list-bulleted-type"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-subheader
                  class="py-0 pl-0 pr-0 d-flex justify-space-between rounded-lg"
                >
                  <h4>Products Included</h4>
                  <ProductListingFilter
                    @onSave="onProductsInSelected($event, conditionIndex)"
                  ></ProductListingFilter>
                </v-subheader>
                <v-card>
                  <v-system-bar
                    height="8"
                    color="blue-grey lighten-4"
                  ></v-system-bar>
                  <v-col class="pb-0">
                    <h5 v-if="condition.productsIn == ''" style="color: orange">
                      No Product Selected
                    </h5>
                  </v-col>

                  <div
                    v-for="product in condition.productsIn"
                    :key="product"
                    class="justify-start d-inline-flex"
                  >
                    <v-chip class="ma-2">
                      {{ product.name }}
                    </v-chip>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-subheader
                  class="py-0 pl-0 pr-0 d-flex justify-space-between rounded-lg"
                >
                  <h4>Products Excluded</h4>
                  <ProductListingFilter
                    @onSave="onProductsOutSelected($event, conditionIndex)"
                  ></ProductListingFilter>
                </v-subheader>
                <v-card>
                  <v-system-bar
                    height="8"
                    color="blue-grey lighten-4"
                  ></v-system-bar>
                  <v-col class="pb-0">
                    <h5
                      v-if="condition.productsOut == ''"
                      style="color: orange"
                    >
                      No Product Selected
                    </h5>
                  </v-col>
                  <div
                    v-for="product in condition.productsOut"
                    :key="product"
                    class="justify-start d-inline-flex"
                  >
                    <v-chip class="ma-2">
                      {{ product.name }}
                    </v-chip>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-form>

          <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
            <h3></h3>
            <v-btn
              small
              text
              color="primary"
              @click="addEffect(conditionIndex, condition.effects.length)"
            >
              <v-icon>mdi-plus</v-icon>
              Ajouter Un Effet
            </v-btn>
          </v-subheader>
          <template>
            <v-expansion-panels
              v-bind:key="effect.id"
              v-for="(effect, effectIndex) in condition.effects"
            >
              <v-expansion-panel class="mt-2">
                <v-system-bar window height="27" color="blue-grey lighten-4">
                  <v-expansion-panel-header class="pl-1">
                    <h4>Effect - {{ effect.effectId }}</h4>
                  </v-expansion-panel-header>
                </v-system-bar>

                <v-expansion-panel-content>
                  <v-subheader class="py-0 d-flex">
                    <h3>Panier :</h3>
                  </v-subheader>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="effect.basketPercentage"
                        label="Percentage %"
                        type="number"
                        prepend-icon="mdi-ticket-percent"
                        append-icon="mdi-percent-outline"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        outlined
                        dense
                        v-model="effect.basketFixedAmount"
                        type="number"
                        label="Fixed amount"
                        prepend-icon="mdi-cash-multiple"
                        append-icon="mdi-currency-eur"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-divider></v-divider>
                  <v-divider></v-divider>
                  <v-subheader class="py-0 d-flex">
                    <h3>Livraison :</h3>
                  </v-subheader>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-radio-group
                        prepend-icon="mdi-truck-delivery"
                        v-model="effect.freeDelivery"
                        row
                      >
                        <template v-slot:label>
                          <h4>Free ?</h4>
                        </template>

                        <v-radio value="true">
                          <template v-slot:label>
                            <h4>Oui</h4>
                          </template>
                        </v-radio>
                        <v-radio value="false">
                          <template v-slot:label>
                            <h4>Non</h4>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                  <v-row v-show="effect.freeDelivery == 'false'">
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="effect.deliveryPercentage"
                        label="Percentage %"
                        type="number"
                        prepend-icon="mdi-ticket-percent"
                        append-icon="mdi-percent-outline"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        outlined
                        dense
                        type="number"
                        v-model="effect.deliveryFixedAmount"
                        label="Fixed amount"
                        prepend-icon="mdi-cash-multiple"
                        append-icon="mdi-currency-eur"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-divider></v-divider>
                  <v-divider></v-divider>
                  <v-subheader class="py-0 d-flex">
                    <h3>Produits :</h3>
                  </v-subheader>

                  <v-row>
                    <v-col cols="12" md="6">
                      <v-radio-group
                        prepend-icon="mdi-gift"
                        v-model="effect.freeProduct"
                        row
                      >
                        <template v-slot:label>
                          <h4>Free ?</h4>
                        </template>

                        <v-radio value="true">
                          <template v-slot:label>
                            <h4>Oui</h4>
                          </template>
                        </v-radio>
                        <v-radio value="false">
                          <template v-slot:label>
                            <h4>Non</h4>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                  <template v-if="effect.freeProduct == 'true'">
                    <v-subheader
                      class="py-0 d-flex justify-space-between rounded-lg"
                    >
                      <h3></h3>
                      <v-btn small color="primary">
                        <v-icon>mdi-plus</v-icon>
                        Add Product
                      </v-btn>
                    </v-subheader>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-select
                          outlined
                          dense
                          v-model="effect.selectedFreeProduct"
                          :items="products"
                          label="Select a product"
                          prepend-icon="mdi-selection-search"
                          clearable
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          outlined
                          dense
                          type="number"
                          v-model="effect.freeProductQuantity"
                          label="Quantity"
                          prepend-icon="mdi-archive-plus"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </template>
                  <v-card>
                    <v-system-bar
                      height="8"
                      color="blue-grey lighten-4"
                    ></v-system-bar>
                    <v-col md="4">
                      <h5 v-if="condition.productsIn == ''">
                        % You Need To Select an Included Product To Apply
                        Discounts %
                      </h5>
                      <h5 v-else>
                        Apply Dicount(s)
                      </h5>
                    </v-col>
                    <v-container
                      v-for="product in condition.productsIn"
                      :key="product"
                    >
                      <v-col md="4" class="pt-0">
                        <h5>
                          {{ product.name }} - {{ product.ref }} -
                          {{ product.familles }}
                        </h5>
                      </v-col>
                      <v-row>
                        <v-col cols="12" sm="6" class="pt-1 mt-O pb-0 mb-O">
                          <v-text-field
                            class="pt-0 mt-O pb-0 mb-O"
                            label="Percentage %"
                            type="number"
                            prepend-icon="mdi-ticket-percent"
                            append-icon="mdi-percent-outline"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" class="pt-0 mt-O pb-0 mb-O">
                          <v-text-field
                            class="pt-0 mt-O pb-0 mb-O"
                            outlined
                            dense
                            type="number"
                            label="Fixed amount"
                            prepend-icon="mdi-cash-multiple"
                            append-icon="mdi-currency-eur"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>

                  <v-row>
                    <v-col cols="12" md="6">
                      <v-radio-group
                        prepend-icon="mdi-gift"
                        v-model="effect.freeGAT"
                        row
                      >
                        <template v-slot:label>
                          <h4>Free GAT(Garantie Achat Tranquil) ?</h4>
                        </template>

                        <v-radio value="true">
                          <template v-slot:label>
                            <h4>Oui</h4>
                          </template>
                        </v-radio>
                        <v-radio value="false">
                          <template v-slot:label>
                            <h4>Non</h4>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      small
                      v-show="effect.effectId != 1"
                      text
                      color="red lighten-1"
                      @click="deleteEffect(conditionIndex, effectIndex)"
                    >
                      <v-icon>mdi-delete</v-icon>
                      Delete
                    </v-btn>
                  </v-card-actions>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </template>
        </v-container>
      </v-card>
    </template>

    <br />
    <v-subheader class="py-0 pl-0 d-flex justify-space-between rounded-lg">
      <h3>Visuels</h3>
    </v-subheader>

    <v-card>
      <v-system-bar window height="20" color="blue-grey lighten-4">
      </v-system-bar>
      <v-col md="4" class="pb-0">
        <h5 v-if="selectedDevices == ''">
          You Need To Select a Device
        </h5>
      </v-col>
      <v-form>
        <v-container
          v-for="(selectedDevice, index) in selectedDevices"
          :key="selectedDevice"
        >
          <v-col md="4">
            <h5>{{ selectedDevice.name }} :</h5>
          </v-col>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                outlined
                :items="pages"
                label="Display pages"
                multiple
                chips
                dense
                prepend-icon="mdi-text-box-search"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-file-input
                label="Visuel Picture"
                prepend-icon="mdi-image-search"
                @change="selectImage($event, index)"
                chips
                show-size
                outlined
                dense
              ></v-file-input>
            </v-col>
          </v-row>

          <div v-if="selectedDevice.image">
            <v-card>
              <div>
                <v-img class="my-3" :src="selectedDevice.image" />
              </div>
            </v-card>
          </div>
        </v-container>
      </v-form>
    </v-card>

    <br />
    <v-subheader class="py-0 pl-0 d-flex justify-space-between rounded-lg">
      <h3>Languettes</h3>
    </v-subheader>

    <v-card>
      <v-system-bar window height="20" color="blue-grey lighten-4">
      </v-system-bar>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                outlined
                dense
                v-model="languette"
                label="Enter your Languette"
                prepend-icon="mdi-label"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import ProductListingFilter from "./shared/ProductListingFilter.vue";
export default {
  name: "ProgramationPromotool",
  components: { ProductListingFilter },
  data: () => ({
    country: ["Maroc", "France", "Espagne", "Brazil", "Italie", "Portugal"],
    devicesList: ["App", "Mobile", "Desktop"],
    pages: [
      "Homepage",
      "Fiche article",
      "Panier",
      "Livraison",
      "Listing",
      "Page pneus",
      "Page chaines",
    ],
    date: "",
    menu: false,
    promoCode: "true",
    selectedDevices: [],
    previewImage: null,
    languette: "",
    conditions: [
      {
        id: 1,
        productsIn: "",
        productsOut: "",
        clientType: "",
        operation: "",
        totalPanier: "",
        offreType: "",
        minimumThreshold: "",
        effects: [
          {
            effectId: 1,
            basketPercentage: "",
            basketFixedAmount: "",
            deliveryPercentage: "",
            deliveryFixedAmount: "",
            freeDelivery: "false",
            freeProduct: "false",
            freeProductList: [],
            freeGAT: "true",
          },
        ],
      },
    ],
    products: ["Valeo", "Pneu", "Chaines à neige", "Huile Moteur"],
    clientTypes: ["Pro", "Particulier"],
    offreTypes: ["Prio", "Meilleur prix"],
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
            freeDelivery: "false",
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
    deviceSelected(devices) {
      this.selectedDevices = [];
      devices.forEach((device) => {
        this.selectedDevices.push({
          name: device,
          image: null,
        });
      });
    },
    selectImage(e, index) {
      console.log("event", e);
      console.log("selectedDevice: ", this.selectedDevices[index].name);

      this.selectedDevices[index].image = e ? URL.createObjectURL(e) : null;
    },
    onProductsInSelected(productsIn, conditionIndex) {
      this.conditions[conditionIndex].productsIn = productsIn;
    },
    onProductsOutSelected(productsOut, conditionIndex) {
      this.conditions[conditionIndex].productsOut = productsOut;
    },
  },
};
</script>

<style scoped>
.expansionpanelheader {
  flex: unset !important;
}
</style>
