import React from "react";
import { Button } from "antd";
import { FileAddOutlined } from "@ant-design/icons";

import "./index.scss";

type Props = {};

const CreateButton = (props: Props) => {
  const onClick = () => {
    (
      document.getElementsByClassName(
        "form-dialog-create"
      )[0] as HTMLDialogElement
    )?.showModal();
  };
  return (
    <Button
      className="create-button"
      type="default"
      shape="circle"
      aria-label="create button"
      onClick={onClick}
    >
      <FileAddOutlined />
    </Button>
  );
};

export default CreateButton;
