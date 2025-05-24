import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router';
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
        `https://quick-lance-server.vercel.app/postedTasks?email=${user.email}`
      );
      return res.json();
    },
  });

  const handleShowBids = async taskId => {
    try {
      const res = await fetch(
        `https://quick-lance-server.vercel.app/bids?taskId=${taskId}`
      );
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
      const res = await fetch(
        `https://quick-lance-server.vercel.app/allTasks/${id}`,
        {
          method: 'DELETE',
        }
      );
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
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-16 px-4"
      >
        <h2 className="text-red-600 dark:text-white text-2xl md:text-4xl font-[Sora] mb-6">
          No tasks posted yet.
        </h2>
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          src="https://i.gifer.com/7VE.gif"
          alt="No tasks"
          className="mx-auto max-w-[300px] md:max-w-[400px] rounded-xl shadow-lg"
        />
      </motion.div>
    );


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
