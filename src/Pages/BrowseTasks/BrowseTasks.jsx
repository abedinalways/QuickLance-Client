import React from 'react';
import { Link, useLoaderData } from 'react-router';

const BrowseTasks = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="overflow-x-auto mt-4 bg-gray-100">
      <table className="table w-40 md:w-220 bg-white mx-auto mt-6">
        <thead className="text-sm md:text-xl font-bold text-lime-900 font-[Mulish] ">
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
            className="text-xs md:text-[15px] font-[sora]"
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
                  <button className="btn btn-ghost btn-sm text-yellow-600">
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