import Header from "../components/header";
import UploadForm from "../components/upload-form";
import LoginGuard from "../components/login-guard";
import React from "react";

export default function Home() {
  return (
    <LoginGuard>
      <Header />
      <UploadForm />
    </LoginGuard>
  );
}
