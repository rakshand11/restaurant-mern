import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative h-[90vh] flex items-center justify-center bg-center bg-cover"
      style={{
        backgroundImage: "url('/black.jpg')",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');
        .hero-btn-outline:hover { background: #b8965a !important; color: #0a0a0a !important; }
        .hero-btn-fill:hover { background: #9a7a40 !important; border-color: #9a7a40 !important; }
      `}</style>

      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.62)' }}></div>

      {/* Floating bubbles — desktop only */}
      <div className="hidden md:block absolute" style={{ top: '2.5rem', left: '2.5rem' }}>
        <div style={{
          background: 'rgba(250,248,244,0.06)',
          border: '0.5px solid #b8965a',
          color: '#e8dcc0',
          padding: '0.75rem 1.25rem',
          fontSize: 11,
          letterSpacing: '0.12em',
          maxWidth: 220,
          lineHeight: 1.6,
          position: 'relative',
        }}>
          <span style={{ color: '#b8965a', marginRight: 6, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Offer</span>
          25% off on orders above ₹1000
          <div style={{ position: 'absolute', bottom: -4, left: 16, width: 8, height: 8, background: '#b8965a', transform: 'rotate(45deg)' }}></div>
        </div>
      </div>

      <div className="hidden md:block absolute" style={{ top: '2.5rem', right: '2.5rem' }}>
        <div style={{
          background: 'rgba(250,248,244,0.06)',
          border: '0.5px solid #b8965a',
          color: '#e8dcc0',
          padding: '0.75rem 1.25rem',
          fontSize: 11,
          letterSpacing: '0.12em',
          maxWidth: 220,
          lineHeight: 1.6,
          position: 'relative',
        }}>
          <span style={{ color: '#b8965a', marginRight: 6, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Delivery</span>
          Enjoy our dishes at home
          <div style={{ position: 'absolute', bottom: -4, right: 16, width: 8, height: 8, background: '#b8965a', transform: 'rotate(45deg)' }}></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4" style={{ marginTop: '1rem' }}>

        {/* Eyebrow */}
        <p style={{
          fontSize: 10,
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#b8965a',
          marginBottom: '1.25rem',
          fontWeight: 300,
        }}>
          Culinary Excellence · New Delhi
        </p>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: 300, margin: '0 auto 1.5rem' }}>
          <div style={{ flex: 1, height: '0.5px', background: '#3a3020' }} />
          <div style={{ width: 5, height: 5, background: '#b8965a', transform: 'rotate(45deg)', flexShrink: 0 }} />
          <div style={{ flex: 1, height: '0.5px', background: '#3a3020' }} />
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
          fontWeight: 300,
          color: '#f5ead6',
          lineHeight: 1.1,
          margin: '0 0 1.25rem',
          letterSpacing: '0.03em',
        }}>
          Welcome to <em style={{ fontStyle: 'italic', color: '#c9a55a' }}>Rakshand</em>
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: 13,
          letterSpacing: '0.1em',
          color: '#9a8e78',
          maxWidth: 480,
          margin: '0 auto 0.75rem',
          lineHeight: 1.8,
          fontWeight: 300,
        }}>
          Experience the taste of perfection — where every bite tells a story.
        </p>


        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: 300, margin: '1.5rem auto 2rem' }}>
          <div style={{ flex: 1, height: '0.5px', background: '#2a2010' }} />
          <div style={{ width: 5, height: 5, background: '#b8965a', transform: 'rotate(45deg)', flexShrink: 0 }} />
          <div style={{ flex: 1, height: '0.5px', background: '#2a2010' }} />
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={() => navigate("/menu")}
            className="hero-btn-outline"
            style={{
              background: 'transparent',
              border: '0.5px solid #b8965a',
              color: '#b8965a',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 10,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              padding: '0.85rem 2.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            View Menu
          </button>

          <button
            onClick={() => navigate("/book-table")}
            className="hero-btn-fill"
            style={{
              background: '#b8965a',
              border: '0.5px solid #b8965a',
              color: '#0a0a0a',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 10,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              padding: '0.85rem 2.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            Reserve a Table
          </button>
        </div>

      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: 120, background: 'linear-gradient(to top, #0a0a0a, transparent)' }}></div>

    </section>
  );
};

export default Hero;