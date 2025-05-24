import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';
import { Link} from 'react-router'
import { Helmet } from 'react-helmet-async';
const PostedTasks = () => {
  const { user } = use(AuthContext);

  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['postedTasks', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/postedTasks?email=${user.email}`
      );
      return res.json();
    },
  });
  
  const handleShowBids = async taskId => {
    try {
      const res = await fetch(`http://localhost:3000/bids?taskId=${taskId}`);
      const data = await res.json();

      const bidCount = data.length;

      Swal.fire({
        title: 'Bids Info',
        text: `This task has ${bidCount} bid${bidCount === 1 ? '' : 's'}.`,
        icon: 'info',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Failed to fetch bids:', error);
      Swal.fire('Error', 'Could not fetch bid data.', 'error');
    }
  };


  const handleDelete = async id => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      const res = await fetch(`http://localhost:3000/allTasks/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.deletedCount > 0) {
        Swal.fire('Deleted!', 'Task has been deleted.', 'success');
        refetch();
      }
    }
  };

  if (isLoading)
    return <div className="text-center mt-10">Loading your tasks...</div>;

  if (tasks.length === 0)
    return <div className="text-center mt-10">No tasks posted yet.</div>;

  return (
    <div className="overflow-hidden px-2 md:px-10 mt-6 min-h-screen bg-gradient-to-br from-lime-100 via-emerald-100 to-teal-100">
      <Helmet>
        <title>My Posted-Tasks</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4 text-center">My Posted Tasks</h2>
      <table className="table md:w-3xl w-sm shadow-2xl rounded-lg mx-auto">
        <thead className="bg-gray-100 md:text-lg font-bold font-[raleway] dark:text-orange-600">
          <tr>
            <th>Title</th>
            <th>Deadline</th>
            <th>Budget</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(taskInfo => (
            <tr key={taskInfo._id} className="font-[sora] text-blue-800">
              <td>{taskInfo.task}</td>
              <td>{taskInfo.deadline}</td>
              <td>${taskInfo.budget}</td>
              <td className="space-x-2 flex flex-col gap-2">
                <Link to={`/updateTask/${taskInfo._id}`}>
                  <button className="btn btn-sm btn-warning w-22">
                    Update
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(taskInfo._id)}
                  className="btn btn-sm btn-error w-22"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleShowBids(taskInfo._id)}
                  className="btn btn-sm btn-info w-22"
                >
                  Bids
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostedTasks;
