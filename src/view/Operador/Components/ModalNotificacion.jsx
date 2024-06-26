import { Button, Col, Modal } from "reactstrap";

const ModalNotificacion = () => {
  return (
    <Col md="4">
      <Button
        block
        className="mb-3"
        color="warning"
        type="button"
        onClick={() => this.toggleModal("notificationModal")}
      >
        Notification
      </Button>
      <Modal
        className="modal-dialog-centered modal-danger"
        contentClassName="bg-gradient-danger"
        isOpen={this.state.notificationModal}
        toggle={() => this.toggleModal("notificationModal")}
      >
        <div className="modal-header">
          <h6 className="modal-title" id="modal-title-notification">
            Your attention is required
          </h6>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => this.toggleModal("notificationModal")}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="py-3 text-center">
            <i className="ni ni-bell-55 ni-3x" />
            <h4 className="heading mt-4">You should read this!</h4>
            <p>
              A small river named Duden flows by their place and supplies it
              with the necessary regelialia.
            </p>
          </div>
        </div>
        <div className="modal-footer">
          <Button className="btn-white" color="default" type="button">
            Ok, Got it
          </Button>
          <Button
            className="text-white ml-auto"
            color="link"
            data-dismiss="modal"
            type="button"
            onClick={() => this.toggleModal("notificationModal")}
          >
            Close
          </Button>
        </div>
      </Modal>
    </Col>
  );
};

export default ModalNotificacion;
