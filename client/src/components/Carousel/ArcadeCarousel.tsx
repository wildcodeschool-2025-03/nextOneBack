import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCarouselNavigation } from "../../hooks/useCarouselNavigation";
import "./ArcadeCarousel.css";

interface CarouselItem {
  id: number;
  title: string;
  image: string;
  route: string;
}

interface Props {
  data: CarouselItem[];
}

export default function ArcadeCarousel({ data }: Props) {
  const navigate = useNavigate();
  const { trackRef, scrollToIndex, scrollLeft, scrollRight } =
    useCarouselNavigation(data.length);

  const infiniteData = [...data.slice(-2), ...data, ...data.slice(0, 2)];

  useEffect(() => {
    setTimeout(() => {
      scrollToIndex(2, false);
    }, 100);
  }, [scrollToIndex]);

  const handleCardClick = (item: CarouselItem) => {
    navigate(item.route);
  };

  return (
    <div className="arcade-carousel-container">
      <button className="arcade-arrow left" type="button" onClick={scrollLeft}>
        ❮
      </button>
      <div className="arcade-carousel-viewport">
        <div className="arcade-carousel-track" ref={trackRef}>
          {infiniteData.map((item, index) => (
            <div key={`${item.id}-${index}`} className="arcade-carousel-card">
              <button
                id={`arcade-card-${item.id}-${index}`}
                className="arcade-card-button"
                onClick={() => handleCardClick(item)}
                type="button"
              >
                <div className="arcade-card-inner">
                  <div className="arcade-card-front">
                    <img src={item.image} alt={item.title} />
                  </div>
                </div>
              </button>
              <p className="arcade-card-title">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <button
        className="arcade-arrow right"
        type="button"
        onClick={scrollRight}
      >
        ❯
      </button>
    </div>
  );
}
