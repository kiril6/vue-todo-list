import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import firebase from "firebase";

Vue.config.productionTip = false;

let config = {
  apiKey: "AIzaSyDiffMwPH3RpMXUmQt4-kEwYNbsVZOsvHA",
  authDomain: "vue-todo-32e9d.firebaseapp.com",
  databaseURL: "https://vue-todo-32e9d.firebaseio.com",
  projectId: "vue-todo-32e9d",
  storageBucket: "vue-todo-32e9d.appspot.com",
  messagingSenderId: "1018574594036",
  appId: "1:1018574594036:web:5a1e18eb845f52b0e523a1",
};

firebase.initializeApp(config);

export const db = firebase.firestore();

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
