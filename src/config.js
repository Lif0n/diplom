const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = process.env.API_URL || 'localhost:7293';

/**
 * Настройки сервисов
 */
const config = {
  store: {
    // Логировать установку состояния?
    log: !isProduction,
    // Настройки модулей состояния
    modules: {
      session: {
      }
    }
  },
  api: {
    baseUrl: apiUrl
  }
}

export default config;
