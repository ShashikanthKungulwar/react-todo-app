
import { useEffect, useState } from 'react';
import styles from './todo.module.css';

export default function Todo({ todo, handleEdit,handleDelete,index }) {
    const [checked, setChecked] = useState(todo.completed);
    useEffect(() => {
        setChecked(todo.completed);
    }, [todo])

    function handleTrash() {
        handleDelete(index);
    }
    function handleChange(event) {
        if (todo.id > 200) {
            //as the server dont accept the id above 200 its avoided

            handleEdit({
                ...todo,
                completed: !checked
            });
            return;
        }
        fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: todo.title,
                completed: !checked,
                userId: todo.userId,
                id: todo.id
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                handleEdit({
                    ...json
                });
            });
        // setChecked(!checked);

    }
    return (
        <div className={styles.todo}>
            <span>
                <input type='checkbox' checked={checked} onChange={handleChange} />
                <span className={checked ? styles.strike : ""}>
                    {todo.title}
                </span>
            </span>
            <span style={{ color: 'rgb(84, 130, 130)' }}>
                <i className="fa-solid fa-pen-to-square"></i>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <i className="fa-solid fa-trash" onClick={handleTrash}></i>
            </span>
        </div>
    )
}