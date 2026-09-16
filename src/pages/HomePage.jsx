
// import React from "react";
// import Menubar from "../components/Menubar";
// import FeatureCards from "../components/FeatureCards";

// function HomePage() {
//   return (
//     <div
//       className="min-h-screen bg-cover bg-center bg-fixed"
//       style={{
//         backgroundImage: `url('/bg-5.jpg')`,
//       }}
//     >
//       <div className="container mx-auto px-4 py-12">
//         <div className="text-center mb-16">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-6">
//             Traffic Violation Detection System
//           </h1>
//           <p className="text-lg md:text-xl text-white">
//             Real-time Monitoring | Instant Alerts | Smart Traffic Management
//           </p>
//         </div>

//         <Menubar />

//         <div className="mt-12">
//           <FeatureCards />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;










import React from "react";
import Menubar from "../components/Menubar";
import FeatureCards from "../components/FeatureCards";

function HomePage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('/whi.avif')`,
      }}
    >
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="mx-auto mb-10 max-w-4xl rounded-[2rem] border border-slate-200/80 bg-white/75 px-6 py-8 text-center shadow-lg backdrop-blur-sm">
          <h1 className="mb-4 text-2xl font-bold text-gray-700 md:text-3xl font-nexa-serif">
            Government Traffic Monitoring, Evidence Review and Public Safety Oversight
          </h1>
          <p className="mx-auto max-w-2xl text-base text-gray-500 md:text-lg font-nexa-serif">
            Real-time enforcement support | verified alerts | official analytics
          </p>
        </div>

        <Menubar />

        <div className="mt-8">
          <FeatureCards />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
