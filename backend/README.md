# Vaibhav Garg Portfolio Backend

Django + Django REST Framework API for CMS-driven portfolio content.

## Modules

- `portfolio`: projects, skills, experience, timeline, exploration map, build queue, blog, certifications, metrics, assistant knowledge base
- `communication`: contact messages

## Local setup

1. Create/activate virtual environment.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Copy `.env.example` to `.env` and set values.
4. Run migrations and seed:
   ```bash
   python manage.py migrate
   python manage.py seed_portfolio
   ```
5. Start server:
   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

## LAN configuration

For frontend access from `http://192.168.177.119:3000`, set in `.env`:

```bash
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,192.168.177.119
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,http://192.168.177.119:3000
```

## Auth

- JWT endpoints:
  - `POST /api/auth/token/`
  - `POST /api/auth/token/refresh/`

## Deployment

- Deploy API to **Railway** or **Render**
- Use managed **PostgreSQL**
- Configure Cloudinary env vars for media

## Contact form delivery

The contact API always saves messages to database (`/api/communication/contact-messages/`).

To also receive emails, configure SMTP in `.env`:

```bash
CONTACT_RECEIVER_EMAIL=vaibhavgarg162004@gmail.com
DEFAULT_FROM_EMAIL=vaibhavgarg162004@gmail.com
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=vaibhavgarg162004@gmail.com
EMAIL_HOST_PASSWORD=<gmail_app_password>
EMAIL_USE_TLS=true
```
