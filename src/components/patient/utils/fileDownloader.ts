import axiosInstance from '../../../features/redux/api/axiosInstance';

export const downloadFileWithAuth = async (url: string, fileName: string): Promise<void> => {
    try {
      // Отображаем индикатор загрузки или уведомление
      console.log('Начинаем скачивание файла...');
      
      // Выполняем запрос с авторизацией через axios
      const response = await axiosInstance({
        url,
        method: 'GET',
        responseType: 'blob', // Важно для получения бинарных данных
      });
      
      // Создаем blob из полученных данных
      const blob = new Blob([response.data], { 
        type: response.headers['content-type'] || 'application/pdf' 
      });
      
      // Создаем временный URL для скачивания
      const blobUrl = URL.createObjectURL(blob);
      
      // Создаем элемент ссылки для скачивания
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName; // Это работает с blob URL
      
      // Добавляем ссылку в DOM, кликаем по ней и удаляем
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Важно: освобождаем ресурсы браузера
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 100);
      
      console.log('Файл скачан успешно');
    } catch (error) {
      console.error('Ошибка при скачивании файла:', error);
      alert('Произошла ошибка при скачивании файла. Пожалуйста, попробуйте позже.');
    }
  };