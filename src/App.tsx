import AddToDo from "./components/addtodo"
import Todos from "./components/todos"
import Navbar from "./components/navbar"
import "./App.css"


const App = () => {
  return (
   <main>
    <h1>todo - react - Typescript</h1>
    <Navbar/>
    <AddToDo/>
    <Todos/>
   </main>
  )
}

export default App
