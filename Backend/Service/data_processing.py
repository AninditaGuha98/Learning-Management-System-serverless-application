import json
import base64
import os
import requests
from google.cloud import storage
import google.auth.transport.requests
from google.oauth2.service_account import IDTokenCredentials

security_file = "GCS_GCF_key.json"

def upload_file_gcs(storage_name,file,file_name):
    client = storage.Client.from_service_account_json(
        security_file)
    bucket = client.get_bucket(storage_name)
    blob = bucket.blob(file_name)
    blob.upload_from_string(file)


def call_cloud_docker(email):
    # The service account JSON key file to use to create the Identity Token
    sa_filename = security_file

    # Endpoint to call
    endpoint = 'https://data-processing-lms-dzoqff2uoa-uk.a.run.app/data_processing?email='+email

    aud = 'https://data-processing-lms-dzoqff2uoa-uk.a.run.app'

    def invoke_endpoint(url, id_token):
        headers = {'Authorization': 'Bearer ' + id_token}

        r = requests.get(url, headers=headers)

        if r.status_code != 200:
            print('Calling endpoint failed')
            print('HTTP Status Code:', r.status_code)
            print(r.content)
            return None

        return r.content.decode('utf-8')


    credentials = IDTokenCredentials.from_service_account_file(
        sa_filename,
        target_audience=aud)

    request = google.auth.transport.requests.Request()

    credentials.refresh(request)

    # This is debug code to show how to decode Identity Token
    # print('Decoded Identity Token:')
    # print_jwt(credentials.token.encode())

    response = invoke_endpoint(endpoint, credentials.token)

    if response is not None:
        print(response)
    return response

def fetch_file_gcs(storage_name,file_name):
    client = storage.Client.from_service_account_json(
        security_file)
    bucket = client.get_bucket(storage_name)
    blob = bucket.get_blob(file_name)
    blob.download_to_filename(file_name)
    image = open(file_name,'rb')
    image2 = image.read()
    print(image2)
    image.close()
    os.remove(file_name)
    return image2
