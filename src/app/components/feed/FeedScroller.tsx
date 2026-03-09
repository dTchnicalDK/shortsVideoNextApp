"use client";

import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";

type Short = {
  id: string;
  createdAt: Date;
  updateAt: Date;
  title: string;
  description: string;
  url: string;
  userId: string;
  user: {
    clerkUserId: string;
    email: string;
  };
};

type FeedScrollerProps = {
  shorts: Short[]; // This should be an array of Short objects
};

export default function FeedScroller({ shorts }: FeedScrollerProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  //to handle autoplay policy- detect first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasUserInteracted(true);
      setIsMuted(false);
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
    };
    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);
    document.addEventListener("keydown", handleFirstInteraction);
    document.removeEventListener("scroll", handleFirstInteraction);

    // Cleanup function
    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  if (!shorts || shorts.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p className="text-gray-400">No videos available</p>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {shorts.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          hasUserInteracted={hasUserInteracted}
        />
      ))}
    </div>
  );
}
