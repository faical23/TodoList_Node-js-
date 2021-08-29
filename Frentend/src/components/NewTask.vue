<template>
  <div class="NewTask">
         <textarea placeholder="Your New Task" v-model="NewTask"></textarea>
        <button v-if="WhatDoUWantToDo.WhatDoUWantToDo === 'NewTask'" @click="AddNewTask(),this.$emit('NewTask',this.NewTask)">NewTask</button>
        <button v-else>Update</button>
  </div>
</template>

<script>
import axios from 'axios'
const Api = "http://localhost:3000/Todo"

export default {
  name: 'Home',
  props:['WhatDoUWantToDo'],
  emit:['NewTask'],
  data(){
      return {
          NewTask : '', 
      }
  },
  methods:{
     My__Api: async function(My_Api,m,params,h) {
      const res = await axios({
              url: My_Api,
              method: m,
              headers: h,
              data:params
          });
          return res;
      },
      AddNewTask(){
            let Data={
                    Task:this.NewTask,
                }
            const DeleteTask = this.My__Api(Api,'POST',Data,{'Content-Type': 'application/json'})
            DeleteTask.then((res)=>{
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
      }
  }
}
</script>

<style lang="scss" scoped>
    .NewTask{
        position: absolute;
        width: 85%;
        top: 150px;
        box-shadow: 0px 0px 2px 0px black;
        background-color:white;
        border-radius:10px;
        padding:30px 20px;
        textarea{
            width:90%;
            border-radius:5px;
            height: 100px;
            border: none;
            padding: 10px;
            margin: auto;
            box-shadow: 0px 0px 2px 0px black;
        }
        button{
            padding: 10px 35px;
            border-radius:5px;
            border: none;
            background-color:#dd9b98;
            color:white;
            margin: 10px 0px;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            &:hover{
                background-color:white;
                color: #dd9b98;
                box-shadow: 0px 0px 2px 0px #dd9b98;
            }
        }
    }
</style>