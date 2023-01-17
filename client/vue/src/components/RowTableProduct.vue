<script>
export default {
  name: "RowTableProduct",
  props: ["data", "index"],
  emits: ["getProductId", "statusProduct"],
  methods: {
    getProductId(id) {
      this.$emit("getProductId", id);
    },
    productStatus(status, id) {
      this.$emit("statusProduct", status, id);
    },
  },
  computed: {
    rupiah() {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(this.data.price);
    },
    user() {
      return {
        username: localStorage.getItem("username"),
        role: localStorage.getItem("role"),
      };
    },
  },
};
</script>

<template>
  <tr>
    <td scope="row">{{ index + 1 }}</td>
    <td class="fw-bold">{{ data.name }}</td>
    <td>{{ data.description }}</td>
    <td>{{ rupiah }}</td>
    <td>{{ data.stock }}</td>
    <td>
      <img :src="data.imgUrl" class="img-fluid" />
    </td>
    <td>{{ data.Category.name }}</td>
    <td>{{ data.User.username }}</td>
    <td v-if="user.role === 'user' || user.role === 'Staff'">{{data.status}}</td>
    <td v-else-if="user.role === 'admin'">
      <select
        class="form-select"
        v-model="data.status"
        @change="productStatus(data.status, data.id)"
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="archive">Archive</option>
      </select>
    </td>

    <td v-if="user.role === 'admin' || user.username === data.User.username">
      <a href="#" class="ms-3" @click="getProductId(data.id)">
        <i class="bi bi-pen" style="color: black"></i
      ></a>
    </td>
  </tr>
</template>
