import { ImageResponse } from 'next/og';

export const alt = 'Herramientas · DivisionCero';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage:
            'radial-gradient(circle at 22% 24%, rgba(77,174,132,0.35), transparent 42%), radial-gradient(circle at 82% 78%, rgba(77,174,132,0.22), transparent 45%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '10px 24px',
            borderRadius: 999,
            border: '1px solid rgba(77,174,132,0.5)',
            color: '#4dae84',
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 1,
          }}
        >
          DivisionCero
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 40,
            fontSize: 96,
            fontWeight: 700,
            color: '#fafafa',
            letterSpacing: -2,
          }}
        >
          Herramientas
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 16,
            fontSize: 34,
            color: '#a3a3a3',
          }}
        >
          Ciberseguridad para el día a día
        </div>

        <div
          style={{
            display: 'flex',
            gap: 16,
            marginTop: 56,
          }}
        >
          {['Contraseñas', 'Hash', 'QR', 'SPF', 'Base64', 'UUID'].map((label) => (
            <div
              key={label}
              style={{
                display: 'flex',
                padding: '10px 22px',
                borderRadius: 10,
                backgroundColor: 'rgba(255,255,255,0.06)',
                color: '#e5e5e5',
                fontSize: 24,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
