import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import ClientTemplate, { emptyClientTemplateProps } from "../client-template";
import "./confirm-account.component.scss";

interface IConfirmAccountParams {
  userId: string;
  code: string;
}

export default function ConfirmAccount(props) {
  const [activationSuccess, setActivationSuccess] = useState(false);
  const [userMessage, setUserMessage] = useState("aktywowanie konta...");
  const { userId, code } = useParams<IConfirmAccountParams>();

  useEffect(() => {
    AuthService.confirmAccount(userId, code).then(
      (response) => {
        setActivationSuccess(true);
        setUserMessage("konto zostało aktywowane");
      },
      (error) => {
        setUserMessage("wystąpił problem podczas aktywacji konta");
      }
    );
  }, [userId, code]);

  return (
    <ClientTemplate {...emptyClientTemplateProps}>
      <div className="activation">
        <h2 className="activation__header">{userMessage}</h2>
        {activationSuccess && (
          <Link to={"/login"}>przejdź do formularza logowania...</Link>
        )}
      </div>
    </ClientTemplate>
  );
}
