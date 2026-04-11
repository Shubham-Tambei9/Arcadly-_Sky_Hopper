const blogRegistry = [
    {
        id: 'orbit-rush-mechanics',
        title: 'Orbit Rush: Refining the Mechanics',
        date: 'April 11, 2026',
        category: 'UPDATE',
        categoryColor: 'bg-blue',
        excerpt: 'Working on the new orbit trajectory systems to make the gameplay feel as smooth as silk. New themes coming soon!',
        image: 'assets/screenshot4.jpg',
        content: `
            <p class="mb-6 text-lg leading-relaxed">The development of <strong>Orbit Rush</strong> has reached a critical milestone. Over the past week, we've focused almost exclusively on the physics engine that governs player movement.</p>
            
            <h2 class="text-3xl font-display font-black mb-4 uppercase italic">Smooth as Silk</h2>
            <p class="mb-6 leading-relaxed">We noticed that at higher speeds, the "snap-to-orbit" feel was a bit too aggressive. By implementing a variable gravitational constant that scales with your score, the transitions between orbital rings now feel much more natural.</p>
            
            <div class="highlight my-10 font-bold italic">
                "The goal is simple: easy to learn, impossible to master. The new trajectory curves are a huge step toward that vision."
            </div>

            <h2 class="text-3xl font-display font-black mb-4 uppercase italic">What's Next?</h2>
            <p class="mb-6 leading-relaxed">Visuals! We're currently designing three new "Nebula" themes that will react dynamically to the background music. Stay tuned for a preview video next week.</p>
        `
    },
    {
        id: 'skin-systems-live',
        title: 'Skin Systems are LIVE',
        date: 'April 08, 2026',
        category: 'PREVIEW',
        categoryColor: 'bg-yellow text-black',
        excerpt: 'Just implemented a modular skinning system that allows us to drop-in new bird designs in seconds. Customization is king.',
        image: 'assets/screenshot3.jpg',
        content: `
            <p class="mb-6 text-lg leading-relaxed">One of the most requested features for <strong>Sky Hopper</strong> was more customization. Today, I'm excited to announce that the backbone of our new Skin System is fully operational!</p>
            
            <h2 class="text-3xl font-display font-black mb-4 uppercase italic">Modular Design</h2>
            <p class="mb-6 leading-relaxed">Instead of hard-coding character assets, we've moved to a JSON-based atlas system. This means we can add new outfits, colors, and trail effects without pushing a full app update. It's faster for us and better for you.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                <div class="bg-white neo-border p-4 text-center">
                    <span class="block text-4xl mb-2">🚀</span>
                    <span class="font-black uppercase text-xs">Fast Updates</span>
                </div>
                <div class="bg-white neo-border p-4 text-center text-black">
                    <span class="block text-4xl mb-2">🎨</span>
                    <span class="font-black uppercase text-xs">Infinite Styles</span>
                </div>
            </div>

            <p class="mb-6 leading-relaxed">The first batch of skins includes the "Pixel Pilot" and "Galaxy Glider." These will be unlockable via high-score achievements starting next month!</p>
        `
    }
];
