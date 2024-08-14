import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

const GameComponent = ({ playUrl }) => {
  const [userThrow, setUserThrow] = useState('');
  const [result, setResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleThrowClick = (value) => {
    setUserThrow(value);
    setIsModalOpen(true);

    fetch(playUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
      },
      body: JSON.stringify({ throw: value }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResult({
          result: data.result,
          server_choice: data.server_choice,
        });
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setResult(null); // Reset result after closing the modal
  };

  return (
    <div className="game-container">
      <h1 className="game-title">ROCK – PAPER – SCISSORS</h1>
      <p className="game-description">
        Rock Paper Scissors is a zero sum game that is usually played by two people using their hands and no tools.
        The idea is to make shapes with an outstretched hand where each shape will have a certain degree of power and
        will lead to an outcome.
      </p>

      <h2 className="select-bet">SELECT YOUR BET</h2>
      <div className="game-form">
        <div className="throw-option">
          <input
            type="radio"
            id="rock"
            name="throw"
            value="rock"
            checked={userThrow === 'rock'}
            readOnly
          />
          <label htmlFor="rock" className="throw-label" onClick={() => handleThrowClick('rock')}>
            <img src={`./assets/rock.png`} alt="Rock" className="throw-icon" />
            <span>Rock</span>
          </label>
        </div>
        <div className="throw-option">
          <input
            type="radio"
            id="paper"
            name="throw"
            value="paper"
            checked={userThrow === 'paper'}
            readOnly
          />
          <label htmlFor="paper" className="throw-label" onClick={() => handleThrowClick('paper')}>
            <img src={`./assets/paper.png`} alt="Paper" className="throw-icon" />
            <span>Paper</span>
          </label>
        </div>
        <div className="throw-option">
          <input
            type="radio"
            id="scissors"
            name="throw"
            value="scissors"
            checked={userThrow === 'scissors'}
            readOnly
          />
          <label htmlFor="scissors" className="throw-label" onClick={() => handleThrowClick('scissors')}>
            <img src={`./assets/scissors.png`} alt="Scissors" className="throw-icon" />
            <span>Scissors</span>
          </label>
        </div>
      </div>

      {isModalOpen && (
        <Modal selectedOption={userThrow} result={result} onClose={handleCloseModal} />
      )}
    </div>
  );
};

GameComponent.propTypes = {
  playUrl: PropTypes.string.isRequired,
  rock: PropTypes.string.isRequired,
  paper: PropTypes.string.isRequired,
  scissors: PropTypes.string.isRequired,
};

export default GameComponent;
