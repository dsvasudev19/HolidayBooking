import React, { FC } from 'react'
import ButtonSecondary from 'shared/Button/ButtonSecondary'

interface RoomCardProps{
    Image: any;
    RoomType: String;
    Services: String;
    Price: String;
}

const RoomCard : FC<RoomCardProps> = ({Image, RoomType, Services, Price}) => {
  return (
    <div>
          <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-10 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-2xl font-semibold">Selected Room </h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="flex flex-col sm:flex-row sm:items-center">
          {/* Left Side (Title) */}
          <div className=" w-full sm:w-4/5 mt-[-0.5rem]">
            <div className="text-2xl font-semibold mb-3">{RoomType} ✅</div>
            <div className="text-neutral-6000 dark:text-neutral-300 mt-3 mb-2">
              {Services}
            </div>
            {/* Icon Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300">
              <div className="flex items-center mt-4">
                <div className="flex items-center">
                  <div className="mr-2">
                    <i className="text-3xl las la-wifi"></i>
                  </div>
                  <div className="text-neutral-6000 dark:text-neutral-300">
                    Wifi
                  </div>
                </div>
                <div className="flex items-center ms-5">
                  <div className="mr-2">
                    <i className="text-3xl las la-utensils"></i>
                  </div>
                  <div className="text-neutral-6000 dark:text-neutral-300">
                    Dining
                  </div>
                </div>
                <div className="flex items-center ms-5">
                  <div className="mr-2">
                    <i className="text-3xl las la-dumbbell"></i>
                  </div>
                  <div className="text-neutral-6000 dark:text-neutral-300">
                    Gym
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Side (Image) */}
          <div className="flex-shrink-0 w-full sm:w-1/6 mt-3">
            <div className="aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <img
                alt=""
                className="absolute inset-0 object-cover"
                sizes="200px"
                src={Image}
              />
            </div>
          </div>
        </div>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="flex justify-between items-center">
          <ButtonSecondary>Selected</ButtonSecondary>
          <span className="font-semibold px-2">₹ {Price}</span>
        </div>
      </div>
        
  
    </div>
  )
}

export default RoomCard