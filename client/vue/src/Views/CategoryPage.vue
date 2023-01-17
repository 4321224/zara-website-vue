<script>
import TablePage from './TablePage.vue';
export default {
    name: "CategoryPage",
    props: ["dataCategory", "page"],
    emits: ["addCategory"],
    methods: {
        addCategory() {
            this.$emit("addCategory")
        }
    },
    components: {
        TablePage
    },
    // created(){
    //   this.fetchCategory()
    // }

}
</script>

<template>
  <section id="list-table" class="container">
    <div class="bd-example-snippet bd-code-snippet">
      <div class="bd-example">
        <h2 class="mt-3">Table Category</h2>
        <button class="btn btn-dark mb-3" id="new-product" @click="addCategory">
            <span class="icon material-symbols-outlined"></span>Add New Category
          </button>
        <TablePage
            :dataCategory="dataCategory"
            :page="page"
           
        />
  </div>
  </div>
  </section>
</template>
 