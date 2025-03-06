import React, { useEffect, useState } from "react";
import axiosInstance from "../features/redux/api/axiosInstance"; // Подключение axiosInstance
import Heading from "./Heading";
import Category from "./Category";
import styles from "./ViewAllButton.module.css";

export type ViewAllButtonType = {
  className?: string;
  cityId: string; // Получение `cityId` как пропс
};

interface Topic {
  id: string;
  name: string;
  version: number;
}

interface TopicWithDetails {
  topic: Topic;
  totalPopularity: number;
  minPrice: number;
  totalAnalyses: number;
}

const ViewAllButton: React.FC<ViewAllButtonType> = ({ className = "", cityId }) => {
  const [topics, setTopics] = useState<TopicWithDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(`/api/topic/top/${cityId}`);
        setTopics(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Ошибка при загрузке данных");
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [cityId]);

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  return (
    <div className={[styles.viewAllButton, className].join(" ")}>
      <Heading popularCategories="Популярные исследования" group="/group.svg" />
      <div className={styles.biochemCategory}>
        <div className={styles.biochemCategoryTypes}>
          {topics.map((topicWithDetails) => (
            <div key={topicWithDetails.topic.id} className={styles.biochemCategoryNames}>
              <Category property1="Default" image1="/image-1@2x.png" />
              <img
                className={styles.femaleMedicalScientificReseIcon}
                loading="lazy"
                alt=""
                src="/femalemedicalscientificresearcherwomandoctorlookingtesttubesolution-1@2x.png"
              />
              <div className={styles.rating}>
                <div className={styles.biochemPrices}>
                  <h3 className={styles.h3}>{topicWithDetails.topic.name}</h3>
                  <div className={styles.div}>{topicWithDetails.totalAnalyses} анализов</div>
                </div>
                <div className={styles.parent}>
                  <div className={styles.div1}>
                    <span className={styles.span}>от </span>
                    <span className={styles.span1}>{topicWithDetails.minPrice} ₸</span>
                  </div>
                  <div className={styles.wrapper}>
                    <div className={styles.div2}>Подробнее</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewAllButton;
