
import { useEffect, useRef, useState } from 'react';
import styles from './todo.module.css';

export default function Todo({ todo, handleEdit, handleDelete, index }) {
    // checked is to indicate the check of the task or todo
    // isEdit is nothing but enabling edit feature for the title
    const [checked, setChecked] = useState(todo.completed);
    const [isEdit, setIsEdit] = useState(false);
    const titleRef = useRef();

    useEffect(() => {
        setChecked(todo.completed);
    }, [todo])


    function handleTrash() {
        handleDelete(index);
    }


    function handleTitleEdit() {
        if (todo.id > 200) {
            //as the server dont accept the id above 200 its avoided

            handleEdit({
                ...todo,
                title: titleRef.current.innerText
            });
            setIsEdit(false);
            return;
        }
        fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                ...todo,
                title: titleRef.current.innerText
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
                setIsEdit(false)
            });
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
                <span className={checked ? styles.strike + " title" : "title"} ref={titleRef} contentEditable={isEdit}>
                    {todo.title}
                </span>
            </span>
            <span style={{ color: 'rgb(84, 130, 130)' }}>

                {isEdit ? <i class="fa-solid fa-share" onClick={handleTitleEdit}></i> : <i className="fa-solid fa-pen-to-square" onClick={() => setIsEdit(true)}></i>}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <i className="fa-solid fa-trash" onClick={handleTrash}></i>
            </span>
        </div>
    )
}