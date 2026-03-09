"use client";

import { Volume2Icon, VolumeOff } from "lucide-react";
import { useRef, useEffect, useState } from "react";

type Video = {
  id: number;
  url: string;
  reporter: string;
  title: string;
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

  //trying to play video play with sound, otherwise without sound
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          try {
            vid.muted = isMuted;
            await vid.play();
          } catch (error) {
            console.log("Autoplay with sound prevented:", error);
            if (!isMuted) {
              vid.muted = true;
              try {
                await vid.play();
                // Optionally notify user that sound was disabled
                console.log("Playing muted due to browser restrictions");
              } catch (secondError) {
                console.log("Even muted autoplay failed:", secondError);
              }
            }
          }
        } else {
          vid.muted = true;
          vid.pause();
        }
      },
      { threshold: 0.7 },
    );

    observer.observe(vid);

    return () => observer.disconnect();
  }, [hasUserInteracted]);

  return (
    <div className="relative h-screen w-full snap-start flex items-center justify-center">
      <video
        ref={videoRef}
        src={video.url}
        className="absolute h-full w-full object-cover"
        // loop
        muted={isMuted}
        playsInline
      />

      {/* overlay */}
      <div className="absolute bottom-10 left-5">
        <p className="font-semibold">{video.reporter}</p>
        <p className="text-sm text-gray-300">{video.title}</p>
      </div>

      {/* actions */}
      <div className="absolute bottom-20 right-5 flex flex-col gap-4 text-xl">
        <button onClick={() => setIsMuted(!isMuted)} className="cursor-pointer">
          {videoRef.current?.muted ? <Volume2Icon /> : <VolumeOff />}
        </button>
        <button>❤️</button>
        <button>💬</button>
        <button>🔗</button>
      </div>
    </div>
  );
}
