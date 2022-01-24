FROM python:3.8.3-alpine

WORKDIR /usr/src/app

ARG ENV_FILE

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add --no-cache mariadb-dev

RUN pip install --upgrade pip
COPY ./learning_app .
COPY ./learning_app/requirements-dev.txt .
RUN pip install -r requirements-dev.txt

#RUN echo U0VDUkVUX0tFWT03dnU4XmI9dGk3My0kOXBhLWcqNW5mZnZ5ZXchaThrPXEzaHpobStteT1AOCkmZTcjcApERUJVRz1UcnVlCkFMTE9XRURfSE9TVFM9bG9jYWxob3N0LDEyNy4wLjAuMSxndW5pY29ybi1kamFuZ28KREFUQUJBU0VfVVJMPW15c3FsOi8vdGFpc2hpOnBhc3N3b3JkQGRiOjMzMDYvZGphbmdvX2Ri | base64 -d > .env.dev

RUN echo ${ENV_FILE} | base64 -d > .env.dev

RUN mkdir -p /var/run/gunicorn
CMD ["gunicorn", "learning.wsgi", "--bind=unix:/var/run/gunicorn/gunicorn.sock"]