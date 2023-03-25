<template>
  <div class="row px-xl-5">
      <div class="col-lg-8 table-responsive mb-5">
          <table class="table table-bordered text-center mb-0">
              <thead class="bg-secondary text-dark">
                  <tr>
                      <th>Products</th>
                      <th>Price</th>
                      <th>Remove</th>
                  </tr>
              </thead>
              <tbody class="align-middle">
                  <tr v-for="lessonInCart in lessonsInCart" :key="lessonInCart.id">
                      <td class="text-left">
                          <img v-bind:src="lessonInCart.images" style="width: 50px;">
                          {{lessonInCart.subject}} | {{lessonInCart.location}}
                      </td>
                      <td class="align-middle">
                          {{lessonInCart.price}}
                      </td>
                      <td class="align-middle">
                        <button class="btn btn-sm btn-primary" v-on:click="removeFromCart(lessonInCart)">
                            <i class="fa fa-times"></i>
                        </button>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
      <div class="col-lg-4">
          <div class="card border-secondary mb-5">
              <div class="card-header bg-secondary border-0">
                  <h4 class="font-weight-semi-bold m-0">Checkout Details</h4>
              </div>
              <form>
                  <div class="alert alert-light text-danger" role="alert">
                      {{ errors.first("FullName") || errors.first("phoneNumber") }}
                  </div>
                  <div class="card-body">
                      <div class="d-flex justify-content-between mb-3 pt-1">
                          <input class="form-control" type="text" placeholder="Full Name" name="FullName" :value="fullName" @input="$emit('update:fullName', $event.target.value)" v-validate="'required|alpha_spaces'" required>
                      </div>
                      <div class="d-flex justify-content-between">
                          <input class="form-control" type="text" placeholder="Phone Number" name="phoneNumber" :value="phoneNumber" @input="$emit('update:phoneNumber', $event.target.value)" v-validate="'required|numeric'" required>
                      </div>
                  </div>
                  <div class="card-footer border-secondary bg-transparent">
                      <button class="btn btn-block btn-primary my-3 py-3" v-bind:disabled="!checkoutErrorsExist(errors.first('FullName'), errors.first('phoneNumber'))" v-on:click="checkoutSubmit">Proceed To Checkout</button>
                  </div>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "Checkout",
  props: [
    "lessonsInCart",
    "fullName",
    "phoneNumber",
    "checkoutErrorsExist"
  ],
  methods: {
    removeFromCart(lessonInCart){
      this.$emit("removeLessonFromCart", lessonInCart);
    },
    checkoutSubmit(){
      this.$emit("checkoutLessonsSubmit");
    }
  }
}
</script>