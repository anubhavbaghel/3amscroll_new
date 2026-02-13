-- AI Generated Seed Content for 3AM SCROLL
-- Run this in your Supabase SQL Editor to populate the 'articles' table.

INSERT INTO public.articles (id, title, slug, excerpt, content, cover_image, category, author_id, author_name, author_avatar, published_at, read_time, views, likes_count)
VALUES
-- TECH CATEGORY
(
    uuid_generate_v4(),
    'The Future of AI: Beyond ChatGPT and LLMs',
    'future-of-ai-beyond-chatgpt',
    'As we move past the initial hype of generative AI, what comes next? We explore autonomous agents, reasoning models, and the "physical intelligence" of robots.',
    '<h2>The Next Phase of AI</h2><p>While Large Language Models (LLMs) like GPT-4 have revolutionized text generation, the next frontier lies in <strong>action-oriented AI</strong>. Imagine agents that not only write emails but book flights, negotiate contracts, and manage your entire digital life.</p><h3>Physical Intelligence</h3><p>Robotics is catching up. Startups like Figure and Tesla are embedding multimodal AI into humanoid forms. The interaction between digital reasoning and physical actuation is where the magic happens.</p>',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632&auto=format&fit=crop',
    'Tech',
    'd0ec9c36-0001-4444-8888-000000000001', 'Alex Chen', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    NOW() - INTERVAL '2 days',
    6, 1250, 45
),
(
    uuid_generate_v4(),
    'Review: iPhone 16 Pro - Is It Worth the Upgrade?',
    'iphone-16-pro-review',
    'Apple''s latest flagship promises "Spatial Video" and a new Action Button. But does the hardware justify the price tag? Our in-depth review.',
    '<h2>Hardware refinement, not revolution</h2><p>The iPhone 16 Pro feels familiar. The titanium frame is lighter, the bezels are thinner, but the real story is the camera.</p><h3>The Camera System</h3><p>With the new 5x tetraprism lens coming to the smaller Pro model, photography enthusiasts finally have parity. The low-light performance is staggering.</p>',
    'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1632&auto=format&fit=crop',
    'Tech',
    'd0ec9c36-0001-4444-8888-000000000002', 'Sarah Jones', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    NOW() - INTERVAL '5 hours',
    8, 3400, 120
),
(
    uuid_generate_v4(),
    'SpaceX Starship: The Road to Mars',
    'spacex-starship-road-to-mars',
    'After the successful fourth flight test, Starship involves rapid iteration. Here is what makes this rocket the key to multi-planetary life.',
    '<h2>The Beast of Boca Chica</h2><p>Starship is the largest flying object ever built. Its capability to carry 100+ tons to orbit fully reusable changes the economics of spaceflight entirely.</p>',
    'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1470&auto=format&fit=crop',
    'Tech',
    'd0ec9c36-0001-4444-8888-000000000001', 'Alex Chen', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    NOW() - INTERVAL '1 week',
    5, 890, 30
),

-- GAMING CATEGORY
(
    uuid_generate_v4(),
    'GTA VI: Everything We Know So Far',
    'gta-6-leaks-release-date',
    'From the Vice City setting to the Bonnie & Clyde dynamic, Rockstar is cooking up something massive. Here is the definitive breakdown of all leaks.',
    '<h2>Return to Vice City</h2><p>The neon-soaked streets are back. But this isn''t the 80s anymore. Modern day Vice City is a satire of social media culture, influencers, and Florida Man energy.</p>',
    'https://images.unsplash.com/photo-1518005052304-a32d180425f5?q=80&w=1632&auto=format&fit=crop',
    'Gaming',
    'd0ec9c36-0001-4444-8888-000000000003', 'Mike Ross', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    NOW() - INTERVAL '1 day',
    4, 5600, 410
),
(
    uuid_generate_v4(),
    'The Rise of Handheld PCs: Steam Deck vs ROG Ally',
    'steam-deck-vs-rog-ally',
    'Portable gaming is back. We compare the Linux-based Steam Deck OLED against the Windows-powered ROG Ally X.',
    '<h2>The Console Wars are Handheld</h2><p>Valve proved that PC gaming can happen on the couch. Asus proved it can be powerful. Now, the market is flooded with choices.</p>',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb7d5afa?q=80&w=1632&auto=format&fit=crop',
    'Gaming',
    'd0ec9c36-0001-4444-8888-000000000003', 'Mike Ross', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    NOW() - INTERVAL '3 days',
    7, 2100, 85
),
(
    uuid_generate_v4(),
    'Elden Ring: Shadow of the Erdtree Review',
    'elden-ring-dlc-review',
    'FromSoftware has done it again. The expansion is larger than most full games, offering a brutal challenge and deep lore implications.',
    '<h2>Messmer the Impaler</h2><p>The new antagonist is terrifying. The Land of Shadow offers a verticality we haven''t seen before in the base game.</p>',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1470&auto=format&fit=crop',
    'Gaming',
    'd0ec9c36-0001-4444-8888-000000000002', 'Sarah Jones', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    NOW() - INTERVAL '12 hours',
    9, 4300, 250
),

-- ENTERTAINMENT CATEGORY
(
    uuid_generate_v4(),
    'Dune: Part Two - A Cinematic Masterpiece',
    'dune-part-two-review',
    'Denis Villeneuve delivers a sci-fi epic that rivals Lord of the Rings. Visually stunning and emotionally devastating.',
    '<h2>The Spice Must Flow</h2><p>Timothée Chalamet''s evolution from boy to Messiah-warlord is chilling. The scale of the sandworm rides alone is worth the IMAX ticket.</p>',
    'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1470&auto=format&fit=crop',
    'Entertainment',
    'd0ec9c36-0001-4444-8888-000000000004', 'Emily Blunt', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    NOW(),
    5, 3100, 180
),
(
    uuid_generate_v4(),
    'Succession: Why We Can''t Stop Watching Terrible People',
    'succession-finale-analysis',
    'As the Roy family saga concludes, we analyze why a show about corporate greed became the defining drama of our era.',
    '<h2>You are not serious people</h2><p>Logan Roy''s final assessment of his children rings true. The tragedy of Succession is that they never had a chance.</p>',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1450&auto=format&fit=crop',
    'Entertainment',
    'd0ec9c36-0001-4444-8888-000000000004', 'Emily Blunt', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    NOW() - INTERVAL '4 days',
    6, 1500, 90
),

-- CODING / LIFESTYLE
(
    uuid_generate_v4(),
    'Why I Switched from VS Code to Zed (and back)',
    'vs-code-vs-zed-editor',
    'The new Rust-based editor is incredibly fast, but does it have the ecosystem to replace the king of IDEs?',
    '<h2>Speed vs. Features</h2><p>Zed opens instantly. It feels snappy. But missing extensions and the lack of a robust debugger forced me back to VS Code.</p>',
    'https://images.unsplash.com/photo-1542831371-d531d36971e6?q=80&w=1470&auto=format&fit=crop',
    'Coding',
    'd0ec9c36-0001-4444-8888-000000000001', 'Alex Chen', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    NOW() - INTERVAL '6 days',
    5, 980, 60
),
(
    uuid_generate_v4(),
    'The Digital Nomad Lifestyle: 5 Years later',
    'digital-nomad-reality-check',
    'Working from Bali looks great on Instagram. But what about the loneliness, the wifi issues, and the lack of community?',
    '<h2>Paradise Paradox</h2><p>You are in a beautiful place, but you are staring at a screen. We discuss the reality of location independence.</p>',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1473&auto=format&fit=crop',
    'Lifestyle',
    'd0ec9c36-0001-4444-8888-000000000002', 'Sarah Jones', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    NOW() - INTERVAL '10 days',
    7, 1800, 110
);
