import { createContext, ReactNode, useContext, useState } from "react";

export type TodosProviderProps={
    children: ReactNode
}

export type Todo={
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}
export type TodosContext={
    todos: Todo[];
    handleAddTodo:(task:string)=> void;
    toggleTodoAsCompleted :(id : string)=>void;
    handleDeleteTodo :(id: string)=> void;
}

export const todosContext= createContext<TodosContext | null>(null);

export const TodosProvider=({children}: TodosProviderProps) =>{

    const [todos,setTodo]=useState<Todo[]>(()=>{
        try {
            const newTodos=localStorage.getItem("todos") || "[]"
            return JSON.parse(newTodos) as Todo[]
        } catch (error) {
            return []
        }
    });
    const handleAddTodo=(task: string)=>{
         setTodo((prev)=>{
            const newTodos:Todo[] =[{
                id:Math.random().toString(),
                task:task,
                completed:false,
                createdAt: new Date()
            },
            ...prev
        ]
        // console.log(newTodos);
        // console.log(prev);
        localStorage.setItem('todos',JSON.stringify(newTodos))
        return newTodos
         })
    }

    const toggleTodoAsCompleted=(id:string)=>{
          setTodo((prev)=>{
            let newTodos=prev.map((todo)=>{
                if(todo.id===id){
                    return {...todo,completed :!todo.completed}
                }
                return todo
            })
            localStorage.setItem('todos',JSON.stringify(newTodos))
            return newTodos
          })
    }

    const handleDeleteTodo = (id: string)=>{
      setTodo((prev)=>{
        let newTodos= prev.filter((filterTodo)=>filterTodo.id !== id);
        localStorage.setItem('todos',JSON.stringify(newTodos))
        return newTodos
      })
    }
    return <todosContext.Provider value={{todos,handleAddTodo,toggleTodoAsCompleted,handleDeleteTodo}}>
        {children}
    </todosContext.Provider>
}

export const useTodos =()=>{
    const todosConsumer= useContext(todosContext);
    if(!todosConsumer){
        throw new Error("used outside of provider");
    }
    return todosConsumer;
}