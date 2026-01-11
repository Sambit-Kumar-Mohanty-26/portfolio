import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Sambit | Full Stack Developer';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#030014',
          backgroundImage: 'radial-gradient(circle at 50% 50%, #2a0e61 0%, #030014 100%)',
        }}
      >
        <div
            style={{
                position: 'absolute',
                top: '-20%',
                left: '20%',
                width: '600px',
                height: '600px',
                background: 'linear-gradient(to right, #ff7b00, #a855f7)',
                filter: 'blur(200px)',
                opacity: 0.3,
                borderRadius: '50%',
            }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
            <h1
                style={{
                    fontSize: 100,
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #ff7b00, #a855f7)', // Match your Hero.tsx
                    backgroundClip: 'text',
                    color: 'transparent',
                    marginBottom: 0,
                    marginTop: 0,
                    fontFamily: 'sans-serif',
                }}
            >
                Sambit
            </h1>

            <p
                style={{
                    fontSize: 40,
                    color: '#e2e8f0',
                    marginTop: 20,
                    fontFamily: 'sans-serif',
                    fontWeight: 600,
                    letterSpacing: '-1px',
                }}
            >
                Full Stack Developer & SaaS Architect
            </p>

            <div style={{ display: 'flex', gap: '20px', marginTop: 40 }}>
                <div style={{ padding: '10px 25px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50px', color: 'white', fontSize: 20 }}>
                    Next.js
                </div>
                <div style={{ padding: '10px 25px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50px', color: 'white', fontSize: 20 }}>
                    MERN Stack
                </div>
                <div style={{ padding: '10px 25px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50px', color: 'white', fontSize: 20 }}>
                    TypeScript
                </div>
            </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}