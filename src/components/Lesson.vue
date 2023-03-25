<template>
  <div class="row">
    <div class="col-lg-4 col-md-6 col-sm-12 pb-1" v-for="lesson in lessons" :key="lesson.id">
      <div class="card product-item border-0 mb-4">
        <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
          <img class="img-fluid w-100" v-bind:src="lesson.images" v-bind:alt="lesson.subject">
        </div>
        <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
          <h6 class="text-truncate mb-3">{{lesson.subject}} | {{lesson.location}}</h6>
          <div class="d-flex justify-content-center">
              <h6>${{lesson.price}}</h6><h6 class="text-muted ml-2"></h6>
          </div>
          <span>Spaces: {{lesson.spaces - cartCount(lesson.id)}}</span>
        </div>
        <div class="card-footer bg-light border text-center">
          <button class="btn btn-sm text-dark p-0 w-100 h-100" v-on:click="addToCart(lesson)" v-bind:disabled="!canAddToCart(lesson)">
            <i class="fas fa-shopping-cart text-primary mr-1"></i>
              Add To Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Lesson",
  props: [
    "lessons",
    "cartCount",
    "canAddToCart"
  ],
  methods: {
    addToCart(lesson){
      this.$emit("addLessonToCart", lesson);
    }
  }
}
</script>