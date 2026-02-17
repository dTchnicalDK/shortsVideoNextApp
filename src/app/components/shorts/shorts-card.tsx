import { Card } from "@/components/ui/card";
import { Video } from "@imagekit/next";
import { Prisma } from "@prisma/client";
import {
  HeartIcon,
  MessageCircleIcon,
  PlayIcon,
  ShareIcon,
  Volume2Icon,
} from "lucide-react";
import React from "react";

type ShortsCardProps = {
  short: Prisma.ShortsGetPayload<{
    include: { user: { select: { clerkUserId: true; email: true } } };
  }>;
};

const ShortsCard: React.FC<ShortsCardProps> = ({ short }) => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-gradient-to-b from-gray-900 to-black overflow-hidden relative snap-start">
      <Card className="relative w-full max-w-[360px] mx-auto overflow-hidden rounded-2xl shadow-2xl border border-gray-800">
        {/* Video Container - Fixed aspect ratio with proper containment */}
        <div className="relative aspect-[9/16] w-full bg-black overflow-hidden">
          {/* Video wrapper to handle sizing correctly */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <Video
              urlEndpoint={
                short.url ||
                "https://ik.imagekit.io/slot5gzjg/sample-video.mp4?updatedAt=1771312705297"
              }
              src={
                short.url ||
                "https://ik.imagekit.io/slot5gzjg/sample-video.mp4?updatedAt=1771312705297"
              }
              controls={true} // Hide default controls for custom ones
              transformation={[{ width: 360, height: 640 }]}
              className="w-full h-full object-contain" // Changed to object-contain to maintain aspect ratio
            />
          </div>

          {/* Custom minimal controls */}
          {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" /> */}

          {/* Play/Pause button overlay */}
          {/* <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
            <PlayIcon className="w-6 h-6 text-white ml-1" />
          </button> */}

          {/* Video controls bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            {/* Progress bar */}
            {/* <div className="mb-3">
              <div className="h-1 bg-gray-600/50 rounded-full overflow-hidden cursor-pointer">
                <div className="h-full w-1/3 bg-red-500 rounded-full" />
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-300">
                <span>0:15</span>
                <span>1:24</span>
              </div>
            </div> */}

            {/* Caption Section */}
            <div className="flex items-start gap-3">
              {/* User Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0" />

              {/* Caption Text */}
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium line-clamp-2 leading-relaxed">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Aliquam assumenda, odit alias ipsam harum praesentium
                  molestias earum iste temporibus quidem!
                </p>
                <button className="text-xs text-gray-300 mt-1 font-semibold hover:text-white transition-colors">
                  more
                </button>
              </div>
            </div>
          </div>

          {/* Top right controls */}
          <div className="absolute top-3 right-3 flex gap-2">
            <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-white font-medium">
              0:15 / 1:24
            </div>
            <button className="bg-black/60 backdrop-blur-sm p-1.5 rounded-md hover:bg-black/80 transition-colors">
              <Volume2Icon className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Video Info Section */}
        <div className="bg-gray-900 p-3 border-t border-gray-800">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                <HeartIcon className="w-4 h-4" />
                <span>2.1k</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                <MessageCircleIcon className="w-4 h-4" />
                <span>48</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                <ShareIcon className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
            <span>2d ago</span>
          </div>
        </div>
      </Card>

      {/* Side Action Buttons */}
      <div className="absolute right-4 bottom-20 flex flex-col gap-4">
        <button className="bg-gray-800/80 backdrop-blur-sm p-3 rounded-full hover:bg-gray-700 transition-colors group">
          <HeartIcon className="w-5 h-5 text-white group-hover:text-red-500 transition-colors" />
        </button>
        <button className="bg-gray-800/80 backdrop-blur-sm p-3 rounded-full hover:bg-gray-700 transition-colors relative">
          <MessageCircleIcon className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>
        <button className="bg-gray-800/80 backdrop-blur-sm p-3 rounded-full hover:bg-gray-700 transition-colors">
          <ShareIcon className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {[1, 2, 3, 4].map((item) => (
          <button
            key={item}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              item === 1
                ? "bg-white scale-110"
                : "bg-gray-500 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ShortsCard;
