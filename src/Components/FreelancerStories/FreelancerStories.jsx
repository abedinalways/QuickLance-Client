import React, { useState } from 'react';
import { FaQuoteLeft, FaStar, FaRegStar } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import { Button } from './Button';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const freelancers = [
  {
    name: 'Nav Paul',
    title: 'UX/UI Designer',
    quote:
      'I love the freedom freelancing gives me to create designs I’m passionate about.',
    rating: 4,
    image: 'https://i.ibb.co/BxgJBYm/pexels-jeffreyreed-769772.jpg',
  },
  {
    name: 'Susie G. Lucii',
    title: 'Online Store Owner',
    quote: 'Freelancing helped me build my business from the ground up.',
    rating: 5,
    image: 'https://i.ibb.co/yndq2src/pexels-shkrabaanthony-7163426.jpg',
  },
  {
    name: 'Jamie Carter',
    title: 'Graphic Artist',
    quote: 'Freelancing allows me to express my creativity without limits.',
    rating: 5,
    image: 'https://i.ibb.co/4ZsDXpLr/pexels-tiger-lily-4484077.jpg',
  },
  {
    name: 'Li Chian',
    title: 'Web Developer',
    quote:
      'The flexibility of freelancing has transformed my work-life balance.',
    rating: 4,
    image: 'https://i.ibb.co/Y7cKp3g3/pexels-gabby-k-5384445.jpg',
  },
  {
    name: 'Okan H. Kobu',
    title: 'Content Writer',
    quote: 'I enjoy crafting stories and helping brands grow through my words.',
    rating: 3,
    image:
      'https://i.ibb.co/9HRC82r4/pexels-victor-oluwa-324310690-17555801.jpg',
  },
];

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= rating ? (
        <FaStar key={i} className="text-green-500" />
      ) : (
        <FaRegStar key={i} className="text-gray-300" />
      )
    );
  }
  return <div className="flex gap-1">{stars}</div>;
};

const FreelancerStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? freelancers.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === freelancers.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-2 text-primary font-[Suse]">
        <Typewriter
          words={['Freelancer Success Stories']}
          loop={false}
          cursor
          cursorStyle="_"
          typeSpeed={70}
        />
      </h2>
      <p className="text-blue
      -600 mb-10 dark:text-white">
        Discover how real freelancers transformed their careers, built thriving
        businesses, and embraced the freedom of working on their own terms.
      </p>

      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center transition-all duration-500">
          {[
            freelancers[currentIndex],
            freelancers[(currentIndex + 1) % freelancers.length],
          ].map((freelancer, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row gap-6 items-center"
            >
              <img
                src={freelancer.image}
                alt={freelancer.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-primary"
              />
              <div className="text-left">
                <FaQuoteLeft className="text-2xl text-blue-600 mb-2" />
                <p className="italic text-gray-700 mb-2">
                  “{freelancer.quote}”
                </p>
                <StarRating rating={freelancer.rating} />
                <h4 className="mt-2 font-semibold">{freelancer.name}</h4>
                <p className="text-sm text-gray-500">{freelancer.title}</p>
              </div>
            </div>
          ))}
        </div>
        <Button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2"
        >
          <FaChevronLeft />
        </Button>

        <Button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2"
        >
          <FaChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default FreelancerStories;
