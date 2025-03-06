import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../features/redux/hooks";
import { checkIinThunk, getPhoneThunk } from "../../features/redux/slices/patientSlice";
import { useNavigate } from "react-router-dom";

import styles from './Authorization.module.css';

//TODO если есть авторизация просто перекидываем на личный кабинет пацинета
const Authorization: React.FunctionComponent = () => {
  const [iin, setIin] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { iinExists, phone, loading } = useAppSelector((state) => state.patient);
  
  const handleCheckIin = async () => {
    console.log(iin);	
    if (!iin) {
      alert("Введите ИИН");
      return;
    }
    // Запускаем checkIinThunk
    const result = await dispatch(checkIinThunk(iin));
    if (result.meta.requestStatus === "fulfilled") {
      const exists = result.payload as boolean;
      console.log(exists);
      if (!exists) {
        // Если пациента нет, переходим на /registration?iin=...
        navigate(`/registration?iin=${iin}`);
      } else {
        // Если пациент есть, получаем телефон
        const phoneResult = await dispatch(getPhoneThunk(iin));
        console.log(phoneResult);
        if (phoneResult.meta.requestStatus === "fulfilled") {
          // phone уже в Redux, => переходим на /confirm (без query)
          navigate("/confirm");
        }
      }
    }
  };
  
  return (
    <div className={styles.authorization}>
      <div className={styles.rectangleParent}>
        <div className={styles.frameChild} />
        <div className={styles.genomLogoParent}>
          <b className={styles.genomLogo}>Genom Logo</b>
          <div className={styles.instanceParent}>
            <div className={styles.shoppingCartParent}>
              <img className={styles.shoppingCartIcon} alt="" src="Shopping Cart.svg" />
              <b className={styles.cart} />
              <b className={styles.b}>0 ₸</b>
            </div>
            <div className={styles.rectangleGroup}>
              <div className={styles.groupChild} />
              <div className={styles.div}>Личный кабинет</div>
            </div>
          </div>
        </div>
        <div className={styles.contact}>
          <img className={styles.mapPinIcon} alt="" src="Map Pin.svg" />
          <div className={styles.div1}>Астана</div>
        </div>
      </div>
      <div className={styles.div2}>
        <b className={styles.b1}>Анализы и услуги</b>
        <div className={styles.div3}>О нас</div>
        <div className={styles.div4}>Результаты</div>
        <div className={styles.div5}>Адреса</div>
        <img className={styles.child} alt="" src="Vector 1.svg" />
      </div>
      <div className={styles.rectangleContainer}>
        <div className={styles.groupItem} />
        <div className={styles.groupParent}>
          <div className={styles.parent}>
            <div className={styles.div6}>+7 (778) 123 45 67</div>
            <img className={styles.groupIcon} alt="" src="Group.svg" />
          </div>
          <div className={styles.groupContainer}>
            <div className={styles.groupDiv}>
              <div className={styles.groupInner} />
              <div className={styles.div7}>Найти исследования...</div>
            </div>
            <div className={styles.rectangleParent1}>
              <div className={styles.rectangleDiv} />
              <img className={styles.bisearchIcon} alt="" src="bi:search.png" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rectangleParent2}>
        <div className={styles.groupChild1} />
        <div className={styles.group}>
          <div className={styles.div8}>Личный кабинет</div>
          <div className={styles.rectangleParent3}>
            <input
              type="text"
              value={iin}
              placeholder="ИИН(идентификационный номер)"
              onChange={(e) => setIin(e.target.value)}
              className={styles.div9}
            />
          </div>
          <div className={styles.rectangleParent4}>
            <div className={styles.groupChild3} />
            <button onClick={handleCheckIin} className={styles.loginButton}>
              <div className={styles.div10}>Войти</div>
            </button>
          </div>
          <div className={styles.rectangleParent5}>
            <div className={styles.groupChild4} />
            <div className={styles.div11}>
              <span>Я даю согласие на </span>
              <span className={styles.span}>обработку персональных данных</span>
            </div>
          </div>
        </div>
        <div className={styles.groupParent1}>
          <div className={styles.container}>
            <div className={styles.div12}>Как мне узнать, сколько кэшбэков я заработал?</div>
            <div className={styles.div13}>+</div>
          </div>
          <div className={styles.parent1}>
            <div className={styles.div14}>Как у могу узнать статус анализов?</div>
            <div className={styles.div15}>+</div>
          </div>
          <div className={styles.groupParent2}>
            <div className={styles.parent2}>
              <div className={styles.div16}>+</div>
              <div className={styles.div17}>Как я могу получить результаты анализов?</div>
            </div>
            <div className={styles.div18}>Ваши анализы всегда под рукой! После авторизации в личном кабинете вы найдете актуальные результаты на главной странице. Просматривайте их онлайн или скачивайте в удобном формате.</div>
          </div>
        </div>
      </div>
      <div className={styles.rectangleParent6}>
        <div className={styles.groupChild5} />
        <div className={styles.parent3}>
          <div className={styles.div19}>Клиентам</div>
          <div className={styles.div20}>Анализы и цены</div>
          <div className={styles.div21}>Получить результаты</div>
          <div className={styles.div22}>Подготовка к сдаче анализов</div>
          <div className={styles.div23}>Контакты</div>
        </div>
        <div className={styles.parent4}>
          <div className={styles.div24}>Информация</div>
          <div className={styles.div20}>О нас</div>
          <div className={styles.div21}>Врачам</div>
          <div className={styles.div22}>Новости</div>
          <div className={styles.div23}>Миссия</div>
        </div>
        <div className={styles.parent5}>
          <div className={styles.div29}>Геном Плюс</div>
          <div className={styles.vectorParent}>
            <img className={styles.vectorIcon} alt="" src="Vector.svg" />
            <img className={styles.groupChild6} alt="" src="Group 8.svg" />
            <img className={styles.vectorIcon1} alt="" src="Vector.svg" />
          </div>
        </div>
        <div className={styles.parent6}>
          <div className={styles.div30}>Адреса</div>
          <img className={styles.rectangleIcon} alt="" src="Rectangle 63.png" />
        </div>
        <div className={styles.vectorGroup}>
          <img className={styles.groupChild7} alt="" src="Vector 4.svg" />
          <div className={styles.wrapper}>
            <div className={styles.div31}>© 2024 Геном Плюс. Все права защищены. Запрещено использование материалов сайта без согласия его авторов и обратной ссылки.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorization;

// import React, { useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../features/redux/hooks";
// import { checkIinThunk, getPhoneThunk } from "../../features/redux/slices/patientSlice";
// import { useNavigate } from "react-router-dom";

// import styles from './Authorization.module.css';

// //TODO если есть авторизация просто перекидываем на личный кабинет пацинета
// const Authorization:React.FunctionComponent = () => {
// 	const [iin, setIin] = useState("");
// 	const dispatch = useAppDispatch();
// 	const navigate = useNavigate();
// 	const { iinExists, phone, loading } = useAppSelector((state) => state.patient);
  
// 	const handleCheckIin = async () => {
// 	  console.log(iin);	
// 	  if (!iin) {
// 		alert("Введите ИИН");
// 		return;
// 	  }
// 	  // Запускаем checkIinThunk
// 	  const result = await dispatch(checkIinThunk(iin));
// 	  if (result.meta.requestStatus === "fulfilled") {
// 		const exists = result.payload as boolean;
// 		console.log(exists);
// 		if (!exists) {
// 		  // Если пациента нет, переходим на /registration?iin=...
// 		  navigate(`/registration?iin=${iin}`);
// 		} else {
// 		  // Если пациент есть, получаем телефон
// 		  const phoneResult = await dispatch(getPhoneThunk(iin));
// 		  console.log(phoneResult);
// 		  if (phoneResult.meta.requestStatus === "fulfilled") {
// 			// phone уже в Redux, => переходим на /confirm (без query)
// 			navigate("/confirm");
// 		  }
// 		}
// 	  }
// 	};
//   	return (
//     		<div className={styles.authorization}>
//       			<div className={styles.rectangleParent}>
//         				<div className={styles.frameChild} />
//         				<div className={styles.genomLogoParent}>
//           					<b className={styles.genomLogo}>Genom Logo</b>
//           					<div className={styles.instanceParent}>
//             						<div className={styles.shoppingCartParent}>
//               							<img className={styles.shoppingCartIcon} alt="" src="Shopping Cart.svg" />
//               							<b className={styles.cart} />
//               							<b className={styles.b}>0 ₸</b>
//             						</div>
//             						<div className={styles.rectangleGroup}>
//               							<div className={styles.groupChild} />
//               							<div className={styles.div}>Личный кабинет</div>
//             						</div>
//           					</div>
//         				</div>
//         				<div className={styles.contact}>
//           					<img className={styles.mapPinIcon} alt="" src="Map Pin.svg" />
//           					<div className={styles.div1}>Астана</div>
//         				</div>
//       			</div>
//       			<div className={styles.div2}>
//         				<b className={styles.b1}>Анализы  и услуги</b>
//         				<div className={styles.div3}>О нас</div>
//         				<div className={styles.div4}>Результаты</div>
//         				<div className={styles.div5}>Адреса</div>
//         				<img className={styles.child} alt="" src="Vector 1.svg" />
//       			</div>
//       			<div className={styles.rectangleContainer}>
//         				<div className={styles.groupItem} />
//         				<div className={styles.groupParent}>
//           					<div className={styles.parent}>
//             						<div className={styles.div6}>+7 (778) 123 45 67</div>
//             						<img className={styles.groupIcon} alt="" src="Group.svg" />
//           					</div>
//           					<div className={styles.groupContainer}>
//             						<div className={styles.groupDiv}>
//               							<div className={styles.groupInner} />
//               							<div className={styles.div7}>Найти исследования...</div>
//             						</div>
//             						<div className={styles.rectangleParent1}>
//               							<div className={styles.rectangleDiv} />
//               							<img className={styles.bisearchIcon} alt="" src="bi:search.png" />
//             						</div>
//           					</div>
//         				</div>
//       			</div>
//       			<div className={styles.rectangleParent2}>
//         				<div className={styles.groupChild1} />
//         				<div className={styles.group}>
//           					<div className={styles.div8}>Личный кабинет</div>
//           					<div className={styles.rectangleParent3}>
//             						<div className={styles.groupChild2} />
//             						{/* <div className={styles.div9}>ИИН(идентификационный номер)</div> */}
//                                     <input
//         type="text"
//         value={iin}
//         placeholder="ИИН(идентификационный номер)"
//         onChange={(e) => setIin(e.target.value)}
//         className={styles.div9}
//         />
//           					</div>
//           					<div className={styles.rectangleParent4}>
//             						<div className={styles.groupChild3} />
//             						<button onClick={handleCheckIin}><div className={styles.div10}>Войти</div></button>
//           					</div>
//           					<div className={styles.rectangleParent5}>
//             						<div className={styles.groupChild4} />
//             						<div className={styles.div11}>
//               							<span>Я даю согласие на </span>
//               							<span className={styles.span}>обработку персональных данных</span>
//             						</div>
//           					</div>
//         				</div>
//         				<div className={styles.groupParent1}>
//           					<div className={styles.container}>
//             						<div className={styles.div12}>Как мне узнать, сколько кэшбэков я заработал?</div>
//               							<div className={styles.div13}>+</div>
//               							</div>
//               							<div className={styles.parent1}>
//                 								<div className={styles.div14}>Как у могу узнать статус анализов?</div>
//                   									<div className={styles.div15}>+</div>
//                   									</div>
//                   									<div className={styles.groupParent2}>
//                     										<div className={styles.parent2}>
//                       											<div className={styles.div16}>+</div>
//                       											<div className={styles.div17}>Как я могу получить результаты анализов?</div>
//                         												</div>
//                         												<div className={styles.div18}>Ваши анализы всегда под рукой!  После авторизации в личном кабинете вы найдете актуальные результаты на главной странице.  Просматривайте их онлайн или скачивайте в удобном формате.</div>
//                         												</div>
//                         												</div>
//                         												</div>
//                         												<div className={styles.rectangleParent6}>
//                           													<div className={styles.groupChild5} />
//                           													<div className={styles.parent3}>
//                             														<div className={styles.div19}>Клиентам</div>
//                             														<div className={styles.div20}>Анализы и цены</div>
//                             														<div className={styles.div21}>Получить результаты</div>
//                             														<div className={styles.div22}>Подготовка к сдаче анализов</div>
//                             														<div className={styles.div23}>Контакты</div>
//                           													</div>
//                           													<div className={styles.parent4}>
//                             														<div className={styles.div24}>Информация</div>
//                             														<div className={styles.div20}>О нас</div>
//                             														<div className={styles.div21}>Врачам</div>
//                             														<div className={styles.div22}>Новости</div>
//                             														<div className={styles.div23}>Миссия</div>
//                           													</div>
//                           													<div className={styles.parent5}>
//                             														<div className={styles.div29}>Геном Плюс</div>
//                             														<div className={styles.vectorParent}>
//                               															<img className={styles.vectorIcon} alt="" src="Vector.svg" />
//                               															<img className={styles.groupChild6} alt="" src="Group 8.svg" />
//                               															<img className={styles.vectorIcon1} alt="" src="Vector.svg" />
//                             														</div>
//                           													</div>
//                           													<div className={styles.parent6}>
//                             														<div className={styles.div30}>Адреса</div>
//                             														<img className={styles.rectangleIcon} alt="" src="Rectangle 63.png" />
//                           													</div>
//                           													<div className={styles.vectorGroup}>
//                             														<img className={styles.groupChild7} alt="" src="Vector 4.svg" />
//                             														<div className={styles.wrapper}>
//                               															<div className={styles.div31}>© 2024 Геном Плюс. Все права защищены. Запрещено использование материалов сайта без согласия его авторов и обратной ссылки.</div>
//                             														</div>
//                           													</div>
//                         												</div>
//                         												</div>);
//                       											};
                      											
//                       											export default Authorization;
                      											