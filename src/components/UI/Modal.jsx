import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ children, setShowModal, isLogin }) => {
  return (
    <div
      className={`${styles["CustomModal"]} ${styles["CustomModal--backdrop"]}`}
    >
      <div className={styles["CustomModal__container"]}>
        {isLogin ? null : (
          <div
            className={styles["CustomModal__icon-container"]}
            onClick={() => setShowModal((p) => !p)}
          >
            <i className={`material-icons ${styles["CustomModal__icon"]}`}>
              close
            </i>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
