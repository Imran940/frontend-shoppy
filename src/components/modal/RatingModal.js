import { StarOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function RatingModal({ children, handleStarSubmit }) {
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  let history = useHistory();
  const { slug } = useParams();
  const handleModal = () => {
    if (user && user.token) {
      setVisible(true);
    } else {
      let from = `/product/${slug}`;
      window.localStorage.setItem("from", from);
      history.push("/login");
    }
  };
  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" />
        <br /> {user && user.token ? "Leave Rating" : "Login to leave rating"}
      </div>
      <Modal
        title="Leave Rating"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          setVisible(false);
          handleStarSubmit();
        }}
      >
        {children}
      </Modal>
    </>
  );
}

export default RatingModal;
