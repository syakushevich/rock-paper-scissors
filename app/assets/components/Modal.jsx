import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ selectedOption, result, onClose }) => {
  const isWaiting = !result;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>

        {isWaiting ? (
          <>
            <h2 className="modal-title">WAITING CURB'S CHOOSE</h2>
            <div className="modal-body">
              <img src={`./assets/${selectedOption}.png`} alt="Your Bet" className="modal-image" />
              <p className="modal-bet">Your bet</p>
              <div className="modal-loader">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              <img src={`./assets/logo.png`} alt="Curb" className="modal-curb-logo" />
            </div>
          </>
        ) : (
          <>
            <h2 className="modal-title">{result.result.toUpperCase()}</h2>
            <p className="modal-subtitle">Curb with {result.server_choice} wins</p>
            <div className="modal-body">
              <img src={`./assets/${result.server_choice}.png`} alt={result.server_choice} className="modal-image" />
              <button className="modal-button" onClick={onClose}>Ok</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  selectedOption: PropTypes.string.isRequired,
  result: PropTypes.object, // Result can be null while waiting
  onClose: PropTypes.func.isRequired,
};

export default Modal;
