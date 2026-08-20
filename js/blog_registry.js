const blogRegistry = [
    {
        id: 'pour-always-solvable',
        title: 'Every Level in Pour Is Provably Solvable',
        date: 'August 20, 2026',
        category: 'ENGINEERING',
        categoryColor: 'bg-blue',
        excerpt: 'Most ball sort games shuffle the board and hope. We refuse to show you a level until a solver has actually beaten it.',
        image: 'assets/pour-icon.png',
        content: `
            <p class="mb-6 text-lg leading-relaxed">There is a quiet problem in the ball sort genre: a lot of games hand you levels that <strong>cannot be solved</strong>. They shuffle a pool of coloured balls into tubes, check that the result is not already sorted, and ship it. Usually that works. Sometimes it does not, and the player grinds away at an impossible board blaming themselves.</p>

            <h2 class="display text-2xl mt-10 mb-4">The prototype had this bug</h2>
            <p class="mb-6 leading-relaxed">Our first version did exactly that. Shuffle, reject the already-solved case, done. It felt fine because a random shuffle with two spare tubes is <em>usually</em> solvable — but usually is not a guarantee, and there is no way for a player to tell the difference between a hard level and a broken one.</p>

            <h2 class="display text-2xl mt-10 mb-4">So we solve it first</h2>
            <p class="mb-6 leading-relaxed">Every candidate board now goes through a real solver before you ever see it: a depth-first search with state memoisation and heuristic move ordering. Completing a tube scores highest, then emptying one, then pouring onto a matching colour. Ball sort has a huge branching factor but a dense solution space, so a well-ordered search finds a solution far faster than brute force.</p>

            <div class="highlight my-10 font-bold italic">
                "If the solver cannot beat the board, the player never sees it. Levels are generated until one is proven winnable."
            </div>

            <h2 class="display text-2xl mt-10 mb-4">A useful side effect</h2>
            <p class="mb-6 leading-relaxed">Because the solver actually plays the level through, it also tells us how long the solution is. That number became the level par, and the whole star rating is built on it. More on that in the next post — the first version of par turned out to be lying.</p>

            <p class="mb-6 leading-relaxed">Generation is seeded from the level number, so level 47 is the same board on every device and every install. That is what makes comparing move counts meaningful.</p>
        `
    },
    {
        id: 'pour-par-was-lying',
        title: 'Par Was Lying to You',
        date: 'August 18, 2026',
        category: 'ENGINEERING',
        categoryColor: 'bg-blue',
        excerpt: 'Level 1 said par was 14. The true shortest solution is 10. Here is how we found out and what it cost to fix.',
        image: 'assets/pour-icon.png',
        content: `
            <p class="mb-6 text-lg leading-relaxed">Pour rates every run against par: three stars at or under it, two up to 1.35x, one beyond. That only means something if par is actually the best possible score. Ours was not.</p>

            <h2 class="display text-2xl mt-10 mb-4">First solution is not best solution</h2>
            <p class="mb-6 leading-relaxed">Par came from the same depth-first solver that proves a level is winnable. But a DFS returns the first solution it stumbles into, not the shortest one. On level 1 that was <strong>14 moves</strong>. The true minimum is <strong>10</strong>. Every star rating in the game was being scored against a target roughly forty percent too generous.</p>

            <h2 class="display text-2xl mt-10 mb-4">Finding the real minimum</h2>
            <p class="mb-6 leading-relaxed">Proving a solution is shortest needs a different algorithm. We used IDA* — iterative deepening with an admissible heuristic. The heuristic is simple: for each colour, every extra tube holding that colour needs at least one move to consolidate. A single pour can fix at most one, so the estimate never overshoots, which is exactly the property that keeps the search correct.</p>

            <p class="mb-6 leading-relaxed">We checked it against brute-force breadth-first search on small boards, and against a hand-worked three-move puzzle where the lower bound is two but no two-move solution exists.</p>

            <div class="highlight my-10 font-bold italic">
                "Level 1 par: 14 &rarr; 10. Three stars used to be much easier than we intended."
            </div>

            <h2 class="display text-2xl mt-10 mb-4">Then it was too slow to ship</h2>
            <p class="mb-6 leading-relaxed">Optimal search is expensive. Timing it across twenty levels gave an average of <strong>1546 ms per level</strong> — a visible freeze every single time a level starts. Unacceptable.</p>

            <p class="mb-6 leading-relaxed">The fix leans on something we already had: levels are deterministic from the level number, so a par computed once is valid on every device forever. Par is now calculated <em>offline</em> by a build-time tool and shipped as a lookup table. Runtime cost dropped to a map lookup, and twenty levels now generate in under a second.</p>

            <h2 class="display text-2xl mt-10 mb-4">Being honest about the limits</h2>
            <p class="mb-6 leading-relaxed">Only the first stretch of levels could be proven optimal within a sane budget; past that the state space explodes and each level burns thirty seconds without finishing. Those levels fall back to the fast solver&rsquo;s solution length, which is a valid upper bound, and the game marks them with a <strong>~</strong> so you know the target is an estimate rather than a proven minimum.</p>
        `
    },
    {
        id: 'pour-zero-audio-files',
        title: 'An Entire Soundtrack, Zero Audio Files',
        date: 'August 15, 2026',
        category: 'AUDIO',
        categoryColor: 'bg-blue',
        excerpt: 'Every sound in Pour is generated on your phone from oscillators and noise. No samples, no licensing, no download.',
        image: 'assets/pour-icon.png',
        content: `
            <p class="mb-6 text-lg leading-relaxed">Pour ships with eight sound effects and a looping music bed, and <strong>not one audio file</strong>. Everything is synthesised on the device at startup.</p>

            <h2 class="display text-2xl mt-10 mb-4">Why bother</h2>
            <p class="mb-6 leading-relaxed">Three reasons, in order of how much they mattered.</p>
            <p class="mb-6 leading-relaxed"><strong>Licensing.</strong> Generated audio has no third party attached to it. Nothing to license, nothing to attribute, nothing that can be claimed later. For a small studio that is worth a great deal of peace of mind.</p>
            <p class="mb-6 leading-relaxed"><strong>Size.</strong> A music loop as an audio asset is megabytes. As code it is a few hundred lines.</p>
            <p class="mb-6 leading-relaxed"><strong>Latency.</strong> Nothing is decoded or read from disk when a sound plays, so a pour is heard the instant the ball leaves the tube.</p>

            <h2 class="display text-2xl mt-10 mb-4">How a pour sounds like liquid</h2>
            <p class="mb-6 leading-relaxed">The pour effect is a descending glug per ball — a sine oscillator sliding from about 520 Hz down to 300, one per ball, each offset by 60 ms — layered under a short burst of low-pass filtered noise. The noise is what stops it sounding like a beep and starts it sounding like something being poured.</p>

            <div class="highlight my-10 font-bold italic">
                "Oscillators, filtered noise, and an envelope. That is the whole sound design budget."
            </div>

            <h2 class="display text-2xl mt-10 mb-4">The music</h2>
            <p class="mb-6 leading-relaxed">The background loop is generated too: a slow chord pad in a minor pentatonic with a sparse arpeggio over the top. Notes are drawn from the pentatonic set, which is why a randomly chosen sequence never lands on a sour interval. Both ends of the loop fade to silence so it repeats without a seam, and the whole bed is mixed low enough that effects always cut through.</p>

            <p class="mb-6 leading-relaxed">All of it renders in a background isolate at startup, so the maths never costs a dropped frame on the home screen.</p>
        `
    },
    {
        id: 'pour-two-builds',
        title: 'Two Builds, One Codebase',
        date: 'August 12, 2026',
        category: 'WORKFLOW',
        categoryColor: 'bg-blue',
        excerpt: 'A single forgotten constant can ship a release that earns nothing, or get an ads account suspended. So we stopped using constants.',
        image: 'assets/pour-icon.png',
        content: `
            <p class="mb-6 text-lg leading-relaxed">Mobile games that show ads have two failure modes that are easy to hit and expensive to notice.</p>

            <p class="mb-6 leading-relaxed">Ship a release still pointing at the ad network&rsquo;s <strong>test</strong> units and it serves fake ads forever, earning nothing, and you find out weeks later when the revenue never arrives. Run a development build against <strong>live</strong> units and you end up clicking your own ads, which is the fastest route to a suspended account.</p>

            <h2 class="display text-2xl mt-10 mb-4">Both of those are the same bug</h2>
            <p class="mb-6 leading-relaxed">They come from a hand-edited flag that someone has to remember to flip. So we deleted the flag. Which ad units the app uses is now derived from the build mode itself: debug and profile builds always use test units, release builds always use live ones. There is no switch to forget.</p>

            <div class="highlight my-10 font-bold italic">
                "If correctness depends on remembering, it is not correct. Derive it instead."
            </div>

            <h2 class="display text-2xl mt-10 mb-4">Two apps on one phone</h2>
            <p class="mb-6 leading-relaxed">The development build also carries a different package suffix, so it installs <em>alongside</em> the release build rather than replacing it. Separate icons, separate saved data. Testing never touches real progress or real purchases, and both versions can be compared side by side on the same device.</p>

            <p class="mb-6 leading-relaxed">A small badge in the corner names the current build, and turns red if it is ever in a state that would be wrong to ship. It renders nothing at all in a correctly configured release.</p>
        `
    },
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
