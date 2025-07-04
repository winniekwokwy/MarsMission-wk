import { useState } from 'react';
import type {Photos} from '../RoverImage/RoverImage';
import './Carousel.scss';
import { CAMERAS } from '../Routes/Home';

const Carousel = ({ photos }: { photos: Photos[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };
  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };
  
  let camera ="";

  switch (photos[activeIndex].camera){
    case CAMERAS.CHEMCAM:
        camera="Chemistry and Camera Complex";
        break;
    case CAMERAS.FHAZ:
        camera="Front Hazard Avoidance Camera";
        break;
    case CAMERAS.MAHLI:
        camera="Rear Hazard Avoidance Camera";
        break;
    case CAMERAS.MARDI:
        camera="Mars Descent Imager";
        break;
    case CAMERAS.MAST:
        camera="Mast Camera";
        break;
    case CAMERAS.NAVCAM:
        camera="Navigation Camera";
        break;
    case CAMERAS.RHAZ:
        camera="Rear Hazard Avoidance Camera";
        break;
    default:
        camera = "all";
        break;
  }

  return (
    <div className="carousel">
      <button onClick={prevSlide} className="carousel__btn carousel__btn--prev">
        &lt;
      </button>
      <img
        src={photos[activeIndex].img_src}
        alt={`Slide ${activeIndex}`}
        className="carousel__img"
      />
      <button onClick={nextSlide} className="carousel__btn carousel__btn--next">
        &gt;
      </button>
      <p className='ImageCaption'>Photo taken by rover, {photos[activeIndex].rover}, {camera} on {photos[activeIndex].earth_date}</p>
    </div>
  );
};
export default Carousel;