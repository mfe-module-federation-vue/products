<template>
  <v-container>
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="4">
        <Product :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Product from "./Product.vue";
import { fetchProducts } from "@/service/products.service.js";
import userConfig from "root/userModuleFromRootByHelper";

export default {
  name: "Products",
  components: { Product },
  data: () => ({
    products: [],
  }),
  mounted() {
    this.fetchData();
  },
  async created() {
    console.log("prod", userConfig.allData());
  },
  methods: {
    async fetchData() {
      try {
        this.products = await fetchProducts();
      } catch (err) {
        console.warn(err);
      }
    },
  },
};
</script>
