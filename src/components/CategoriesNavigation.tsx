import { FunctionComponent } from "react";
import GroupComponent from "./GroupComponent";
import styles from "./CategoriesNavigation.module.css";

export type CategoriesNavigationType = {
  className?: string;
};

const CategoriesNavigation: FunctionComponent<CategoriesNavigationType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.categoriesNavigation, className].join(" ")}>
      <div className={styles.frameParent}>
        <div className={styles.rectangleParent}>
          <div className={styles.frameChild} />
          <div className={styles.div}>Открыть</div>
        </div>
        <b className={styles.b}>Каталог анализов и услуг</b>
        <div className={styles.frameItem} />
        <div className={styles.frameItem} />
        <h2 className={styles.h2}>Каталог анализов и услуг</h2>
        <div className={styles.rectangleGroup}>
          <div className={styles.rectangleDiv} />
          <div className={styles.div1}>Открыть</div>
        </div>
      </div>
      <GroupComponent prop="Санитарные книжки" prop1="Заказать" />
      <GroupComponent
        prop="Новости и акции"
        prop1="Открыть"
        groupDivAlignSelf="stretch"
        groupDivWidth="unset"
        divDisplay="inline-block"
        divMinWidth="78px"
      />
      <div className={styles.rectangleContainer}>
        <div className={styles.frameItem} />
        <div className={styles.frameItem} />
        <h2 className={styles.h21}>Наши пункты</h2>
        <div className={styles.groupDiv}>
          <div className={styles.rectangleDiv} />
          <div className={styles.div2}>Найти</div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesNavigation;
