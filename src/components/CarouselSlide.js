import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';

const CarouselSlide = () => {
  const navigate = useNavigate();

  const handleImageClick = (id, event) => {
    event.stopPropagation();
    console.log('[캐러셀슬라이드] 핸들이미지클릭이 클릭되었습니다.');
    navigate(`/book/${id}`);
  };

  return (
    <div style={{ width: '100vw', overflow: 'hidden' }}>
      <Carousel showArrows={false} infiniteLoop={true} showThumbs={false} showStatus={false} autoPlay={true} interval={3000}>
        <div onClick={(e) => handleImageClick('6674551e57dd26116151c617', e)}>
          <img src="https://kbookstore.com/media/slidebanner/_/_/__pc_4.jpg" alt="Slide 1" style={{ width: '100%' }} />
        </div>
        <div onClick={(e) => handleImageClick('6674553357dd26116151d537', e)}>
          <img src="https://kbookstore.com/media/slidebanner/_/_/__pc_5.jpg" alt="Slide 2" style={{ width: '100%' }} />
        </div>
        <div onClick={(e) => handleImageClick('6674553357dd26116151d4c7', e)}>
          <img src="https://kbookstore.com/media/slidebanner/_/_/__pc_1.jpg" alt="Slide 3" style={{ width: '100%' }} />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselSlide;
