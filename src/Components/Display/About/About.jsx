import Title from "./../../Title/Title";
import React from "react";
const About = () => {
  return (
    <div className="w-3/4 mx-auto">
      <Title title="About" />
      <div className="flex gap-8">
        <p className="text-justify">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
          pariatur vero rerum ipsum dolorum eveniet numquam soluta eligendi
          nesciunt, itaque reiciendis impedit delectus, nostrum perferendis!
        </p>
        <p className="3/4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
          voluptatum perspiciatis incidunt aperiam molestiae fuga provident,
          repellendus hic natus, porro, eaque enim explicabo? Nam delectus
          exercitationem provident placeat cum ipsum libero nulla ipsam minus
          temporibus animi obcaecati, nihil, veniam autem.
        </p>
      </div>
    </div>
  );
};

export default About;
