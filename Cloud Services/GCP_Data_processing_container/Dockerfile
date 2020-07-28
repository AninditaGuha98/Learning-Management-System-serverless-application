FROM python:3.7

WORKDIR /data_processing

ADD . /data_processing

RUN pip install --trusted-host pypi.python.org -r requirements.txt

EXPOSE 5000

ENV NAME data_processing

CMD ["python","src/Data_processing.py"]