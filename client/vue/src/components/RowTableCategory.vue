<script>
export default {
  name: "RowTableCategory",
  props: ["data", "index"],
};
</script>

<template>
  <tr>
    <td scope="row">{{ index + 1 }}</td>
    <td class="fw-bold">{{ data.name }}</td>
  </tr>
</template>
