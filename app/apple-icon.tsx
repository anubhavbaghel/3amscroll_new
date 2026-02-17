import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
    width: 180,
    height: 180,
}
export const contentType = 'image/png'

// Image generation for Apple devices
export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 80,
                    background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '40px',
                    fontFamily: 'system-ui, sans-serif',
                }}
            >
                3AM
            </div>
        ),
        {
            ...size,
        }
    )
}
