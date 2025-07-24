import React, { useEffect } from 'react';
import './LandingPreview.css';

// CSS for each template (used for export)
const templateStyles = {
  minimal: `
    body { background: #f8f8f8; margin: 0; }
    .landing-preview { border: 2px solid; border-radius: 12px; background: #fff; box-shadow: 0 2px 12px #0002; overflow: hidden; min-width: 300px; min-height: 400px; display: flex; flex-direction: column; justify-content: flex-start; }
    .hero { padding: 2rem 1.5rem 2.5rem 1.5rem; display: flex; flex-direction: column; align-items: center; background: #eaf4fb; transition: background 0.5s; }
    .hero-img { max-width: 100%; max-height: 220px; border-radius: 10px; margin-bottom: 1.2rem; object-fit: cover; box-shadow: 0 2px 8px #0001; transition: opacity 0.5s; }
    h1 { font-size: 2rem; margin: 0.5rem 0 1rem 0; text-align: center; transition: color 0.5s; }
    .body-text { font-size: 1.1rem; color: #333; margin-bottom: 2rem; text-align: center; }
    .cta-btn { padding: 0.9rem 2.2rem; font-size: 1.1rem; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; box-shadow: 0 2px 8px #0002; transition: background 0.2s, transform 0.3s; }
    .cta-btn:hover { filter: brightness(0.95); transform: scale(1.04); }
    @media (max-width: 800px) {
      .landing-preview { min-width: 0; margin-top: 0; }
      .hero { padding: 1.2rem 0.5rem 1.5rem 0.5rem; }
      h1 { font-size: 1.3rem; }
    }
  `,
  elegant: `
    body { background: #f5f0ea; margin: 0; }
    .landing-preview { border: 2px solid #bfa181; border-radius: 16px; background: #fffaf5; box-shadow: 0 2px 16px #bfa18133; overflow: hidden; min-width: 300px; min-height: 400px; display: flex; flex-direction: column; justify-content: flex-start; }
    .hero { padding: 2.2rem 1.5rem 2.5rem 1.5rem; display: flex; flex-direction: column; align-items: center; background: linear-gradient(120deg, #fffaf5 60%, #f5e6d8 100%); transition: background 0.5s; }
    .hero-img { max-width: 100%; max-height: 220px; border-radius: 14px; margin-bottom: 1.2rem; object-fit: cover; box-shadow: 0 2px 12px #bfa18133; transition: opacity 0.5s; }
    h1 { font-size: 2rem; margin: 0.5rem 0 1rem 0; text-align: center; color: #bfa181; font-family: 'Georgia', serif; transition: color 0.5s; }
    .body-text { font-size: 1.13rem; color: #6d5c3d; margin-bottom: 2rem; text-align: center; }
    .cta-btn { padding: 0.9rem 2.2rem; font-size: 1.1rem; color: #fff; background: #bfa181; border: none; border-radius: 7px; cursor: pointer; font-weight: 600; box-shadow: 0 2px 8px #bfa18133; transition: background 0.2s, transform 0.3s; }
    .cta-btn:hover { background: #a68a5b; color: #fff; transform: scale(1.04); }
    @media (max-width: 800px) {
      .landing-preview { min-width: 0; margin-top: 0; }
      .hero { padding: 1.2rem 0.5rem 1.5rem 0.5rem; }
      h1 { font-size: 1.3rem; }
    }
  `,
};

// Helper to get a valid theme color or fallback
function getThemeColor(themeColor) {
  return (typeof themeColor === 'string' && themeColor.trim() !== '') ? themeColor : '#2a7ae4';
}

// Generate HTML for export (with dynamic border color for minimal)
function renderLandingHTML(data) {
  const theme = getThemeColor(data.themeColor);
  if (data.template === 'elegant') {
    return `
      <div class="landing-preview">
        <div class="hero">
          ${data.heroImage ? `<img class="hero-img" src="${data.heroImage}" alt="Hero" />` : ''}
          <h1>${data.title || 'Campaign Title'}</h1>
          <p class="body-text">${data.body || 'Your product or campaign description goes here.'}</p>
          ${data.cta ? `<button class="cta-btn">${data.cta}</button>` : ''}
        </div>
      </div>
    `;
  }
  // minimal
  return `
    <div class="landing-preview" style="border-color: ${theme};">
      <div class="hero" style="background-color: ${theme}22;">
        ${data.heroImage ? `<img class="hero-img" src="${data.heroImage}" alt="Hero" />` : ''}
        <h1 style="color: ${theme}">${data.title || 'Campaign Title'}</h1>
        <p class="body-text">${data.body || 'Your product or campaign description goes here.'}</p>
        ${data.cta ? `<button class="cta-btn" style="background-color: ${theme}">${data.cta}</button>` : ''}
      </div>
    </div>
  `;
}

// Main preview component
function LandingPreview({ data }) {
  // Expose export helpers on window for App.js
  useEffect(() => {
    window.renderLandingHTML = renderLandingHTML;
    window.exportLandingStyles = templateStyles[data.template] || templateStyles.minimal;
  }, [data]);

  const theme = getThemeColor(data.themeColor);

  if (data.template === 'elegant') {
    return (
      <div className="landing-preview elegant animate-fadein">
        <div className="hero">
          {data.heroImage && <img className="hero-img" src={data.heroImage} alt="Hero" />}
          <h1>{data.title || 'Campaign Title'}</h1>
          <p className="body-text">{data.body || 'Your product or campaign description goes here.'}</p>
          {data.cta && <button className="cta-btn">{data.cta}</button>}
        </div>
      </div>
    );
  }

  // minimal
  return (
    <div className="landing-preview minimal animate-fadein" style={{ borderColor: theme }}>
      <div className="hero" style={{ backgroundColor: theme + '22' }}>
        {data.heroImage && <img className="hero-img" src={data.heroImage} alt="Hero" />}
        <h1 style={{ color: theme }}>{data.title || 'Campaign Title'}</h1>
        <p className="body-text">{data.body || 'Your product or campaign description goes here.'}</p>
        {data.cta && (
          <button className="cta-btn" style={{ backgroundColor: theme }}>
            {data.cta}
          </button>
        )}
      </div>
    </div>
  );
}

export default LandingPreview; 