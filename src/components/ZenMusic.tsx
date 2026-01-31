const ZenMusic = ({ isPlaying }: { isPlaying: boolean }) => {
    // Using YouTube Iframe API for the music link provided: https://www.youtube.com/watch?v=VIVfOCd04BA
    // Video ID: VIVfOCd04BA
    const videoId = "VIVfOCd04BA";

    return (
        <div className="fixed opacity-0 pointer-events-none -z-50 overflow-hidden w-0 h-0">
            {isPlaying && (
                <iframe
                    width="0"
                    height="0"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0`}
                    allow="autoplay"
                    title="Zen Music"
                ></iframe>
            )}
        </div>
    );
};

export default ZenMusic;
