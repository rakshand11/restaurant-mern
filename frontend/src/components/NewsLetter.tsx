export default function NewsLetter() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Montserrat:wght@300;400;500&display=swap');
                .nl-btn:hover { background: #9a7a40 !important; border-color: #9a7a40 !important; }
                .nl-input::placeholder { color: #4a4030; }
            `}</style>

            <div style={{ background: '#0a0a0a', padding: '6rem 1.5rem', textAlign: 'center', fontFamily: "'Montserrat', sans-serif", borderTop: '0.5px solid #2a2010' }}>

                {/* Eyebrow */}
                <p style={{ fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#b8965a', marginBottom: '1.25rem' }}>
                    Stay Updated
                </p>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: 260, margin: '0 auto 1.5rem' }}>
                    <div style={{ flex: 1, height: '0.5px', background: '#2a2010' }} />
                    <div style={{ width: 5, height: 5, background: '#b8965a', transform: 'rotate(45deg)', flexShrink: 0 }} />
                    <div style={{ flex: 1, height: '0.5px', background: '#2a2010' }} />
                </div>

                {/* Heading */}
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, color: '#f5ead6', margin: '0 auto 1rem', maxWidth: 480, lineHeight: 1.2 }}>
                    Never miss our <em style={{ fontStyle: 'italic', color: '#c9a55a' }}>delicious</em> updates
                </h2>

                <p style={{ fontSize: 12, letterSpacing: '0.08em', color: '#6a6050', maxWidth: 420, margin: '0 auto 2.5rem', lineHeight: 1.9, fontWeight: 300 }}>
                    Subscribe to receive updates about new dishes, chef specials, and exclusive offers delivered straight to your inbox.
                </p>

                {/* Input */}
                <div style={{ display: 'flex', alignItems: 'center', maxWidth: 460, margin: '0 auto', border: '0.5px solid #3a3020', background: '#0f0d08' }}>
                    <input
                        type="email"
                        className="nl-input"
                        placeholder="Your email address"
                        style={{ background: 'transparent', outline: 'none', padding: '1rem 1.25rem', flex: 1, fontSize: 12, letterSpacing: '0.08em', color: '#e8dcc0', fontFamily: "'Montserrat', sans-serif", border: 'none' }}
                    />
                    <button
                        className="nl-btn"
                        style={{ background: '#b8965a', border: '0.5px solid #b8965a', color: '#0a0a0a', fontFamily: "'Montserrat', sans-serif", fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', padding: '1rem 1.5rem', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                    >
                        Subscribe
                    </button>
                </div>

                <p style={{ fontSize: 10, letterSpacing: '0.12em', color: '#3a3020', marginTop: '1rem' }}>
                    No spam. Only tasteful updates.
                </p>

            </div>
        </>
    );
}