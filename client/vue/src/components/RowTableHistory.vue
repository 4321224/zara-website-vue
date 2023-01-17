<script>
export default {
  name: "RowTableHistory",
  props: ["data", "index"],
};
</script>

<template>
  <tr>
    <td scope="row">{{ index + 1 }}</td>
    <td class="fw-bold">{{ data.name }}</td>
    <td>{{ data.description }}</td>
    <td>{{data.updatedAt}}</td>
    <td>{{ data.updateBy }}</td>
  </tr>
</template>
