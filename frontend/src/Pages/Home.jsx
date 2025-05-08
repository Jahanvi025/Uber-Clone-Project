import React, { useEffect, useState } from 'react';
import imgcar from "../assets/uber-Photoroom.png"
import robotimg from "../assets/robot-protecting-world-Photoroom.png"
import { Car, Bike, Bus } from 'lucide-react'; 
const Home = () => {
  const categoryIcons = {
    Car: <Car size={20} className="text-white" />,
    Motorcycle: <Bike size={20} className="text-white" />,
    Auto: <Bus size={20} className="text-white" />
  };
  
  const riders = [
    { name: 'Ravi Sharma', category: 'Car', location: 'Delhi, India' },
    { name: 'Anjali Menon', category: 'Motorcycle', location: 'Bangalore, India' },
    { name: 'Karan Singh', category: 'Auto', location: 'Pune, India' },
    { name: 'Sophie Müller', category: 'Car', location: 'Berlin, Germany' },
  { name: 'Ali Reza', category: 'Motorcycle', location: 'Tehran, Iran' },
  { name: 'Luis Garcia', category: 'Auto', location: 'Mexico City, Mexico' }
  ];
  

  return (
    <div className="h-fit w-full bg-[radial-gradient(circle_at_center,_#4A4062_0%,_#2C2B3D_40%,_#1B1B28_100%)] relative ">
      <div className='flex flex-col justify-between items-center'>
         <div className='relative pl-36 pt-24'>
          <div className='flex flex-col justify-center'>
          <h1 className='text-amber-50 text-4xl font-sans font-semibold text-left'>YOUR RIDE, YOUR WAY</h1>
          <p className='text-neutral-400 text-base font-sans text-left mt-4 w-1/2'>Whether you're commuting to work, heading out with friends, or catching a last-minute flight, our ride-hailing platform connects you to safe, reliable, and affordable transportation in just a few taps.</p>
          </div>
         
            <hr className='text-neutral-400 w-1/3 absolute top-30 left-[38%]'/>

         </div>
      
      <div className='ml-[-460px] z-20 mt-[-200px]'>
        <img src={imgcar} alt="carimg"  className='w-4xl'/>
      </div>

    </div>
    <div className='absolute bg-neutral-950 w-1/3 h-7/12 px-5 top-44 right-5 rounded-2xl shadow-amber-50 shadow-xs z-10 overflow-y-auto scrollbar-none ' style={{
    overflowY: 'auto',
    scrollbarWidth: 'none',           // Firefox
    msOverflowStyle: 'none'           // IE/Edge
  }}>
    <h2 className='text-xl font-bold mb-4 text-white/90'>🚘 Active Riders</h2>

<div className='space-y-4'>
  {riders.map((rider, index) => (
    <div key={index} className='flex items-start gap-4 p-3 rounded-xl hover:bg-white/20 transition' >
      <div className='p-2 bg-purple-400/30 rounded-full'>
        {categoryIcons[rider.category]}
      </div>
      <div>
        <p className='text-base font-semibold text-white'>{rider.name}</p>
        <p className='text-sm text-white/80'><span className='font-medium'>Category:</span> {rider.category}</p>
        <p className='text-sm text-white/70'><span className='font-medium'>Location:</span> {rider.location}</p>
      </div>
    </div>
  ))}
</div>
    </div>
    <div className='absolute w-1/5 h-8/12 top-72 left-96 z-30 transform scale-x-[-1] '>
      <img src={robotimg} alt='robotimg'/>
    </div>
    </div>
  );
};

export default Home;
