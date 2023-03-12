import { useState, useEffect } from 'react';
import './ToDos.css'

export const ToDos = () => {
    const [todos, setTodos] = useState([]);
    const [percentage, setPercentage] = useState(0);

    const onChangeIsComplete = (id) => {
        const updatedTodos = todos.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    completed: !item.completed,
                };
            };
            return item;
        });
        setTodos(updatedTodos);
      };

    useEffect(() => {
        fetch('https://dummyjson.com/todos')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setTodos(data.todos);
        });
    }, []);

    useEffect(() => {
        const completedTodos = todos.filter(item => item.completed).length;
        if (!completedTodos || !todos.length) return setPercentage(0);
        const percentage = (completedTodos / todos.length) * 100;
        setPercentage(percentage);
    }, [todos]);

    return (
        <div className="wrapper">
             <h2>To Do List</h2>
             <h4>{percentage.toFixed(0)}% of tasks completed</h4>
             <hr />
            {todos.map(listItem => {
                return (
                    <div key={listItem.id} className="todo">
                        <input type="checkbox" checked={listItem.completed} onChange={() => onChangeIsComplete(listItem.id)}/>
                        <span>{listItem.todo}</span>
                    </div>
                );
            })}
        </div>
    );
}