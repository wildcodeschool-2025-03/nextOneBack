import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCarouselNavigation } from "../../hooks/useCarouselNavigation";
import "./MiniGameCarousel.css";

interface CarouselItem {
  id: number;
  title: string;
  image: string;
  route: string;
}

interface Props {
  data: CarouselItem[];
  isAuthenticated: boolean;
}

export default function MiniGameCarousel({ data, isAuthenticated }: Props) {
  const navigate = useNavigate();
  const flippedIdRef = useRef<number | null>(null);

  const infiniteData = [...data.slice(-2), ...data, ...data.slice(0, 2)];

  const initialIndex = 2;
  const {
    trackRef,
    scrollToIndex,
    scrollLeft,
    scrollRight,
    setCurrentIndexRef,
  } = useCarouselNavigation(data.length);

  useEffect(() => {
    scrollToIndex(initialIndex, false);
    setCurrentIndexRef(initialIndex);
  }, [scrollToIndex, setCurrentIndexRef]);

  const handleClick = (item: CarouselItem, idx: number) => {
    if (isAuthenticated) {
      navigate(item.route);
    } else {
      flippedIdRef.current = item.id;
      const card = document.getElementById(`mini-game-card-${idx}`);
      card?.classList.add("flipped");
      setTimeout(() => card?.classList.remove("flipped"), 2000);
    }
  };

  return (
    <div className="mini-game-carousel-container">
      <button
        className="mini-game-arrow left"
        type="button"
        onClick={() => {
          scrollLeft();
        }}
      >
        ❮
      </button>
      <div className="mini-game-carousel-viewport">
        <div className="mini-game-carousel-track" ref={trackRef}>
          {infiniteData.map((item, idx) => (
            <button
              key={`${item.id}-${idx}`}
              id={`mini-game-card-${idx}`}
              className="mini-game-carousel-card"
              onClick={() => handleClick(item, idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleClick(item, idx);
              }}
              type="button"
            >
              <div className="mini-game-card-inner">
                <div className="mini-game-card-front">
                  <img src={item.image} alt={item.title} />
                  <p className="mini-game-card-title">{item.title}</p>
                </div>
                <div className="mini-game-card-back">
                  <p>Veuillez vous connecter pour jouer.</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <button
        className="mini-game-arrow right"
        type="button"
        onClick={() => {
          scrollRight();
        }}
      >
        ❯
      </button>
    </div>
  );
}
