<template>
  <v-card class="mx-auto my-12" max-width="374">
    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>
    <v-card-title>Product {{ name }}</v-card-title>

    <v-card-text>
      <div>
        {{ product.title }}
      </div>
    </v-card-text>

    <v-divider v-if="!loading" class="mx-4"></v-divider>
    <v-progress-linear
      v-if="loading"
      color="deep-purple"
      indeterminate
    ></v-progress-linear>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        :disabled="added"
        text
        @click="reserve"
      >
        {{ added ? "In Cart" : "Add to Cart" }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { buyRequest } from "@/service/buy.service.js";
import store from "root/store";

export default {
  name: "Product",
  props: ["product"],
  data: () => ({
    loading: false,
    added: false,
    name: null,
  }),
  mounted() {
    this.name = this.uniqueId();
  },
  methods: {
    uniqueId() {
      return Math.random().toString(36).substr(2, 9);
    },
    async reserve() {
      this.loading = true;

      try {
        const response = await buyRequest(this.product);
        this.added = !!response.id;

        store.dispatch("addToCard", {
          name: "Product " + this.name,
          quantity: Math.ceil(Math.random(1, 10) * 10),
          value: Number(Math.random(1, 10) * 1000).toFixed(2),
        });
      } catch (err) {
        console.dir(err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
