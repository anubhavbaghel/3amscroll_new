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
    '<h2>The Next Phase of AI</h2><p>Let''s be real: the honeymoon phase with ChatGPT is over. We''ve all felt that slight burnout from seeing the same AI-generated "I hope this email finds you well" template. But while the hype cycle might be cooling, the actual technology is entering its most disruptive phase yet. We''re moving beyond chatbots that just "talk" and into an era of agents that "do."</p><h3>From Chatbots to Agentic Workflows</h3><p>While Large Language Models (LLMs) like GPT-4 have revolutionized text generation, the next frontier lies in <strong>action-oriented AI</strong>. This is what we call agentic workflows. Instead of you prompting an AI to write a plan, the AI is given a goal—like "organize a 10-city launch event"—and it breaks that down into sub-tasks: booking flights, negotiating contracts with vendors, and managing the entire digital lifestyle loop. This isn''t science fiction; it''s the architecture being built right now by companies like OpenAI and Anthropic.</p><h3>Reasoning Models: The "Slow Thinking" Revolution</h3><p>The introduction of models like OpenAI''s o1 marks a shift toward reasoning models. These systems don''t just predict the next word; they "think" before they speak, utilizing chain-of-thought processing to solve complex math and coding problems. Speaking of coding, if you''re curious how this affects your dev setup, check out our comparison on <a href="/vs-code-vs-zed-editor">VS Code vs Zed</a> where we dive into how AI performance is changing the tools we use daily.</p><h3>Physical Intelligence: The World of Humanoids</h3><p>Robotics is finally catching up. Startups like Figure and Tesla are embedding multimodal AI into humanoid forms. The interaction between digital reasoning and physical actuation is the "physical intelligence" breakthrough we''ve been waiting for. These robots are learning from human video data, translating pixels into precise motor movements. We aren''t just looking at smarter screens; we''re looking at machines that can navigate the physical world with the same fluidity we do.</p>',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632&auto=format&fit=crop',
    'Tech',
    'd0ec9c36-0001-4444-8888-000000000001', 'Alex Chen', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    NOW() - INTERVAL '2 days',
    8, 1250, 45
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
    '<h2>Return to Vice City</h2><p>Remember that feeling of cruising down Ocean Drive in 2002? Rockstar knows you do. But <em>GTA VI</em> isn''t just a nostalgia trip; it''s a brutal, high-definition mirror pointed directly at 2020s Floridian chaos. Every leak, every trailer frame, and every rumor points toward a world that is more alive—and more unhinged—than anything we''ve ever played.</p><h3>The Vice City Meta</h3><p>The neon-soaked streets are back, but modern-day Vice City is obsessed with the social media era. Leaks suggest an in-game social network that mirrors the viral "Florida Man" energy we see on TikTok daily. It''s a satire of influencer culture, where your crimes might just go viral before the cops even arrive. Rockstar is evolving the "Bonnie & Clyde" dynamic with dual protagonists Jason and Lucia, promising a narrative depth that challenges the cynical humor the series is known for.</p><h3>Performance and Tech</h3><p>The technical scale is staggering. From specialized water physics to the AI density of crowds, this game is built to push next-gen hardware to its absolute limit. Whether you''re wondering if <a href="/steam-deck-vs-rog-ally">handheld PCs</a> like the ROG Ally X can even hope to run this beast, or if it''s strictly a desktop-class experience, the industry is bracing for a new benchmark in open-world realism.</p><h3>Why the Wait?</h3><p> Rockstar is perfectionist. They aren''t just building a game; they''re building a decade-long ecosystem. Following the blueprint of GTA Online, the new Vice City will likely be a living, breathing social hub for the next two console generations. The weight of expectation is heavy, but if history is any indication, Rockstar usually delivers on the hype.</p>',
    'https://images.unsplash.com/photo-1518005052304-a32d180425f5?q=80&w=1632&auto=format&fit=crop',
    'Gaming',
    'd0ec9c36-0001-4444-8888-000000000003', 'Mike Ross', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    NOW() - INTERVAL '1 day',
    9, 5600, 410
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
    '<h2>The Spice Must Flow</h2><p>There is a specific kind of silence that falls over a theater when a truly epic cinematic moment happens. In <em>Dune: Part Two</em>, that silence is constant. Denis Villeneuve hasn''t just made a sequel; he''s delivered a masterclass in "Cinematic Brutalism," where the architecture of the world feels as heavy and oppressive as the fate of its characters.</p><h3>The Messiah Archetype Deconstructed</h3><p>Timothée Chalamet''s evolution from the displaced boy of Arrakis to a Messiah-warlord is chilling. This isn''t a typical hero''s journey; it''s a deconstruction of one. The film asks us: at what cost do we follow greatness? The emotional weight of Paul Atreides knowing the path he is on leads to holy war is handled with a devastating nuance that sets it apart from typical blockbuster fare.</p><h3>Visuals and Sound</h3><p>The scale of the sandworm rides alone is worth the IMAX ticket. Greig Fraser''s cinematography uses every inch of the frame to emphasize the vastness of the desert and the insignificance of man within it. Combined with Hans Zimmer''s alien, percussive score, it creates an atmosphere that is both awe-inspiring and terrifying. This is the rare kind of sci-fi epic that rivals the status of <em>Lord of the Rings</em> for our generation.</p>',
    'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1470&auto=format&fit=crop',
    'Entertainment',
    'd0ec9c36-0001-4444-8888-000000000004', 'Emily Blunt', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    NOW(),
    7, 3100, 180
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
