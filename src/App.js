// import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import { useState, useEffect } from 'react';
function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => setTodos([...json.slice(1, 10)]))
  }, [])

  function handleDelete(index) {
    // setTodos(todos.map())
    const id=todos[index].id;
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    }).then((response)=>{todos.splice(index,1);setTodos([...todos]);});

  }


  function handleAdd(todo) {
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: todo,
        completed: false,
        userId: 10,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => setTodos([json, ...todos]));
  }



  function handleEdit(todo) {
    console.log(todo);
    const idx = todos.findIndex(tod => tod.id == todo.id);
    
    if (idx >= 0) {
      let new_todos = [...todos];
      new_todos[idx] = todo;
      setTodos(new_todos);
    }
  }


  return (
    <div className="App">
      <Header />
      <Main todos={todos} handleAdd={handleAdd} handleDelete={handleDelete} handleEdit={handleEdit} />
      <Footer />
    </div>
  );
}

export default App;
