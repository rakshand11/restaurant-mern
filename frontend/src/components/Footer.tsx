import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer style={{ background: '#080806', borderTop: '0.5px solid #2a2010', padding: '4rem 2rem 2rem', fontFamily: "'Montserrat', sans-serif" }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Montserrat:wght@300;400;500&display=swap');
            .ft-link:hover { color: #b8965a !important; }
            .ft-social:hover path, .ft-social:hover circle, .ft-social:hover rect { stroke: #b8965a; }
            `}</style>

            <div style={{ maxWidth: 1100, margin: '0 auto' }}>

                {/* Top */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '3rem', paddingBottom: '3rem', borderBottom: '0.5px solid #2a2010' }}>

                    {/* Brand */}
                    <div style={{ maxWidth: 260 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
                            <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                                <polygon points="18,2 22,14 34,14 24,22 28,34 18,26 8,34 12,22 2,14 14,14" fill="none" stroke="#b8965a" strokeWidth="1" />
                                <polygon points="18,7 21,15 30,15 23,20 26,29 18,23 10,29 13,20 6,15 15,15" fill="#b8965a" opacity="0.15" />
                                <circle cx="18" cy="18" r="4" fill="#b8965a" />
                            </svg>
                            <div>
                                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 400, color: '#f0e6cc', letterSpacing: '0.08em', lineHeight: 1 }}>Rakshand</div>
                                <div style={{ fontSize: 7, letterSpacing: '0.35em', color: '#b8965a', textTransform: 'uppercase', marginTop: 2 }}>Fine Dining</div>
                            </div>
                        </div>
                        <p style={{ fontSize: 11, letterSpacing: '0.06em', color: '#4a4030', lineHeight: 1.9, fontWeight: 300 }}>
                            Crafting unforgettable dining experiences in the heart of New Delhi since 2019.
                        </p>
                    </div>

                    {/* Links */}
                    {[
                        { heading: 'Explore', links: [['/', 'Home'], ['/menu', 'Our Menu'], ['/book-table', 'Book a Table'], ['/contact', 'Contact']] },
                        { heading: 'Visit Us', links: [['#', 'New Delhi, India'], ['#', 'Open Daily 12–11pm'], ['#', '+91 98765 43210'], ['#', 'hello@rakshand.in']] },
                    ].map(({ heading, links }) => (
                        <div key={heading}>
                            <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8965a', marginBottom: '1.25rem' }}>{heading}</p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {links.map(([href, label]) => (
                                    <li key={label}>
                                        <Link to={href} className="ft-link" style={{ fontSize: 11, letterSpacing: '0.08em', color: '#4a4030', textDecoration: 'none', transition: 'color 0.2s' }}>
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Social */}
                    <div>
                        <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8965a', marginBottom: '1.25rem' }}>Follow Us</p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {[
                                <path key="ig" d="M12 2H8C4.7 2 2 4.7 2 8v8c0 3.3 2.7 6 6 6h8c3.3 0 6-2.7 6-6V8c0-3.3-2.7-6-6-6zm4 14c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V8c0-2.2 1.8-4 4-4h8c2.2 0 4 1.8 4 4v8z M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5-9a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />,
                                <path key="tw" d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />,
                            ].map((path, i) => (
                                <a key={i} href="#" className="ft-social">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a4030" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s' }}>
                                        {path}
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Bottom */}
                <div style={{ paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <p style={{ fontSize: 10, letterSpacing: '0.15em', color: '#3a3020', margin: 0 }}>
                        © 2025 Rakshand Fine Dining. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        {['Privacy', 'Terms'].map((label) => (
                            <a key={label} href="#" className="ft-link" style={{ fontSize: 10, letterSpacing: '0.15em', color: '#3a3020', textDecoration: 'none', transition: 'color 0.2s' }}>
                                {label}
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
}