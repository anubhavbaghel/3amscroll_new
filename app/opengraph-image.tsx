import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '3AM SCROLL - Your Late-Night Scroll Companion'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

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
                    backgroundColor: '#000000',
                    backgroundImage: 'radial-gradient(circle at 50% 50%, #111111, #000000)',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px 80px',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '24px',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <div
                        style={{
                            fontSize: 100,
                            fontFamily: 'sans-serif',
                            fontWeight: 800,
                            color: '#ffffff',
                            letterSpacing: '-0.05em',
                            marginBottom: 20,
                        }}
                    >
                        3AM SCROLL
                    </div>
                    <div
                        style={{
                            fontSize: 40,
                            fontFamily: 'sans-serif',
                            color: '#a1a1aa',
                            textAlign: 'center',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Your Late-Night Scroll Companion
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
