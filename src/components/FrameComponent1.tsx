import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../features/redux/hooks"; // убедитесь, что этот хук определён
import FrameComponent from "./FrameComponent";
import styles from "./FrameComponent1.module.css";

export type FrameComponent1Type = {
  className?: string;
};

const FrameComponent1: FunctionComponent<FrameComponent1Type> = ({ className = "" }) => {
  const navigate = useNavigate();
  // Предположим, что если state.auth.idNumber существует, значит пользователь авторизован
  const isAuth = useAppSelector((state) => Boolean(state.auth.idNumber));

  const handleClick = () => {
    if (isAuth) {
      navigate("/patient");
    } else {
      navigate("/authorization");
    }
  };

  return (
    <div className={[styles.medicalLandingPageDesignInner, className].join(" ")}>
      <header className={styles.rectangleParent}>
        <div className={styles.frameChild} />
        <div className={styles.genomLogoWrapper}>
          <a className={styles.genomLogo}>Genom Logo</a>
        </div>
        <div className={styles.frameWrapper}>
          <div className={styles.parent}>
            <a className={styles.a}>Анализы и услуги</a>
            <img
              className={styles.bestTimeIcon}
              loading="lazy"
              alt=""
              src="/vector-1.svg"
            />
          </div>
        </div>
        <div className={styles.wrapper}>
          <a className={styles.a1}>Результаты</a>
        </div>
        <div className={styles.wrapper}>
          <a className={styles.a2}>Адреса</a>
        </div>
        <div className={styles.frame}>
          <a className={styles.a1}>О нас</a>
        </div>
        <div className={styles.frameParent}>
          <div className={styles.frameContainer}>
            <div className={styles.mapPinParent}>
              <img
                className={styles.mapPinIcon}
                loading="lazy"
                alt=""
                src="/map-pin.svg"
              />
              <div className={styles.div}>Астана</div>
            </div>
          </div>
          <div className={styles.instanceWrapper}>
            <FrameComponent property1="Default" />
          </div>
          <div className={styles.rectangleGroup}>
            <div className={styles.frameItem} />
            {/* Кнопка "Личный кабинет" */}
            <button
              onClick={handleClick}
              className={styles.a4}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              Личный кабинет
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default FrameComponent1;
