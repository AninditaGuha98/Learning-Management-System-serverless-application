import json
import base64
import requests

import google.auth.transport.requests
from google.oauth2.service_account import IDTokenCredentials

# The service account JSON key file to use to create the Identity Token
sa_filename = 'GCS_GCF_key.json'

# Endpoint to call
endpoint = 'https://data-processing-lms-dzoqff2uoa-uk.a.run.app/data_processing?email=harshgp44@gmail.com'

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

if __name__ == '__main__':
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