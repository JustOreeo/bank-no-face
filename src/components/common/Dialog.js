import React from "react";

const Dialog = (props) => {
  return (
    <div className="modal-container">
      <div className="modal-dialog">
        <div className="message">{props.message}</div>
        <div className="buttons">
          <button
            type="button"
            onClick={() => props.onDialog(true)}
            className="green-button"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={() => props.onDialog(false)}
            className="green-button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
