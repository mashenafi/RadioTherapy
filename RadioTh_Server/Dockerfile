FROM python:3.11-slim

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . /app
WORKDIR /app

COPY ./entrypoint.sh .

ENV DJANGO_KEY=django-insecure-ko&x+7(zpj-(d6mjdo5$ige81_rvl^4tkguun@m9k_*m8e=g7n
ENV DEBUG=True

ENTRYPOINT ["sh", "/app/entrypoint.sh"]

