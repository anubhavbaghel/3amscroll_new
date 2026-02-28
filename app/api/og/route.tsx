import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        // Dynamic params
        const title = searchParams.get('title')?.slice(0, 100) || '3AM SCROLL';
        const author = searchParams.get('author') || '3AM SCROLL';
        const date = searchParams.get('date') || '';
        const readTime = searchParams.get('readTime') || '';
        let coverImage = searchParams.get('cover') || '';

        // Satori (@vercel/og) does not natively support WebP images. 
        // We use Supabase's built-in image transformations to convert them to JPEG on the fly.
        if (coverImage.includes('supabase.co/storage/v1/object/public/')) {
            coverImage = coverImage.replace('/object/public/', '/render/image/public/') + '?width=1200&quality=80';
        }

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        backgroundColor: '#050505',
                        color: 'white',
                        position: 'relative',
                    }}
                >
                    {/* Background Image with Overlay */}
                    {coverImage && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                            alt="Cover"
                            src={coverImage}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                opacity: 0.4,
                            }}
                        />
                    )}

                    {/* Gradient Overlay */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(to bottom, transparent 0%, #050505 90%)',
                        }}
                    />

                    {/* Brand - Top Left */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            top: 60,
                            left: 60,
                            backgroundColor: 'white',
                            color: 'black',
                            padding: '10px 20px',
                            borderRadius: '999px',
                            fontSize: 20,
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.05em',
                        }}
                    >
                        3AM SCROLL
                    </div>

                    {/* Main Content */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            zIndex: 10,
                            padding: '60px',
                            marginTop: 'auto',
                            width: '100%',
                        }}
                    >
                        {/* Category / Date Pill */}
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center', opacity: 0.8 }}>
                            <div style={{ fontSize: 24, fontWeight: 500, color: '#A3A3A3' }}>
                                {date}
                            </div>
                            {readTime && (
                                <div style={{ fontSize: 24, fontWeight: 500, color: '#A3A3A3' }}>• {readTime} min read</div>
                            )}
                        </div>

                        {/* Title */}
                        <div
                            style={{
                                fontSize: 80,
                                fontWeight: 800,
                                lineHeight: 1.1,
                                marginBottom: '30px',
                                color: 'white',
                                letterSpacing: '-0.03em',
                                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                                maxHeight: '300px',
                                overflow: 'hidden',
                            }}
                        >
                            {title}
                        </div>

                        {/* Author */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 24,
                                fontWeight: 700,
                            }}>
                                {author.slice(0, 1).toUpperCase()}
                            </div>
                            <div style={{ fontSize: 32, fontWeight: 600 }}>{author}</div>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : 'Unknown error';
        console.error("[OG Image Error]", errorMessage, e);
        return new Response(`Failed to generate the image: ${errorMessage}`, {
            status: 500,
        });
    }
}
