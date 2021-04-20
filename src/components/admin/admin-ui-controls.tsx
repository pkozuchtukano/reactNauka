import React, { FunctionComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

interface IDetailsBoxProps {
  label: string;
  value?: string | null | undefined;
  className?: string | null | undefined;
  children?: any;
}
const DetailsBoxOrigin: FunctionComponent<IDetailsBoxProps> = (props) => {
  return (
    <div className={props.className || "col-lg-3 col-md-4 col-sm-6"}>
      <div className="details-box">
        <div className="details-box__label">{props.label}</div>
        <div className="details-box__value">
          {props.children || props.value || "---"}
        </div>
      </div>
    </div>
  );
};
export const DetailsBox = React.memo(DetailsBoxOrigin);

interface IBoolIndicatorProps {
  value?: boolean | null | undefined;
}
const BoolIndicatorOrigin: FunctionComponent<IBoolIndicatorProps> = (props) => {
  const { value } = props;
  if (value === null || value === undefined) {
    return <></>;
  }

  return (
    <>
      {value && <FontAwesomeIcon icon={faCheckCircle} />}
      {!value && <FontAwesomeIcon icon={faTimesCircle} />}
    </>
  );
};
export const BoolIndicator = React.memo(BoolIndicatorOrigin);

interface IPageHeaderProps {
  title?: string | null | undefined;
}
const PageHeaderOrigin: FunctionComponent<IPageHeaderProps> = (props) => {
  return <h1 className="page-header">{props.title}</h1>;
};
export const PageHeader = React.memo(PageHeaderOrigin);

interface IBackButtonProps {
  url: string;
}
const BackButtonOrigin: FunctionComponent<IBackButtonProps> = (props) => {
  return (
    <Link
      to={props.url}
      className="admin-button admin-button--block admin-button--light"
    >
      Wstecz
    </Link>
  );
};
export const BackButton = React.memo(BackButtonOrigin);

interface ISubmitButtonProps {
  disabled: boolean;
  submitText?: string;
}
const SubmitButtonOrigin: FunctionComponent<ISubmitButtonProps> = (props) => {
  return (
    <button
      type="submit"
      disabled={props.disabled}
      className="admin-button admin-button--block admin-button--main"
    >
      {props.submitText || "Zapisz"}
    </button>
  );
};
export const SubmitButton = React.memo(SubmitButtonOrigin);
