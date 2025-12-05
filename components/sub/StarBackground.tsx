'use client';

export default function StarBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none transition-colors duration-500">
      <div className="hide-on-light absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="hide-on-dark absolute inset-0 bg-white">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[100px]"></div>
      </div>

    </div>
  );
}