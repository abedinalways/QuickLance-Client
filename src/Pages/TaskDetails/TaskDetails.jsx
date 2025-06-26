import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../Context/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const TaskDetails = () => {
  const task = useLoaderData();
  const { user } = useContext(AuthContext);
  const [hasBid, setHasBid] = useState(false);
  const [bidsCount, setBidsCount] = useState(0);
  const [isLoadingBids, setIsLoadingBids] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBids = async () => {
      if (!user) {
        setIsLoadingBids(false);
        return;
      }

      try {
        const token = await user.getIdToken();
        const res = await fetch(
          `http://localhost:3000/bids?taskId=${task._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.message || `HTTP error! Status: ${res.status}`
          );
        }

        const data = await res.json();
        setBidsCount(data.length);
        const userAlreadyBid = data.find(bid => bid.userEmail === user.email);
        setHasBid(!!userAlreadyBid);
        setIsLoadingBids(false);
      } catch (error) {
        console.error('Error fetching bids:', error);
        toast.error(error.message || 'Failed to load bid info');
        setIsLoadingBids(false);
      }
    };

    if (user?.email) {
      fetchBids();
    } else {
      setIsLoadingBids(false);
    }
  }, [task._id, user]);

  const handleBid = async () => {
    if (hasBid) {
      toast.error('You have already bid on this task');
      return;
    }

    if (!user) {
      toast.error('You must be logged in to place a bid');
      navigate('/login');
      return;
    }

    try {
      const token = await user.getIdToken();
      const bidInfo = {
        taskId: task._id.toString(), // Ensure taskId is a string
        userEmail: user.email,
        bidTime: new Date().toISOString(),
      };

      const res = await fetch('http://localhost:3000/bids', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bidInfo),
      });

      const result = await res.json();
      if (res.ok && result.insertedId) {
        toast.success('You have successfully bid this task');
        setBidsCount(prev => prev + 1);
        setHasBid(true);
      } else {
        throw new Error(result.message || 'Failed to place bid');
      }
    } catch (error) {
      console.error('Error placing bid:', error);
      toast.error(error.message || 'Error placing bid');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-teal-50 via-lime-100 to-emerald-100 px-4 py-8"
    >
      <Helmet>
        <title>Task Details</title>
      </Helmet>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 border border-teal-200"
      >
        <h2 className="bg-amber-200 w-50 text-md font-semibold text-center text-purple-800 font-[Mulish] mb-4">
          You bid for {bidsCount} opportunit{bidsCount === 1 ? 'y' : 'ies'}.
        </h2>

        <h2 className="text-3xl font-bold text-center text-emerald-700 mb-6 font-[Sora]">
          Task Details
        </h2>

        <div className="space-y-4 font-[Mulish] text-blue-800 text-base md:text-lg">
          <p>
            <strong className="text-orange-600 font-bold font-[Susu]">
              Title:
            </strong>{' '}
            {task.task}
          </p>
          <p>
            <strong className="text-orange-600 font-bold font-[Susu]">
              Category:
            </strong>{' '}
            {task.category}
          </p>
          <p>
            <strong className="text-orange-600 font-bold font-[Susu]">
              Deadline:
            </strong>{' '}
            {task.deadline}
          </p>
          <p>
            <strong className="text-orange-600 font-bold font-[Susu]">
              Budget:
            </strong>{' '}
            ${task.budget}
          </p>
          <p>
            <strong className="text-orange-600 font-bold font-[Susu]">
              Description:
            </strong>{' '}
            {task.description}
          </p>
          <p>
            <strong className="text-orange-600 font-bold font-[Susu]">
              Status:
            </strong>{' '}
            {task.status || 'Open'}
          </p>
          <p>
            <strong className="text-orange-600 font-bold font-[Susu]">
              Posted By:
            </strong>{' '}
            {task.email}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <motion.button
            onClick={handleBid}
            disabled={hasBid || isLoadingBids}
            whileHover={!(hasBid || isLoadingBids) ? { scale: 1.05 } : {}}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-2 rounded-full font-semibold transition-all duration-300 ${
              hasBid || isLoadingBids
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white shadow-md'
            }`}
          >
            {isLoadingBids
              ? 'Loading...'
              : hasBid
              ? 'Already Bid'
              : 'Place Bid'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/browseTask')}
            className="text-sm px-5 py-2 border border-green-500 rounded-full text-green-700 hover:bg-green-100 font-medium"
          >
            ← Back to Tasks
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TaskDetails;
