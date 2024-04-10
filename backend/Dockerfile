FROM python:3.11

# Install dependencies
COPY requirements.txt .

WORKDIR /code

COPY ./ /code
RUN pip install -r requirements.txt
EXPOSE 5000

ENV FLASK_APP=app.py
# Define the entry point
CMD ["flask", "run", "--host", "0.0.0.0"]
