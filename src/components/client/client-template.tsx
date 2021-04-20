import React from "react";
import { Link } from "react-router-dom";
import UserPanelTemplatePart from "./template-parts/user-panel";
import tukanIcon from "../../images/tukan.png";
import "./client-template.scss";

export interface IClientTemplateProps {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
}

export const emptyClientTemplateProps: IClientTemplateProps = {
  children: null,
  header: null,
  footer: null,
};

export default function ClientTemplate(props: IClientTemplateProps) {
  return (
    <div className="client-template__body">
      <nav className="client-template__nav">
        <UserPanelTemplatePart />
      </nav>
      <header>
        <div className="client-template__avatar">
          <Link to="/">
            <img src={tukanIcon} alt="icon" />
          </Link>
        </div>
        {props.header || (
          <h1 className="client-template__header">Tukano Boilerplate</h1>
        )}
      </header>
      <main>{props.children}</main>
      <footer className="client-template__footer">
        {props.footer || "Copyright Tukano 2021"}
      </footer>
    </div>
  );
}
