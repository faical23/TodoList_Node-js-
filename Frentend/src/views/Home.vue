<template>
  <div class="home">
      <h1>My To do list</h1>
      <div class="Todo">
        <div class="Todo__InputAndAdd">
            <input type="text" v-model="SearchTask" @keyup="GetTask('SearchTask')">
            <button @click="WhatDoUWantToDo='NewTask' , NewTaskClicked = true">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            </button>
        </div>
        <div class="MyAllTodo">
            <div class="MyAllTodo__single" v-for="(task,index) in AllTask.slice(0,SeeMore)" :key="(task,index)">
                <p @click="WhatDoUWantToDo='update',NewTaskClicked= true">{{task.Task}}</p>
                <button @click=DeleteTask(task.id,index)>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
                </button>
            </div>
        </div>
        <p  class="SeeMore" @click="SeeMore+=5">See more</p>
          <NewTask v-if="NewTaskClicked" :WhatDoUWantToDo={WhatDoUWantToDo} />
      </div>
  </div>
</template>

<script>
import NewTask from '../components/NewTask.vue' 
import axios from 'axios'
const Api = "http://localhost:3000/Todo"

export default {
  name: 'Home',
  data() {
     return{
        WhatDoUWantToDo:'',
        NewTaskClicked : false,
        SearchTask:'',
        AllTask : '',
        SeeMore : 5,
     }
  },
  components:{
    NewTask
  },
  methods:{
      My__Api: async function(My_Api,m,h) {
      const res = await axios({
              url: My_Api,
              method: m,
              headers: h,
          });
          return res;
      },
      GetTask(Task){
        let EndPoint = ''
        Task === 'AllTask' || this.SearchTask === '' ? ''  :  EndPoint = ('/Task/' + this.SearchTask)
        let NewApiEndPoint = Api + EndPoint
        const OurTask = this.My__Api(NewApiEndPoint,'GET',{'Content-Type': 'application/json'})
        OurTask.then((res)=>{
          this.AllTask = res.data
          console.log(res.data)
        })
      },
      DeleteTask(id){
        let NewApiEndPoint = Api + `/${id}`
        const DeleteTask = this.My__Api(NewApiEndPoint,'DELETE',{'Content-Type': 'application/json'})
        DeleteTask.then(()=>{
            this.GetTask('AllTask')

        }).catch((err)=>{
          console.log(err)
        })
      }
  },
  created(){
    this.GetTask('AllTask')
  }
}
</script>

<style lang="scss" scoped>
.home{
    text-align: center;
    .Todo{
      position: relative;
      box-shadow: 0px 0px 2px 0px black;
      width: 25%;
      margin: 0px auto;
      border-radius:  5px;
      padding:50px 20px;
      background-color:rgb(245, 245, 245);
      button{
          width:10%;
          cursor: pointer;
          border-radius: 5px;
          border: none;
          transition: 0.3s ease-in-out;
      }
      svg{
        transition: 0.3s ease-in-out;
      }
      .Todo__InputAndAdd{
        display: flex;
        justify-content: center;
        border-bottom: 1px solid black;
        padding-bottom: 30px;
        margin-bottom:30px;
        input{
          width:84%;
          padding:0px 10px;
          border-radius: 5px;
          box-shadow: 0px 0px 2px 0px black;
          margin-right: auto;
          height:40px;
          border: none;
        }
        button{
              background-color:#dd9b98;
              svg{
                fill: white;
              }
              &:hover{
                background-color:white;
                box-shadow: 0px 0px 2px 0px black;
                svg{
                  fill: #dd9b98;
                }
              }
            }
      }
      .MyAllTodo{
        .MyAllTodo__single{
            display: flex;
            justify-content: center;
            margin: 20px 0px;
            p{
              width:84%;
              padding:15px 10px;
              border-radius: 5px;
                box-shadow: 0px 0px 2px 0px black;
              margin-right: auto;
              text-align:start;
              margin:0px auto 0px 0px;
              background-color:white;
              cursor: pointer;
            }
            button{
              background-color:crimson;
              svg{
                fill: white;
              }
              &:hover{
                background-color:white;
                box-shadow: 0px 0px 2px 0px black;
                svg{
                  fill: crimson;
                }
              }
            }
        }
      }
      .SeeMore{
        text-align: start;
        cursor: pointer;
        color: #dd9b98;
        &:hover{
          color: black;
        }
      }
  }
}

</style>
