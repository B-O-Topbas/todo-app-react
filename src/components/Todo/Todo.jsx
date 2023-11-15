import axios from 'axios'
import React, { Component } from 'react'
import uuid from 'react-uuid'
import { TodoInput } from './TodoInput'
import { TodoList } from './TodoList'
import TodoService from '../service/TodoService'




let token = ""
const initMethod = async () => {
  try {
    const config = { headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": `Bearer ${token}` } }
    const userName = localStorage.getItem("userName")
    const GET_USER = "http://localhost:8080/api/user/" + userName
    const response = await axios.get(GET_USER, config)
    localStorage.setItem("userId", response.data.id)
  } catch (error) {
    console.error(error);
  }

}

const getTodoMethod = async () => {
  try {
    const userId = localStorage.getItem("userId")
    uuid.toString(userId);
    const response = await TodoService.getTodos(userId)
    return response
  } catch (error) {
    console.error(error);
  }
}

export class Todo extends Component {
  constructor(props) {
    super(props);
    token = localStorage.getItem("token");
    initMethod();

    // 

    this.fetchTodos();


    this.state = {
      items: [],
      itemsToShow: "all",
      item: '',
      editItem: false,
    }
  }

  async fetchTodos() {
    const getTodosResponse = await getTodoMethod();
    let updatedItems = this.state.items
   
    if (getTodosResponse.status === 200) {
      for (const todo of getTodosResponse.data) {
  
        const newItem = {
          id: todo.id,
          title: todo.todo,
          completed: todo.doneState,
          userId: todo.userId
        }
        updatedItems = [...updatedItems, newItem]


      }
      this.setState({
        items: updatedItems,
        item: '',
        editItem: false
      })



    }


  }

  handleChange = event => {
    this.setState({
      item: event.target.value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const AdddedTodoObject = (todo, userId) => { return { todo: todo, userId: userId } }

    const todo = AdddedTodoObject();
    todo.todo = this.state.item
    todo.userId = localStorage.getItem("userId")

    const response = await TodoService.addTodo(todo);

    if (response.status === 201) {
      setTimeout(() => {
        window.location.href = "/todo";
      }, 500);
    }
  }

  updateTodosToShow = string => {
    this.setState({
      itemsToShow: string
    });
  };

  handleDoneTask = async (id, completed) => {

    const updateTodoStateObj = {
      id: "", doneState: false
    }
    updateTodoStateObj.id = id
    const itemim = this.state.items.find(item => item.id === id)
    updateTodoStateObj.doneState = !(itemim.completed)

    const updateStateResponse = await TodoService.updateTodoStates(updateTodoStateObj)
    if (updateStateResponse.status === 200) {
      setTimeout(() => {
        window.location.href = "/todo";
      }, 50);
    }

  }

  handleDelete = async (id) => {

    uuid.toString(id)
    const response = await TodoService.deleteTodo(id);
    if (response.status === 200) {
      setTimeout(() => {
        window.location.href = "/todo";
      }, 500);
    }
  }

  handleEdit = async(id) => {
    const editingItem = this.state.items.find(item => item.id === id)
    if(editingItem.completed===true){
      alert("Yapıldı olarak işaretlenen öğeyi düzenleyemezsiniz");
    }else{
      alert("Bu mesaja tamam dedikten sonra todo güncelleme kısmına geçilecektir:");
      const input = prompt("Düzenlemeyi Giriniz ");
      const updateTodoObj={
        id:"",
        todo:""
      }
      updateTodoObj.id=id
      updateTodoObj.todo=input
      const updateTodoRes=await TodoService.updateTodo(updateTodoObj)
      if(updateTodoRes.status===200){
        setTimeout(() => {
          window.location.href = "/todo";
        }, 500);
      }

    }

 
  
  }

  handleDeleteDoneTasks = () => {
    const filteredItems = this.state.items.filter(item => item.completed === false)

    this.setState({
      items: filteredItems
    })
  }

  clearList =async  () => {

    const deleteAllResponse= await TodoService.deleteAllTodos();
    if(deleteAllResponse.status===200){
      setTimeout(() => {
        window.location.href = "/todo";
      }, 500);
    }
  }
  render() {
    let items = []

    if (this.state.itemsToShow === "all") {
      items = this.state.items;
    } else if (this.state.itemsToShow === "todo") {
      items = this.state.items.filter(item => !item.completed);
    } else if (this.state.itemsToShow === "done") {
      items = this.state.items.filter(item => item.completed);
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-10 col-md-8 mx-auto mt-4">
            <h3 className="text-capitalize text-center">TodoInput</h3>
            <TodoInput
              item={this.state.item}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
            <TodoList
              items={items}
              filterDoneTasks={this.filterDoneTasks}
              clearList={this.clearList}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
              handleDoneTask={this.handleDoneTask}
              handleDeleteDoneTasks={this.handleDeleteDoneTasks}
              updateTodosToShow={this.updateTodosToShow}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Todo