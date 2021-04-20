import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  IMessagePayload,
  MessageVisualType,
  DANGER,
  WARNING,
  INFO,
  SUCCESS,
  DEFAULT,
} from "../../../types/messages";
import "./message-dispositor.component.scss";

export default function MessageDispositor() {
  const [messages, setMessages] = useState<IMessagePayload[]>([]);
  const message: IMessagePayload = useSelector(
    (state: any) => state.message.message
  );

  useEffect(() => {
    if (message && message?.body && message.isPublic) {
      setMessages((prev) => [...prev, message]);
    }
  }, [message]);

  return (
    <div className="message-dispositor">
      {messages.map((x) => (
        <MessageItem key={x.id} {...x} />
      ))}
    </div>
  );
}

function MessageItem(props: IMessagePayload) {
  const [visible, setVisible] = useState<boolean>(true);
  const [outAnimation, setOutAnimation] = useState<boolean>(false);

  useEffect(() => {
    const destroyTimer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    const hideTimer = setTimeout(() => {
      setOutAnimation(true);
    }, 4500);
    return () => {
      clearTimeout(destroyTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={
        "message-dispositor__item " +
        getCssClassByMessageType(props.type) +
        (outAnimation ? " message-dispositor__item--out" : "")
      }
    >
      {props.body}
    </div>
  );
}

function getCssClassByMessageType(type: MessageVisualType): string {
  switch (type) {
    case DANGER: {
      return "message-dispositor__item--danger";
    }
    case WARNING: {
      return "message-dispositor__item--warning";
    }
    case INFO: {
      return "message-dispositor__item--info";
    }
    case SUCCESS: {
      return "message-dispositor__item--success";
    }
    case DEFAULT: {
      return "message-dispositor__item--default";
    }
    default: {
      return "";
    }
  }
}
