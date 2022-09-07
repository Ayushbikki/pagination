//import logo from './logo.svg';
import './App.css';
import React, {useState,useEffect} from 'react'
import axios from 'axios'

function App() {
  const [todos,setTodos]= useState([])
  const [todoPerPage,setTodoPerPage]=useState(10);
  const [currentPage,setCurrentPage] = useState(1)
  const numOfTotalPages = Math.ceil(todos.length/todoPerPage)
  const pages = [...Array(numOfTotalPages+1).keys()].splice(1)
  console.log('pages',pages)
  const indexOfLastTodo= currentPage*todoPerPage
  const indexOfFirstTodo= indexOfLastTodo-todoPerPage
  const visibleTodo= todos.slice(indexOfFirstTodo,indexOfLastTodo)

  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then((res)=>setTodos(res.data))
    .catch((e)=>alert('error is',e))

  },[])
  const prevPageHandler = (c)=>{
    if(currentPage==1) setCurrentPage(currentPage-1)

  }
  const nextPageHandler=()=>{ 
    if(currentPage!==numOfTotalPages) setCurrentPage(currentPage+1)
  }
  return (
    <>
    <select onChange={(e)=>setTodoPerPage(e.target.value)}>
      <option value='10'>10</option>
      <option value='20'>20</option>
      <option value='30'>30</option>
    </select>
    <div>
     {visibleTodo.map((todo)=>(
        <p key={todo.id}><strong>{todo.id}</strong>  {todo.title}</p>
     )
     
     )}
     <span onClick={prevPageHandler}>Prev</span>
     <p>{pages.map((page)=>(
      <span key={page} className={`${currentPage===page ? "active"  : ""}`} onClick={()=> setCurrentPage(page)}> {`${page} |`} | </span>
     ))}</p>
    <span onClick={nextPageHandler}>Next</span>
    </div>
    </>
  );
}

export default App;
