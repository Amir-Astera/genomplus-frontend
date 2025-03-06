import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Category.module.css";

export type CategoryType = {
  className?: string;
  image1?: string;

  /** Variant props */
  property1?: string;

  /** Style props */
  categoryWidth?: CSSProperties["width"];
  categoryHeight?: CSSProperties["height"];
};

const Category: FunctionComponent<CategoryType> = ({
  className = "",
  property1 = "Default",
  image1,
  categoryWidth,
  categoryHeight,
}) => {
  const categoryStyle: CSSProperties = useMemo(() => {
    return {
      width: categoryWidth,
      height: categoryHeight,
    };
  }, [categoryWidth, categoryHeight]);

  return (
    <div
      className={[styles.category, className].join(" ")}
      data-property1={property1}
      style={categoryStyle}
    >
      <img className={styles.image1Icon} alt="" src={image1} />
      <div className={styles.freshFruit}>Fresh Fruit</div>
    </div>
  );
};

export default Category;
