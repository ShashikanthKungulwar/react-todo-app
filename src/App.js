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

  function handleDelete() {

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
      .then((json) => setTodos([json,...todos]));
  }



  function handleEdit(todo) {
    console.log(todo);
    const idx=todos.findIndex(tod=>tod.id==todo.id);
    console.log(idx);
    if(idx>=0){
      let new_todos=[...todos];
      new_todos[idx]=todo;
      setTodos(new_todos);
      console.log(new_todos)
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
