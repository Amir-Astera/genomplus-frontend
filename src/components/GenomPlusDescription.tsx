import { FunctionComponent } from "react";
import styles from "./GenomPlusDescription.module.css";

export type GenomPlusDescriptionType = {
  className?: string;
};

const GenomPlusDescription: FunctionComponent<GenomPlusDescriptionType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.genomPlusDescription, className].join(" ")}>
      <div className={styles.descriptionContainer}>
        <div className={styles.descriptionContentContainer}>
          <h1 className={styles.h1}>Геном Плюс</h1>
          <div className={styles.companyInfo}>
            <div className={styles.companyDescription}>
              <div className={styles.div}>
                ТОО «Геном Плюс» – молодая, перспективная компания на рынке
                диагностических услуг в городе Нур-Султан и Акмолинской области.
                Сегодня с нами сотрудничают как государственные поликлиники, так
                и частные медицинские центры.
              </div>
              <div className={styles.div}>
                Высокое качество исследований помогает обеспечить современное
                автоматизированное медицинское оборудование и расходные
                материалы от ведущих мировых производителей. Контроль качества
                осуществляется на всех этапах: от момента взятия биоматериала до
                получения результатов исследований.
              </div>
            </div>
            <div className={styles.div2}>Подробнее</div>
          </div>
          <div className={styles.researchStatistics}>
            <div className={styles.statisticsContent}>
              <b className={styles.researchCountLabel}>100,000+</b>
              <div className={styles.div3}>
                Проведено медицинских исследований
              </div>
            </div>
            <div className={styles.analysisStatistics}>
              <div className={styles.analysisContent}>
                <b className={styles.analysisCountLabel}>50,000+</b>
                <div className={styles.div4}>Сдано анализов</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.advantages}>
        <div className={styles.advantagesInner}>
          <div className={styles.vectorParent}>
            <img className={styles.frameChild} alt="" src="/rectangle-59.svg" />
            <img
              className={styles.rb260642Icon}
              loading="lazy"
              alt=""
              src="/rb-26064-2@2x.png"
            />
            <b className={styles.b}>Высокая точность и гарантия результата</b>
            <div className={styles.div5}>
              Только сертифицированное оборудование и многоуровневая проверка
              обеспечивают точные и достоверные результаты анализов.
            </div>
          </div>
        </div>
        <div className={styles.vectorGroup}>
          <img className={styles.frameChild} alt="" src="/rectangle-62.svg" />
          <img
            className={styles.removalaiCa31d0626641404dIcon}
            loading="lazy"
            alt=""
            src="/removalai-ca31d0626641404d9bf44d60d89ad388screenshot-1-transparent-1@2x.png"
          />
          <b className={styles.b}>Быстрые результаты без потери качества</b>
          <div className={styles.div5}>
            Ваше время ценно — результаты предоставляются оперативно, без ущерба
            для точности и надежности.
          </div>
        </div>
      </div>
      <div className={styles.comfortConfidence}>
        <div className={styles.vectorContainer}>
          <img className={styles.frameChild} alt="" src="/rectangle-61.svg" />
          <img
            className={styles.rb260642Icon}
            loading="lazy"
            alt=""
            src="/rb-2187-1@2x.png"
          />
          <b className={styles.b}>Комфорт и уверенность в каждом шаге</b>
          <div className={styles.div7}>
            Мы объединяем точность и оперативность, создавая максимальное
            удобство для вас. Онлайн-запись, быстрое обслуживание и результат,
            которому можно доверять.
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenomPlusDescription;
