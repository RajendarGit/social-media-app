import React from "react";
import { AvatarImage, AvatarFallback } from "../ui/avatar";

const AvatarImageCOntainer = ({
  avatarSrc,
  avatarAlt,
  avatarName,
}: {
  avatarSrc: string;
  avatarAlt: string;
  avatarName: string;
}) => {
  return (
    <>
      <AvatarImage src={avatarSrc} alt={avatarAlt} />
      <AvatarFallback>{avatarName.charAt(0)}</AvatarFallback>
    </>
  );
};

export default AvatarImageCOntainer;
