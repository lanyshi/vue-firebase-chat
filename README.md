# Vue.js & Firebase Real-Time Chat

A real-time chat application built with Vue.js and Firebase.

[__Live Demo__](https://lanyshi.github.io/)

This project is guided by:
* [CodingTheSmartWay.com](https://codingthesmartway.com/building-a-real-time-chat-application-with-vue-js-and-firebase-part-1/)
* [Vue.js & Firestore App - Build & Deploy](https://www.youtube.com/watch?v=sYNjEzcOTOs&list=PLillGF-RfqbYsOOycB67Raf9dwmL6Y31M&index=1)
----
## Introduction
### Vue.js
Vue.js is a framework for building JavaScript based single-page web applications and works well when combined with other
web development tools or libraries.
### Firebase
Firebase is Google's cloud development platform that helps with building modern web and mobile applications.
One of the services it provides is Cloud Firestore which enables real-time data storage and synchronization.

----
## Issues & Debugging
After setting up Firebase and connecting to the server, an error appeared ```'firestore' is defined but never used```.

I then fixed this issue by changing the following code in ```src/firebase/init.js``` from
```vue
import firestore from "firebase/firestore";
```
to
```vue
import "firebase/firestore";
```
----
## Further Improvements
I have made a few improvements to make this application better:
* Login feature
* Cookies to prevent logging user out on refresh
* Cookie consent
----
## Takeaways
### Vue.js - Syntax
```vue
<form @submit.prevent="login" class="text-center">
...
</form>
```
While ```@submit``` is a shorthand for ```v-on:submit```, here ```v-on``` is a directive that listens to Submit events.
```.prevent``` is an event modifier which in this case indicates that the submit event of ```login``` will no longer
reload the HTML page.

### Vue.js - Components
```vue
<form @submit.prevent="createMessage">
  ...
  <input type="text" ... v-model="newMessage">
  ...
</form>
```
When ```v-model``` is bound to the input component, it's to create custom inputs. In this particular case, the
input values are carried by the variable ```"newMessage"``` and are then passed to the ```"createMessage"``` method.

### Vue.js - Condition Rendering
```vue
<form @submit.prevent="login" ...>
  <input type="text" ... v-model="name">
  <p class="text-danger" v-if="errorText">{{ errorText }}</p>
</form>
```
```v-if``` is a directive that renders a block when the condition is met. For example, if the user fails to enter a
name, which is an input value bound to the ```v-model``` called ```name``` and passed to the ```login()``` method.
If the value is empty (condition is met), an error text will be generated and displayed.

### Firestore Database
While getting used to Firestore database and comparing it with MySQL and MongoDB, I realize the biggest feature of the former
is its capability to update and listen to changes in the database in real-time, especially when working with a web application like
this. Although it is possible for MySQL and MongoDB to accomplish this as well, they require a lot of work and very specific
infrastructure.
----
## Initialization
```bash
# install @vue/cli
npm install -g @vue/cli

# initialize project
vue init webpack <ProjectName>
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
