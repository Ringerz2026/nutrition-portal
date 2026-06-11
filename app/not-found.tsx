import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container">
      <div className="card">
        <h1>Content not found</h1>
        <p className="muted">The requested material does not exist or has not been published.</p>
        <Link className="button" href="/dashboard">Back to dashboard</Link>
      </div>
    </main>
  );
}
