import { useState, useEffect, useRef, useCallback } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { CAROUSEL } from "@/lib/constants"
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"

interface Slide {
  videoId: string
  title: string
  subtitle: string
}

const { PLAYBACK_DURATION, START_OFFSET, TRANSITION_DURATION } = CAROUSEL

const SLIDES: Slide[] = [
  {
    videoId: "dHYTo6Da2aA",
    title: "FROM ANYWHERE",
    subtitle: "Greatness can come from anywhere, just like WE did.",
  },
  {
    videoId: "Bcpu-jqAL6w",
    title: "FIND YOUR PASSION",
    subtitle: "Every champion starts with a dream. What's yours?",
  },
  {
    videoId: "C_BZQkU5Cds",
    title: "I DID IT.",
    subtitle: "Don't wait for the perfect moment. Create it.",
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [videosReady, setVideosReady] = useState(false);
  const progressRef = useRef<number>(0);
  const intervalRef = useRef<number | null>(null);
  const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([]);

  const currentVideo = SLIDES[currentSlide];

  // Mark videos as ready after initial load
  useEffect(() => {
    const timer = setTimeout(() => setVideosReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Control video playback via postMessage (YouTube IFrame API)
  const controlVideo = useCallback(
    (index: number, command: "playVideo" | "pauseVideo") => {
      const iframe = iframeRefs.current[index];
      if (!iframe?.contentWindow) return;

      try {
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: command, args: "" }),
          "https://www.youtube.com"
        );
      } catch (error) {
        console.warn("Failed to control video:", error);
      }
    },
    []
  );

  // Pause/play current video when isPlaying changes
  useEffect(() => {
    const command = isPlaying ? "playVideo" : "pauseVideo";
    controlVideo(currentSlide, command);
  }, [isPlaying, currentSlide, controlVideo]);

  const goToNextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    progressRef.current = 0;
    setProgress(0);

    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
      setTimeout(() => setIsAnimating(false), 50);
    }, TRANSITION_DURATION);
  }, [isAnimating]);

  const goToPrevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    progressRef.current = 0;
    setProgress(0);

    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
      setTimeout(() => setIsAnimating(false), 50);
    }, TRANSITION_DURATION);
  }, [isAnimating]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentSlide || isAnimating) return;
      setIsAnimating(true);
      progressRef.current = 0;
      setProgress(0);

      setTimeout(() => {
        setCurrentSlide(index);
        setTimeout(() => setIsAnimating(false), 50);
      }, TRANSITION_DURATION);
    },
    [currentSlide, isAnimating]
  );

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Progress timer
  useEffect(() => {
    if (!isPlaying || isAnimating) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      progressRef.current += 0.1;
      const progressPercent = (progressRef.current / PLAYBACK_DURATION) * 100;
      setProgress(Math.min(progressPercent, 100));

      if (progressRef.current >= PLAYBACK_DURATION) {
        goToNextSlide();
      }
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, isAnimating, goToNextSlide]);

  // Progress ring calculations
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <section className="relative h-[80vh] min-h-[500px] overflow-hidden bg-black">
      {/* Sliding video container */}
      <div
        className="absolute inset-0 flex transition-transform ease-out"
        style={{
          width: `${SLIDES.length * 100}%`,
          transform: `translateX(-${(currentSlide * 100) / SLIDES.length}%)`,
          transitionDuration: isAnimating ? `${TRANSITION_DURATION}ms` : "0ms",
        }}
      >
        {SLIDES.map((slide, index) => (
          <div
            key={slide.videoId}
            className="relative h-full overflow-hidden"
            style={{ width: `${100 / SLIDES.length}%` }}
          >
            <iframe
              ref={(el) => {
                iframeRefs.current[index] = el;
              }}
              src={`https://www.youtube.com/embed/${slide.videoId}?start=${START_OFFSET}&autoplay=1&mute=1&loop=1&playlist=${slide.videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&vq=hd1080&hd=1&disablekb=1&fs=0&iv_load_policy=3&enablejsapi=1`}
              title={`Hero Video ${index + 1}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] min-w-[177.78vh] min-h-[56.25vw] pointer-events-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-2" />

      {/* Loading overlay */}
      {!videosReady && (
        <div className="absolute inset-0 bg-black z-3 flex items-center justify-center">
          <Spinner className="w-8 h-8 text-white" />
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-32 text-center text-white px-4">
        <h1 className="heading-display text-[4rem] md:text-[6rem] lg:text-[8rem] mb-4 drop-shadow-lg tracking-wide">
          {currentVideo.title}
        </h1>
        <p className="text-base md:text-lg max-w-xl mb-8 text-white/90">
          {currentVideo.subtitle}
        </p>
        <div className="flex items-center gap-3">
          <Link to="/shop">
            <Button variant="inverse" size="lg">
              Shop
            </Button>
          </Link>
          <a
            href={`https://www.youtube.com/watch?v=${currentVideo.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="inverse" size="lg">
              <Play className="h-4 w-4 mr-1 fill-current" />
              Watch
            </Button>
          </a>
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="absolute bottom-24 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {SLIDES.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2 h-2 p-0 min-w-0 rounded-full transition-all duration-300",
              index === currentSlide
                ? "bg-white w-6 hover:bg-white"
                : "bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-8 right-8 flex items-center gap-2 z-20">
        {/* Pause/Play with Progress Ring */}
        <div className="relative w-11 h-11">
          {/* Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlayPause}
            className="absolute inset-0 w-11 h-11 rounded-full bg-white/40 backdrop-blur-xs hover:bg-white/60 z-0"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 text-white fill-white" />
            ) : (
              <Play className="h-4 w-4 text-white fill-white ml-0.5" />
            )}
          </Button>
          {/* Progress Ring SVG - On top */}
          <svg className="absolute inset-0 w-11 h-11 -rotate-90 pointer-events-none z-10">
            <circle
              cx="22"
              cy="22"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2.5"
            />
            <circle
              cx="22"
              cy="22"
              r={radius}
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-100"
            />
          </svg>
        </div>

        {/* Arrow buttons */}
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevSlide}
          className="w-11 h-11 bg-white/40 backdrop-blur-xs hover:bg-white/60"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNextSlide}
          className="w-11 h-11 bg-white/40 backdrop-blur-xs hover:bg-white/60"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </Button>
      </div>
    </section>
  );
}
