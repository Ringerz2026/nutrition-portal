'use client';

import Reveal from '@/components/Reveal';

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <Reveal>
            <h1>Maria Nutrition</h1>
            <p>
              Personal nutrition, health optimisation and evidence-based
              wellness guidance.
            </p>
            <a href="/signup" className="button">
              Get Started
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <h2>1:1 Nutrition Consultations</h2>
            <p>
              Personalised recommendations designed around your lifestyle,
              health goals and individual needs.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <Reveal>
            <h2>Weight Management</h2>
            <p>
              Sustainable strategies for improving body composition and
              developing healthier habits.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <h2>Gut Health</h2>
            <p>
              Practical guidance on digestion, nutrition and long-term
              wellbeing.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <Reveal>
            <h2>Professional Guidance</h2>
            <p>
              Evidence-based advice delivered in a simple, practical and
              supportive way.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
} 