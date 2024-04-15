import React from "react";
import { useSelector } from "react-redux";

export default function PictureView() {
  const picture = useSelector((state) => state.pictureInView);
  return <img src={picture.url} />;
}
