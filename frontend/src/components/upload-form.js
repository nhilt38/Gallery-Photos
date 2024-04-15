import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPictures } from "../actions";
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { SpinnerIcon } from "@chakra-ui/icons";

export default function UploadForm() {
  const fileInputRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSuccessAlert, setShowSuccesssAlert] = useState(false);
  const [working, setWorking] = useState(false);
  let dispatch = useDispatch();
  const authToken = useSelector((state) => state.authToken);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files && files.every((e) => e.type.startsWith("image/"))) {
      setSelectedFiles(files);
      setErrorMessage(null);
    } else {
      setSelectedFiles(null);
      setErrorMessage("Please select image files.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFiles) {
      console.log("Uploading image:", selectedFiles);
      setWorking(true);
      await postPictures(dispatch, selectedFiles, authToken);
      setTimeout(() => {
        setShowSuccesssAlert(false);
      }, 3000);
      setShowSuccesssAlert(true);
      setWorking(false);
      setSelectedFiles(null);
      fileInputRef.current.value = "";
    } else {
      setErrorMessage("Please select an image file to upload.");
    }
  };
  return (
    <Formik
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(props) => (
        <Form>
          <Field name="name">
            {({ field, form }) => (
              <FormControl isInvalid={errorMessage && form.touched.name}>
                <FormLabel>Choose Images</FormLabel>
                <Input
                  {...field}
                  placeholder="file"
                  multiple={true}
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  ref={fileInputRef}
                />
                <FormErrorMessage>{errorMessage}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
            onClick={handleSubmit}
            isDisabled={working}
            leftIcon={working && <SpinnerIcon />}
          >
            Upload
          </Button>
          {showSuccessAlert && (
            <Alert status="success">
              <AlertIcon />
              Data uploaded to the server. Fire on!
            </Alert>
          )}
        </Form>
      )}
    </Formik>
  );
}
