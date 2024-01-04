import React, { useState, useEffect ,useRef} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './TaskComponent.css'; // Import custom CSS for styles

const TaskComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    fetchTasks();
    startAutoScroll();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/tasks'); // Update with your backend URL
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const addTask = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8080/api/tasks', newTask); // Update with your backend URL
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '' });
      setLoading(false);
    } catch (error) {
      console.error('Error adding task:', error);
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8080/api/tasks/${id}`); // Update with your backend URL
      setTasks(tasks.filter((task) => task.id !== id));
      setLoading(false);
    } catch (error) {
      console.error('Error deleting task:', error);
      setLoading(false);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setNewTask({ title: task.title, description: task.description });
  };

  const updateTask = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:8080/api/tasks/${editingTask.id}`, newTask); // Update with your backend URL
      setTasks(tasks.map((task) => (task.id === editingTask.id ? response.data : task)));
      setNewTask({ title: '', description: '' });
      setEditingTask(null);
      setLoading(false);
    } catch (error) {
      console.error('Error updating task:', error);
      setLoading(false);
    }
  };
  const startAutoScroll = () => {
    const scrollDuration = 8000; // Adjust the scroll duration (milliseconds)
    const scrollStep = 1;
    let currentScroll = 0;

    const totalScrollWidth = imageRef.current.scrollWidth;
    const viewWidth = imageRef.current.clientWidth;

    const scroll = () => {
      currentScroll += scrollStep;
      if (currentScroll >= totalScrollWidth - viewWidth) {
        currentScroll = 0;
      }
      imageRef.current.scrollTo(currentScroll, 0);
    };

    setInterval(scroll, scrollDuration);
  };


  return (
    <div className="container mt-4">
      <h1 className="mb-4">Tasks</h1>
      <div className="mb-3">
        <input
          className="form-control me-2 mb-2"
          type="text"
          placeholder="Title"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
        />
        <input
          className="form-control me-2 mb-2"
          type="text"
          placeholder="Description"
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
        />
        {editingTask ? (
          <button className="btn btn-warning mb-2 me-2" onClick={updateTask} disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
        ) : (
          <button className="btn btn-primary mb-2 me-2" onClick={addTask} disabled={loading}>
            {loading ? 'Adding...' : 'Add Task'}
          </button>
        )}
        <button className="btn btn-secondary mb-2" onClick={fetchTasks} disabled={loading}>
          {loading ? 'Loading...' : 'Refresh Tasks'}
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={task.id}>
            <div>
              <strong>{task.title}</strong> - {task.description}
            </div>
            <div>
              <button className="btn btn-info btn-sm me-2" onClick={() => handleEdit(task)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="image-carousel mt-4" ref={imageRef}>
        <img src="https://plus.unsplash.com/premium_photo-1666805690529-aab9725d0d3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Nature 1" />
        <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2F4k-nature&psig=AOvVaw2KRyBhVoymUvzmgbNxVKRr&ust=1703325626808000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCPjnjZPlooMDFQAAAAAdAAAAABAE" alt="Nature 2" />
        <img src="https://via.placeholder.com/600x400/5733FF/FFFFFF" alt="Nature 3" />
        <img src="https://via.placeholder.com/600x400/FF33F7/FFFFFF" alt="Nature 4" />
        {/* Add more images as needed */}
      </div>
      {/* Animated images */}
      <div className="animated-images mt-4">
        <img className="animate__animated animate__bounce" src="https://via.placeholder.com/100x100/FF5733/FFFFFF" alt="Animated 1" />
        <img className="animate__animated animate__heartBeat" src="https://via.placeholder.com/100x100/33FF57/FFFFFF" alt="Animated 2" />
        <img className="animate__animated animate__shakeX" src="https://via.placeholder.com/100x100/5733FF/FFFFFF" alt="Animated 3" />
        {/* Add more animated images with different classes as needed */}
        <div className="scrolling-images">
          {/* Duplicate images for endless scrolling */}
          <img src="https://via.placeholder.com/600x400/FF5733/FFFFFF" alt="Nature 1" />
          <img src="https://via.placeholder.com/600x400/33FF57/FFFFFF" alt="Nature 2" />
          <img src="https://via.placeholder.com/600x400/5733FF/FFFFFF" alt="Nature 3" />
          <img src="https://via.placeholder.com/600x400/FF33F7/FFFFFF" alt="Nature 4" />
          {/* ... Duplicate more images as needed */}
        </div>
      
      </div>
    </div>
  );
};

export default TaskComponent;



























































// update button add its Edit button its working good



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// const TaskComponent = () => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState({ title: '', description: '' });
//   const [editingTask, setEditingTask] = useState(null);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/tasks'); // Update with your backend URL
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewTask({ ...newTask, [name]: value });
//   };

//   const addTask = async () => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/tasks', newTask); // Update with your backend URL
//       setTasks([...tasks, response.data]);
//       setNewTask({ title: '', description: '' });
//     } catch (error) {
//       console.error('Error adding task:', error);
//     }
//   };

//   const deleteTask = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/tasks/${id}`); // Update with your backend URL
//       setTasks(tasks.filter((task) => task.id !== id));
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };

//   const handleEdit = (task) => {
//     setEditingTask(task);
//     setNewTask({ title: task.title, description: task.description });
//   };

//   const updateTask = async () => {
//     try {
//       const response = await axios.put(`http://localhost:8080/api/tasks/${editingTask.id}`, newTask); // Update with your backend URL
//       setTasks(tasks.map((task) => (task.id === editingTask.id ? response.data : task)));
//       setNewTask({ title: '', description: '' });
//       setEditingTask(null);
//     } catch (error) {
//       console.error('Error updating task:', error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h1 className="mb-4">Tasks</h1>
//       <div className="mb-3">
//         <input
//           className="form-control me-2 mb-2"
//           type="text"
//           placeholder="Title"
//           name="title"
//           value={newTask.title}
//           onChange={handleInputChange}
//         />
//         <input
//           className="form-control me-2 mb-2"
//           type="text"
//           placeholder="Description"
//           name="description"
//           value={newTask.description}
//           onChange={handleInputChange}
//         />
//         {editingTask ? (
//           <button className="btn btn-warning mb-2" onClick={updateTask}>Update</button>
//         ) : (
//           <button className="btn btn-primary mb-2" onClick={addTask}>Add Task</button>
//         )}
//       </div>
//       <ul className="list-group">
//         {tasks.map((task) => (
//           <li className="list-group-item d-flex justify-content-between align-items-center" key={task.id}>
//             <div>
//               <strong>{task.title}</strong> - {task.description}
//             </div>
//             <div>
//               <button className="btn btn-info btn-sm me-2" onClick={() => handleEdit(task)}>Edit</button>
//               <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>Delete</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TaskComponent;
































// add some beauty in this full stack web page 

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// const TaskComponent = () => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState({ title: '', description: '' });

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/tasks'); // Update with your backend URL
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewTask({ ...newTask, [name]: value });
//   };

//   const addTask = async () => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/tasks', newTask); // Update with your backend URL
//       setTasks([...tasks, response.data]);
//       setNewTask({ title: '', description: '' });
//     } catch (error) {
//       console.error('Error adding task:', error);
//     }
//   };

//   const deleteTask = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/tasks/${id}`); // Update with your backend URL
//       setTasks(tasks.filter((task) => task.id !== id));
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h1 className="mb-4">Tasks</h1>
//       <div className="mb-3">
//         <input
//           className="form-control me-2 mb-2"
//           type="text"
//           placeholder="Title"
//           name="title"
//           value={newTask.title}
//           onChange={handleInputChange}
//         />
//         <input
//           className="form-control me-2 mb-2"
//           type="text"
//           placeholder="Description"
//           name="description"
//           value={newTask.description}
//           onChange={handleInputChange}
//         />
//         <button className="btn btn-primary mb-2" onClick={addTask}>Add Task</button>
//       </div>
//       <ul className="list-group">
//         {tasks.map((task) => (
//           <li className="list-group-item d-flex justify-content-between align-items-center" key={task.id}>
//             <div>
//               <strong>{task.title}</strong> - {task.description}
//             </div>
//             <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TaskComponent;


















// import React, { useState, useEffect } from 'react';
// import axios from './Axios Configuration';

// const TaskComponent = () => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState({ title: '', description: '' });

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/tasks'); // Update with your backend URL
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewTask({ ...newTask, [name]: value });
//   };

//   const addTask = async () => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/tasks', newTask); // Update with your backend URL
//       setTasks([...tasks, response.data]);
//       setNewTask({ title: '', description: '' });
//     } catch (error) {
//       console.error('Error adding task:', error);
//     }
//   };

//   const deleteTask = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/tasks/${id}`); // Update with your backend URL
//       setTasks(tasks.filter((task) => task.id !== id));
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Tasks</h1>
//       <div>
//         <input
//           type="text"
//           placeholder="Title"
//           name="title"
//           value={newTask.title}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           name="description"
//           value={newTask.description}
//           onChange={handleInputChange}
//         />
//         <button onClick={addTask}>Add Task</button>
//       </div>
//       <ul>
//         {tasks.map((task) => (
//           <li key={task.id}>
//             {task.title} - {task.description}
//             <button onClick={() => deleteTask(task.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TaskComponent;
