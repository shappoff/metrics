# Метрические книги

Статический сайт (Next.js SSG) с данными из Google Sheets. Сборка и деплой — GitHub Pages.

## Иерархия

1. **Фонды** — уникальные значения из `fod` (например `2531` из `2531-2-145`)
2. **Дела** — «опись-дело» (`2-145`)
3. **Страницы** — записи, сгруппированные по столбцу `page`

## Локальный запуск

Авторизация — OAuth2 пользователя (`authorized_user`), как в `metrics-indexation`. PEM / Service Account не нужны.

1. Скопируйте `.env.example` → `.env.local` и заполните:

```env
GAPI_PROJECT_ID=your-gcp-project-id
GAPI_CREDENTIALS_CLIENT_ID=....apps.googleusercontent.com
GAPI_CREDENTIALS_CLIENT_SECRET=GOCSPX-...
GAPI_CREDENTIALS_REFRESH_TOKEN=1//...
GAPI_CREDENTIALS_CLIENT_EMAIL=you@gmail.com
```

Обязательны: `CLIENT_ID`, `CLIENT_SECRET`, `REFRESH_TOKEN`.  
`GAPI_PROJECT_ID` и `CLIENT_EMAIL` — опционально.

2. Установите зависимости и соберите:

```bash
npm install
npm run build
npx serve out
```

Для разработки: `npm run dev` (данные читаются при рендере страниц на этапе сборки/запроса).

## GitHub Pages

1. В репозитории: **Settings → Pages → Source → GitHub Actions**.
2. Добавьте secrets (**Settings → Secrets and variables → Actions**):
   - `GAPI_CREDENTIALS_CLIENT_ID`
   - `GAPI_CREDENTIALS_CLIENT_SECRET`
   - `GAPI_CREDENTIALS_REFRESH_TOKEN`
   - (опционально) `GAPI_PROJECT_ID`, `GAPI_CREDENTIALS_CLIENT_EMAIL`
3. Запушьте в `main`/`master` или запустите workflow **Deploy to GitHub Pages** вручную.

`NEXT_PUBLIC_BASE_PATH` в CI выставляется как `/<имя-репозитория>` (для project pages).

## Добавление новой таблицы

1. Создайте папку `src/data/sources/<id>/` (`config`, `schema`, `parse`, `hierarchy`, `columns`).
2. Зарегистрируйте источник в [`src/data/registry.ts`](src/data/registry.ts).
3. Добавьте маршруты в `src/app/<id>/...`.

Ядро (`sheets-client`, CI, static export) менять не нужно.

## Текущий источник

| id | Вкладка | Spreadsheet |
|----|---------|-------------|
| `births` | О рождениях | `13uWII4E8Q7zW5FQZsr2Ya6crOV7VX6jP3n-4FDImozg` |
