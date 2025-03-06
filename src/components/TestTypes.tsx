import { FunctionComponent, useEffect, useState } from "react";
import axios from "../features/redux/api/axiosInstance"; // Убедитесь, что axios настроен
import Heading from "./Heading";
import styles from "./TestTypes.module.css";

export type TestTypesType = {
  className?: string;
  cityId: string;
};

const TestTypes: FunctionComponent<TestTypesType> = ({
  className = "",
  cityId,
}) => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const response = await axios.get(`/api/analysis/popular/${cityId}`);
        setAnalyses(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalyses();
  }, [cityId]);

  return (
    <div className={[styles.testTypes, className].join(" ")}>
      <Heading
        popularCategories="Популярные анализы"
        group="/group-1.svg"
        headingHeight="38px"
        popularCategoriesWidth="366px"
      />
      <div className={styles.cartPopup}>
        <div className={styles.pricePerNight} />
        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {loading ? (
              <p>Загрузка...</p>
            ) : (
              analyses.map((item: any) => (
                <div key={item.analysis.id} className={styles.cartItemDetails}>
                  <div className={styles.cartItemsData}>
                    <div className={styles.cartItemsPrice}>
                      <b className={styles.igA}>{item.analysis.name}</b>
                      <div className={styles.parent}>
                        <div className={styles.div}>{item.analysis.material}</div>
                        <div className={styles.cartTotalAmount}>
                          <b className={styles.b}>•</b>
                        </div>
                        <div className={styles.div1}>
                          {item.analysis.deadline}
                        </div>
                      </div>
                    </div>
                    <div className={styles.checkoutWrapper}>
                      <div className={styles.checkout}>
                        <div className={styles.wrapper}>
                          <div className={styles.div2}>
                            {item.analysis.price} ₸
                          </div>
                        </div>
                        <div className={styles.rectangleParent}>
                          <div className={styles.frameChild} />
                          <b className={styles.b1}>В корзину</b>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.cartItemsData1}>
                <div className={styles.price} />
                <div className={styles.heartIcon} />
              </div>
                </div>
              ))
            )}

            {/* Корзина */}
          </div>
          <div className={styles.parent10}>
              <div className={styles.div33}>В КОРЗИНЕ</div>
              <div className={styles.discountDescription}>
                <div className={styles.sanitaryButton}>
                  <div className={styles.addToCartSanitary}>
                    <div className={styles.parent11}>
                      <div className={styles.div34}>Исследования (1)</div>
                      <div className={styles.div35}>Взятие (0)</div>
                      <div className={styles.div36}>К оплате</div>
                    </div>
                    <div className={styles.parent12}>
                      <div className={styles.div37}>{`2200 ₸ `}</div>
                      <div className={styles.div38}>{`0 ₸ `}</div>
                      <div className={styles.div39}>{`2200 ₸ `}</div>
                    </div>
                  </div>
                  <div className={styles.image} />
                </div>
                <div className={styles.cartButtonContainerWrapper}>
                  <div className={styles.cartButtonContainer}>
                    <img
                      className={styles.shoppingCartIcon}
                      alt=""
                      src="/shopping-cart-1.svg"
                    />
                    <div className={styles.cartCheckoutButton}>
                      <div className={styles.cartCheckout}>
                        <div className={styles.checkoutBackground} />
                        <b className={styles.b24}>В корзину</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.heartIcon1} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default TestTypes;
