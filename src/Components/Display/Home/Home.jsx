import About from "../About/About";
import React from "react";

const Home = () => {
  return (
    <>
      <div className="h-screen bg-[url('https://th.bing.com/th/id/OIP.1FvQP3c1gPfRuRfNkwZEBAHaFt?rs=1&pid=ImgDetMain')] bg-fixed bg-no-repeat bg-cover bg-center ">
        <div className="w-full h-full bg-gradient-to-l from-[#6d6a6ab4] to-[#242323da] flex justify-center items-center">
          <div className="text-white w-3/5 space-y-6">
            <h1 className="text-5xl font-semibold uppercase w-3/5">welcome</h1>
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
