import { FunctionComponent } from "react";
import styles from "./FrameComponent2.module.css";

export type FrameComponent2Type = {
  className?: string;
};

const FrameComponent2: FunctionComponent<FrameComponent2Type> = ({
  className = "",
}) => {
  return (
    <div className={[styles.rectangleParent, className].join(" ")}>
      <div className={styles.frameChild} />
      <div className={styles.parent}>
        <h1 className={styles.h1}>
          <p className={styles.p}>{`Медицинская академическая лаборатория `}</p>
          <p className={styles.p1}>
            <span>- Геном Плюс</span>
            <span className={styles.span}>{` `}</span>
          </p>
        </h1>
        <img
          className={styles.frameItem}
          loading="lazy"
          alt=""
          src="/vector-5.svg"
        />
      </div>
      <div className={styles.frameWrapper}>
        <div className={styles.rectangleGroup}>
          <div className={styles.frameInner} />
          <div className={styles.searchInput}>
            <div className={styles.div}>Найти исследования...</div>
          </div>
          <img className={styles.groupIcon} alt="" src="/group-7.svg" />
        </div>
      </div>
    </div>
  );
};

export default FrameComponent2;
