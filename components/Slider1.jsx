import data from "../clientServices/data";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useState } from "react";

export default function Slider1() {
  const myData = data;
  const [activeSlide, setActiveSlide] = useState(1);

  const prevSliderHandler = (id) => {
    if (id === 1) {
      setActiveSlide(myData.length);
    } else if (id > 1) {
      setActiveSlide(activeSlide - 1);
    } else {
      setActiveSlide(myData.length - 1);
    }
  };

  const nextSliderHandler = (id) => {
    if (id === myData.length) {
      setActiveSlide(1);
    } else if (id < myData.length) {
      setActiveSlide(activeSlide + 1);
    } else {
      setActiveSlide(myData.length - 1);
    }
  };

  return (
    <div className="m-6">
      {myData.map((item) => {
        const { id, title, random,img } = item;
        return (
          <div
            key={id}
            className={
              activeSlide === id ? "flex justify-center items-center" : "hidden"
            }
          >
            <div className="grid grid-cols-4 gap-5 w-screen md:w-3/5 h-auto text-justify py-7 mb-32 bg-amber-300 rounded-md shadow-2xl">
              <button
                className="text-6xl border-none border-black"
                onClick={() => prevSliderHandler(id)}
              >
                <FiChevronLeft />
              </button>
              <div><img className="h-40 w-40" src={img} alt="" /></div>
              <div className="grid grid-cols-2">
                <h3 className="text-2xl flex-none col-span-2 text-center font-bold my-2">{title}</h3>
                <p className="col-span-2">{random}</p>
              </div>
              <button
                className="text-6xl border-none border-black"
                onClick={() => nextSliderHandler(id)}
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
