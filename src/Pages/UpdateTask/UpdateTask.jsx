import React, { use, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';


const UpdateTask = () => {
  const { user } = use(AuthContext);
  const loadedTask = useLoaderData();
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    task: '',
    category: '',
    description: '',
    deadline: '',
    budget: '',
    email: '',
    name: '',
  });

  useEffect(() => {
    if (loadedTask) {
      setTaskData(loadedTask);
    }
  }, [loadedTask]);

  const handleChange = e => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateTask = e => {
    e.preventDefault();

    fetch(`http://localhost:3000/allTasks/${loadedTask._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Task updated successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/postedTasks');
        }
      });
  };

  return (
    <div className=" bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 mt-2 text-center font-[Suse]">
        Update Task
      </h2>
      <form
        onSubmit={handleUpdateTask}
        className="md:max-w-md max-w-sm mx-auto bg-white p-6 rounded-xl shadow-lg space-y-2 animate-fade-in font-[raleway]"
      >
        <div className="flex flex-col gap-2">
          <label className="label font-bold">Task</label>
          <input
            type="text"
            name="task"
            value={taskData.task}
            onChange={handleChange}
            required
            className="max-w-md border p-2 rounded focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="label font-bold">Category</label>
          <select
            name="category"
            value={taskData.category}
            onChange={handleChange}
            required
            className="max-w-md border p-2 rounded text-gray-700 outline-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Development">Web Development</option>
            <option value="Design">Design</option>
            <option value="Writing">Content Writing</option>
            <option value="Marketing">Digital Marketing</option>
            <option value="Book_Design">Book Design</option>
            <option value="Editing">Video Editing</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="label font-bold">Description</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            required
            className="max-w-md border p-2 rounded h-24 outline-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="label font-bold">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={taskData.deadline}
            onChange={handleChange}
            required
            className="max-w-md border p-2 rounded focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="label font-bold">Budget</label>
          <input
            type="number"
            name="budget"
            value={taskData.budget}
            onChange={handleChange}
            required
            className="max-w-md border p-2 rounded focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="label font-bold">Email</label>
          <input
            type="email"
            name="email"
            value={taskData.email}
            readOnly
            className="max-w-md border p-2 rounded focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="label font-bold">Name</label>
          <input
            type="text"
            name="name"
            value={taskData.name}
            readOnly
            className="max-w-md border p-2 rounded focus:outline-blue-500"
          />
        </div>
        <button
          type="submit"
          className="md:w-101 w-86 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition cursor-pointer mb-2 mt-2"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
