import styles from './main.module.css'
import Todo from '../todo/Todo'
import { useRef } from 'react'

export default function Main({todos,handleAdd,handleDelete,handleEdit})
{
    const todoRef=useRef();
    function handleClick(){
        const todo=todoRef.current.value;
        if(!todo)
        {
            alert('empty todo can be added');
            return;
        }
        handleAdd(todo);
    }
    return(
        <main className={styles.main}>
            <div>
                <input placeholder='enter todo' ref={todoRef}/>&nbsp;
                <button onClick={handleClick}>add</button>
            </div>
            <div className={styles.container}>
                {todos.map((todo,index)=><Todo key={index} todo={todo} handleEdit={handleEdit} />)}
            </div>
        </main>
    )
}