import { useState, useEffect } from "react";

import '/workspaces/otro-todo-list-aaron/src/styles/index.css';

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import Todo from "./Todo";
//create your first component
const Home = () => {
	const USERNAME = "juan";

	const [tareas, setTareas] = useState([]);
	const [nuevaTarea, setNuevaTarea] = useState("");

	const crearUsuario = async () => {
		try {
			const res = await fetch(`https://playground.4geeks.com/todo/users/${USERNAME}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify([]) // Lista vacía al inicio
			});
			if (res.ok) {
				console.log("✅ Usuario creado.");
			} else {
				const data = await res.json();
				console.warn("ℹ️ Usuario ya existe o error:", data);
			}
		} catch (error) {
			console.error("❌ Error al crear usuario:", error);
		}
	};


	const obtenerTareas = async () => {
		try {
			const res = await fetch(`https://playground.4geeks.com/todo/users/${USERNAME}`);
			if (!res.ok) {
				crearUsuario()
			}
			const data = await res.json();
			setTareas(data.todos)

		} catch (error) {
			console.error("❌ Error al obtener tareas:", error);
			setTareas([]);
		}
	};

	const crearTarea = async () => {

		const res = await fetch(`https://playground.4geeks.com/todo/todos/${USERNAME}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					label: nuevaTarea,
					is_done: false
				})
			}
		)
		setNuevaTarea("")
		obtenerTareas()
	}

	const eliminarTarea = async (id) => {

		const res = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE"
		})
		obtenerTareas()

	};



	useEffect(() => {
		obtenerTareas();
	}, []);

	return (
		<div className="contenedor">
			<h1>ToDo List</h1>
			<div className="formulario">
				<input
					type="text"
					value={nuevaTarea}
					onChange={(e) => setNuevaTarea(e.target.value)}
					placeholder="Escribe tu tarea"
				/>
				<button onClick={crearTarea}>Agregar</button>
			</div>

			<ul className="lista">
				{tareas.map((tarea, index) => (
					<li key={index} className="tarea">
						{tarea.label}
						<button onClick={() => eliminarTarea(tarea.id) } >❌</button>
					</li>
				))}
			</ul>

			<p>{tareas.length} tareas en total</p>
		</div>
	);
};

export default Home;