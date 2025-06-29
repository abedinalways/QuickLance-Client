import React from 'react';
import Banner from '../../Components/Banner/Banner';
import { Link, useLoaderData } from 'react-router';
import TaskCard from '../../Components/TaskCard/TaskCard';
import FreelancerGrid from '../../Components/Freelancers/FreelancerGrid';
import TestimonialCarousel from '../../Components/Testimonial/TestimonialCarousel';
import FreelancerStories from '../../Components/FreelancerStories/FreelancerStories';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const tasks = useLoaderData();
  console.log(tasks);
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Banner />
      <div className="">
        <h1 className="text-center font-extrabold font-[Suse] text-3xl md:text-5xl mt-4 text-blue-800 dark:text-white">
          Featured Tasks
        </h1>
        <p className="text-center font-extrabold font-[Mulish] text-sm md:text-md mt-4 text-blue-800 dark:text-white">
          Explore the best jobs that suit you
        </p>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center md:px-10 px-2 my-6">
          {tasks.map(taskData => (
            <TaskCard key={taskData._id} taskData={taskData}></TaskCard>
          ))}
        </div>
        <Link to="/browseTask" className="flex justify-center text-xl btn-link font-[suse] font-bold text-blue-800 dark:text-white">
          Explore More Tasks
        </Link>
      </div>
      <FreelancerGrid />
      <TestimonialCarousel />
      <FreelancerStories />
    </>
  );
};

export default Home;