import Alpha from "@/components/ui/Alpha";

const VideoBackground = ({ src }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-screen overflow-hidden -z-0">
      <div className="relative w-[530px] h-full -left-2 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute min-w-full min-h-full w-auto h-auto object-cover z-0"
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

const DesignSection = () => {
  return (
    <section className="bg-[#1d242a] w-[450px] shadow hidden lg:flex flex-col justify-between bg-cover p-12 relative overflow-hidden">
      <div className="flex items-center space-x-1">
        <span className="text-2xl tracking-wide font-bold text-white z-10">
          Fusion
        </span>
      </div>
      <VideoBackground src="/backgrounds/bg-cover.mp4"></VideoBackground>

      <div className="-translate-x-3 translate-y-5">
        <Alpha size="text-sm" />
      </div>
    </section>
  );
};

export default DesignSection;
