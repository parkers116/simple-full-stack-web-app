import React from "react";
import { Button } from "antd";
import { FileAddOutlined } from "@ant-design/icons";

import "./index.scss";

type Props = {};

const CreateButton = (props: Props) => {
  const onClick = () => {
    (
      document.getElementsByClassName("form-dialog")[0] as HTMLDialogElement
    )?.showModal();
  };
  return (
    <Button
      className="create-button"
      type="default"
      shape="circle"
      onClick={onClick}
    >
      <FileAddOutlined />
    </Button>
  );
};

export default CreateButton;
