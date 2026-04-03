const testimonials = [
    {
        name: 'Donald Jackman',
        role: 'Food Critic',
        image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
        review: 'An extraordinary dining experience — the flavors are unlike anything I have tasted. Every dish is a masterpiece crafted with precision and passion.',
    },
    {
        name: 'Richard Nelson',
        role: 'Travel Blogger',
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
        review: 'Rakshand redefined fine dining for me. The ambiance, the service, the food — all flawless. I return every time I am in New Delhi.',
    },
    {
        name: 'Sarah Williams',
        role: 'Culinary Enthusiast',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop',
        review: 'The tasting menu was an absolute revelation. Each course told a story. This is the kind of restaurant that stays with you long after the meal.',
    },
];

const StarIcon = () => (
    <svg width="14" height="14" viewBox="0 0 22 20" fill="#b8965a" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" />
    </svg>
);

export default function Testimonial() {
    return (
        <div style={{ background: '#0a0a0a', padding: '6rem 1.5rem', fontFamily: "'Montserrat', sans-serif", borderTop: '0.5px solid #2a2010' }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Montserrat:wght@300;400;500&display=swap');`}</style>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <p style={{ fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#b8965a', marginBottom: '1.25rem' }}>
                    Guest Experiences
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: 260, margin: '0 auto 1.5rem' }}>
                    <div style={{ flex: 1, height: '0.5px', background: '#2a2010' }} />
                    <div style={{ width: 5, height: 5, background: '#b8965a', transform: 'rotate(45deg)', flexShrink: 0 }} />
                    <div style={{ flex: 1, height: '0.5px', background: '#2a2010' }} />
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, color: '#f5ead6', margin: 0, lineHeight: 1.2 }}>
                    What our <em style={{ fontStyle: 'italic', color: '#c9a55a' }}>guests</em> say
                </h2>
            </div>

            {/* Cards */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', maxWidth: 1100, margin: '0 auto' }}>
                {testimonials.map((t, i) => (
                    <div key={i} style={{ width: 300, background: '#0f0d08', border: '0.5px solid #2a2010', padding: '2.5rem 1.75rem 1.75rem', position: 'relative', marginTop: '2.5rem' }}>

                        {/* Avatar */}
                        <div style={{ position: 'absolute', top: -36, left: '50%', transform: 'translateX(-50%)', width: 72, height: 72, borderRadius: '50%', overflow: 'hidden', border: '1px solid #b8965a' }}>
                            <img src={t.image} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.1) brightness(0.9)' }} />
                        </div>

                        {/* Quote mark */}
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: '#2a2010', lineHeight: 1, margin: '0.5rem 0 0', fontWeight: 300 }}>"</p>

                        {/* Review */}
                        <p style={{ fontSize: 11, color: '#6a6050', lineHeight: 1.9, letterSpacing: '0.04em', margin: '0 0 1.25rem', fontWeight: 300 }}>
                            {t.review}
                        </p>

                        {/* Stars */}
                        <div style={{ display: 'flex', gap: 3, marginBottom: '1rem' }}>
                            {[...Array(5)].map((_, j) => <StarIcon key={j} />)}
                        </div>

                        {/* Divider */}
                        <div style={{ height: '0.5px', background: '#2a2010', marginBottom: '1rem' }} />

                        {/* Name */}
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: '#f0e6cc', margin: '0 0 0.2rem', letterSpacing: '0.05em' }}>{t.name}</p>
                        <p style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#b8965a', margin: 0 }}>{t.role}</p>

                    </div>
                ))}
            </div>
        </div>
    );
}