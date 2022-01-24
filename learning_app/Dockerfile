FROM python:3.8.3-alpine

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add --no-cache mariadb-dev

RUN pip install --upgrade pip
COPY ./learning_app .
COPY ./learning_app/requirements-dev.txt .
RUN pip install -r requirements-dev.txt

RUN echo ${ENV_FILE} | base64 -d > .env.dev

RUN mkdir -p /var/run/gunicorn
CMD ["gunicorn", "learning.wsgi", "--bind=unix:/var/run/gunicorn/gunicorn.sock"]