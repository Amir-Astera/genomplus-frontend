import React from 'react';
import styles from './PdfViewer.module.css';
import { downloadFileWithAuth } from '../../components/patient/utils/fileDownloader';

interface PdfViewerProps {
  fileUrl: string;
  fileName: string;
  onClose: () => void;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ 
  fileUrl, 
  fileName, 
  onClose 
}) => {
    const handleDownload = () => {
        downloadFileWithAuth(fileUrl, fileName);
      };
    
      // Функция для открытия PDF в новой вкладке - используем прямой URL
      const handleOpenInNewTab = () => {
        window.open(fileUrl, '_blank');
      };
    
      return (
        <div className={styles.pdfViewerOverlay}>
          <div className={styles.pdfViewerAlternative}>
            <h3 className={styles.pdfViewerTitle}>Результаты анализов готовы</h3>
            <p className={styles.pdfViewerText}>
              Вы можете открыть PDF-документ с результатами в новой вкладке или скачать его.
            </p>
            <div className={styles.pdfViewerButtons}>
              <button 
                className={styles.openButton} 
                onClick={handleOpenInNewTab}
              >
                Открыть PDF в новой вкладке
              </button>
              <button 
                className={styles.downloadButton} 
                onClick={handleDownload}
              >
                Скачать PDF
              </button>
              <button 
                className={styles.closeButton} 
                onClick={onClose}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      );
    };

export default PdfViewer;