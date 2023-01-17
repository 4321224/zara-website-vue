<script>
export default {
  name: "HomePage",
  props: ["dataProduct", "dataCategory"],
};
</script>

<template>
  <section class="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="dashboard-section">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <div>
        <span class="display-2">Dashboard</span>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="row">
          <div class="col-12 col-md-6 mb-3">
            <div class="card">
              <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">Total Products</h6>
                <h6 class="card-title card-number" id="total-product">
                  {{ dataProduct }}
                </h6>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 mb-3">
            <div class="card">
              <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">Total Categories</h6>
                <h6 class="card-title card-number" id="total-category">
                  {{ dataCategory }}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
