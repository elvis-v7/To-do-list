// Importamos las bibliotecas necesarias de React
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./../public/styles.css"; // Importamos el archivo de estilos CSS

// Definimos el componente principal de la aplicación
const App = () => {
  // Estado para almacenar el valor del input (la tarea que el usuario escribe)
  const [inputValue, setInputValue] = useState("");

  // Estado para almacenar la lista de tareas
  const [tasks, setTasks] = useState([]);

  // Efecto para cargar las tareas guardadas en el localStorage al iniciar la aplicación
  useEffect(() => {
    // Obtenemos las tareas guardadas en el localStorage (si existen)
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // Actualizamos el estado de las tareas con las tareas guardadas
    setTasks(savedTasks);
  }, []); // Este efecto solo se ejecuta una vez, al cargar la página

  // Efecto para guardar las tareas en el localStorage cada vez que cambian
  useEffect(() => {
    // Guardamos las tareas en el localStorage como una cadena JSON
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]); // Este efecto se ejecuta cada vez que el estado "tasks" cambia

  // Función para manejar el cambio en el input (cuando el usuario escribe)
  const handleInputChange = (event) => {
    // Actualizamos el estado "inputValue" con el valor actual del input
    setInputValue(event.target.value);
  };

  // Función para agregar una nueva tarea a la lista
  const handleAddTask = () => {
    // Verificamos que el input no esté vacío (ignoramos espacios en blanco)
    if (inputValue.trim() !== "") {
      // Creamos un objeto para la nueva tarea
      const newTask = {
        id: Date.now(), // Usamos la fecha actual como ID único
        text: inputValue, // El texto de la tarea
        completed: false, // Estado inicial de la tarea (no completada)
      };
      // Actualizamos el estado "tasks" agregando la nueva tarea
      setTasks([...tasks, newTask]);
      // Limpiamos el input después de agregar la tarea
      setInputValue("");
    }
  };

  // Función para eliminar una tarea de la lista
  const handleDeleteTask = (id) => {
    // Filtramos las tareas, excluyendo la que tiene el ID que queremos eliminar
    const updatedTasks = tasks.filter((task) => task.id !== id);
    // Actualizamos el estado "tasks" con la lista filtrada
    setTasks(updatedTasks);
  };

  // Función para marcar una tarea como completada o no completada
  const handleToggleComplete = (id) => {
    // Mapeamos las tareas y cambiamos el estado "completed" de la tarea con el ID correspondiente
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    // Actualizamos el estado "tasks" con la lista modificada
    setTasks(updatedTasks);
  };

  // Renderizamos la interfaz de la aplicación
  return (
    <div className="app">
      <h1>To-Do List</h1>
      {/* Contenedor para el input y el botón de agregar */}
      <div className="input-container">
        <input
          type="text"
          value={inputValue} // El valor del input está controlado por el estado "inputValue"
          onChange={handleInputChange} // Llamamos a handleInputChange cuando el usuario escribe
          placeholder="Enter a new task" // Texto de placeholder
        />
        {/* Botón para agregar una nueva tarea */}
        <button onClick={handleAddTask}>Add</button>
      </div>
      {/* Lista de tareas */}
      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id} // Usamos el ID de la tarea como clave única
            className={task.completed ? "completed" : ""} // Aplicamos la clase "completed" si la tarea está completada
          >
            {/* Texto de la tarea. Al hacer clic, cambia su estado de completado */}
            <span onClick={() => handleToggleComplete(task.id)}>
              {task.text}
            </span>
            {/* Botón para eliminar la tarea */}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Renderizamos la aplicación en el elemento con id "root" del HTML
ReactDOM.render(<App />, document.getElementById("root"));
