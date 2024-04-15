import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMorePictures } from "../actions";
import { Gallery } from "react-grid-gallery";
import { useNavigate } from "react-router-dom";
import { Button, Flex } from "@chakra-ui/react";

async function buildGalleryItem(picture) {
  return new Promise((resolve, _) => {
    var img = new Image();
    img.src = picture.url;
    img.onload = function () {
      resolve({
        src: picture.url,
        width: this.width,
        height: this.height,
      });
    };
  });
}

const PictureList = () => {
  const dispatch = useDispatch();
  let pictures = useSelector((state) => state.pictures);
  let picturePerPage = useSelector((state) => state.picturePerPage);
  let [hasMore, setHasMore] = useState(true);
  let [page, setPage] = useState(1);
  let [galleryData, setGalleryData] = useState([]);
  useEffect(() => {
    fetchMorePictures(dispatch, page, picturePerPage).then((hasData) => {
      setHasMore(hasData);
    });
  }, [page]);
  useEffect(() => {
    Promise.all(pictures.map(buildGalleryItem))
      .then((data) => setGalleryData(data))
      .catch((e) => {
        console.log(e);
      });
  }, [pictures]);

  const navigate = useNavigate();
  return (
    <Flex direction="column" gap={2}>
      <Gallery
        images={galleryData}
        onClick={(i) => navigate(`/view/${pictures[i].id}`)}
      />
      <Button hidden={!hasMore} onClick={() => setPage(page + 1)}>
        Load more...
      </Button>
    </Flex>
  );
};

export default PictureList;
