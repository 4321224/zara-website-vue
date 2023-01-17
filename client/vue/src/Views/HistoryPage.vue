<script>
import TablePage from './TablePage.vue';
export default {
name: "HistoryPage",
props: ["page", "dataHistory"],
components: {
    TablePage
},
// created() {
//   this.fetchHistory()
// }
}
</script>

<template>
     <section id="list-table" class="container">
    <div class="bd-example-snippet bd-code-snippet">
      <div class="bd-example">
        <h2>Table History</h2>
        <TablePage
            :dataHistory="dataHistory"
            :page="page"
        />
  </div>
  </div>
  </section>
</template>