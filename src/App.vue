<template>
 <div class="home">
  <img id="todo-logo" alt="todo logo" src="./assets/logo/logo.png"/>
  <div class="title">{{ titleIntro }}</div>
  <input type="text" autofocus placeholder="Type a todo" v-model="myTodo" v-on:keyup.enter="addToDo"/>
  <button type="button" @click="addToDo">{{ addItem }}</button>
  <div v-if="errors !== ''" id="errors">{{ errors }}</div>
  <div class="group">
    <div class="title" :class="isActive ? 'active' : ''" @click="isActive=true">{{ notDone }}</div>
    <div class="title" :class="!isActive ? 'active' : ''" @click="isActive=false">{{ done }}</div>
  </div>
  <div v-if="isActive" class="title">{{ notDoneTitle }}</div>
  <div v-else class="title">{{ doneTitle }}</div>

  <div class="items-list" v-if="this.$store.getters.getItems && this.$store.getters.getItems.length > 0">
    <template v-if="isActive">
      <div class="items-holder" v-for="item in this.$store.getters.getItems" :key="item.id">
        <template v-if="!item.checked">
        <div @click="checked(item.id, false)">{{ item.title }}</div>
        <div><small style="text-decoration: underline;" @click="deleteItem(item.id)">{{ delItem }}</small></div></template>
      </div>
    </template>
 
   <template v-else>
      <div class="items-holder" v-for="item in this.$store.getters.getItems" :key="item.id">
        <template v-if="item.checked">
        <div @click="checked(item.id, true)" style="text-decoration: line-through;">{{ item.title }}</div>
        <div><small style="text-decoration: underline;" @click="deleteItem(item.id)">{{ delItem }}</small></div></template>
      </div>
   </template>
 </div>
 </div>
</template> 

<script>
import { db } from '@/main'
export default {

  name: 'App',
  beforeCreate() {
    this.$store.dispatch('setItems')
  },
  data() {
    return {
      myTodo: '',
      errors: '',
      addItem: 'Add',
      delItem: 'Delete',
      titleIntro: 'What should I remember',
      notDone: 'To be done',
      done: 'Done',
      notDoneTitle: 'Todos needs to be done',
      doneTitle: 'Todos finished',
      isActive: true
    }
  },
  methods: {
    addToDo() {
      this.errors = ''
      this.isActive = true
      if (this.myTodo !== '') {
        db.collection('items').add({
          title: this.myTodo,
          createdAt: Date.now(),
          checked: false
        }).then((response) => {
          if (response) {
            this.myTodo = '' 
          }
        }).catch((error) => {
            this.errors = error
        })
        } else {
          this.errors = 'Can not be empty!'
        }
      },
      checked(id, opposite) {
       if(id && opposite === false) {
          db.collection('items').doc(id).update({
            checked: true
          }).then(function() {
            console.log('chnaged to checked')
          }).catch(function(e) {
            this.errors = e
          })
          }
          else if(id && opposite === true) {
          db.collection('items').doc(id).update({
            checked: false
          }).then(function() {
            console.log('chnaged to checked')
          }).catch(function(e) {
            this.errors = e
          })
          }
          else {
            this.erros = 'can not be checked'
          }
        },
      deleteItem(id) {
        if(id) {
          db.collection('items').doc(id).delete().then(function() {
            console.log('deleted item')
          }).catch(function(e) {
            this.errors = e
          })
          } else {
            this.erros = 'no ID'
          }
        }
  },
  watch: {
      myTodo(val) {
        if (this.myTodo.value !== val) {
            this.errors = ''
        }
      }
  },
  components: { }
}
</script>

<style  lang="scss">
* {
  box-sizing: border-box;
  outline: none;
  font-family: 'Baloo Paaji 2', cursive;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

body {
  background: url('./assets/email-bck.png');
  color: darkgreen;
  height: 100%;
  overflow-x: hidden;
}

.home {
  width: 320px;
  margin: 10px auto 0 auto;
  border: 2px solid white;
  padding: 14px;
}

#todo-logo {
  width: 100px;
  display: flex;
  margin: 0 auto 20px auto;
  border: 1px dashed green;
  padding: 4px;
  transition: all 1s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
}

.title {
  font-size: 16px;
  font-weight: 700;
  padding: 0 0 4px 0;
  margin: 0 0 10px 0;
  border-bottom: 2px solid #666;
}

.group {
  display: flex;
  justify-content:space-around;
  align-items: center;
}

.group {
  display: flex;
  justify-content:space-around;
  align-items: center;

  .title {
    border-bottom: 2px solid transparent;
    cursor: pointer;
    &.active {
      border-bottom: 2px solid #666;
      cursor: default;
    }
    &:hover {
      border-bottom: 2px solid #666;
    }
  }
}

.items-holder {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 2px solid rgba(green, 0.2);
  &:empty {
    display: none;
  }
  & > div:first-of-type {
    flex: 1;
    text-indent: 6px;
    position: relative;
    cursor: pointer;
    text-transform: capitalize;
    &:before {
      content: '-';
      position: absolute;
      font-weight: bolder;
      left: -6px;
    }
  }
  & > div:last-of-type {
    cursor: pointer;
  }
}

.items-list {
  overflow-y: auto;
  padding-bottom: 20px;
  height: 100%;
}

input, button {
  border: 0;
  width: 100%;
  margin: 0 0 10px;
}

input {
  font-size: 14px;
  outline: solid 1px green;
  padding: 8px 10px;
  text-transform: capitalize;
  &:focus {
    outline: 1.5px solid darkgreen;
  }
}

button {
  font-size: 14px;
  font-weight: bold;
  text-transform: capitalize;
  color: #fff;
  background: darkolivegreen;
  border: 0;
  cursor: pointer;
  height: 34px;
  transition: font 0.2s ease;
  position: relative;
  &:hover {
    font-size: 15px;
    font-weight: bolder;
    &:before {
      content: '+';
      position: absolute;
      left: 40%;
    }
  }
}

#errors {
  background: #c52323;
  color: #fff;
  padding: 4px 10px;
  font-weight: bold;
  text-align: center;
}
</style>
