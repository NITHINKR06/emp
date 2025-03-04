import React, { useState, useRef, useEffect } from "react";
import "../../../Css/Testimonials.css";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import profile1 from "../../../img/image.png";
import profile2 from "../../../img/image.png";

function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  // Adjust this if you dynamically add more testimonials
  const totalSlides = 3;

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  useEffect(() => {
    const updateSlider = () => {
      if (window.innerWidth <= 600 && containerRef.current) {
        // Each card takes 100% width, so translate by 100% per slide
        containerRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
        containerRef.current.style.transition = "transform 0.3s ease";
      } else if (containerRef.current) {
        // Reset transform for larger screens
        containerRef.current.style.transform = "none";
      }
    };

    updateSlider();
    window.addEventListener("resize", updateSlider);
    return () => window.removeEventListener("resize", updateSlider);
  }, [currentSlide]);

  return (
    <section className="testimonials-section">
      {/* Background Gradient */}
      <div className="background-gradient"></div>

      <div className="container">
        {/* Heading & Subtitle */}
        <h2 className="section-heading">
          What They Think <span>About Us</span>
        </h2>
        <p className="subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          faucibus, lacus vel malesuada facilisis.
        </p>

        {/* Testimonials Container */}
        <div className="testimonials-container" ref={containerRef}>
          {/* Card #1 */}
          <div className="testimonial-card">
            <div className="user-image">
              <img src={profile1} alt="Jonathan Smart" />
            </div>
            <div className="stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <h3>Jonathan Smart</h3>
            <p className="position">Bestx CTO</p>
            <p className="testimonial-text">
              “Suspendisse viverra odio non magna pretium, sit amet hendrerit
              purus suscipit. Pellentesque habitant morbi tristique senectus et
              netus.”
            </p>
          </div>

          {/* Card #2 */}
          <div className="testimonial-card">
            <div className="user-image">
              <img src={profile2} alt="Martino Tino" />
            </div>
            <div className="stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <h3>Martino Tino</h3>
            <p className="position">Web Analyst</p>
            <p className="testimonial-text">
              “Integer vitae nisl a magna finibus consequat sed id lorem.
              Vestibulum ac pellentesque sapien, a lacinia sapien. Duis sed erat
              rutrum, pharetra ex et, varius urna.”
            </p>
          </div>

          {/* Card #3 */}
          <div className="testimonial-card">
            <div className="user-image">
              <img src={profile2} alt="Martino Tino" />
            </div>
            <div className="stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <h3>Martino Tino</h3>
            <p className="position">Web Analyst</p>
            <p className="testimonial-text">
              “Integer vitae nisl a magna finibus consequat sed id lorem.
              Vestibulum ac pellentesque sapien, a lacinia sapien. Duis sed erat
              rutrum, pharetra ex et, varius urna.”
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="testimonial-nav">
        <button className="nav-button" onClick={handlePrev}>
          <FaChevronLeft />
        </button>
        <button className="nav-button" onClick={handleNext}>
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}

export default Testimonials;
