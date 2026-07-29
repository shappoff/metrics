# Метрические книги

Статический сайт (Next.js SSG) с данными из Google Sheets. Сборка и деплой — GitHub Pages.

## Иерархия

1. **Фонды** — уникальные значения из `fod` (например `2531` из `2531-2-145`)
2. **Дела** — «опись-дело» (`2-145`)
3. **Страницы** — записи, сгруппированные по столбцу `page`

## Локальный запуск

1. Создайте Service Account в Google Cloud и скачайте JSON-ключ.
2. Откройте доступ к таблице на email сервис-аккаунта (роль Reader).
3. Скопируйте `.env.example` → `.env.local` и заполните:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-sa@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

4. Установите зависимости и соберите:

```bash
npm install
npm run build
npx serve out
```

Для разработки: `npm run dev` (данные тоже читаются при запросе страниц на этапе рендера).

## GitHub Pages

1. В репозитории: **Settings → Pages → Source → GitHub Actions**.
2. Добавьте secrets (**Settings → Secrets and variables → Actions**):
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY` (ключ целиком; переносы строк можно оставить как `\n`)
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
