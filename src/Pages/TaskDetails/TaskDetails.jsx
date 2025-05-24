import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../Context/AuthContext';
import toast from 'react-hot-toast';

const TaskDetails = () => {
  const task = useLoaderData();
  const { user } = useContext(AuthContext);
  const [hasBid, setHasBid] = useState(false);
  const [bidsCount, setBidsCount] = useState(0);

  useEffect(() => {
    // Fetch existing bids for the task to get count and check if user already bid
    const fetchBids = async () => {
      try {
        const res = await fetch(
          `https://quick-lance-server.vercel.app/bids?taskId=${task._id}`
        );
        const data = await res.json();
        setBidsCount(data.length);

        const userAlreadyBid = data.find(bid => bid.userEmail === user?.email);
        if (userAlreadyBid) setHasBid(true);
      } catch (error) {
        toast.error('Failed to load bid info');
      }
    };

    if (user?.email) {
      fetchBids();
    }
  }, [task._id, user?.email]);

  const handleBid = async () => {
    if (hasBid) {
      toast.error('You have already bid this task');
      return;
    }

    const bidInfo = {
      taskId: task._id,
      userEmail: user.email,
      bidTime: new Date(),
    };

    try {
      const res = await fetch('https://quick-lance-server.vercel.app/bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bidInfo),
      });

      const result = await res.json();
      if (result.insertedId) {
        toast.success('You have successfully bid this task');
        setBidsCount(prev => prev + 1);
        setHasBid(true);
      } else {
        toast.error('Failed to place bid');
      }
    } catch (error) {
      toast.error('Error placing bid');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-lime-100 to-emerald-100 px-4 py-8">
      <Helmet>
        <title>Task Details</title>
      </Helmet>

      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 border border-teal-200">
        <p className="text-lg font-semibold text-center text-purple-800 font-[Mulish] mb-4">
          You bid for {bidsCount} opportunit{bidsCount === 1 ? 'y' : 'ies'}.
        </p>

        <h2 className="text-3xl font-bold text-center text-emerald-700 mb-6 font-[Sora]">
          Task Details
        </h2>

        <div className="space-y-4 font-[Mulish] text-blue-800 text-base md:text-lg">
          <p>
            <strong>Title:</strong> {task.task}
          </p>
          <p>
            <strong>Category:</strong> {task.category}
          </p>
          <p>
            <strong>Deadline:</strong> {task.deadline}
          </p>
          <p>
            <strong>Budget:</strong> ${task.budget}
          </p>
          <p>
            <strong>Description:</strong> {task.description}
          </p>
          <p>
            <strong>Status:</strong> {task.status || 'Open'}
          </p>
          <p>
            <strong>Posted By:</strong> {task.email}
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleBid}
            disabled={hasBid}
            className="btn btn-primary bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full disabled:opacity-50"
          >
            {hasBid ? 'Already Bid' : 'Bid'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
