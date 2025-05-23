import React, { useEffect, useState } from 'react';
import { testimonials } from './testimonialsData';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);
  const [displayedQuote, setDisplayedQuote] = useState('');
  const current = testimonials[index];
  
  useEffect(() => {
    setDisplayedQuote('');
    let i = 0;
    const quote = testimonials[index].quote; 
    const typingInterval = setInterval(() => {
      if (i <= quote.length) {
        setDisplayedQuote(quote.slice(0, i + 1)); 
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    return () => clearInterval(typingInterval);
  }, [index, testimonials]);


  const next = () => setIndex(prev => (prev + 1) % testimonials.length);
  const prev = () =>
    setIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="max-w-7xl mx-auto py-16 px-4 text-center">
      <h2 className="text-center font-extrabold font-[Suse] text-3xl md:text-5xl mt-4 text-blue-800 dark:text-white">
        What Our Users Saying About Us
      </h2>
      <p className="text-center font-extrabold font-[Mulish] text-sm md:text-md mt-4 text-blue-800 mb-4 dark:text-white">
        Hear directly from our satisfied customers about their experiences{' '}
        <br /> and how we've helped them achieve their goals.
      </p>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="card border border-yellow-200 p-6 md:h-60">
          <p className="text-gray-500 mb-2 font-[Suse]">Rating</p>
          <h3 className="text-4xl font-bold mb-1 font-[Poppins]">
            4.9<span className="text-xl">/5</span>
          </h3>
          <div className="rating rating-md mb-1 mx-auto">
            {[...Array(5)].map((_, i) => (
              <input
                key={i}
                type="radio"
                name="rating"
                className={`mask mask-star-2 bg-green-500`}
                checked={i < 4.5}
                readOnly
              />
            ))}
          </div>
          <p className="text-gray-500 text-sm mb-2 font-[Mulish]">Based on 1,254 reviews</p>
          <p className="text-green-600 font-semibold flex justify-center items-center gap-1">
            <span className="text-green-700 text-xl font-[Suse]">★</span> Trustpilot
          </p>
        </div>

        <div className="md:col-span-2">
          <div className="card rounded-lg border border-amber-200 p-6 text-left relative shadow-md">
            
            <Quote className="w-8 h-8 text-blue-500 mb-4" />
            
            <p key={index} className="text-gray-700 italic mb-4 min-h-[80px] font-[Mulish] dark:text-white">
              {' '}
              
              {displayedQuote}
              <span className="animate-pulse">|</span>{' '}
              
            </p>
            <div className="flex items-center gap-4">
              
              <img
                src={current.image}
                className="w-12 h-12 rounded-full object-cover"
                alt={current.name}
                
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/48x48/CCCCCC/FFFFFF?text=${current.name.charAt(
                    0
                  )}`;
                }}
              />
              <div>
                
                <p className="font-bold">{current.name}</p>
                <p className="text-sm text-gray-500">{current.role}</p>
              </div>
            </div>

            
            <div className="absolute bottom-4 right-6 flex gap-2">
              
              <button
                className="btn btn-sm btn-circle border border-gray-300 bg-white hover:bg-gray-100 text-gray-700"
                onClick={prev}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              
              <button
                className="btn btn-sm btn-circle border border-gray-300 bg-white hover:bg-gray-100 text-gray-700"
                onClick={next}
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          
          <div className="w-full h-1 bg-gray-200 mt-2 rounded-full overflow-hidden">
            <div
              className="bg-black h-full transition-all duration-500"
              style={{ width: `${((index + 1) / testimonials.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
