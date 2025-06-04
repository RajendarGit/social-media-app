import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Image from "next/image";

const getYoutubeThumbnail = (url: string) => {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([\w-]{11})/
  )
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null
}

const getVimeoThumbnail = async (url: string) => {
  const match = url.match(/vimeo\.com\/(\d+)/)
  if (match) {
    const id = match[1]
    try {
      const res = await fetch(`https://vimeo.com/api/v2/video/${id}.json`)
      const data = await res.json()
      return data[0]?.thumbnail_large || null
    } catch {
      return null
    }
  }
  return null
}

const PostCreatorLink = ({ link, setLink, errors, setErrors }: { link: string, setLink: (link: string) => void, errors: any, setErrors: (errors: any) => void }) => {
  const [thumbnail, setThumbnail] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!link) return setThumbnail(null)
    const ytThumb = getYoutubeThumbnail(link)
    if (ytThumb) return setThumbnail(ytThumb)
    // Vimeo is async
    getVimeoThumbnail(link).then((vimeoThumb) => {
      if (vimeoThumb) setThumbnail(vimeoThumb)
    })
  }, [link])

  return (
    <div>
      <Label htmlFor="link" className="text-sm font-medium">
        Add Link
      </Label>
      <Input
        id="link"
        type="url"
        placeholder="https://example.com"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="mt-1"
      />
      {errors.link && (
        <p className="text-sm text-red-500 mt-1">{errors.link[0]}</p>
      )}
      {thumbnail && (
        <Image
          src={thumbnail}
          alt="Video thumbnail"
          width={400}
          height={400}
          className="mt-2 rounded w-full"
        />
      )}
    </div>
  );
};

export default PostCreatorLink;
