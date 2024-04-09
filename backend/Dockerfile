FROM public.ecr.aws/lambda/python:latest

RUN chmod -R 777 /var/task

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY app.py .

# Define the entry point
CMD ["app.py"]