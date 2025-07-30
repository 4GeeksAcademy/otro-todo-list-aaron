import React, { useState } from "react"; // Asegúrate de tener este archivo creado

const Todo = () => {
  const [tareas, setTareas] = useState([]);
  const [input, setInput] = useState("");

  const agregarTarea = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setTareas([...tareas, input]);
    setInput("");
  };



  return (
    <div className="contenedor">
      <h1>ToDo List</h1>
      <form className="formulario" onSubmit={agregarTarea}>
        <input
          type="text"
          placeholder="Escribe tu tarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      <ul className="lista">
        {tareas.map((tarea, index) => (
          <li key={index} className="tarea">
            {tarea}
            <button onClick={() => eliminarTarea(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;