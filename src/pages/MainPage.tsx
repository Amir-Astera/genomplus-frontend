import { FunctionComponent } from "react";
import FrameComponent1 from "../components/FrameComponent1";
import FrameComponent2 from "../components/FrameComponent2";
import CategoriesNavigation from "../components/CategoriesNavigation";
import ViewAllButton from "../components/ViewAllButton";
import TestTypes from "../components/TestTypes";
import GenomPlusDescription from "../components/GenomPlusDescription";
import GroupComponent1 from "../components/GroupComponent1";
import styles from "./MainPage.module.css";

const MainPage: FunctionComponent = () => {
  return (
    <div className={styles.medicalLandingPageDesign}>
      <footer className={styles.layoutSelection} />
      <FrameComponent1 />
      <FrameComponent2 />
      <div className={styles.freepikExport20241201122843z} />
      <main className={styles.medicalLandingPageDesignInner}>
        <section className={styles.categoriesNavigationParent}>
          <CategoriesNavigation />
          <ViewAllButton cityId="97f847ff-50cd-4b3d-8521-36a3aaf44d5f"/>
          <TestTypes cityId="97f847ff-50cd-4b3d-8521-36a3aaf44d5f"/>
          <div className={styles.sanitaryBooksHeaderWrapper}>
            <div className={styles.sanitaryBooksHeader}>
              <h2 className={styles.h2}>Санитарные книжки</h2>
              <div className={styles.sanitaryBooksContent}>
                <div className={styles.discountBadge}>
                  <img
                    className={styles.discountBadgeChild}
                    alt=""
                    src="/ellipse-14.svg"
                  />
                  <div className={styles.badgeContent}>
                    <div className={styles.wrapperGroup253}>
                      <img
                        className={styles.wrapperGroup253Child}
                        alt=""
                        src="/group-253.svg"
                      />
                    </div>
                    <div className={styles.wrapperRb21488824171}>
                      <img
                        className={styles.rb21488824171Icon}
                        loading="lazy"
                        alt=""
                        src="/rb-2148882417-1@2x.png"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.sanitaryBooksDescription}>
                  <div className={styles.descriptionContent}>
                    <div className={styles.div}>
                      <span>20%</span>
                      <span className={styles.span}>{` `}</span>
                      <span className={styles.span1}>СКИДКА</span>
                    </div>
                    <div className={styles.div1}>
                      Закажите санитарные книжки со скидкой у нас на сайте
                    </div>
                    <div className={styles.descriptionContentInner}>
                      <div className={styles.rectangleParent}>
                        <div className={styles.frameChild} />
                        <b className={styles.b}>В корзину</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <GenomPlusDescription />
        </section>
      </main>
      <GroupComponent1 />
    </div>
  );
};

export default MainPage;
