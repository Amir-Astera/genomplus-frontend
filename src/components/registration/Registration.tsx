// src/pages/Registration/Registration.tsx
import React, { useState, useEffect } from 'react';
import styles from './Registration.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/redux/hooks';
import { createPatientThunk, resetPatientState } from '../../features/redux/slices/patientSlice';

const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useAppSelector((state) => state.patient);
  const [searchParams] = useSearchParams();
  const iinFromQuery = searchParams.get("iin") || ""; // берем iin из URL

  const [formData, setFormData] = useState({
    iin: iinFromQuery,
    firstName: '',
    secondName: '',
    lastName: '',
    birthDay: '',
    sex: '0',      // 0 = Мужчина, 1 = Женщина
    email: '',
    phone: '',
    numDoc: '',
    agreeToTerms: false,
  });

  useEffect(() => {
    if (success) {
      // При успешном создании пациента
      // Переходим на страницу Confirm, передаём телефон
      navigate(`/confirm?phone=${encodeURIComponent(formData.phone)}`);
      dispatch(resetPatientState());
    }
  }, [success, formData.phone, dispatch, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.agreeToTerms) {
      alert('Вы должны согласиться на обработку персональных данных!');
      return;
    }
    if (!formData.iin || !formData.firstName || !formData.secondName || !formData.birthDay ||
        !formData.email || !formData.phone || !formData.numDoc) {
      alert('Заполните все обязательные поля!');
      return;
    }

    // Отправляем форму на сервер
    dispatch(createPatientThunk({
      iin: formData.iin,
      firstName: formData.firstName,
      secondName: formData.secondName,
      lastName: formData.lastName,
      birthDay: formData.birthDay,
      sex: formData.sex,
      email: formData.email,
      phone: formData.phone,
      numDoc: formData.numDoc,
    }));
  };

  return (
    <div className={styles.registration}>
      {/* Шапка (как в макете) */}
      <div className={styles.rectangleParent}>
        <div className={styles.frameChild} />
        <div className={styles.genomLogoParent}>
          <b className={styles.genomLogo}>Genom Logo</b>
          <div className={styles.instanceParent}>
            <div className={styles.shoppingCartParent}>
              <img className={styles.shoppingCartIcon} alt="" src="D:\genomplus-frontend\src\features\assets\Shopping Cart.svg" />
              <b className={styles.cart} />
              <b className={styles.b}>0 ₸</b>
            </div>
            <div className={styles.rectangleGroup}>
              <div className={styles.groupChild} />
              <div className={styles.div}>Личный кабинет</div>
            </div>
          </div>
        </div>
      </div>

      {/* Верхнее меню */}
      <div className={styles.div2}>
        <b className={styles.b1}>Анализы  и услуги</b>
        <div className={styles.div3}>О нас</div>
        <div className={styles.div4}>Результаты</div>
        <div className={styles.div5}>Адреса</div>
        <img className={styles.child} alt="" src="D:\genomplus-frontend\src\features\assets\Vector 1.svg" />
      </div>

      <div className={styles.rectangleContainer}>
        <div className={styles.groupItem} />
        <div className={styles.groupParent}>
          					<div className={styles.parent}>
            						<div className={styles.div6}>+7 (778) 123 45 67</div>
            						<img className={styles.groupIcon} alt="" src="D:\genomplus-frontend\src\features\assets\Group.svg" />
          					</div>
          					<div className={styles.groupContainer}>
            						<div className={styles.groupDiv}>
              							<div className={styles.groupInner} />
              							<div className={styles.div7}>Найти исследования...</div>
            						</div>
            						<div className={styles.rectangleParent1}>
              							<div className={styles.rectangleDiv} />
              							<img className={styles.bisearchIcon} alt="" src="D:\genomplus-frontend\src\features\assets\bi_search.svg" />
            						</div>
          					</div>
        				</div>
        {/* Тут основная часть формы */}
        <div className={styles.rectangleParent2}>
        <div className={styles.groupChild1} />
        <div className={styles.wrapper}>
          					<div className={styles.div16}>Регистрация</div>
        				</div>
        {error && <div style={{ color: 'red' }}>Ошибка: {error}</div>}

        <div className={styles.div15}>Создайте свой личный кабинет и заполните конфиденциальную анкету. Вся информация будет доступна только вам.</div>

        {/* Поле ИИН */}
        <div className={styles.rectangleParent7}>
          <input
            className={styles.groupChild2}
            type="text"
            name="iin"
            placeholder="ИИН"
            value={formData.iin}
            onChange={handleChange}
          />
        </div>

        {/* Поле Имя */}
        <div className={styles.rectangleParent11}>
          <input
            className={styles.groupChild4}
            type="text"
            name="firstName"
            placeholder="Имя"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        {/* Поле Фамилия */}
        <div className={styles.rectangleParent7}>
          <input
            className={styles.groupChild4}
            type="text"
            name="secondName"
            placeholder="Фамилия"
            value={formData.secondName}
            onChange={handleChange}
          />
        </div>

        {/* Поле Отчество (необязательно) */}
        <div className={styles.rectangleParent8}>
          <input
            className={styles.groupChild2}
            type="text"
            name="lastName"
            placeholder="Отчество (необязательно)"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        {/* Пол поле (радиокнопки) */}
        <div className={styles.radioButtonsParent}>
          <label className={styles.radioButtons}>
            <input
              type="radio"
              name="sex"
              value="0"
              checked={formData.sex === '0'}
              onChange={handleChange}
            />
            <span className={styles.div20}>Мужчина</span>
          </label>
        </div>
        <div className={styles.radioButtonsGroup}>
          <label className={styles.radioButtons}>
            <input
              type="radio"
              name="sex"
              value="1"
              checked={formData.sex === '1'}
              onChange={handleChange}
            />
            <span className={styles.div20}>Женщина</span>
          </label>
        </div>

        {/* Поле Дата рождения */}
        <div className={styles.rectangleParent3}>
          <input
            className={styles.groupChild2}
            type="date"
            name="birthDay"
            value={formData.birthDay}
            onChange={handleChange}
          />
        </div>

        {/* Поле Номер документа */}
        <div className={styles.rectangleParent4}>
            
          <input
            className={styles.groupChild2}
            type="text"
            name="numDoc"
            placeholder="Номер документа"
            value={formData.numDoc}
            onChange={handleChange}
          />
        </div>

        {/* Поле Email */}
        <div className={styles.rectangleParent5}>
          <input
            className={styles.groupChild4}
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Поле Телефон */}
        <div className={styles.rectangleParent6}>
          <input
            className={styles.groupChild2}
            type="tel"
            name="phone"
            placeholder="Телефон"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

       {/* Чекбокс согласия на обработку данных */}
       <div className={styles.groupParent2}>

        <div className={styles.rectangleParent9}>
            <button
                className={styles.groupChild8}
                style={{ cursor: 'pointer' }}
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? 'Загрузка...' : <div className={styles.div22}>Регистрация</div>}
            </button>
        </div>

        <div className={styles.rectangleParent10}>
            <label className={styles.groupChild9} style={{ display: 'inline-block' }}>
                <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                />
            </label>
            <div className={styles.div23}>
                <span>Я даю согласие на&nbsp;</span>
                <span className={styles.span}>обработку персональных данных</span>
            </div>
        </div>

    </div>
    <div className={styles.lineDiv} />

        

      </div>
      </div>
      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.footerChild} />
        <div className={styles.parent1}>
          <div className={styles.div24}>Клиентам</div>
          <div className={styles.div25}>Анализы и цены</div>
          <div className={styles.div26}>Получить результаты</div>
          <div className={styles.div27}>Подготовка к сдаче анализов</div>
          <div className={styles.div28}>Контакты</div>
        </div>
        <div className={styles.parent2}>
          <div className={styles.div29}>Информация</div>
          <div className={styles.div25}>О нас</div>
          <div className={styles.div26}>Врачам</div>
          <div className={styles.div27}>Новости</div>
          <div className={styles.div28}>Миссия</div>
        </div>
        <div className={styles.parent3}>
          <div className={styles.div34}>Геном Плюс</div>
          <div className={styles.vectorParent}>
            <img className={styles.vectorIcon} alt="" src="Vector.svg" />
            <img className={styles.groupChild11} alt="" src="Group 8.svg" />
            <img className={styles.vectorIcon1} alt="" src="Vector.svg" />
          </div>
        </div>
        <div className={styles.parent4}>
          <div className={styles.div35}>Адреса</div>
          <img className={styles.rectangleIcon} alt="" src="Rectangle 63.png" />
        </div>
        <div className={styles.vectorGroup}>
          <img className={styles.groupChild12} alt="" src="Vector 4.svg" />
          <div className={styles.frame}>
            <div className={styles.div36}>
              © 2024 Геном Плюс. Все права защищены. Запрещено использование материалов сайта без согласия его авторов и обратной ссылки.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
