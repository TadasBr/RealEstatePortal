import React, { useState, useEffect } from "react";

interface ImageProps {
  base64String: string;
  alt?: string;
}

const Image: React.FC<ImageProps> = ({ base64String, alt = "" }) => {
  return <img src={base64String} alt={alt} />;
};

export default Image;
