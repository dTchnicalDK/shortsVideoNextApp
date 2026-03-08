"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video } from "@imagekit/next";
import React, { useEffect, useRef, useState } from "react";

const VideoContainer = () => {
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showIcon, setShowIcon] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }

    setShowIcon(true);
  };

  const toggleVolume = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };
  ////timer to show or hide play/pause button
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      setShowIcon(false);
    }, 800);
    return () => {
      clearTimeout(timer);
    };
  }, [isPlaying]);

  //onscroll play/pause watchdog
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!videoRef.current) return;
        if (entry.isIntersecting) {
          videoRef.current.play();
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.7 },
    );
    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    return () => {
      if (videoContainerRef.current) {
        observer.unobserve(videoContainerRef.current);
      }
    };
  }, []);
  return (
    <Card className="relative w-full max-w-90 mx-auto overflow-hidden rounded-2xl shadow-2xl border border-gray-800">
      {/* Video Container - Fixed aspect ratio with proper containment */}
      <div
        ref={videoContainerRef}
        className="relative aspect-9/16 w-full bg-black overflow-hidden cursor-pointer"
      >
        {/* Video wrapper to handle sizing correctly */}
        <div
          onClick={togglePlay}
          className="absolute inset-0 w-full h-full flex items-center justify-center"
        >
          <Video
            ref={videoRef}
            muted
            autoPlay
            urlEndpoint={
              short.url ||
              "https://ik.imagekit.io/slot5gzjg/sample-video.mp4?updatedAt=1771312705297"
            }
            src={
              short.url ||
              "https://ik.imagekit.io/slot5gzjg/sample-video.mp4?updatedAt=1771312705297"
            }
            // controls={true} // Hide default controls for custom ones
            transformation={[{ width: 360, height: 640 }]}
            className="w-full h-full object-contain" // Changed to object-contain to maintain aspect ratio
          />
        </div>

        {/* Custom minimal controls */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black via-black/60 to-transparent pointer-events-none" />

        {/* Play/Pause button overlay */}
        {showIcon && (
          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
            {isPlaying ? (
              <PauseIcon
                onClick={togglePlay}
                className="w-6 h-6 text-white  "
              />
            ) : (
              <PlayIcon
                className="w-6 h-6 text-white ml-1"
                onClick={togglePlay}
              />
            )}
          </button>
        )}

        {/* Video controls bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <Button variant="ghost" onClick={toggleVolume}>
            {isMuted ? (
              <VolumeOff />
            ) : (
              <Volume2Icon
              //  onClick={toggleVolume}
              />
            )}
          </Button>
          {/* Progress bar */}
          <div className="mb-3">
            <div className="h-1 bg-gray-600/50 rounded-full overflow-hidden cursor-pointer">
              <div className="h-full w-1/3 bg-red-500 rounded-full" />
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-300">
              <span>0:15</span>
              <span>1:24</span>
            </div>
          </div>

          {/* Caption Section */}
          <div className="flex items-start gap-3">
            {/* User Avatar */}
            <div className="w-8 h-8 rounded-full bg-lenear-to-r from-purple-500 to-pink-500 shrink-0" />

            {/* Caption Text */}
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium line-clamp-2 leading-relaxed">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Aliquam assumenda, odit alias ipsam harum praesentium molestias
                earum iste temporibus quidem!
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
  );
};

export default VideoContainer;
