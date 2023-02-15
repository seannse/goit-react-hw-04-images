import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

function Modal({ closeModal, largeImageURL }) {
  useEffect(() => {
    function onEscClose(e) {
      if (e.code === 'Escape') closeModal();
    }
    window.addEventListener('keydown', onEscClose);

    return () => window.removeEventListener('keydown', onEscClose);
  }, [closeModal]);

  function onCloseImage(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  return (
    <div className={css.overlay} onClick={onCloseImage}>
      <div className={css.modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default Modal;
