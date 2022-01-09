FROM nginx:alpine

WORKDIR /usr/src/app

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

RUN python manage.py collectstatic --noinput


