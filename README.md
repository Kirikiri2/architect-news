# Новостная платформа

## Описание проекта
Это веб-приложение для публикации и обсуждения новостей в стиле классических газет с современным интерфейсом. Проект состоит из Django бэкенда и React фронтенда.

## Структура проекта
```
ARCHITECTURA/
├── backend/ # Django бэкенд
│ ├── apps/
│ ├── config/
│ │ ├── pycache/
│ │ ├── init.py
│ │ ├── asgi.py
│ │ ├── settings.py
│ │ ├── urls.py
│ │ └── wsgi.py
│ ├── media/ # Медиафайлы
│ ├── venv/ # Виртуальное окружение Python
│ ├── .env # Переменные окружения
│ ├── manage.py
│ └── requirements.txt
└── frontend/ # React фронтенд
├── public/
│ └── vite.svg
├── src/
│ ├── assets/
│ │ └── react.svg
│ ├── pages/
│ │ ├── IndexPage.jsx
│ │ ├── LoginPage.jsx
│ │ ├── MainLayout.jsx
│ │ ├── PostItemPage.jsx
│ │ ├── ProfilePage.jsx
│ │ └── RegisterPage.jsx
│ ├── App.css
│ ├── App.jsx
│ ├── index.css
│ ├── main.jsx
│ └── routes.js
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```


## Функциональность

### Страницы приложения:
- **IndexPage** - Главная страница со списком всех постов
- **PostItemPage** - Страница отдельного поста с комментариями
- **LoginPage** - Страница входа в систему
- **RegisterPage** - Страница регистрации
- **ProfilePage** - Страница профиля пользователя
- **MainLayout** - Основной layout приложения

### Основные возможности:
- Просмотр новостных постов в газетном стиле
- Регистрация и аутентификация пользователей
- Комментирование постов
- Загрузка изображений к постам
- Редактирование профиля пользователя
- Эстетика в стиле классических газет с использованием Tailwind CSS

## Технологический стек

### Frontend:
- **React 18** - Библиотека для построения пользовательских интерфейсов
- **React Router** - Маршрутизация
- **Tailwind CSS** - CSS фреймворк для стилизации
- **Vite** - Сборщик проекта

### Backend:
- **Django** - Python веб-фреймворк
- **Django REST Framework** - Для создания API
- **JWT Authentication** - Аутентификация
- **PostgreSQL** (предположительно) - База данных

## Установка и запуск

### Backend (Django):

## 1. Перейдите в директорию backend:
```
cd backend
```
## 2. Создайте виртуальное окружение:
```
python -m venv venv
```
## 3. Активируйте виртуальное окружение:
```
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```
## Установите зависимости:
```
pip install -r requirements.txt
```
## Примените миграции:
```
python manage.py migrate
```
## Запустите сервер разработки:
```
python manage.py runserver
```
# Frontend (React):
## Перейдите в директорию frontend:
```
cd frontend
```
## Установите зависимости:
```
npm install
```
## Запустите сервер разработки:
```
npm run dev
```
# API Endpoints
## Аутентификация:
```
POST /api/v1/auth/register/ - Регистрация

POST /api/v1/auth/login/ - Вход

GET /api/v1/auth/me/ - Получение данных пользователя

PUT /api/v1/auth/me/update/ - Обновление профиля
```

## Посты:
```
GET /api/v1/posts/ - Список всех постов

GET /api/v1/posts/{id}/ - Детали поста
```
## Комментарии:
```
GET /api/v1/comments/?post={id} - Комментарии к посту

POST /api/v1/comments/ - Создание комментария
```
## Особенности стилизации
### Приложение использует Tailwind CSS для создания эстетики классических газет:

Фон цвета amber-50 для эффекта старой бумаги

Шрифты font-serif для традиционного вида

Четкие границы border-2 border-gray-800

Тени и эффекты наведения для интерактивности

## Разработчики
Проект разработан с использованием современных веб-технологий и следует лучшим практикам разработки.
