import React from 'react';
import { Link, useLoaderData } from 'react-router';

const BrowseTasks = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="overflow-x-auto mt-4 bg-gray-100">
      <h1 className='text-4xl font-bold font-[Suse] text-center m-3 text-blue-800'>All Tasks</h1>
      <table className="table w-40 md:w-220 bg-yellow-50 mx-auto mt-6 mb-4 border-amber-200">
        <thead className="text-sm md:text-xl font-bold text-blue-800 font-[Mulish] ">
          <tr>
            <th>Task</th>
            <th>Category</th>
            <th>Deadline</th>
            <th>Details</th>
          </tr>
        </thead>
        {data.map(taskData => (
          <tbody
            key={taskData._id}
            className="text-xs md:text-[15px] font-[Suse] text-lime-800 font-bold"
          >
            <tr className="">
              <td className="">
                <h1>{taskData.task}</h1>
              </td>
              <td className="">
                <h1>{taskData.category}</h1>
              </td>
              <td className="">
                <p>{taskData.deadline}</p>
              </td>
              <th className="">
                <Link to={`/allTasks/${taskData._id}`}>
                  <button className="btn btn-ghost btn-sm text-green-800 bg-white">
                    Details
                  </button>
                </Link>
              </th>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default BrowseTasks;