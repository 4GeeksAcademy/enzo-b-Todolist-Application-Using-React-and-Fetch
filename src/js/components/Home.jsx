import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");

	const obtenerTareas = async ()=> {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/enzobarrera")
			console.log(response.status)
			if (response.status==404){
				await crearUsuario()
				return
			}
			const data = await response.json()
			console.log(data.todos)
			setTodos(data.todos)
		} catch (error) {
			console.log(error)
		}
	}

	const crearUsuario = async()=>{
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/enzobarrera", {
				method: "POST", 
				headers: {"Content-Type":"application/json"}
			})
			console.log(response)
			if(response.status == 201){
				await obtenerTareas()
				return
			}
		} catch (error) {
			console.log(error)
		}
	}
	const addTodo = (e) => {
		if (e.key === "Enter" && newTodo.trim() !== "") {
			setTodos([...todos, newTodo]);
			setNewTodo("");
		}
	};

	const removeTodo = (index) => {
		setTodos(todos.filter((_, i) => i !== index));
	};

	useEffect(()=>{
		obtenerTareas()
	}, [])
	return (
		<div className="todo-container">
			<h1 className="title">todos</h1>
			<div className="input-container">
				<input
					type="text"
					className="todo-input"
					placeholder="What needs to be done?"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					onKeyDown={addTodo}
				/>
			</div>

			<ul className="todo-list">
				{todos.map((todo, index) => (
					<li key={index} className="todo-item">
						{todo.label}
						<button className="delete-button" onClick={() => removeTodo(index)}>✖</button>
					</li>
				))}
			</ul>
			<p className="todo-count">{todos.length} item(s) left</p>


		</div>
	);
};

export default Home;