import TaskList from "./DisplayTasks";
import CompletedTaskList from "./DisplayCompletedTasks";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Plus from "../assets/plus.svg";

function ToDo() {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Drink 8 Glass Water" },
        { id: 2, title: "Finish the Project" },
        { id: 3, title: "Meet Friend" },
    ]);

    const [completedTask, setCompletedTask] = useState([
        { id: 4, title: "Read A Book" },
        { id: 5, title: "Buy Tomatoes" },
        { id: 6, title: "Do 36 Push Ups" },
    ]);

    const [taskId, setTaskId] = useState(
        tasks.length + completedTask.length + 1
    );

    const [input, setInput] = useState("");

    let addTask = () => {
        if (input) {
            const taskInput = {
                "title": input,
            }
            // setTasks([...tasks, { id: taskId, title: input }]);
            // setTaskId(taskId + 1);
            fetch('http://127.0.0.1:8000/api/v1/tasks/create/', {
                method: 'POST', // Specify the request method
                headers: {
                    'Content-Type': 'application/json' // Set the content type to JSON
                },
                body: JSON.stringify(taskInput) // Convert the data to a JSON string
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the JSON response
            })
            .then(data => {
                if(data.status === 2200){
                    console.log(data); // Handle the response data
                setTasks([...tasks, data.task])
                }else{
                    console.log(data)
                }
                
            })
            .catch(error => {
                console.error('Error:', error); // Handle any errors
            });

            setInput("");
        } else {
            alert("Enter The Task");
        }
    };

    let deleteTask = (id) => {
        // setTasks(tasks.filter((task) => task.id !== id));
        const jsonQuery = {
            "is_deleted": true,
        }
        // setTasks([...tasks, { id: taskId, title: input }]);
        // setTaskId(taskId + 1);
        fetch(`http://127.0.0.1:8000/api/v1/tasks/delete/${id}`, {
            method: 'POST', // Specify the request method
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(jsonQuery) // Convert the data to a JSON string
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            if(data.status === 2200){
                console.log(data); // Handle the response data
                setTasks(tasks.filter((task) => task.id !== data.task.id))
                setCompletedTask(completedTask.filter((CompletedTask) => CompletedTask.id !== data.task.id));
            }else{
                console.log(data)
            }
            
        })
        .catch(error => {
            console.error('Error:', error); // Handle any errors
        });
    };

    let addCompletedTask = (id) => {
        // setCompletedTask([
        //     ...completedTask,
        //     tasks.find((task) => task.id === id),
        // ]);
        // setTasks(tasks.filter((task) => task.id !== id));
        const jsonQuery = {
            "is_completed": true,
        }
        fetch(`http://127.0.0.1:8000/api/v1/tasks/update/${id}`, {
            method: 'POST', // Specify the request method
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(jsonQuery) // Convert the data to a JSON string
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            if(data.status === 2200){
                console.log(data); // Handle the response data
                setCompletedTask([...completedTask, data.task])
            }else{
                console.log(data)
            }
            
        })
        .catch(error => {
            console.error('Error:', error); // Handle any errors
        });
    };

    let deleteCompletedTask = (id) => {
        setCompletedTask(
            completedTask.filter((CompletedTask) => CompletedTask.id !== id)
        );
    };

    let revertCompletedTask = (id) => {
        // const taskToRevert = completedTask.find((task) => task.id === id);
        // setTasks([...tasks, taskToRevert]);
        // setCompletedTask(completedTask.filter((task) => task.id !== id));

        const jsonQuery = {
            "is_completed": false,
        }

        fetch(`http://127.0.0.1:8000/api/v1/tasks/update/${id}`, {
            method: 'POST', // Specify the request method
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(jsonQuery) // Convert the data to a JSON string
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            if(data.status === 2200){
                console.log(data); // Handle the response data
                setTasks([...tasks, data.task])
            }else{
                console.log(data)
            }
            
        })
        .catch(error => {
            console.error('Error:', error); // Handle any errors
        });
    };

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/v1/tasks')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setTasks(data.filter((task) => task.is_completed === false))
                setCompletedTask(data.filter((task) => task.is_completed === true ))
            });
    },[tasks])
    return (
        <ToDoContainer>
            <Heading>ToDo List</Heading>

            <TaskList
                tasks={tasks}
                completeTask={addCompletedTask}
                deleteTask={deleteTask}
            />

            <TaskInputContainer>
                <InputPlusImage src={Plus} alt="Plus Icon" />

                <TaskInput
                    type="text"
                    placeholder="Type New Task....."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <TaskInputButton onClick={addTask}>Add New</TaskInputButton>
            </TaskInputContainer>

            <CompletedTaskList
                completedTask={completedTask}
                revertTask={revertCompletedTask}
                deleteTask={deleteTask}
            />
        </ToDoContainer>
    );
}
const ToDoContainer = styled.div`
    width: 75%;
    margin: 0 auto;
    border-left: 2px solid #e7e7e7;
    border-right: 2px solid #e7e7e7;
    align-items: center;
    height: 100%;
`;

const Heading = styled.h1`
    padding: 42px 0;
    font-size: 40px;
    text-align: center;
`;

const TaskInputContainer = styled.div`
    display: flex;
    width: 50%;
    margin: 0 auto;
    justify-content: flex-end;
    align-items: center;
`;

const InputPlusImage = styled.img`
    position: relative;
    left: 5%;
`;
const TaskInput = styled.input`
    height: 57px;
    width: 68%;
    font-size: 20px;
    padding: 0 36px;
    border: 2px solid #e7e7e7;
    margin: 12px 0;
`;

const TaskInputButton = styled.button`
    background-color: #03043e;
    color: snow;
    padding: 14px 28px;
    font-size: 19px;
`;

export default ToDo;
