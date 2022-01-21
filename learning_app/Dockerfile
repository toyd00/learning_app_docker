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

RUN echo U0VDUkVUX0tFWT03dnU4XmI9dGk3My0kOXBhLWcqNW5mZnZ5ZXchaThrPXEzaHpobStteT1AOCkmZTcjcApERUJVRz1GYWxzZQpBTExPV0VEX0hPU1RTPWxvY2FsaG9zdCwxMjcuMC4wLjEsZ3VuaWNvcm4tZGphbmdvCkRBVEFCQVNFX1VSTD1teXNxbDovL3RhaXNoaTpwYXNzd29yZEBkYjozMzA2L2RqYW5nb19kYg== | base64 -d > ./learning_app/.env.dev

RUN ls -a
RUN pwd
RUN cat .env.dev

RUN mkdir -p /var/run/gunicorn
CMD ["gunicorn", "learning.wsgi", "--bind=unix:/var/run/gunicorn/gunicorn.sock"]