import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleFileChange(handleImageUpload: (file: File, type: "avatar" | "banner") => void, e: React.ChangeEvent<HTMLInputElement>, type: "avatar" | "banner") {
  const file = e.target.files?.[0];
  if (file) {
    handleImageUpload(file, type);
  }
}

export function imgPath(path: string) {
  return `/common/images/${path}`;
}
