import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../features/redux/hooks';
import { fetchPatientInfoThunk } from "../../features/redux/slices/patientSlice";
import { fetchCompletedOrdersThunk, fetchProcessingOrdersThunk, fetchOrderAnalysesThunk, fetchOrderAnalysesWithResultThunk, Analysis, Results, fetchOrderResultsPdfThunk, clearOrderResultsPdf } from "../../features/redux/slices/orderSlice";
import { useNavigate } from 'react-router-dom';
import PdfViewer from "./PdfViewer";
import { Order, GetAllOrdersDto } from '../../components/orders/orderTypes';
import styles from './Patient.module.css';

const Patient: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<'results' | 'currentOrders' | 'history'>('results');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedProcessingOrder, setSelectedProcessingOrder] = useState<Order | null>(null);
  const [analysesPage, setAnalysesPage] = useState(0);
  const [analysesResultPage, setAnalysesResultPage] = useState(0);
  const [showPdf, setShowPdf] = useState(false);

  // Пагинация
  const [resultsPage, setResultsPage] = useState(0);
  const [processingPage, setProcessingPage] = useState(0);
  const pageSize = 10;

  

  // Извлекаем данные пациента из Redux
  const { patientData, loading: patientLoading, error: patientError } = useAppSelector((state) => state.patient);
  
  // Извлекаем данные заказов из Redux
  const { 
    ordersData, 
    processingOrdersData,
    orderAnalyses,
    orderAnalysesWithResult,
    loadingAnalyses,
    errorAnalyses,
    loading: ordersLoading, 
    error: ordersError,
    resultsPdf,
    loadingPdf,
    errorPdf 
  } = useAppSelector((state) => state.order);

  useEffect(() => {
    // Запрашиваем данные пациента при загрузке компонента
    dispatch(fetchPatientInfoThunk());
  }, [dispatch]);

  useEffect(() => {
    // Запрашиваем заказы, когда данные пациента загружены и выбран соответствующий раздел
    if (patientData) {
      const params: GetAllOrdersDto = { 
        patientId: patientData.id, 
        page: 0, 
        size: pageSize 
      };

      if (selectedSection === 'results') {
        dispatch(fetchCompletedOrdersThunk({ 
          ...params,
          page: resultsPage
        }));
      } else if (selectedSection === 'currentOrders') {
        dispatch(fetchProcessingOrdersThunk({ 
          ...params,
          page: processingPage
        }));
      }
    }
  }, [patientData, selectedSection, resultsPage, processingPage, dispatch]);

  // При загрузке заказов выбираем первый по умолчанию
  useEffect(() => {
    if (ordersData && ordersData.content && ordersData.content.length > 0 && !selectedOrder) {
      setSelectedOrder(ordersData.content[0]);
    }
  }, [ordersData]);

  // То же самое для текущих заказов
  useEffect(() => {
    if (processingOrdersData && processingOrdersData.content && processingOrdersData.content.length > 0 && !selectedProcessingOrder) {
      setSelectedProcessingOrder(processingOrdersData.content[0]);
    }
  }, [processingOrdersData]);

  useEffect(() => {
    if (selectedOrder) {
      dispatch(fetchOrderAnalysesWithResultThunk({
        orderId: selectedOrder.id,
        page: analysesResultPage,
        size: pageSize
      }));
    }
  }, [selectedOrder, analysesResultPage, dispatch]);
  
  // Для загрузки анализов без результатов (Текущие заказы)
  useEffect(() => {
    if (selectedProcessingOrder) {
      dispatch(fetchOrderAnalysesThunk({
        orderId: selectedProcessingOrder.id,
        page: analysesPage,
        size: pageSize
      }));
    }
  }, [selectedProcessingOrder, analysesPage, dispatch]);

  // Обработчик смены раздела
  const handleSectionChange = (section: 'results' | 'currentOrders' | 'history') => {
    setSelectedSection(section);
    // Сбрасываем выбранные заказы при смене раздела
    if (section !== 'results') setSelectedOrder(null);
    if (section !== 'currentOrders') setSelectedProcessingOrder(null);
  };

  // Обработчики кнопок
  const handleLogout = () => {
    // Логика выхода из системы
    console.log('Выход из системы');
    // navigate('/login');
  };

  const handleEditProfile = () => {
    // Логика для редактирования профиля
    console.log('Редактирование профиля');
  };

  const handleDownloadResults = () => {
    if (selectedOrder) {
      dispatch(fetchOrderResultsPdfThunk({ 
        orderId: selectedOrder.id, 
        internalId: selectedOrder.internalId 
      }));
      setShowPdf(true);
    }
  };

  const handleClosePdf = () => {
    setShowPdf(false);
    dispatch(clearOrderResultsPdf());
  };

  // Пагинация для результатов
  const handleResultsPageChange = (newPage: number) => {
    setResultsPage(newPage);
  };

  // Пагинация для текущих заказов
  const handleProcessingPageChange = (newPage: number) => {
    setProcessingPage(newPage);
  };

  const handleAnalysesPageChange = (newPage: number) => {
    setAnalysesPage(newPage);
  };

  const handleAnalysesResultPageChange = (newPage: number) => {
    setAnalysesResultPage(newPage);
  };

  // Компонент для отображения пагинации
  const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange 
  }: { 
    currentPage: number, 
    totalPages: number, 
    onPageChange: (page: number) => void 
  }) => {
    if (totalPages <= 1) return null;

    return (
      <div className={styles.pagination}>
        <button 
          className={styles.paginationButton}
          disabled={currentPage === 0}
          onClick={() => onPageChange(currentPage - 1)}
        >
          &lt;
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`${styles.paginationButton} ${currentPage === i ? styles.activePage : ''}`}
            onClick={() => onPageChange(i)}
          >
            {i + 1}
          </button>
        ))}
        
        <button 
          className={styles.paginationButton}
          disabled={currentPage === totalPages - 1}
          onClick={() => onPageChange(currentPage + 1)}
        >
          &gt;
        </button>
      </div>
    );
  };

  // Компонент для отображения результатов заказов
// Полная реализация компонентов ResultsSection и CurrentOrdersSection

// Компонент для отображения результатов заказов
const ResultsSection = () => {
  if (ordersLoading) {
    return <div className={styles.loadingOrder}>Загрузка результатов...</div>;
  }

  if (ordersError) {
    return <div className={styles.errorOrder}>Ошибка при загрузке результатов: {ordersError}</div>;
  }

  if (!ordersData || ordersData.content.length === 0) {
    return (
      <div className={styles.emptyResultsContainer}>
        <div className={styles.emptyResults}>Результатов нет</div>
      </div>
    );
  }

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.ordersListContainer}>
        {ordersData.content.map((order) => (
          <div 
            key={order.id} 
            className={`${styles.orderCard} ${selectedOrder?.id === order.id ? styles.selectedOrder : ''}`}
            onClick={() => setSelectedOrder(order)}
          >
            <div className={styles.orderHeader}>
              <div className={styles.orderNumberContainer}>
                <span className={styles.orderLabel}>Номер заказа:</span>
                <span className={styles.orderNumber}>{order.internalId}</span>
              </div>
              <div className={styles.orderDates}>
                <div className={styles.orderDate}>
                  <span className={styles.dateLabel}>Дата регистрации:</span>
                  <span className={styles.dateValue}>{new Date(order.createdAt).toLocaleDateString('ru-RU')}</span>
                </div>
                <div className={styles.orderDate}>
                  <span className={styles.dateLabel}>Дата результата:</span>
                  <span className={styles.dateValue}>{new Date(order.updatedAt).toLocaleDateString('ru-RU')}</span>
                </div>
              </div>
            </div>
            
            <div className={styles.orderDetails}>
              <div className={styles.orderInfo}>
                <span className={styles.infoLabel}>Количество заказанных услуг:</span>
                <span className={styles.infoValue}>{order.totalCount}</span>
              </div>
              <div className={styles.orderInfo}>
                <span className={styles.infoLabel}>Пункт сдачи:</span>
                <span className={styles.infoValue}>{order.cityOffice.name}</span>
              </div>
              <div className={styles.orderInfo}>
                <span className={styles.infoLabel}>Общая сумма:</span>
                <span className={styles.infoValue}>{order.totalPrice} ₸</span>
              </div>
            </div>
          </div>
        ))}
        
        <Pagination 
          currentPage={ordersData.currentPage} 
          totalPages={ordersData.totalPages} 
          onPageChange={handleResultsPageChange} 
        />
      </div>

      {showPdf && (
  <>
    {loadingPdf && (
      <div className={styles.pdfViewerOverlay}>
        <div className={styles.pdfLoading}>
          Загрузка PDF результатов...
        </div>
      </div>
    )}
    
    {errorPdf && (
      <div className={styles.pdfViewerOverlay}>
        <div className={styles.pdfError}>
          Ошибка при загрузке PDF: {errorPdf}
          <button 
            className={styles.closeButton} 
            onClick={handleClosePdf}
          >
            Закрыть
          </button>
        </div>
      </div>
    )}
    
    {resultsPdf && (
      <PdfViewer 
        fileUrl={resultsPdf.fileUrl}
        fileName={resultsPdf.fileName}
        onClose={handleClosePdf}
      />
    )}
  </>
)}
      
      {selectedOrder && (
        <div className={styles.orderDetailsContainer}>
          <div className={styles.orderDetailsHeader}>
            <h3 className={styles.orderDetailsTitle}>Заказанные услуги</h3>
            <button 
              className={styles.downloadButton}
              onClick={handleDownloadResults}
              disabled={loadingPdf} // Отключаем кнопку при загрузке
            >
              {loadingPdf ? 'Загрузка...' : 'Получить результат'}
            </button>
          </div>
          
          <div className={styles.analysisTableContainer}>
            {renderAnalysesWithResults()}
          </div>
        </div>
      )}
    </div>
  );
};

// Компонент для отображения текущих заказов
const CurrentOrdersSection = () => {
  if (ordersLoading) {
    return <div className={styles.loadingOrder}>Загрузка текущих заказов...</div>;
  }

  if (ordersError) {
    return <div className={styles.errorOrder}>Ошибка при загрузке текущих заказов: {ordersError}</div>;
  }

  if (!processingOrdersData || processingOrdersData.content.length === 0) {
    return (
      <div className={styles.emptyResultsContainer}>
        <div className={styles.emptyResults}>Текущих заказов нет</div>
      </div>
    );
  }

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.ordersListContainer}>
        {processingOrdersData.content.map((order) => (
          <div 
            key={order.id} 
            className={`${styles.orderCard} ${selectedProcessingOrder?.id === order.id ? styles.selectedOrder : ''}`}
            onClick={() => setSelectedProcessingOrder(order)}
          >
            <div className={styles.orderHeader}>
              <div className={styles.orderNumberContainer}>
                <span className={styles.orderLabel}>Номер заказа:</span>
                <span className={styles.orderNumber}>{order.internalId}</span>
              </div>
              <div className={styles.orderDates}>
                <div className={styles.orderDate}>
                  <span className={styles.dateLabel}>Дата регистрации:</span>
                  <span className={styles.dateValue}>{new Date(order.createdAt).toLocaleDateString('ru-RU')}</span>
                </div>
              </div>
            </div>
            
            <div className={styles.orderDetails}>
              <div className={styles.orderInfo}>
                <span className={styles.infoLabel}>Количество заказанных услуг:</span>
                <span className={styles.infoValue}>{order.totalCount}</span>
              </div>
              <div className={styles.orderInfo}>
                <span className={styles.infoLabel}>Пункт сдачи:</span>
                <span className={styles.infoValue}>{order.cityOffice.name}</span>
              </div>
              <div className={styles.orderInfo}>
                <span className={styles.infoLabel}>Общая сумма:</span>
                <span className={styles.infoValue}>{order.totalPrice} ₸</span>
              </div>
            </div>
          </div>
        ))}
        
        <Pagination 
          currentPage={processingOrdersData.currentPage} 
          totalPages={processingOrdersData.totalPages} 
          onPageChange={handleProcessingPageChange} 
        />
      </div>
      
      {selectedProcessingOrder && (
        <div className={styles.orderDetailsContainer}>
          <div className={styles.orderDetailsHeader}>
            <h3 className={styles.orderDetailsTitle}>Заказанные услуги</h3>
            <div className={styles.disclaimerText}>Заказ в обработке</div>
          </div>
          
          <div className={styles.analysisTableContainer}>
            {renderAnalyses()}
          </div>
        </div>
      )}
    </div>
  );
};

// Функции для рендеринга анализов
const renderAnalysesWithResults = () => {
  if (loadingAnalyses) {
    return <div className={styles.loadingAnalysis}>Загрузка анализов...</div>;
  }

  if (errorAnalyses) {
    return <div className={styles.errorAnalysis}>Ошибка при загрузке анализов: {errorAnalyses}</div>;
  }

  if (!orderAnalysesWithResult || !orderAnalysesWithResult.content || Object.keys(orderAnalysesWithResult.content).length === 0) {
    return <div className={styles.emptyAnalysis}>Нет данных по анализам</div>;
  }

  return (
    <div className={styles.analysisTable}>
      {Object.entries(orderAnalysesWithResult.content).map(([analysisKey, result]) => {
        // Преобразование строки в объект Analysis
        const analysis = result.orderAnalysis.analysis;
        
        return (
          <React.Fragment key={analysis.id}>
            <div className={styles.analysisRow}>
              <div className={styles.analysisCode}>{analysis.code}</div>
              <div className={styles.analysisName}>
                {analysis.name}
              </div>
              <div className={styles.analysisPrice}>{analysis.price} ₸</div>
            </div>
            
            <div className={styles.resultRow}>
              <div className={styles.resultItem}>
                <div className={styles.resultLabel}>Результат</div>
                <div className={styles.resultValue}>{result.text || '-'}</div>
              </div>
              <div className={styles.resultItem}>
                <div className={styles.resultLabel}>Ед.изм.</div>
                <div className={styles.resultValue}>{result.unit}</div>
              </div>
              <div className={styles.resultItem}>
                <div className={styles.resultLabel}>Реф.интервал</div>
                <div className={styles.resultValue}>{result.norm}</div>
              </div>
              <div className={styles.resultItem}>
                <div className={styles.resultLabel}>Дата выполнения:</div>
                <div className={styles.resultValue}>
                  {result.updatedAt ? new Date(result.updatedAt).toLocaleDateString('ru-RU') : 'Не указано'}
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
      
      {orderAnalysesWithResult.totalPages > 1 && (
        <Pagination 
          currentPage={orderAnalysesWithResult.currentPage} 
          totalPages={orderAnalysesWithResult.totalPages} 
          onPageChange={handleAnalysesResultPageChange} 
        />
      )}
    </div>
  );
};

const renderAnalyses = () => {
  if (loadingAnalyses) {
    return <div className={styles.loadingAnalysis}>Загрузка анализов...</div>;
  }

  if (errorAnalyses) {
    return <div className={styles.errorAnalysis}>Ошибка при загрузке анализов: {errorAnalyses}</div>;
  }

  if (!orderAnalyses || !orderAnalyses.content || orderAnalyses.content.length === 0) {
    return <div className={styles.emptyAnalysis}>Нет данных по анализам</div>;
  }

  return (
    <div className={styles.analysisTable}>
      {orderAnalyses.content.map((analysis) => (
        <React.Fragment key={analysis.id}>
          <div className={styles.analysisRow}>
            <div className={styles.analysisCode}>{analysis.code}</div>
            <div className={styles.analysisName}>
              {analysis.name}
            </div>
            <div className={styles.analysisPrice}>{analysis.price} ₸</div>
          </div>
          
          <div className={styles.processingRow}>
            <div className={styles.processingStatus}>
              <span className={styles.statusLabel}>Статус:</span>
              <span className={styles.statusValue}>Ожидается</span>
            </div>
          </div>
        </React.Fragment>
      ))}
      
      {orderAnalyses.totalPages > 1 && (
        <Pagination 
          currentPage={orderAnalyses.currentPage} 
          totalPages={orderAnalyses.totalPages} 
          onPageChange={handleAnalysesPageChange} 
        />
      )}
    </div>
  );
};

  const HistorySection = () => (
    <div className={styles.emptyResultsContainer}>
      <div className={styles.emptyResults}>История результатов пуста</div>
    </div>
  );

  if (patientLoading) {
    return <div className={styles.loadingContainer}>Загрузка данных...</div>;
  }

  if (patientError) {
    return <div className={styles.errorContainer}>Ошибка: {patientError}</div>;
  }

  return (
    <div className={styles.patient}>
      {/* Верхняя шапка (хедер) */}
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <h1 className={styles.logo}>Genom Logo</h1>
        </div>
        
        {/* Десктопное меню */}
        <nav className={styles.desktopNav}>
          <a href="#" className={styles.navLink}>Анализы и услуги</a>
          <a href="#" className={styles.navLink}>Результаты</a>
          <a href="#" className={styles.navLink}>Адреса</a>
          <a href="#" className={styles.navLink}>О нас</a>
        </nav>
        
        <div className={styles.headerRight}>
          <div className={styles.locationContainer}>
            <img src="/icons/location.svg" alt="Location" className={styles.locationIcon} />
            <span className={styles.locationName}>Астана</span>
          </div>
          
          <div className={styles.cartContainer}>
            <img src="/icons/cart.svg" alt="Cart" className={styles.cartIcon} />
            <span className={styles.cartAmount}>0 ₸</span>
          </div>
          
          <a href="#" className={styles.cabinetButton}>Личный кабинет</a>
          
          {/* Бургер для мобильного меню */}
          <button 
            className={styles.burgerMenu} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
      
      {/* Мобильное меню */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <a href="#" className={styles.mobileMenuItem}>Анализы и услуги</a>
          <a href="#" className={styles.mobileMenuItem}>Результаты</a>
          <a href="#" className={styles.mobileMenuItem}>Адреса</a>
          <a href="#" className={styles.mobileMenuItem}>О нас</a>
        </div>
      )}
      
      {/* Строка поиска */}
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <input 
            type="text" 
            placeholder="Найти исследования..." 
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            <img src="/icons/search.svg" alt="Search" />
          </button>
        </div>
        
        <div className={styles.phoneContainer}>
          <img src="/icons/phone.svg" alt="Phone" className={styles.phoneIcon} />
          <span className={styles.phoneNumber}>+7 (778) 123 45 67</span>
        </div>
      </div>
      
      {/* Карточка пациента */}
      <div className={styles.patientCard}>
        <div className={styles.patientInfo}>
          <div className={styles.patientAvatar}>
            <img src="/icons/user.svg" alt="User" />
          </div>
          <h2 className={styles.patientName}>
            {patientData ? `${patientData.firstName} ${patientData.secondName} ${patientData.lastName || ''}` : 'Пользователь'}
          </h2>
          
          <div className={styles.patientDetails}>
            <div className={styles.detailItem}>
              <span className={styles.detailValue}>
                Дата рождения
              </span>
              <span className={styles.detailLabel}>{patientData?.birthDay || 'Не указано'} &nbsp;&nbsp;</span>
            </div>
            
            <div className={styles.detailItem}>
              <span className={styles.detailValue}>
               Номер телефона
              </span>
              <span className={styles.detailLabel}>{patientData?.phone || 'Не указано'} &nbsp;&nbsp;</span>
            </div>
            
            <div className={styles.detailItem}>
              <span className={styles.detailValue}>
                E-mail
              </span>
              <span className={styles.detailLabel}>{patientData?.email || 'Не указано'}</span>
            </div>
          </div>
          
          <div className={styles.divider}></div>
          
          <div className={styles.bonusSection}>
            <div className={styles.bonusHeader}>
              <img src="/icons/bonus.svg" alt="Bonus" className={styles.bonusIcon} />
              <span className={styles.bonusTitle}>Накопленные бонусы</span>
            </div>
            <div className={styles.bonusAmount}>
              <span>Накоплено:</span> <span className={styles.bonusValue}>240 Б</span>
            </div>
          </div>
          
          <div className={styles.buttonContainer}>
            <button className={styles.editButton} onClick={handleEditProfile}>
              Изменить
            </button>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Выйти
            </button>
          </div>
        </div>
      </div>
      
      {/* Навигация по разделам */}
      <div className={styles.sectionsNav}>
        <button
          className={`${styles.sectionButton} ${selectedSection === 'results' ? styles.activeSection : ''}`}
          onClick={() => handleSectionChange('results')}
        >
          Результаты
        </button>
        <button
          className={`${styles.sectionButton} ${selectedSection === 'currentOrders' ? styles.activeSection : ''}`}
          onClick={() => handleSectionChange('currentOrders')}
        >
          Текущие заказы
        </button>
        <button
          className={`${styles.sectionButton} ${selectedSection === 'history' ? styles.activeSection : ''}`}
          onClick={() => handleSectionChange('history')}
        >
          История результатов
        </button>
      </div>
      
      {/* Контент выбранного раздела */}
      <div className={styles.sectionContent}>
        {selectedSection === 'results' && <ResultsSection />}
        {selectedSection === 'currentOrders' && <CurrentOrdersSection />}
        {selectedSection === 'history' && <HistorySection />}
      </div>
      
      {/* Футер */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>Геном Плюс</h3>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon}><img src="/icons/facebook.svg" alt="Facebook" /></a>
              <a href="#" className={styles.socialIcon}><img src="/icons/instagram.svg" alt="Instagram" /></a>
              <a href="#" className={styles.socialIcon}><img src="/icons/twitter.svg" alt="Twitter" /></a>
            </div>
          </div>
          
          <div className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>Клиентам</h3>
            <ul className={styles.footerLinks}>
              <li><a href="#">Анализы и цены</a></li>
              <li><a href="#">Получить результаты</a></li>
              <li><a href="#">Подготовка к сдаче анализов</a></li>
              <li><a href="#">Контакты</a></li>
            </ul>
          </div>
          
          <div className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>Информация</h3>
            <ul className={styles.footerLinks}>
              <li><a href="#">О нас</a></li>
              <li><a href="#">Врачам</a></li>
              <li><a href="#">Новости</a></li>
              <li><a href="#">Миссия</a></li>
            </ul>
          </div>
          
          <div className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>Адреса</h3>
            <div className={styles.mapContainer}>
              <img src="/images/map.png" alt="Map" className={styles.mapImage} />
            </div>
          </div>
        </div>
        
        <div className={styles.copyright}>
          © 2024 Геном Плюс. Все права защищены. Запрещено использование материалов сайта без согласия его авторов и обратной ссылки.
        </div>
      </footer>
    </div>
  );
};

export default Patient;