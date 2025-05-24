import React, { use } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';
import { Helmet } from 'react-helmet-async';
const AddTask = () => {
  const { user } = use(AuthContext);
  const handleAddTask = e => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newTask = Object.fromEntries(formData.entries());
    console.log(newTask);
    //send task to db
    fetch(
      'https://quick-lance-server-hd5bht5fm-abedinalways-projects.vercel.app/tasks',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      }
    )
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Successfully added a task',
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
        }
      });
  };
  return (
    <div className=" bg-gray-100 ">
      <Helmet>
        <title>Add-Task</title>
      </Helmet>
      <h2 className="text-4xl font-bold mb-2 py-4 text-center font-[Suse] dark:text-blue-600">
        Post a Task
      </h2>
      <form
        onSubmit={handleAddTask}
        className="md:max-w-md max-w-sm mx-auto bg-white border border-amber-200 p-6 rounded-xl shadow-xl space-y-2 animate-fade-in font-[raleway] dark:text-blue-800"
      >
        <div className="flex flex-col gap-2">
          <label className="label font-bold">Task</label>
          <input
            type="text"
            name="task"
            placeholder="Task Title"
            required
            className="max-w-md border p-2 rounded focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="label font-bold">Category</label>
          <select
            name="category"
            required
            className="max-w-md border p-2 rounded text-blue-800 outline-blue-500"
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
            placeholder="Description"
            required
            className="max-w-md border p-2 rounded h-24 outline-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="label font-bold">Deadline</label>
          <input
            type="date"
            name="deadline"
            required
            className="max-w-md border p-2 rounded focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="label font-bold">Budget</label>
          <input
            type="number"
            name="budget"
            placeholder="Budget (USD)"
            required
            className="max-w-md border p-2 rounded focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="label font-bold">Email</label>
          <input
            type="email"
            name="email"
            value={user?.email || ''}
            readOnly
            className="max-w-md border p-2 rounded focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="label font-bold">Name</label>
          <input
            type="text"
            name="name"
            value={user?.displayName || ''}
            readOnly
            className="max-w-md border p-2 rounded focus:outline-blue-500"
          />
        </div>
        <button
          type="submit"
          className="md:w-101 w-86 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition cursor-pointer mb-2 mt-2"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
