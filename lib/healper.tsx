import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";

// Helper component for embedding link thumbnail
export function EmbedLink({ link }: { link: string }) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    getYoutubeVimeoThumbnail(link).then(setThumbnail);
  }, [link]);

  const embedUrl = getEmbedUrl(link);
  if (embedUrl) {
    return (
      <div className="w-full aspect-video mb-2">
        <iframe
          src={embedUrl}
          title="Embedded video"
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  if (thumbnail) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Image
          src={thumbnail}
          alt="Video thumbnail"
          className="rounded w-full mb-2"
          width={400}
          height={400}
        />
        <span className="text-sm text-blue-600 hover:underline break-all">
          {" "}
          {link}{" "}
        </span>
      </a>
    );
  }
  return null;
}

// Helper to get YouTube or Vimeo thumbnail
async function getYoutubeVimeoThumbnail(url: string): Promise<string | null> {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([\w-]{11})/
  );
  if (ytMatch) return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    try {
      const res = await fetch(
        `https://vimeo.com/api/v2/video/${vimeoMatch[1]}.json`
      );
      const data = await res.json();
      return data[0]?.thumbnail_large || null;
    } catch {
      return null;
    }
  }
  return null;
}

// Helper to get YouTube or Vimeo embed URL
function getEmbedUrl(url: string): string | null {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([\w-]{11})/
  );
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return null;
}
