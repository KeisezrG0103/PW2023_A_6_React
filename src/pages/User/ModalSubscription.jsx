import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { usePostSubscribeMutation } from "../../api/subscriptionApi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const ModalSubscription = ({show, handleClose, id}) => {

  const [postSubscribe, { data, isLoading, error }] = usePostSubscribeMutation();

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch(); 



  const handleSubs = () => {
    try {
      postSubscribe(id);
      handleClose();
      toast.success("Subscribe Success");

      setInterval(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Subscribe our Education ?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubs}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSubscription;
