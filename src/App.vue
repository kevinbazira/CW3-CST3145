<template>
  <div id="app">
        <div class="container-fluid">
            <div class="row align-items-center py-3 px-xl-12">
                <div class="col-lg-3 d-none d-lg-block">
                    <a href="" class="text-decoration-none">
                        <h1 class="m-0 display-5 font-weight-semi-bold">
                            {{sitename}}
                        </h1>
                    </a>
                </div>
                <div class="col-lg-6 col-6 text-left">
                </div>
                <div class="col-lg-3 col-6 text-right">
                    <button class="btn border" v-bind:disabled="!cartItemCount" v-on:click="showCartAndCheckout">
                        <i class="fas fa-shopping-cart text-primary"></i>
                        <span class="badge">
                            {{cartItemCount}}
                        </span>
                    </button>
                </div>
            </div>
        </div>

        <div class="container-fluid bg-secondary">
            <div class="d-flex flex-column align-items-center justify-content-center" style="min-height: 180px">
                <h2 class="font-weight-semi-bold text-uppercase mb-3">{{ showShopPage ? "Shop" : "Shopping Cart & Checkout" }}</h2>
            </div>
        </div>

        <div class="container-fluid pt-5" v-if="showShopPage">
            <div class="row px-xl-5">
                <div class="col-lg-3 col-md-12">
                    <div class="border-bottom mb-4 pb-4">
                        <h5 class="font-weight-semi-bold mb-4">Order by:</h5>
                        <form>
                            <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="radio" id="ascending" value="ascending" class="custom-control-input" v-model="orderBy">
                                <label for="ascending" class="custom-control-label">Ascending</label>
                            </div>
                            <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="radio" id="descending" value="descending" class="custom-control-input" v-model="orderBy">
                                <label for="descending" class="custom-control-label">Descending</label>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="col-lg-9 col-md-12">
                    <div class="row pb-3">
                        <div class="col-12 pb-1">
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <form class="w-100">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Search by subject or location" v-model="searchTerm">
                                        <div class="input-group-append">
                                            <span class="input-group-text bg-transparent text-primary">
                                                <i class="fa fa-search"></i>
                                            </span>
                                        </div>
                                    </div>
                                </form>
                                <div class="dropdown ml-4">
                                    <select class="form-select btn border dropdown-toggle" aria-label="Sort by: subject, location, price, spaces" v-model="sortBy">
                                        <option value="">Sort by</option>
                                        <option value="subject">Subject</option>
                                        <option value="location">Location</option>
                                        <option value="price">Price</option>
                                        <option value="spaces">Spaces</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Vue Lesson child component -->
                        <Lesson
                            :lessons="(searchedLessons.length === 0 ? sortedLessons : searchedLessons)"
                            :cartCount="cartCount"
                            :canAddToCart="canAddToCart"
                            @addItemToCart="addToCart"
                        />

                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="container-fluid pt-5">
                <!-- Vue Checkout child component -->
                <Checkout
                    :lessonsInCart="lessonsInCart"
                    @removeItemFromCart="removeFromCart"
                />
            </div>
        </div>
        
        <div class="col-12 text-center">
            <p>
                &copy; <a class="text-dark font-weight-semi-bold" href="#">Kevin Bazira</a>. All Rights Reserved.
            </p>
        </div>
    </div>
</template>

<script>
import Lesson from "./components/Lesson.vue"
import Checkout from "./components/Checkout.vue"

export default {
  name: "App",
  components: {
    Lesson,
    Checkout
  },
  data(){
    return {
        sitename: "CW3-CST3145",
        lessons: [],
        cart: [],
        sortBy: "",
        orderBy: "ascending",
        showShopPage: true,
        lessonsInCart: [],
        checkout: {
            fullName: "",
            phoneNumber: ""
        },
        searchTerm: ""
    }
  },
  methods: {
      addToCart(lesson){
          this.cart.push(lesson.id);
          this.lessonsInCart.push(lesson);
      },
      removeFromCart(lesson){
          let lessonIndex = this.cart.indexOf(lesson.id);
          if(lessonIndex !== -1){
              this.cart.splice(lessonIndex, 1);
              this.lessonsInCart.splice(lessonIndex, 1);
          }
      },
      canAddToCart(lesson){
          return lesson.spaces > this.cartCount(lesson.id);
      },
      cartCount(id){
          let count = 0;
          for (let i = 0; i < this.cart.length; i++) {
              if (this.cart[i] === id) {
                  count++;
              }
          }
          return count;
      },
      showCartAndCheckout() { 
          this.showShopPage = this.showShopPage ? false : true;
      },
      checkoutErrorsExist(fullNameErrors, phoneNumberErrors){
          let errorsExist;
          if((this.checkout.fullName === "" || this.checkout.phoneNumber === "") && (fullNameErrors === undefined || phoneNumberErrors === undefined)){
              errorsExist = false;
          } else {
              errorsExist = !fullNameErrors && !phoneNumberErrors;
          }
          return errorsExist;
      },
      checkoutSubmit(){
          alert("Order Submitted! :)");
      },
      sortLessons(lessonsArray){
          const compare = (a, b) => {
              if (a[this.sortBy] > b[this.sortBy]){
                  return 1;
              } 
              if (a[this.sortBy] < b[this.sortBy]){
                  return -1;
              }
              return 0;
          };
          if(this.orderBy === "ascending"){
              return lessonsArray.sort(compare);
          }else if (this.orderBy === "descending"){
              lessonsArray.sort(compare);
              return lessonsArray.reverse();
          }
      }
  },
  computed: {
      cartItemCount(){
          return this.cart.length;
      },
      sortedLessons(){
          let lessonsArray = this.lessons.slice(0);
          return this.sortLessons(lessonsArray);
      },
      searchedLessons(){
          let searchedSubjects = [];
          if(this.searchTerm !== ""){
              for(let i = 0;  i < this.lessons.length; i++){
                  let lowerCaseSubjectTitle = this.lessons[i].subject.toLowerCase();
                  let lowerCaseSubjectLocation = this.lessons[i].location.toLowerCase();
                  let lowerCaseSearchTerm = this.searchTerm.toLowerCase();
                  if(lowerCaseSubjectTitle.includes(lowerCaseSearchTerm) || lowerCaseSubjectLocation.includes(lowerCaseSearchTerm)){
                      searchedSubjects.push(this.lessons[i])
                  }
              }
          }
          const sortedSearchedSubjects = this.sortLessons(searchedSubjects);
          return sortedSearchedSubjects;
      }
  },
  created() {
      // GET request to fetch lessons JSON data from server and add it to lessons in Vue data
      // retrieve all the lesson information in MongoDB Atlas through a REST API and pass it to Lesson with a prop
      fetch("https://cw2-cst3145-2023.herokuapp.com/collection/lessons")
          .then(response => response.json())
          .then(data => (this.lessons = data));
  }
}
</script>