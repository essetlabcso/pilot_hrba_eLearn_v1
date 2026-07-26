import { useState } from 'react';

type Props = {
  title: string;
  embedUrl: string;
  watchUrl: string;
};

export default function ResponsiveYouTubePresentation({ title, embedUrl, watchUrl }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="m5p-presentation" aria-labelledby="m5p-presentation-title">
      <div className="m5p-section-heading">
        <p className="m5p-eyebrow">Narrated presentation</p>
        <h2 id="m5p-presentation-title">Explore the essential idea and example</h2>
      </div>
      <div className="m5p-video-frame">
        {!loaded && <p className="m5p-video-loading" role="status">Presentation loading…</p>}
        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setLoaded(true)}
        />
      </div>
      <p className="m5p-video-fallback">
        If the presentation does not load,{' '}
        <a href={watchUrl} target="_blank" rel="noreferrer">
          open the presentation on YouTube
        </a>.
      </p>
    </section>
  );
}
