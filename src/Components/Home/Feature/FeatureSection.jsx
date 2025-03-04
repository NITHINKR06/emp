import React from "react";
import "../../../Css/FeatureSection.css";

// Example icon from react-icons (install with: npm install react-icons)
import { FiCheckCircle } from "react-icons/fi";

// Replace the image below with your actual phone image path
import phoneImage from "../../../img/image.png";

function FeatureSection() {
    return (
      <div className="feature-section">
        {/* Left Side (Phone + Gradient) */}
        <div className="feature-section-left">
          <div className="circle-overlay"></div>
          <div className="phone-container">
            <img src={phoneImage} alt="Phone" className="phone-image" />
          </div>
        </div>
  
        {/* Right Side (Features) */}
        <div className="feature-section-right">
          <h2 className="section-title">Our Key Features</h2>
  
          {/* Feature #1 */}
          <div className="feature-item">
            <div className="feature-icon">
              <FiCheckCircle />
            </div>
            <div className="feature-content">
              <h3>Vestibulum pulvinar rhoncus</h3>
              <p>
                Duis nisi urna, dapibus sed anim at, scelerisque at sapien.
                Cras nisl leo, rhoncus eget urna ut, posuere ullamcorper risus.
              </p>
            </div>
          </div>
  
          {/* Feature #2 */}
          <div className="feature-item">
            <div className="feature-icon">
              <FiCheckCircle />
            </div>
            <div className="feature-content">
              <h3>Sed blandit quam in velit</h3>
              <p>
                You can <a href="#download">download Lorem Template</a> from here.  
                Praesent at magna congue congue ligula.
              </p>
            </div>
          </div>
  
          {/* Feature #3 */}
          <div className="feature-item">
            <div className="feature-icon">
              <FiCheckCircle />
            </div>
            <div className="feature-content">
              <h3>Aenean faucibus venenatis</h3>
              <p>
                Proin iaculis in imperdiet felis, eget vestibulum nulla. 
                Aliquam nec dui ac augue maximus porta. Curabitur tristique lacus.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default FeatureSection;
