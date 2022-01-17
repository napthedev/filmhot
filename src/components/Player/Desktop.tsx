import { FC, useEffect, useRef, useState } from "react";

import HlsPlayer from "react-hls-player";
import { formatVideoTime } from "../../shared/utils";
import screenfull from "screenfull";
import { subtitleProxy } from "../../shared/constants";

interface PlayerProps {
  playerKey: string;
  sources: {
    quality: number;
    url: string;
  }[];
  subtitles: {
    lang: string;
    language: string;
    url: string;
  }[];
}

const Player: FC<PlayerProps> = ({ playerKey, sources, subtitles }) => {
  const [quality, setQuality] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(
    Number(localStorage.getItem("filmhot-speed")) || 1
  );
  const [paused, setPaused] = useState(true);
  const [onFullScreen, setOnFullScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settingsActive, setSettingsActive] = useState(false);
  const [subtitleIndex, setSubtitleIndex] = useState(0);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [loadedData, setLoadedData] = useState(false);

  const [volume, setVolume] = useState(
    isNaN(parseInt(localStorage.getItem("filmhot-volume") as string))
      ? 100
      : Number(localStorage.getItem("filmhot-volume"))
  );

  const [hoverEnabled, setHoverEnabled] = useState(true);

  const playerRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const seekRef = useRef<HTMLDivElement>(null);
  const mouseDownRef = useRef<Boolean>(false);
  const timeoutRef = useRef<any>(null);
  const fullscreenToggleButton = useRef<HTMLButtonElement>(null);
  const pauseButton = useRef<HTMLButtonElement>(null);

  const seekTime = (amount: number) => {
    playerRef.current && (playerRef.current.currentTime += amount);
  };

  const toggleSound = () => {
    setVolume((prev) => (prev === 0 ? 100 : 0));
  };

  const handleSeeking = (e: any) => {
    if (!playerRef.current || !seekRef.current) return;

    const offset =
      (e.clientX - (e.target as any).getBoundingClientRect().left) /
      seekRef.current.offsetWidth;

    const newTime =
      (Math.abs(offset) === Infinity || isNaN(offset) ? 0 : offset) *
      playerRef.current.duration;

    playerRef.current.currentTime = newTime;

    setCurrentTime(newTime);
  };

  const handleScreenClicked = (e) => {
    if (settingsActive) {
      setSettingsActive(false);
    } else {
      setPaused((prev) => !prev);
    }

    if (e.detail === 2) {
      setOnFullScreen((prev) => !prev);
    }
  };

  useEffect(() => {
    paused ? playerRef.current?.pause() : playerRef.current?.play();
  }, [paused]);

  useEffect(() => {
    playerRef.current && (playerRef.current.volume = volume / 100);

    localStorage.setItem("filmhot-volume", String(volume));
  }, [volume]);

  useEffect(() => {
    screenfull.on("change", () => {
      if (screenfull.isFullscreen) {
        setOnFullScreen(true);
      } else {
        setOnFullScreen(false);
      }
    });
  }, []);

  useEffect(() => {
    let elem = containerRef.current as any;
    if (onFullScreen) screenfull.request(elem);
    else screenfull.exit();
  }, [onFullScreen]);

  useEffect(() => {
    if (!playerRef.current) return;

    playerRef.current.currentTime = currentTime;
  }, [quality]);

  useEffect(() => {
    if (!playerRef.current) return;

    localStorage.setItem("filmhot-speed", String(playbackSpeed));

    playerRef.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (containerRef.current?.contains(document.activeElement))
        (document.activeElement as any)?.blur();
      // Pause
      if (e.keyCode === 32) pauseButton.current?.click();
      // Rewind
      if (e.keyCode === 37) seekTime(-10);
      // Forward
      if (e.keyCode === 39) seekTime(10);
      // Full screen
      if (e.keyCode === 70) fullscreenToggleButton.current?.click();
    };

    const spacePressHandler = (e: KeyboardEvent) => {
      if (e.keyCode === 32) e.preventDefault();
    };

    window.addEventListener("keyup", keyHandler);

    window.addEventListener("keydown", spacePressHandler);

    return () => {
      window.removeEventListener("keyup", keyHandler);
      window.removeEventListener("keydown", spacePressHandler);
    };
  }, []);

  return (
    <div className="relative w-full h-0 pb-[56.25%]">
      <div
        onMouseMove={() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);

          setHoverEnabled(true);

          timeoutRef.current = setTimeout(() => {
            setHoverEnabled(false);
            setSettingsActive(false);
          }, 2000);
        }}
        onMouseLeave={() => setSettingsActive(false)}
        ref={containerRef}
        className="absolute top-0 left-0 w-full h-full flex justify-center items-center group bg-black"
      >
        <HlsPlayer
          crossOrigin=""
          playsInline
          onClickCapture={handleScreenClicked}
          className="w-full h-full cursor-pointer"
          controls={false}
          autoPlay={false}
          playerRef={playerRef}
          src={sources[quality].url}
          onWaiting={() => setLoading(true)}
          onPlaying={() => setLoading(false)}
          onLoadedData={() => {
            setLoadedData(true);
            setDuration(playerRef.current?.duration || 0);
            const currentTime = Number(
              localStorage.getItem(`${playerKey}-time`) as string
            );
            setCurrentTime(currentTime);
            playerRef.current && (playerRef.current.currentTime = currentTime);
          }}
          onTimeUpdate={() => {
            localStorage.setItem(
              `${playerKey}-time`,
              String(playerRef.current?.currentTime || 0)
            );
            setCurrentTime(playerRef.current?.currentTime || 0);
            setDuration(playerRef.current?.duration || 0);
          }}
        >
          {subtitleIndex >= 0 && loadedData && (
            <track
              kind="subtitles"
              srcLang="sub"
              label="Subtitle"
              src={subtitleProxy(subtitles[subtitleIndex]?.url)}
              default
            />
          )}
        </HlsPlayer>

        {loading && !paused && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
            <div className="border-white border-4 border-r-transparent w-12 h-12 rounded-full animate-spin"></div>
          </div>
        )}

        {paused && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            onClickCapture={handleScreenClicked}
          >
            <img className="w-[50px] h-[50px]" src="/play.svg" alt="" />
          </div>
        )}

        <div
          className={`absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-[#000000e0] flex flex-col items-stretch text-xl transition duration-300 opacity-0 ${
            paused ? "!opacity-100" : ""
          } ${hoverEnabled ? "group-hover:opacity-100" : ""}`}
        >
          <div
            ref={seekRef}
            onMouseDown={(e) => {
              mouseDownRef.current = true;
              handleSeeking(e);
            }}
            onMouseMove={(e) => {
              if (mouseDownRef.current) {
                handleSeeking(e);
              }
            }}
            onMouseUp={() => (mouseDownRef.current = false)}
            onMouseLeave={() => (mouseDownRef.current = false)}
            className="flex-shrink-0 h-[12px] w-full cursor-pointer flex flex-col items-stretch justify-center seek-container"
          >
            <div className="h-[4px] bg-[#FFFFFF80]">
              <div
                style={{
                  width:
                    duration !== 0
                      ? `${Math.round((currentTime / duration) * 1000) / 10}%`
                      : 0,
                }}
                className="h-full bg-white relative after:absolute after:w-[12px] after:h-[12px] after:right-[-6px] after:bg-white after:top-1/2 after:-translate-y-1/2 after:rounded-full after:opacity-0 seek-ball after:transition"
              ></div>
            </div>
          </div>
          <div className="flex justify-between items-stretch flex-grow px-4">
            <div className="flex items-center gap-4">
              <button
                ref={pauseButton}
                className="before:left-[46px]"
                data-tooltips={paused ? "Play (space)" : "Pause (space)"}
                onClickCapture={() => setPaused((prev) => !prev)}
              >
                <img
                  className="w-[20px] h-[20px]"
                  src={paused ? "/play.svg" : "/pause.svg"}
                  alt=""
                />
              </button>

              <button
                data-tooltips="Rewind 10s"
                onClickCapture={() => seekTime(-10)}
              >
                <i className="fas fa-step-backward"></i>
              </button>

              <button
                data-tooltips="Forward 10s"
                onClickCapture={() => seekTime(10)}
              >
                <i className="fas fa-step-forward"></i>
              </button>

              <div className="flex items-stretch volume-container">
                <button data-tooltips="Volume" onClickCapture={toggleSound}>
                  <i
                    className={`fas fa-volume-${
                      volume === 100 ? "up" : volume === 0 ? "mute" : "down"
                    }`}
                  ></i>
                </button>
                <div className="w-0 transition-all duration-300 overflow-hidden flex items-center justify-end volume">
                  <input
                    className="slider w-[100px]"
                    type="range"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e) => setVolume(+e.target.value)}
                  />
                </div>
              </div>

              <div className="text-base hidden sm:block">
                <span>{formatVideoTime(currentTime)}</span>
                <span>{" / "}</span>
                <span>{formatVideoTime(duration)}</span>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <button
                data-tooltips={
                  subtitleIndex >= 0 ? "Disable subtitle" : "Enable subtitle"
                }
                onClickCapture={() =>
                  subtitleIndex >= 0
                    ? setSubtitleIndex(-1)
                    : setSubtitleIndex(0)
                }
              >
                <i
                  className={`${
                    subtitleIndex >= 0 ? "fas" : "far"
                  } fa-closed-captioning`}
                ></i>
              </button>
              <div className="relative">
                <button
                  onClickCapture={() => setSettingsActive((prev) => !prev)}
                  data-tooltips="Settings"
                >
                  <i className="fas fa-cog"></i>
                </button>

                <div
                  onMouseMove={(e) => {
                    e.stopPropagation();
                    clearTimeout(timeoutRef.current);
                  }}
                  className={`absolute bottom-[40px] right-[-40px] w-[200px] h-[200px] overflow-y-auto overflow-x-hidden bg-dark-lighten p-4 invisible opacity-0 transition ${
                    settingsActive ? "!opacity-100 !visible" : ""
                  }`}
                >
                  <h1 className="text-lg">Quality</h1>

                  <div className="flex flex-col items-stretch pl-[6px]">
                    {sources.map((source, index) => (
                      <div key={source.quality}>
                        <button
                          onClickCapture={() => {
                            setQuality(index);
                            setPaused(true);
                          }}
                          className={`text-sm relative text-gray-400 ${
                            quality === index
                              ? "text-white before:absolute before:left-[-10px] before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-white before:rounded-full"
                              : ""
                          }`}
                        >
                          {source.quality}p
                        </button>
                      </div>
                    ))}
                  </div>

                  <h1 className="text-lg mt-4">Subtitle</h1>

                  <div className="flex flex-col items-stretch pl-[6px]">
                    <div>
                      <button
                        onClickCapture={() => setSubtitleIndex(-1)}
                        className={`text-sm relative text-gray-400 text-left ${
                          subtitleIndex === -1
                            ? "text-white before:absolute before:left-[-10px] before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-white before:rounded-full"
                            : ""
                        }`}
                      >
                        Off
                      </button>
                    </div>
                    {subtitles.map((subtitle, index) => (
                      <div key={index}>
                        <button
                          onClickCapture={() => setSubtitleIndex(index)}
                          className={`text-sm relative text-gray-400 text-left ${
                            subtitleIndex === index
                              ? "text-white before:absolute before:left-[-10px] before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-white before:rounded-full"
                              : ""
                          }`}
                        >
                          {subtitle.language}
                        </button>
                      </div>
                    ))}
                  </div>

                  <h1 className="text-lg mt-4">Speed</h1>

                  <div className="flex flex-col items-stretch pl-[6px]">
                    {[...new Array(8)].map((_, index) => (
                      <div key={index}>
                        <button
                          onClickCapture={() =>
                            setPlaybackSpeed((index + 1) / 4)
                          }
                          className={`text-sm relative text-gray-400 ${
                            playbackSpeed === (index + 1) / 4
                              ? "text-white before:absolute before:left-[-10px] before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-white before:rounded-full"
                              : ""
                          }`}
                        >
                          {(index + 1) / 4}x
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                ref={fullscreenToggleButton}
                className="before:right-[-14px] before:left-auto before:translate-x-0"
                data-tooltips={`${
                  onFullScreen ? "Exit (f)" : "Fullscreen (f)"
                }`}
                onClickCapture={() => setOnFullScreen((prev) => !prev)}
              >
                {onFullScreen ? (
                  <i className="fas fa-compress-alt"></i>
                ) : (
                  <i className="fas fa-expand-alt"></i>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
