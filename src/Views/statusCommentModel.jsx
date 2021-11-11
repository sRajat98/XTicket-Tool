import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function StatusCommentModel(props) {
  const { showModal, toggleModal, handleChange, handleAddComment, comment } =
    props;

  return (
    <Modal show={showModal} onHide={toggleModal} id="add-comment">
      <Modal.Header closeButton>
        <Modal.Title>Add Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          as="textarea"
          rows="3"
          value={comment}
          placeholder="Add comment here!"
          onChange={handleChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <div style={{ display: "flex", alignItems: "center" }}>
          <i className="fas fa-info-circle"></i>
          <pre> </pre>
          <Form.Text className="text-muted">
            After adding a comment Status will be changed.
          </Form.Text>
        </div>
        <Button
          variant="primary"
          disabled={comment.length > 0 ? false : true}
          onClick={handleAddComment}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StatusCommentModel;
