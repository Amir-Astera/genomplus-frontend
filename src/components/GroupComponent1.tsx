import { FunctionComponent } from "react";
import styles from "./GroupComponent1.module.css";

export type GroupComponent1Type = {
  className?: string;
};

const GroupComponent1: FunctionComponent<GroupComponent1Type> = ({
  className = "",
}) => {
  return (
    <div className={[styles.rectangleParent, className].join(" ")}>
      <img className={styles.frameChild} alt="" src="/rectangle-18@2x.png" />
      <div className={styles.frameItem} />
      <div className={styles.footerLinks}>
        <div className={styles.socialLinks}>
          <div className={styles.socialContainer}>
            <img
              className={styles.listingContIcon}
              loading="lazy"
              alt=""
              src="/vector.svg"
            />
            <img
              className={styles.listingContIcon}
              loading="lazy"
              alt=""
              src="/group-8.svg"
            />
            <img className={styles.ratingIcon} alt="" src="/vector-11.svg" />
          </div>
          <div className={styles.companyNameFooter}>
            <h2 className={styles.h2}>Геном Плюс</h2>
          </div>
        </div>
        <div className={styles.linkColumns}>
          <div className={styles.parent}>
            <h2 className={styles.h21}>Клиентам</h2>
            <div className={styles.clientInfoLinks}>
              <div className={styles.div}>Анализы и цены</div>
              <div className={styles.div}>Получить результаты</div>
              <div className={styles.div}>Подготовка к сдаче анализов</div>
              <div className={styles.div3}>Контакты</div>
            </div>
          </div>
        </div>
        <div className={styles.linkColumns1}>
          <div className={styles.parent}>
            <h2 className={styles.h21}>Информация</h2>
            <div className={styles.clientInfoLinks}>
              <div className={styles.div}>О нас</div>
              <div className={styles.div}>Врачам</div>
              <div className={styles.div6}>Новости</div>
              <div className={styles.div7}>Миссия</div>
            </div>
          </div>
        </div>
        <div className={styles.addressContainerWrapper}>
          <div className={styles.addressContainer}>
            <h2 className={styles.h23}>Адреса</h2>
            <img
              className={styles.pricePerNight}
              loading="lazy"
              alt=""
              src="/rectangle-63@2x.png"
            />
          </div>
        </div>
      </div>
      <div className={styles.copyrightContentWrapper}>
        <div className={styles.copyrightContent}>
          <img
            className={styles.nightIcon}
            loading="lazy"
            alt=""
            src="/vector-4.svg"
          />
          <div className={styles.wrapper}>
            <div className={styles.div8}>
              © 2024 Геном Плюс. Все права защищены. Запрещено использование
              материалов сайта без согласия его авторов и обратной ссылки.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupComponent1;
