"use client";

import {
  HeartIcon,
  MessageSquareMore,
  Share2Icon,
  Volume2Icon,
  VolumeOff,
} from "lucide-react";
import { useRef, useEffect } from "react";

type Video = {
  id: string;
  title: string;
  description: string;
  url: string;
  userId: string;
  user: {
    clerkUserId: string;
    email: string;
  };
};

type VideoCardProps = {
  video: Video;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  hasUserInteracted: boolean;
};

export default function VideoCard({
  video,
  isMuted,
  setIsMuted,
  hasUserInteracted,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Keep video element's muted property in sync with isMuted state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Handle intersection observer for play/pause
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          try {
            // Set muted state before playing
            vid.muted = isMuted;
            await vid.play();
          } catch (error) {
            console.log("Autoplay with sound prevented:", error);
            if (!isMuted) {
              // If sound autoplay fails, mute and try again
              vid.muted = true;
              try {
                await vid.play();
                console.log("Playing muted due to browser restrictions");
              } catch (secondError) {
                console.log("Even muted autoplay failed:", secondError);
              }
            }
          }
        } else {
          vid.pause();
        }
      },
      { threshold: 0.7 },
    );

    observer.observe(vid);

    return () => {
      observer.disconnect();
      if (vid) {
        vid.pause();
      }
    };
  }, [isMuted, hasUserInteracted]);

  return (
    <div className="relative h-screen w-full snap-start flex items-center justify-center">
      <video
        ref={videoRef}
        src={video.url}
        className="absolute h-full w-full object-cover"
        playsInline
        // loop
      />

      {/* overlay */}
      <div className="absolute bottom-10 left-5 text-white z-10">
        <p className="font-semibold text-lg">{video.user.email}</p>
        <p className="text-sm text-gray-200">{video.title}</p>
        <p className="ml-2 text-sm text-sky-200 line-clamp-2">
          {video.description}
        </p>
      </div>

      {/* actions */}
      <div className="absolute bottom-20 right-5 flex flex-col gap-4 text-xl text-gray-200 z-10">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="cursor-pointer bg-black/30 p-3 rounded-full hover:bg-black/50 transition"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {/* Use isMuted state directly, not videoRef */}
          {isMuted ? <VolumeOff size={24} /> : <Volume2Icon size={24} />}
        </button>
        <button className="bg-black/30 p-3 rounded-full hover:bg-black/50 transition">
          <HeartIcon size={24} />
        </button>
        <button className="bg-black/30 p-3 rounded-full hover:bg-black/50 transition">
          <MessageSquareMore size={24} />
        </button>
        <button className="bg-black/30 p-3 rounded-full hover:bg-black/50 transition">
          <Share2Icon size={24} />
        </button>
      </div>

      {/* Sound hint - show if no interaction and trying to play with sound */}
      {!hasUserInteracted && !isMuted && (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm z-20 animate-pulse">
          Tap anywhere to enable sound 🔊
        </div>
      )}
    </div>
  );
}
