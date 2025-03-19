import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import '../Css/Error.css';
import Scarecrowpng from '../img/Scarecrow.png'

function Error () {
  useEffect(() => {
    const sr = ScrollReveal({
      origin: 'left',
      distance: '80px',
      duration: 2500,
      delay: 400,
    });

    sr.reveal('.image');
    sr.reveal('.text', { origin: 'right' });
  }, []);

  return (
    <div>
      <div className="header-wrapper ful-width">
      </div>

      <section className="hero-section ful-width">
        <div className="hero-content max-width">
          <div className="image">
            <img src={Scarecrowpng} alt="scarecrow" />
          </div>
          <div className="text">
            <h1 className="header max-width">404 NOT FOUND</h1>

            <h1 className="bad-news">I have bad news for you</h1>
            <p className="desc">
              The page you were looking for does not exist or is temporarily unavailable.
            </p>
            <a href="/" className="cta">
              Back to Homepage
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error;
