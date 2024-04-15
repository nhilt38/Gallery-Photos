import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../actions";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
  Avatar,
  Flex,
  Input,
  Button,
} from "@chakra-ui/react";

function CommentCard() {
  const comments = useSelector((state) => state.comments);
  return (
    <Stack spacing="4">
      {comments.map((e, i) => {
        return (
          <Flex key={i} alignItems="center" gap={1}>
            <Avatar
              size={"sm"}
              src={`https://picsum.photos/seed/${e.user.name}/200`}
            />
            <Heading size="xs">{e.user.name}:</Heading>
            <Text fontSize="sm">{e.text}</Text>
          </Flex>
        );
      })}
    </Stack>
  );
}

function CommentInput() {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.authToken);
  const photo = useSelector((state) => state.pictureInView);
  const [comment, setComment] = useState("");
  const handleComment = async (e) => {
    e.preventDefault();
    await postComment(dispatch, photo.id, comment, authToken);
    setComment("");
  };
  if (!authToken) {
    return <></>;
  }
  return (
    <Flex gap={1}>
      {" "}
      <Input
        type="text"
        name="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        border="2px solid"
        borderColor="#319795"
      />
      <Button onClick={handleComment} bg="#319795" color="white">
        Send
      </Button>
    </Flex>
  );
}
export default function Comments() {
  return (
    <Card height="100%" bg="aliceblue">
      <CardHeader>
        <Heading size="md">Comments: </Heading>
      </CardHeader>{" "}
      <CardBody height="100%">
        <Flex
          direction="column"
          gap={3}
          justifyContent="space-between"
          height="100%"
        >
          <CommentCard />
          <CommentInput />
        </Flex>
      </CardBody>
    </Card>
  );
}
