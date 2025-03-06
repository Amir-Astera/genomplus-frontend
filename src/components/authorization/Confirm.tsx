import React, { useState, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { auth } from "../../features/redux/config/firebaseConfig";
import { useAppSelector, useAppDispatch } from "../../features/redux/hooks";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../features/redux/api/axiosInstance";
import styles from "./Confirm.module.css";
import { checkAuth } from "../../features/redux/slices/authSlice";


//TODO если есть авторизация просто перекидываем на личный кабинет пацинета
declare global {
	interface Window {
	  myRecaptchaVerifier?: RecaptchaVerifier;
	}
  }
  
  const Confirm: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	// Берём номер телефона из patientSlice
	const phone = useAppSelector((state) => state.patient.phone);
  
	const [otp, setOtp] = useState("");
	const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
	const [loading, setLoading] = useState(false);
  
	useEffect(() => {
	  if (!window.myRecaptchaVerifier) {
		window.myRecaptchaVerifier = new RecaptchaVerifier(
		  auth,
		  "recaptcha-container",
		  { size: "invisible" }
		);
	  }
	}, []);
  
	useEffect(() => {
	  if (!phone) {
		console.log("Нет телефона")
		// если нет телефона — пользователь зашёл напрямую,
		// можно отправить на /authorization
		navigate("/authorization");
		return;
	  }
	  // Автоматическая отправка OTP
	  const sendOTP = async () => {
		try {
		  setLoading(true);
		  const appVerifier = window.myRecaptchaVerifier!;
		  const result = await signInWithPhoneNumber(auth, phone, appVerifier);
		  setConfirmationResult(result);
		} catch (error) {
		  console.error("Ошибка при отправке OTP:", error);
		} finally {
		  setLoading(false);
		}
	  };
	  sendOTP();
	}, [phone, navigate]);
  
	const handleVerifyCode = async () => {
	  if (!otp) return;
	  if (!confirmationResult) return;
  
	  setLoading(true);
	  try {
		const credential = await confirmationResult.confirm(otp);
		const idToken = await credential.user.getIdToken(true);
  
		// сохраняем на сервер (кука)
		const res = await axiosInstance.post("/auth/store", { token: idToken });
		if (res.status === 200) {
		  await dispatch(checkAuth()); 
		  navigate("/patient");
		}
	  } catch (error) {
		alert("Неверный код");
	  } finally {
		setLoading(false);
	  }
	};
  	return (
    		<div className={styles.Confirm}>
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
        				<b className={styles.b1}>Анализы  и услуги</b>
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
                    <div id="recaptcha-container" />
        				<div className={styles.smsParent}>
          					<div className={styles.sms}>Для подтверждения, пожалуйста, введите код из полученного SMS-сообщения.</div>

{/* {!isOtpSent && (
        <>
		          					<div className={styles.rectangleParent3}>
            						<div className={styles.groupChild2} />
            						<div className={styles.div8}>
									<input
            type="tel"
            placeholder="+7 (700) 123-45-67"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
									</div>
          					</div>
								
          <button onClick={handleSendCode} disabled={loading}>
            {loading ? 
				<div className={styles.rectangleParent4}>
				<div className={styles.groupChild3} />
				<div className={styles.div9}>Отправляется</div>
		  </div>
			: 
						<div className={styles.rectangleParent4}>
						<div className={styles.groupChild3} />
						<div className={styles.div9}>Отправить код</div>
				  </div>}
          </button>
        </>
      )} */}

							  {(
        <>
		          					<div className={styles.rectangleParent3}>
            						<div className={styles.groupChild2} />
									<div className={styles.div8}>
											<input
            type="text"
            placeholder="Введите SMS-код"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
											</div>
            						<div className={styles.sms1}>Отправить код повторно (SMS)</div>
          					</div>

          <button onClick={handleVerifyCode} disabled={loading}>
            {loading ? 
				<div className={styles.rectangleParent4}>
				<div className={styles.groupChild3} />
				<div className={styles.div9}>Проверка</div>
		  </div>
			:
			<div className={styles.rectangleParent4}>
			<div className={styles.groupChild3} />
			<div className={styles.div9}>Войти</div>
	  </div>
			}
          </button>
        </>
      )}
          					<div className={styles.rectangleParent5}>
            						<div className={styles.groupChild4} />
            						<div className={styles.div10}>
              							<span>Я даю согласие на </span>
              							<span className={styles.span}>обработку персональных данных</span>
            						</div>
          					</div>
        				</div>
        				<div className={styles.groupWrapper}>
          					<div className={styles.groupParent1}>
            						<div className={styles.group}>
              							<div className={styles.div11}>+</div>
              							<div className={styles.sms2}>Я ввел правильный код из SMS, но  система не пускает меня в личный кабинет.</div>
            						</div>
            						<div className={styles.div12}>Проверьте срок действия кода. Возможно, он истек.  Попробуйте запросить новый код и ввести его еще раз.  Если проблема не решена,  обратитесь в службу поддержки.</div>
          					</div>
        				</div>
      			 </div>
      			<div className={styles.rectangleParent6}>
        				<div className={styles.groupChild5} />
        				<div className={styles.container}>
          					<div className={styles.div13}>Клиентам</div>
          					<div className={styles.div14}>Анализы и цены</div>
          					<div className={styles.div15}>Получить результаты</div>
          					<div className={styles.div16}>Подготовка к сдаче анализов</div>
          					<div className={styles.div17}>Контакты</div>
        				</div>
        				<div className={styles.parent1}>
          					<div className={styles.div18}>Информация</div>
          					<div className={styles.div14}>О нас</div>
          					<div className={styles.div15}>Врачам</div>
          					<div className={styles.div16}>Новости</div>
          					<div className={styles.div17}>Миссия</div>
        				</div>
        				<div className={styles.parent2}>
          					<div className={styles.div23}>Геном Плюс</div>
          					<div className={styles.vectorParent}>
            						<img className={styles.vectorIcon} alt="" src="Vector.svg" />
            						<img className={styles.groupChild6} alt="" src="Group 8.svg" />
            						<img className={styles.vectorIcon1} alt="" src="Vector.svg" />
          					</div>
        				</div>
        				<div className={styles.parent3}>
          					<div className={styles.div24}>Адреса</div>
          					<img className={styles.rectangleIcon} alt="" src="Rectangle 63.png" />
        				</div>
        				<div className={styles.vectorGroup}>
          					<img className={styles.groupChild7} alt="" src="Vector 4.svg" />
          					<div className={styles.wrapper}>
            						<div className={styles.div25}>© 2024 Геном Плюс. Все права защищены. Запрещено использование материалов сайта без согласия его авторов и обратной ссылки.</div>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default Confirm;