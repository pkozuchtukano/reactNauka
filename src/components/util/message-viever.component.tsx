import React from "react";
import { useSelector } from "react-redux";
import {
  IMessagePayload,
  MessageVisualType,
  DANGER,
  WARNING,
  INFO,
  SUCCESS,
  DEFAULT,
} from "../../types/messages";
import "./message-viever.component.scss";

interface IPropsMessageViewer{
  viewerKey: string;
}

const MessageViewer = React.memo((props: IPropsMessageViewer) => {
  const message: IMessagePayload = useSelector(
    (state: any) => state.message.message
  );

  if (!message || !message?.body || message.viewerInstanceKey !== props.viewerKey) {
    return <></>;
  }

  return (
    <div className={"mt-lg message-box " + getCssClassByMessageType(message.type)}>
      {message?.body}
    </div>
  );
});

function getCssClassByMessageType(type: MessageVisualType): string {
  switch (type) {
    case DANGER: {
      return "message-box--danger";
    }
    case WARNING: {
      return "message-box--warning";
    }
    case INFO: {
      return "message-box--info";
    }
    case SUCCESS: {
      return "message-box--success";
    }
    case DEFAULT: {
      return "message-box--default";
    }
    default: {
      return "";
    }
  }
}

export default MessageViewer;
