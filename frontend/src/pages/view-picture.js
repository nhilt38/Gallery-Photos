import Header from "../components/header";
import PictureView from "../components/picture-view";
import Comments from "../components/comments";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchComments, viewSinglePicture } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Box, Center, Flex } from "@chakra-ui/react";

export default function ViewPicture() {
  let dispatch = useDispatch();
  const picture = useSelector((state) => state.pictureInView);
  let { photoId } = useParams();
  useEffect(() => {
    viewSinglePicture(dispatch, photoId);
    fetchComments(dispatch, photoId);
  }, [dispatch, photoId]);
  if (!picture) {
    return <p>Invalid picture</p>;
  }
  return (
    <>
      <Header />
      <Flex color="white">
        <Center flex="2">
          <PictureView />
        </Center>
        <Box flex="1">
          <Comments />
        </Box>
      </Flex>
    </>
  );
}
