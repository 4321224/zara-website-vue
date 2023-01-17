<script>
import FormTable from '../components/FormTable.vue';
export default {
    name: "AddCategoryPage",
    props: ["dataCategory", "page"],
    emits: ["cancelCategory", "addCategory"],
    methods: {
        cancelCategory(){
            this.$emit('cancelCategory')
        },
        addCategory(data) {
            this.$emit('addCategory', data)
        }
    },
    components: {
        FormTable
    }
}
</script>

<template>
  <section id="list-table" class="container">
    <div class="bd-example-snippet bd-code-snippet">
      <div class="bd-example">
        <h3 class="display-2">New Category</h3>
        <FormTable
          :dataCategory="dataCategory"
          :page="page"
          @cancelCategory="cancelCategory"
          @addCategory="addCategory"
        />
      </div>
    </div>
  </section>
</template>
