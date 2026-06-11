import Link from 'next/link';

type ContentCardProps = {
  title: string;
  summary?: string;
  slug: string;
  lang?: string;
};

export default function ContentCard({
  title,
  summary,
  slug,
  lang = 'en'
}: ContentCardProps) {
  return (
    <article className="card">
      <h3>{title}</h3>

      {summary && (
        <p>{summary}</p>
      )}

      <Link
        className="button"
        href={`/content/${slug}?lang=${lang}`}
      >
        Read Article
      </Link>
    </article>
  );
}