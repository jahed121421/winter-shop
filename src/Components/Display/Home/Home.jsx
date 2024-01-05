import About from "../About/About";
import React from "react";

const Home = () => {
  return (
    <>
      <div className="h-screen bg-[url('https://th.bing.com/th/id/OIP.1FvQP3c1gPfRuRfNkwZEBAHaFt?rs=1&pid=ImgDetMain')] bg-cover bg-fixed bg-center bg-no-repeat ">
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-l from-[#6d6a6ab4] to-[#242323da]">
          <div className="w-3/5 space-y-6 text-white">
            <h1 className="w-3/5 text-5xl font-semibold uppercase">welcome</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              magni quidem dolore sit facere nemo cum dignissimos eaque, sed,
              dicta possimus inventore, ab deserunt velit!
            </p>
          </div>
        </div>
      </div>
      <About />
    </>
  );
};

export default Home;
