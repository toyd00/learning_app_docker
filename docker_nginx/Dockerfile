FROM nginx:alpine

WORKDIR /usr/src/app

ARG ENV_FILE

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk update \
    && apk add --update --no-cache python3 \
    && ln -sf python3 /usr/bin/python \
    && apk add --update py-pip \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add --no-cache mariadb-dev

RUN pip3 install --upgrade pip \
    && pip3 install django==2.2 django-environ==0.8.0 mysqlclient

COPY ./learning_app .


RUN echo U0VDUkVUX0tFWT03dnU4XmI9dGk3My0kOXBhLWcqNW5mZnZ5ZXchaThrPXEzaHpobStteT1AOCkmZTcjcApERUJVRz1GYWxzZQpBTExPV0VEX0hPU1RTPWxvY2FsaG9zdCwxMjcuMC4wLjEsZ3VuaWNvcm4tZGphbmdvCkRBVEFCQVNFX1VSTD1teXNxbDovL3RhaXNoaTpwYXNzd29yZEBkYjozMzA2L2RqYW5nb19kYg== | base64 -di > .env.dev

#RUN echo ${ENV_FILE} | base64 -d > .env.dev

RUN python manage.py collectstatic --noinput


