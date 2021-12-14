<template>
  <v-app-bar app elevate-on-scroll elevation="3" color="white">
    <v-app-bar-nav-icon @click="$emit('drawerEvent')"></v-app-bar-nav-icon>
    <v-spacer />
    <v-col lg="6" cols="12">
      <v-form>
        <v-text-field
          class="p-0 m-0 mt-6"
          full-width
          dense
          append-icon="mdi-magnify"
          outlined
          rounded
          placeholder="Search"
        />
      </v-form>
    </v-col>
    <v-spacer />
    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <span
          class="mx-5 mr-10"
          style="cursor: pointer"
          v-bind="attrs"
          v-on="on"
        >
          <v-badge content="3" color="red" offset-y="10" offset-x="10">
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </span>
      </template>
      <v-list three-line width="250">
        <template v-for="(item, index) in items">
          <v-subheader
            v-if="item.header"
            :key="item.header"
            v-text="item.header"
          ></v-subheader>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="item.inset"
          ></v-divider>

          <v-list-item v-else :key="item.title">
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle
                v-html="item.subtitle"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <span style="cursor: pointer" v-bind="attrs" v-on="on">
          <v-chip link>
            <v-badge dot bottom color="green" offset-y="10" offset-x="10">
              <v-avatar size="40">
                <v-img src="../assets/bsm.png" />
              </v-avatar>
            </v-badge>
            <span class="ml-3">Bassam Boufous</span>
          </v-chip>
        </span>
      </template>
      <v-list width="250" class="py-0">
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="../assets/bsm.png" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Bassam Boufous</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item link v-for="(menu, i) in menus" :key="i">
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ menu.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "Topbar",
  data() {
    return {
      menus: [
        { title: "Profile", icon: "mdi-account" },
        { title: "Change Password", icon: "mdi-key" },
        { title: "Setting", icon: "mdi-cog" },
        { title: "Logout", icon: "mdi-logout" },
      ],
      items: [
        {
          avatar: require("../assets/pdp/imam.png"),
          title: "Bug found !",
          subtitle: `<span class="text--primary">Imam Harir</span> &mdash; I wrote this code earlier in the summer before v-card-media was depreciated in favour of`,
        },
        { divider: true, inset: true },
        {
          avatar: require("../assets/pdp/david.png"),
          title: "MR migration",
          subtitle: `<span class="text--primary">David Briand</span> &mdash; MR migration paypal prête à être review`,
        },
        { divider: true, inset: true },
        {
          avatar: require("../assets/pdp/romain.png"),
          title: "RC1",
          subtitle:
            '<span class="text--primary">Romain Gomes</span> &mdash; Voici le lien pour voir le contenu du sprint',
        },
        { divider: true, inset: true },
        {
          avatar: require("../assets/pdp/gabriel.png"),
          title: "Ticket FF-12730",
          subtitle:
            '<span class="text--primary">Gbriel De Almeida</span> &mdash; Je regardais celui-là justement',
        },
        { divider: true, inset: true },
        {
          avatar: require("../assets/pdp/abdo.png"),
          title: "Problém à reglé",
          subtitle:
            '<span class="text--primary">Abdenassir Ouelhanafi</span> &mdash; Yes c est bon de mon côté merci',
        },
      ],
    };
  },
};
</script>

<style scoped></style>
