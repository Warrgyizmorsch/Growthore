// Blog data & CRM integration layer for GrowthOre
// Supports offline fallback data & live CRM API fetching when configured

export const CRM_CONFIG = {
  website: 'growthore', // Identifier used when filtering blogs in CRM
  apiUrl: process.env.NEXT_PUBLIC_BLOG_API_URL || 'https://crm.warrgyizmorsch.com/api/v1/blogs',
  revalidate: 60, // Revalidation time in seconds
};

export const BLOG_POSTS = [
  {
    id: 'blog-1',
    slug: 'ai-seo-search-generative-experience-playbook-2026',
    title: 'The 2026 AI SEO Playbook: How Generative Engines (ChatGPT, Perplexity, Google SGE) Pick Answers',
    excerpt: 'Traditional SEO ranked pages. AI search engines cite trusted entities. Here is the exact architectural shift your brand needs to dominate AI answer visibility this year.',
    category: 'AI SEO',
    featured: true,
    publishedAt: 'October 24, 2026',
    readTime: '7 min read',
    author: {
      name: 'Deepak Suthar',
      role: 'AI SEO & Search Lead',
      avatar: '/images/growthore/testimonials/1.png',
      initials: 'DS',
    },
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tags: ['AI SEO', 'Generative Search', 'AEO', 'Google SGE', 'Entity Authority'],
    website: 'growthore',
    content: `
      <h2>The Paradigm Shift: From Blue Links to Synthesized Answers</h2>
      <p>For more than twenty years, organic search marketing was defined by ten blue links. Your goal was clear: determine keyword volume, optimize metadata, acquire backlinks, and climb to the top of Google’s index. In 2026, that landscape has transformed completely.</p>
      <p>Generative AI engines—including Google’s Search Generative Experience (SGE), OpenAI’s SearchGPT, Perplexity AI, and Claude—do not simply rank URLs. They synthesize answers in real-time, pulling facts, comparisons, and brand sentiments from authoritative nodes across the web graph.</p>
      
      <div class="blog-callout">
        <h4>Key Takeaway</h4>
        <p>If your website is merely publishing generic blog posts targeting high-volume keywords, you are effectively invisible to AI models. Generative search prioritizes <strong>information gain, verifiable entity schemas, and peer-validated citations</strong> over repetitive keyword stuffing.</p>
      </div>

      <h2>The Three Pillars of Modern Answer Engine Optimization (AEO)</h2>
      <p>To win AI citations in 2026, brands must re-architect their organic presence around three foundational principles:</p>

      <h3>1. Information Gain & Proprietary Data</h3>
      <p>Generative algorithms penalize redundant content that mirrors the existing corpus of web data. When an AI crawler indexes your content, it measures its <em>semantic originality</em>. If your article repeats what twenty other blogs say, the AI summarizes those competitors without referencing you.</p>
      <p>To be cited, publish original benchmarks, proprietary survey data, teardowns, or real campaign case studies. Proprietary numbers make you an un-skippable primary source.</p>

      <h3>2. Structured Entity Knowledge Graphs</h3>
      <p>Large Language Models interpret the web as a network of entities (brands, people, products, frameworks). If your Organization schema, Author credentials, and SameAs linkages are vague, AI agents struggle to verify your identity.</p>
      <ul>
        <li>Deploy nested JSON-LD schema linking your key leadership, parent company (Warrgyizmorsch UK Ltd.), and verified registries.</li>
        <li>Ensure consistent brand citations across Wikipedia, Crunchbase, high-authority industry directories, and press releases.</li>
        <li>Implement structured Q&A formats that directly answer conversational follow-up prompts.</li>
      </ul>

      <blockquote>
        "The brands that win in 2026 aren't trying to trick search algorithms; they are training the models to view them as the definitive authority in their vertical."
      </blockquote>

      <h2>Actionable Checklist: Auditing Your Brand for Generative Search</h2>
      <p>Here is the exact framework we execute for GrowthOre clients:</p>
      <ol>
        <li><strong>Run Prompt Queries:</strong> Test 20 high-intent queries in Perplexity and SearchGPT. Document whether your brand is mentioned, cited as a reference, or completely ignored.</li>
        <li><strong>Extract Competitor Sources:</strong> Examine the sources cited in AI summaries. Identify which digital PR articles or technical guides the AI referenced.</li>
        <li><strong>Build Comparative Guides:</strong> AI queries frequently ask "How does [Brand A] compare to [Brand B]?" If you don't control the narrative with transparent, objective comparison landing pages, competitors or forums will control it for you.</li>
      </ol>

      <h2>Conclusion: Prepare for the Next Era of Inbound</h2>
      <p>Generative search does not kill organic traffic—it concentrates high-intent traffic into the hands of brands that build genuine authority. By optimizing for citations, structured semantic entities, and genuine information gain, your business will continue to thrive in the AI era.</p>
    `
  },
  {
    id: 'blog-2',
    slug: 'scaling-meta-ads-post-ios18-first-party-attribution',
    title: 'Scaling Meta Ads Past $100k/Month: Server-Side Tracking & First-Party Attribution',
    excerpt: 'Why blended ROAS is lying to you, and how high-performing brands use CAPI, offline conversions, and incrementality tests to scale spend profitably.',
    category: 'Performance Marketing',
    featured: false,
    publishedAt: 'October 18, 2026',
    readTime: '6 min read',
    author: {
      name: 'Aayush Sharma',
      role: 'Performance Marketing Lead',
      avatar: '/images/growthore/testimonials/2.png',
      initials: 'AS',
    },
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    tags: ['Meta Ads', 'Performance Marketing', 'CAPI', 'Attribution', 'ROAS Scaling'],
    website: 'growthore',
    content: `
      <h2>The Illusion of the In-Platform ROAS Number</h2>
      <p>One of the biggest pitfalls growth-stage companies encounter when scaling past $50k/month in ad spend is relying blindly on Meta Ads Manager's default attribution metrics. Due to privacy frameworks, browser cookie deprecation, and delayed modeling, in-platform ROAS can swing wildly between under-reporting and over-claiming conversions.</p>

      <div class="blog-callout">
        <h4>The Core Problem</h4>
        <p>Default 7-day click / 1-day view attribution frequently claims credit for customers who would have converted regardless. When you scale budgets based on this false confidence, your blended profit margins collapse.</p>
      </div>

      <h2>The Modern Tracking Tech Stack</h2>
      <p>At GrowthOre, we deploy a three-tier attribution framework to give media buyers absolute clarity:</p>

      <h3>1. Server-Side Conversions API (CAPI) with First-Party Cookies</h3>
      <p>Client-side pixels miss between 18% to 35% of conversion events due to ad blockers, network drops, and browser privacy filters. Implementing server-to-server CAPI through an isolated cloud container restores event match quality (EMQ) to 8.5/10 or higher.</p>

      <h3>2. First-Party UTM Tracking & Triple Attribution</h3>
      <p>We log every lead and purchase with first-party click IDs (fbclid, gclid, ttclid) directly into the customer CRM. This creates an unshakeable audit trail linking closed revenue back to the specific creative hook and audience ad set.</p>

      <h3>3. Geo-Lift & Holdout Testing</h3>
      <p>To measure genuine incrementality, run holdout tests in designated geographic control markets. If turning off spend in region A causes no noticeable dip in overall orders compared to active region B, your ad dollars were subsidizing baseline demand rather than driving incremental growth.</p>

      <blockquote>
        "Scaling isn't about spending more on winning ad sets. It's about systematically eliminating creative fatigue and knowing the exact incremental cost of your next customer."
      </blockquote>

      <h2>Creative Diversification: The Secret to Scale</h2>
      <p>Even with perfect tracking, you cannot scale without creative volume. We maintain a weekly cadence of 12-15 creative variations per account across multiple angles: direct founder testimonials, UGC unboxings, high-contrast aesthetic cuts, and comparison charts.</p>
    `
  },
  {
    id: 'blog-3',
    slug: 'short-form-video-hook-engineering-ecommerce',
    title: 'Hook Engineering for Reels & TikTok: Why the First 1.8 Seconds Dictate ROAS',
    excerpt: 'We analyzed 450+ high-converting short-form video ads. Here are the 5 hook archetypes that lowered CAC by 38% across D2C and SaaS accounts.',
    category: 'Social Media Marketing',
    featured: false,
    publishedAt: 'October 12, 2026',
    readTime: '5 min read',
    author: {
      name: 'Rohit Mehta',
      role: 'Creative Director & Video Editor',
      avatar: '/images/growthore/testimonials/3.png',
      initials: 'RM',
    },
    coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Creative Strategy', 'Reels', 'TikTok Ads', 'Hook Rate', 'UGC'],
    website: 'growthore',
    content: `
      <h2>The 1.8-Second Rule in Paid Social</h2>
      <p>On Meta Reels and TikTok, the average user scrolls through content in under 2 seconds. If your video doesn't interrupt their cognitive autopilot immediately, the remainder of your script—no matter how persuasive—will never be heard.</p>

      <h2>The 5 Highest-Performing Hook Archetypes</h2>
      <p>Across our client portfolio, we observed that high 3-second hook rates (above 35%) directly correlated with a 2.4x higher click-through rate. Here are the archetypes that consistently win:</p>

      <h3>1. The Counter-Intuitive Statement</h3>
      <p><em>Example: "Stop running retargeting ads if you are making less than $50k a month."</em><br />
      It challenges conventional wisdom and forces the viewer to pause out of cognitive dissonance.</p>

      <h3>2. The Micro-Pain Visual Shock</h3>
      <p>Show the frustrating, real-world friction point within the first frame without any voiceover preface. Action speaks before audio initializes.</p>

      <h3>3. The Forensic Teardown</h3>
      <p>Screen-recording or physical dissection showing why popular products fail where your solution succeeds. People love investigative, behind-the-scenes content.</p>

      <h3>4. The Direct Callout with Negative Hook</h3>
      <p><em>Example: "Do not buy this software until you check your bounce rate."</em></p>

      <h3>5. The Speed Comparison Split-Screen</h3>
      <p>Place the standard manual method on the left and the 10x streamlined method on the right. Instant visual gratification.</p>

      <div class="blog-callout">
        <h4>Production Tip</h4>
        <p>Shoot 1 core body video and record 5 distinct 3-second hooks. Combine them to test 5 creative permutations with zero wasted studio production time.</p>
      </div>
    `
  },
  {
    id: 'blog-4',
    slug: 'cro-high-intent-landing-page-architecture',
    title: 'The High-Converting Landing Page Matrix: Turning Paid Clicks into Revenue',
    excerpt: 'Most landing pages leak 60% of their ad spend at the first scroll. Here is the modular layout framework we use for 8%+ conversion rates.',
    category: 'Conversion & CRO',
    featured: false,
    publishedAt: 'October 05, 2026',
    readTime: '8 min read',
    author: {
      name: 'Vikram Rao',
      role: 'Full-Stack Web Developer',
      avatar: '/images/growthore/testimonials/1.png',
      initials: 'VR',
    },
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    tags: ['CRO', 'Landing Pages', 'Conversion Rate', 'UX Design', 'Performance'],
    website: 'growthore',
    content: `
      <h2>The First Fold Law</h2>
      <p>A user gives your landing page approximately 3 seconds to answer three core questions:</p>
      <ul>
        <li>What is this product or service?</li>
        <li>How does it solve my immediate problem?</li>
        <li>What action must I take right now?</li>
      </ul>
      <p>If your hero section is cluttered with generic stock photos or vague taglines like "Innovating Tomorrow", visitors bounce before the browser finishes rendering your analytics tags.</p>

      <h2>Speed is the Ultimate Conversion Lever</h2>
      <p>Every 100ms delay in mobile page load results in a 1% drop in overall conversion rate. In performance advertising, where mobile traffic accounts for 85%+ of visits, heavy frameworks with 4MB bundle sizes destroy ROI.</p>
      <p>We engineer every GrowthOre landing page with sub-second Time to Interactive (TTI), clean CSS token systems, and instant edge delivery.</p>

      <h2>The 6 Modular Blocks of an 8%+ Landing Page</h2>
      <ol>
        <li><strong>Frictionless Hero:</strong> Clear value proposition, social proof ticker, primary CTA above the fold.</li>
        <li><strong>Entity Proof Bar:</strong> Client logos, press features, and verifiable certification badges.</li>
        <li><strong>Pain Point vs Solution Contrast:</strong> Clear visual layout contrasting the old broken way with the new optimized way.</li>
        <li><strong>Interactive ROI Calculator / Feature Preview:</strong> Dynamic engagement widget keeping dwell time high.</li>
        <li><strong>Deep-Dive Case Studies:</strong> Real metrics, verified before/after numbers, and video testimonials.</li>
        <li><strong>Risk Reversal & Multi-Step Lead Flow:</strong> Low-friction, progressive disclosure forms that feel effortless to complete.</li>
      </ol>
    `
  },
  {
    id: 'blog-5',
    slug: 'b2b-performance-marketing-pipeline-velocity',
    title: 'Account-Based Performance Marketing: Building Inbound Pipeline for Enterprise',
    excerpt: 'Moving away from vanity lead gen to pipeline velocity. How we synchronize LinkedIn Ads, Google Search intent, and personalized landing experiences.',
    category: 'Growth Strategy',
    featured: false,
    publishedAt: 'September 28, 2026',
    readTime: '6 min read',
    author: {
      name: 'Oliver Smith',
      role: 'Client Success Director (UK)',
      avatar: '/images/growthore/testimonials/2.png',
      initials: 'OS',
    },
    coverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    tags: ['B2B Marketing', 'Pipeline Velocity', 'LinkedIn Ads', 'Enterprise Growth', 'Account Based'],
    website: 'growthore',
    content: `
      <h2>The Death of Gated PDF eBooks</h2>
      <p>For years, B2B agencies treated "lead generation" as trading an email address for a generic 12-page PDF. But when sales teams followed up with those leads, 90% had no buying intent and couldn't even remember downloading the document.</p>
      <p>Modern B2B marketing has shifted from capturing junk emails to generating actual <strong>pipeline velocity</strong>.</p>

      <h2>Targeting Account Lists with High Precision</h2>
      <p>Instead of casting a wide net, build a tier-1 target account list of 500-1000 dream clients. Use LinkedIn matched audiences combined with firmographic filters (revenue band, technology stack, decision-maker seniority).</p>
      <p>Serve them un-gated, insightful content that educates their executive committee over a 60-day incubation cycle. When they finally reach out, they already know your methodology and are pre-sold on your capability.</p>

      <h2>Cross-Channel Orchestration</h2>
      <p>When an executive from your target list views a LinkedIn video ad, retarget their IP address and device fingerprint across Google Display and YouTube with tactical client testimonials. This creates an omnipresent impression of category leadership.</p>
    `
  },
  {
    id: 'blog-6',
    slug: 'google-performance-max-profit-bidding-strategies',
    title: 'Demystifying Google Performance Max: How to Train Smart Bidding on Margin, Not Revenue',
    excerpt: 'PMax is notorious for bidding on low-margin products or brand cannibalism. Here is the tiered asset and value-based bidding setup that maximizes actual gross profit.',
    category: 'Performance Marketing',
    featured: false,
    publishedAt: 'September 20, 2026',
    readTime: '5 min read',
    author: {
      name: 'Pooja Verma',
      role: 'Meta & Google Ads Specialist',
      avatar: '/images/growthore/testimonials/3.png',
      initials: 'PV',
    },
    coverImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Google Ads', 'PMax', 'Smart Bidding', 'E-Commerce', 'Profit Optimization'],
    website: 'growthore',
    content: `
      <h2>The PMax Black Box Trap</h2>
      <p>Google Performance Max is an incredibly potent tool, but out of the box, its algorithm is incentivized to maximize top-line conversion value rather than bottom-line profit. Without strict guardrails, it will spend 70% of your budget bidding on existing brand search terms or low-margin clearance items.</p>

      <h2>The Profit-Driven Campaign Architecture</h2>
      <p>To master PMax in 2026, implement value-based bidding adjusted for contribution margin:</p>
      <ul>
        <li><strong>Negative Keyword Lists:</strong> Add your brand keywords to an account-level negative list to force PMax into finding truly net-new customer demand.</li>
        <li><strong>Custom Margin Labels:</strong> Feed product margin categories (High Margin, Standard Margin, Liquidation) into Google Merchant Center via Custom Labels.</li>
        <li><strong>Segmented Asset Groups:</strong> Never lump all products into a single asset group. Break them down by purchase intent and target ROAS tiers.</li>
      </ul>
      <p>By guiding the machine learning algorithm with financial ground truth, your return on ad spend converts directly into free cash flow.</p>
    `
  }
];

// Helper functions for retrieving blogs
export async function getAllBlogs() {
  // If CRM API is available, try fetching from CRM
  try {
    const res = await fetch(`${CRM_CONFIG.apiUrl}?website=${CRM_CONFIG.website}`, {
      next: { revalidate: CRM_CONFIG.revalidate },
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      let rawList = [];
      if (Array.isArray(data)) {
        rawList = data;
      } else if (data && Array.isArray(data.blogs)) {
        rawList = data.blogs;
      } else if (data && Array.isArray(data.data)) {
        rawList = data.data;
      }

      // STRICT FILTER: Only allow blogs explicitly designated for Growthore
      // This guarantees Warrgyizmorsch blogs will NEVER appear here.
      const growthoreBlogs = rawList.filter((item) => {
        const site = (item.website || item.site || item.domain || '').toLowerCase().trim();
        return site === 'growthore' || site === 'growthore.co.uk';
      });

      if (growthoreBlogs.length > 0) {
        return growthoreBlogs;
      }
    }
  } catch (err) {
    // Graceful fallback to static curated data
  }

  // Fallback blogs strictly for Growthore
  return BLOG_POSTS.filter((b) => b.website === 'growthore');
}

export async function getFeaturedBlog() {
  const all = await getAllBlogs();
  const featured = all.find((b) => b.featured);
  return featured || all[0];
}

export async function getBlogBySlug(slug) {
  const all = await getAllBlogs();
  return all.find((b) => b.slug === slug) || null;
}

export async function getRelatedBlogs(currentSlug, category, limit = 3) {
  const all = await getAllBlogs();
  return all
    .filter((b) => b.slug !== currentSlug)
    .filter((b) => !category || b.category === category || true)
    .slice(0, limit);
}

export function getAllCategories(blogs = BLOG_POSTS) {
  const cats = ['All'];
  blogs.forEach((b) => {
    if (b.category && !cats.includes(b.category)) {
      cats.push(b.category);
    }
  });
  return cats;
}
