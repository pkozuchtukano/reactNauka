import React from "react";
import ClientTemplate, { emptyClientTemplateProps } from "../client-template";
import "./home.component.scss";

export default function Home() {
  
  return (
    <ClientTemplate {...emptyClientTemplateProps}>
      <h2 className="home-page__title">Hello World!!!</h2>
    </ClientTemplate>
  );
}
