import React from 'react';
import Navbar from './Navbar';

const Home = () => {
  return (
    
    <div className='w-full h-screen mb-10'>
      <Navbar/>
    <div className='max-w-[1000px] -mt-10 mx-auto px-8 flex flex-col justify-center h-full'>
    <h4 className='max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-[50px] text-2xl sm:text-3xl font-bold text-[#8892b0]'>
          Upcoming Events
    </h4>
    <ol class="relative border-l border-gray-200 dark:border-gray-700">                  
        <li class="mb-10 ml-6">            
            <span class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-teal-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-teal-900">
                <svg aria-hidden="true" class="w-3 h-3 text-teal-600 dark:text-teal-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
            </span>
            <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">CBIT HackTober Fest <span class="bg-teal-100 text-teal-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-teal-200 dark:text-teal-800 ml-3">Latest</span></h3>
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">started on October 29th, 2022</time>
            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">COSC is back with its flagship event.
            This event provides you a platform to enhance your technical skills and showcase your talents by contributing to the Open Source Community.</p>
            <a href="https://cdn.discordapp.com/attachments/1033436594142711868/1035943129704058902/EventHandbook_2022.pdf" class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-teal-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-teal-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
            <svg class="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd"></path></svg> Download HandBook</a>
        </li>
        <li class="mb-10 ml-6">
            <span class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-teal-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-teal-900">
                <svg aria-hidden="true" class="w-3 h-3 text-teal-600 dark:text-teal-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
            </span>
            <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">AURA 2022</h3>
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">On November 4th and 5th 2022</time>
            <p class="text-base font-normal text-gray-500 dark:text-gray-400">AURA 2022 are open, we CBITians as one, Lets spread the word to all possible colleges and universities to participate in this INTER  ENGINEERING COLLEGE SPORTS  MEET conducted by us and make it a successful one. </p>
            <a href="#" class="inline-flex items-center text-teal-600 hover:underline">
                See our guideline
                <svg class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
            </a>
        </li>
        <li class="ml-6">
            <span class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-teal-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-teal-900">
                <svg aria-hidden="true" class="w-3 h-3 text-teal-600 dark:text-teal-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
            </span>
            <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">XSpread Hackathon</h3>
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">On November 11th and 12th 2022</time>
            <p class="text-base font-normal text-gray-500 dark:text-gray-400">This XSpread Hackathon will challenge the coding skills of the participants and will help the students in improved success rate in campus placements and securing internships with higher packages.</p>
            <a href="#" class="inline-flex items-center text-teal-600 hover:underline">
                See our guideline
                <svg class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
            </a>
        </li>
    </ol>
</div>
</div>
  );
};

export default Home;
