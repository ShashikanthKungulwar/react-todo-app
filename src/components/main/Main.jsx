import styles from './main.module.css'
import Todo from '../todo/Todo'
import { useRef } from 'react'

export default function Main({todos,handleAdd,handleDelete,handleEdit})
{
    const todoRef=useRef();

    function handleClick(event){
        event.preventDefault();
        const todo=todoRef.current.value;
        if(!todo)
        {
            alert('empty todo can be added');
            return;
        }   
        handleAdd(todo);
        todoRef.current.value='';
    }
    return(
        <main className={styles.main}>
            {/* Form to add todo */}
            <form onSubmit={handleAdd}>
                <input placeholder='enter todo' ref={todoRef} required/>&nbsp;
                <button onClick={handleClick}>add</button>
            </form>
            {/* container of todos */}
            <div className={styles.container}>
                {todos.map((todo,index)=><Todo key={index} todo={todo} handleEdit={handleEdit} handleDelete={handleDelete} index={index} />)}
            </div>
        </main>
    )
}