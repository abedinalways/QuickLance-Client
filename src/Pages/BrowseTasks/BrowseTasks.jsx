import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink, useLoaderData, useNavigate } from 'react-router';
import { FaHome } from 'react-icons/fa';


const BrowseTasks = () => {
  const data = useLoaderData(); 
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterCategory, setFilterCategory] = useState('');
  const navigate = useNavigate();

  // Sorting logic
  const sortedTasks = [...data].sort((a, b) => {
    return sortOrder === 'asc' ? a.budget - b.budget : b.budget - a.budget;
  });

  // Filtering logic
  const filteredTasks = filterCategory
    ? sortedTasks.filter(task => task.category === filterCategory)
    : sortedTasks;

  return (
    <div className="p-4 font-[Suse]">
      <Helmet>
        <title>Browse-Tasks</title>
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-gray-100 rounded-xl p-3 mb-4">
        <div className="flex items-center gap-2 text-blue-600">
          <NavLink to="/">
            <FaHome />
          </NavLink>
          /
          <NavLink
            to="/browseTask"
            className={({ isActive }) =>
              isActive ? 'font-bold text-blue-900' : ''
            }
          >
            All-Tasks
          </NavLink>
        </div>
        <h1 className="text-2xl font-bold mt-2 text-black">All Tasks Here</h1>
      </div>

      {/* Sort & Filter Controls */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div>
          <label className="mr-2 font-semibold">Sort by Budget:</label>
          <select
            className="select select-sm select-bordered"
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
          >
            <option value="asc">Low → High</option>
            <option value="desc">High → Low</option>
          </select>
        </div>

        <div>
          <label className="mr-2 font-semibold">Filter by Category:</label>
          <select
            className="select select-sm select-bordered"
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
          >
            <option value="">All</option>
            {[...new Set(data.map(task => task.category))].map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTasks.map(task => (
          <div
            key={task._id}
            className="card bg-yellow-50 shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition duration-300 flex flex-col"
          >
            
            <div className="card-body flex flex-col justify-between">
              <h2 className="text-lg font-bold text-gray-800">{task.task}</h2>
              <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                {task.description}
              </p>
              <div className="text-sm text-gray-700 flex justify-between mb-3">
                <span>Category: {task.category}</span>
                <span>Budget: ${task.budget}</span>
              </div>
              <div className='flex justify-center items-center font-bold text-gray-600'>DeadLine: {task.deadline}</div>
              <button
                className="btn btn-sm btn-primary w-full"
                onClick={() => navigate(`/allTasks/${task._id}`)}
              >
                See More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseTasks;
