<template>
  <v-card class="mx-auto my-12" max-width="374">
    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>
    <v-card-title>{{ productName }} </v-card-title>

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
      <h2>
        {{ price }}
      </h2>
      <v-spacer></v-spacer>

      <DSButton :disabled="added" @click="reserve">
        {{ added ? "In Cart" : "Add to Cart" }}
      </DSButton>
    </v-card-actions>
  </v-card>
</template>

<script>
import { buyRequest } from "@/service/buy.service.js";
import DSButton from "ds/DSButton";
import { cartEmitter, EVENT_KEYS } from "../dealful";

export default {
  name: "Product",
  props: ["product"],
  components: {
    DSButton,
  },
  data: () => ({
    loading: false,
    added: false,
  }),
  computed: {
    productName() {
      return this.product.title.split(" ")[0];
    },
    price() {
      return (Math.random() * (10.0 - 1.0 + 1.0) + 1.0).toFixed(2);
    },
  },

  methods: {
    async reserve() {
      this.loading = true;
      try {
        const response = await buyRequest(this.product);
        this.added = !!response.id;
        this.added &&
          cartEmitter.emit(EVENT_KEYS.CART, () => {
            return {
              name: this.productName,
              quantity: Math.floor(Math.random() * 10) || 1,
              unitPrice: this.price,
            };
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
