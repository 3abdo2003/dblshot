import React, { useState, useRef, useEffect } from 'react';
import CampaignForm from './CampaignForm';
import LandingPreview from './LandingPreview';
import './App.css';
import logo from './Sekem_Logo.png';

const TEMPLATES = [
  { value: 'minimal', label: 'Minimal' },
  { value: 'elegant', label: 'Elegant' },
];

function App() {
  // State for campaign form
  const [campaign, setCampaign] = useState({
    title: '',
    heroImage: '',
    cta: '',
    body: '',
    themeColor: '#a68a5b',
    template: 'minimal',
  });

  // State for nav dropdowns
  const [productsOpen, setProductsOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false); // mobile nav
  const navRef = useRef();

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setProductsOpen(false);
        setStoryOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close nav on route change or overlay click (mobile)
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 800) setNavOpen(false);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaign((prev) => ({ ...prev, [name]: value }));
  };

  // Export landing page as HTML
  const handleExport = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${campaign.title || 'Campaign Landing Page'}</title>
  <style>${window.exportLandingStyles || ''}</style>
</head>
<body>
  <div id="landing-root">
    ${window.renderLandingHTML ? window.renderLandingHTML(campaign) : ''}
  </div>
</body>
</html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${campaign.title.replace(/\s+/g, '_') || 'landing'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Overlay for mobile nav
  const showOverlay = navOpen && window.innerWidth <= 800;

  return (
    <div className="sekem-app-bg">
      <header className="sekem-header">
        <div className="sekem-header-content">
          <img src={logo} alt="Sekem Logo" className="sekem-header-logo" />
          <button className={`skem-hamburger${navOpen ? ' open' : ''}`} aria-label="Open navigation" style={{display: window.innerWidth <= 800 ? 'flex' : 'none'}} onClick={() => setNavOpen((open) => !open)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav
            className={`sekem-nav${navOpen ? ' open' : ''}`}
            ref={navRef}
            style={window.innerWidth <= 800 ? {position: 'fixed'} : {}}
          >
            {window.innerWidth <= 800 && navOpen && (
              <button
                className="mobile-nav-close"
                aria-label="Close navigation"
                onClick={() => setNavOpen(false)}
                style={{position:'absolute',top:18,right:18,background:'none',border:'none',fontSize:'2.2rem',color:'#bfa181',cursor:'pointer',zIndex:300,padding:0,lineHeight:1}}
              >
                &times;
              </button>
            )}
            <a href="https://sekemonline.com/" className="sekem-nav-link" target="_blank" rel="noopener noreferrer">Home</a>
            <div className={`sekem-nav-dropdown-wrapper${productsOpen ? ' open' : ''}`}> 
              <span
                className="sekem-nav-link sekem-nav-link-dropdown"
                tabIndex={0}
                onClick={() => setProductsOpen((open) => !open)}
                aria-expanded={productsOpen}
                aria-haspopup="true"
              >Our Products</span>
              {productsOpen && (
                <div className="sekem-dropdown-menu">
                  <a href="https://sekemonline.com/pages/isis-categories" className="sekem-dropdown-item" target="_blank" rel="noopener noreferrer">Isis Products</a>
                  <a href="https://sekemonline.com/pages/sekem-categories" className="sekem-dropdown-item" target="_blank" rel="noopener noreferrer">Sekem Products</a>
                </div>
              )}
            </div>
            <div className={`sekem-nav-dropdown-wrapper${storyOpen ? ' open' : ''}`}> 
              <span
                className="sekem-nav-link sekem-nav-link-dropdown"
                tabIndex={0}
                onClick={() => setStoryOpen((open) => !open)}
                aria-expanded={storyOpen}
                aria-haspopup="true"
              >Our Story</span>
              {storyOpen && (
                <div className="sekem-dropdown-menu">
                  <a href="https://sekemonline.com/pages/isis-brand" className="sekem-dropdown-item" target="_blank" rel="noopener noreferrer">Isis Story</a>
                  <a href="https://sekemonline.com/pages/sekem-brand" className="sekem-dropdown-item" target="_blank" rel="noopener noreferrer">Sekem Story</a>
                </div>
              )}
            </div>
            <a href="https://sekemonline.com/policies/contact-information" className="sekem-nav-link" target="_blank" rel="noopener noreferrer">Contact</a>
          </nav>
          {showOverlay && <div className="mobile-nav-overlay" onClick={()=>setNavOpen(false)}></div>}
        </div>
      </header>
      <main className="app-container sekem-main">
        <h2 className="sekem-title">Campaign Landing Page Generator</h2>
        <div className="main-content">
          <CampaignForm values={campaign} onChange={handleChange} templates={TEMPLATES} />
          <div style={{ width: '100%' }}>
            <LandingPreview data={campaign} />
            <button className="export-btn" onClick={handleExport} style={{ marginTop: 24 }}>
              Export as HTML
            </button>
          </div>
        </div>
      </main>
      <footer className="sekem-footer">
        <div className="sekem-footer-content" style={window.innerWidth <= 800 ? {flexDirection:'column',alignItems:'flex-start',gap:'0.5rem',textAlign:'left'} : {}}>
          <span>© {new Date().getFullYear()} Sekem Online</span>
          <span className="sekem-footer-links">
            <a href="https://sekemonline.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> | <a href="https://sekemonline.com/policies/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App; 