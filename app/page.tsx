'use client';

import Link from 'next/link';
import Reveal from '@/components/Reveal';

export default function HomePage() {
  return (
    <main>
      <section className="premiumHero">
        <div className="container premiumHeroGrid">
          <Reveal>
            <div>
              <p className="eyebrow">Premium Nutrition Platform</p>
              <h1>Personalised nutrition guidance for long-term health and wellbeing.</h1>
              <p className="heroText">
                Access structured nutrition protocols, recipes and educational content in English and Russian through a secure member area.
              </p>
              <div className="heroButtons">
                <Link className="button" href="/signup">Create account</Link>
                <Link className="button secondary" href="/login">Login</Link>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="heroPanel">
              <p>Evidence-based nutrition</p>
              <h2>Gut health · Metabolism · Energy · Lifestyle</h2>
              <span>Members-only content library</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="premiumSection">
        <div className="container">
          <Reveal>
            <p className="eyebrow">What’s included</p>
            <h2>Clear guidance, practical tools and structured learning.</h2>
          </Reveal>

          <div className="premiumGrid">
            <Reveal>
              <div className="premiumCard">
                <h3>Nutrition Protocols</h3>
                <p>Structured guidance for hydration, digestion, blood sugar, gut health and sustainable eating habits.</p>
              </div>
            </Reveal>

            <Reveal>
              <div className="premiumCard">
                <h3>Recipes & Meal Ideas</h3>
                <p>Simple meals and recipes designed to make healthy eating consistent, realistic and enjoyable.</p>
              </div>
            </Reveal>

            <Reveal>
              <div className="premiumCard">
                <h3>Bilingual Content</h3>
                <p>All key materials can be accessed in English and Russian for a complete bilingual experience.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="premiumSection alt">
        <div className="container premiumSplit">
          <Reveal>
            <div>
              <p className="eyebrow">For members</p>
              <h2>A private nutrition library designed around education and consistency.</h2>
            </div>
          </Reveal>

          <Reveal>
            <div className="premiumCard">
              <p>
                Subscribers can log in securely, access published materials, read articles and follow the programme at their own pace.
              </p>
              <Link className="button" href="/dashboard">Go to dashboard</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}