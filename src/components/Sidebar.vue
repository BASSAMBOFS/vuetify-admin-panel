<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-img height="140" class="pa-4" src="../assets/backoffice.png" />
    <v-divider></v-divider>
    <v-list>
      <v-list-group no-action v-for="item in links" :key="item.text">
        <v-list-item slot="activator" :to="item.route">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-show="item.childrens"
          v-for="child in item.childrens"
          :key="child.text"
          :to="child.route"
        >
          <v-list-item-title>{{ child.text }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["drawer"],
  data() {
    return {
      links: [
        {
          icon: "mdi-microsoft-windows",
          text: "Dashboard",
          route: "/",
        },
        {
          icon: "mdi-account",
          text: "Profile",
          route: "",
        },
        {
          icon: "mdi-clipboard-list-outline",
          text: "Products",
          route: "",
        },
        {
          icon: "mdi-card-account-details-outline",
          text: "Orders",
          route: "",
        },
        {
          icon: "mdi-code-array",
          text: "Promotool",
          childrens: [
            {
              icon: "mdi-format-list-bulleted",
              text: "Campagne Promotool",
              route: "campagne-promotool",
            },
            {
              icon: "mdi-plus-box",
              text: "Programmation",
              route: "programation-promotool",
            },
          ],
        },
      ],
    };
  },
};
</script>
