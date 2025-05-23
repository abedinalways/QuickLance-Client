import React from 'react';
import {data} from './data'
import { Star } from 'lucide-react';
import { Fade, Slide } from 'react-awesome-reveal';
const FreelancerCard = ({freelancer}) => {
  const { name, rating, role, rate, tags, featured, image } = freelancer;

  return (
    <Fade cascade damping={0.1} triggerOnce>
      <Slide direction="up" triggerOnce>
        <div className="bg-gray-200 p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 dark:bg-white">
          <img
            src={image}
            alt={name}
            className="rounded-xl w-full h-65 object-cover mb-3"
          />
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-semibold text-lg text-orange-600 font-[Suse]">{name}</h3>
            {featured && (
              <span className="text-xs bg-yellow-300 text-black px-2 py-0.5 rounded font-semibold">
                Featured
              </span>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            {rating} • {role}
          </div>
          <div className="text-sm font-medium mb-2 text-gray-800">From {rate}</div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Slide>
    </Fade>
  );

};

const FreelancerGrid = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-center font-extrabold font-[Suse] text-3xl md:text-5xl mt-4 text-blue-800 dark:text-white mb-6">
        Explore Top Talent
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map(freelancer => (
          <FreelancerCard key={freelancer.id} freelancer={freelancer} />
        ))}
      </div>
    </div>
  );
};

export default FreelancerGrid;
