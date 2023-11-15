import axios from "axios";


class TodoService {

    addTodo = async (todoObject) => {
        let token = localStorage.getItem("token");
        const config = { headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": `Bearer ${token}` } }
        const response = await axios.post("http://localhost:8080/api/todo", todoObject, config)
        return response
    }

    getTodos = async (userId) => {
        let token = localStorage.getItem("token");
        const config = { headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": `Bearer ${token}` } }
        const response = await axios.get("http://localhost:8080/api/todo/users/" + userId, config)
        return response
    }

    updateTodoStates = async (updateTodoStateObject) => {
        let token = localStorage.getItem("token");
        const config = { headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": `Bearer ${token}` } }
        const response = await axios.put("http://localhost:8080/api/todo/state", updateTodoStateObject, config)
        return response
    }

    updateTodo = async(updateTodoObject)=>{
        let token = localStorage.getItem("token");
        const config = { headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": `Bearer ${token}` } }
        const response = await axios.put("http://localhost:8080/api/todo",updateTodoObject,config)
        return response

    }
    deleteTodo = async (todoId) => {
        let token = localStorage.getItem("token");
        const config = { headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": `Bearer ${token}` } }
        const response = await axios.delete("http://localhost:8080/api/todo/" + todoId, config)
        return response
    }
    deleteAllTodos=async() =>{
        let token = localStorage.getItem("token");
        const config = { headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": `Bearer ${token}` } }
        const response = await axios.delete("http://localhost:8080/api/todo", config)
        return response
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new TodoService();
