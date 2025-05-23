import React from 'react';
import { MapPin, Clock, Tag } from 'lucide-react';

const TaskCard = ({ taskData }) => {
  const { task, description, category, deadline, budget } = taskData;

  const getDaysLeft = dateStr => {
    const today = new Date();
    const deadlineDate = new Date(dateStr);
    const timeDiff = deadlineDate - today;
    return Math.max(Math.ceil(timeDiff / (1000 * 60 * 60 * 24)), 0);
  };

  const daysLeft = getDaysLeft(deadline);

  return (
    <div className="border border-yellow-200 bg-yellow-50 p-5 rounded-2xl shadow-sm w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-300 text-black font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm">
            R
          </div>
          <span className="font-medium text-sm text-gray-800 font-[Mulish]">
            Remote Client
          </span>
        </div>
        <div className="text-sm text-green-600 font-semibold font-[sora]">
          {daysLeft} days left
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-1 font-[raleway]">{task}</h2>
      <p className="text-sm text-gray-700 mb-3 font-[Suse]">{description}</p>

      <div className="flex flex-wrap text-blue-600 text-sm gap-4 mb-4 font-[Ubuntu]">
        <div className="flex items-center gap-1">
          <MapPin size={16} />
          Remote
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} />
          Flexible
        </div>
        <div className="flex items-center gap-1">
          <Tag size={16} />
          {category}
        </div>
      </div>

      <div className="flex justify-between items-center font-[Poppins]">
        <span className="text-gray-800 font-bold">${budget}/month</span>
        <span className="text-yellow-500 text-lg">🔥</span>
      </div>
    </div>
  );
};

export default TaskCard;
