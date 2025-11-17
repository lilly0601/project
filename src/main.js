// import './assets/main.css'

// import { createApp } from 'vue'
// // import App from './App.vue'

// let container = document.getElementById("my-vue-button-container");
// debugger
// if (!container) {
  //   container = document.createElement("div");
  //   container.id = "my-vue-button-container";
  //   document.body.appendChild(container);
  // }
  
  // createApp(MyButton).mount(container)
// import './assets/main.css';
// import { createApp } from 'vue';
// import App from './App.vue';

// document.addEventListener("DOMContentLoaded", () => {
//   let container = document.getElementById("my-vue-button-container");
//   if (!container) {
//     container = document.createElement("div");
//     container.id = "my-vue-button-container";
//     container.style.cssText = `
//       position: fixed;
//       top: 50px;
//       right: 50px;
//       width: 400px;
//       height: 600px;
//       background: white;
//       z-index: 9999;
//       padding: 10px;
//       border: 1px solid #ccc;
//       border-radius: 8px;
//       overflow-y: auto;
//     `;
//     document.body.appendChild(container);
//   }

//   createApp(App).mount(container);
// });
// // let container = document.getElementById("my-vue-button-container");

// // if (!container) {
// //   container = document.createElement("div");
// //   container.id = "my-vue-button-container";
// //   document.body.appendChild(container);
// // }

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './routes/index'

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.mount('#app');