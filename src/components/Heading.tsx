import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Heading.module.css";

export type HeadingType = {
  className?: string;
  popularCategories?: string;
  group?: string;

  /** Style props */
  headingHeight?: CSSProperties["height"];
  popularCategoriesWidth?: CSSProperties["width"];
};

const Heading: FunctionComponent<HeadingType> = ({
  className = "",
  popularCategories,
  group,
  headingHeight,
  popularCategoriesWidth,
}) => {
  const headingStyle: CSSProperties = useMemo(() => {
    return {
      height: headingHeight,
    };
  }, [headingHeight]);

  const popularCategoriesStyle: CSSProperties = useMemo(() => {
    return {
      width: popularCategoriesWidth,
    };
  }, [popularCategoriesWidth]);

  return (
    <div className={[styles.heading, className].join(" ")} style={headingStyle}>
      <h1 className={styles.popularCategories} style={popularCategoriesStyle}>
        {popularCategories}
      </h1>
      <div className={styles.button}>
        <div className={styles.viewAll}>Посмотреть все</div>
        <img className={styles.groupIcon} loading="lazy" alt="" src={group} />
      </div>
    </div>
  );
};

export default Heading;
