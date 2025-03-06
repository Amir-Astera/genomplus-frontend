import { FunctionComponent } from "react";
import styles from "./FrameComponent.module.css";

export type FrameComponentType = {
  className?: string;

  /** Variant props */
  property1?: string;
};

const FrameComponent: FunctionComponent<FrameComponentType> = ({
  className = "",
  property1 = "Default",
}) => {
  return (
    <div
      className={[styles.shoppingCartParent, className].join(" ")}
      data-property1={property1}
    >
      <img
        className={styles.shoppingCartIcon}
        loading="lazy"
        alt=""
        src="/shopping-cart.svg"
      />
      <b className={styles.cart} />
      <b className={styles.cart1}>0 ₸</b>
    </div>
  );
};

export default FrameComponent;
