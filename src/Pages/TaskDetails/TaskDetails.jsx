import React, { use, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { motion } from 'framer-motion';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
const TaskDetails = () => {
  const { user } = use(AuthContext);
  const taskInfo = useLoaderData();
  const [bidsCount, setBidsCount] = useState(0);
  const [hasBid, setHasBid] = useState(false);

   useEffect(() => {
     const fetchBids = async () => {
       try {
         const res = await fetch(
           `http://localhost:3000/bids?taskId=${taskInfo._id}`
         );
         const data = await res.json();
         setBidsCount(data.length);

         if (user?.email) {
           const alreadyBid = data.some(bid => bid.userEmail === user.email);
           setHasBid(alreadyBid);
         }
       } catch (err) {
         console.error('Error fetching bids:', err);
       }
     };

     fetchBids();
   }, [taskInfo._id, user?.email]);

  const handleBid = async () => {
    if (!user?.email) {
      Swal.fire('Please login to bid on this task.');
      return;
    }

    const newBid = {
      taskId: taskInfo._id,
      userEmail: user.email,
      bidTime: new Date(),
    };

    try {
      const res = await fetch('http://localhost:3000/bids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBid),
      });

      const result = await res.json();

      if (res.ok) {
        setBidsCount(prev => prev + 1);
        setHasBid(true);
        Swal.fire('Success!', 'Your bid has been submitted.', 'success');
      } else {
        Swal.fire(
          'Oops!',
          result.message || 'You already bid on this task.',
          'error'
        );
      }
    } catch (error) {
      Swal.fire('Error', 'Something went wrong while bidding.', 'error');
    }
  };
   const cardVariants = {
     hidden: { opacity: 0, y: 50 },
     visible: {
       opacity: 1,
       y: 0,
       transition: { duration: 0.6, ease: 'easeOut' },
     },
   };

   const textVariants = {
     hidden: { opacity: 0, x: -20 },
     visible: i => ({
       opacity: 1,
       x: 0,
       transition: { delay: i * 0.2, duration: 0.5 },
     }),
   };

   const buttonVariants = {
     rest: { scale: 1, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' },
     hover: {
       scale: 1.05,
       boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
       background: 'linear-gradient(45deg, #84cc16, #22c55e)',
       transition: { duration: 0.3 },
     },
   };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-100 via-emerald-100 to-teal-100 flex items-center justify-center p-4 flex-col space-y-4">
      {/* Display bid count */}
      <motion.div
        className="text-lg text-emerald-800 font-semibold bg-white px-4 py-2 rounded-lg shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {bidsCount} {bidsCount === 1 ? 'person has' : 'people have'} bid on this
        task.
      </motion.div>

      <motion.div
        className="md:max-w-xl max-w-md mx-auto p-8 bg-white rounded-2xl border-2 border-lime-200 shadow-2xl"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-emerald-600 mb-6 font-[Suse]"
          variants={textVariants}
          custom={0}
        >
          {taskInfo.task}
        </motion.h1>
        <motion.p
          className="mb-4 text-gray-700 text-lg"
          variants={textVariants}
          custom={1}
        >
          <strong className="text-emerald-700 font-[Poppins]">Category:</strong>{' '}
          {taskInfo.category}
        </motion.p>
        <motion.p
          className="mb-4 text-gray-700 text-lg font-[Mulish]"
          variants={textVariants}
          custom={2}
        >
          <strong className="text-emerald-700">Deadline:</strong>{' '}
          {taskInfo.deadline}
        </motion.p>
        <motion.p
          className="mb-4 text-gray-700 text-lg font-[sora]"
          variants={textVariants}
          custom={3}
        >
          <strong className="text-emerald-700">Description:</strong>{' '}
          {taskInfo.description}
        </motion.p>
        <motion.p
          className="mb-6 text-gray-700 text-lg font-[mulish]"
          variants={textVariants}
          custom={4}
        >
          <strong className="text-emerald-700">Budget:</strong> $
          {taskInfo.budget}
        </motion.p>

        {/* Bid Button */}
        <motion.button
          onClick={handleBid}
          disabled={hasBid}
          className={`w-full py-3 px-6 text-white font-semibold rounded-lg 
    ${
      hasBid
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-gradient-to-r from-teal-500 to-emerald-500'
    } mb-4`}
          variants={buttonVariants}
          initial="rest"
          whileHover={!hasBid ? 'hover' : ''}
          whileTap={{ scale: 0.95 }}
        >
          {hasBid ? 'You Already Bid' : 'Bid for This Task'}
        </motion.button>

        <Link to="/browseTask">
          <motion.button
            className="w-full py-3 px-6 text-white font-semibold rounded-lg bg-gradient-to-r from-lime-500 to-emerald-500"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            Go To Task
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default TaskDetails;
