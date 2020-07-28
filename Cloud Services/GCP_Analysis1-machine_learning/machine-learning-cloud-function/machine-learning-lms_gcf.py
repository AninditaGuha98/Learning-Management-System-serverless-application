from google.cloud import storage
import re
import GCS_api
import json


def text_cluster(request):
    # request_json = request.get_json()
    # if request.args and 'files' in request.args:
    #     files = request.args.get('files')
    # if request.args and 'email' in request.args:
    #     email = request.args.get('email')
    files = 2
    email = "harshgp44@gmail.com"
    try:
        client = storage.Client.from_service_account_json(
            'GCS_GCF_key.json')
        bucket = client.get_bucket('machine-learning-lms')
    except Exception as e:
        print(e)

    try:
        titles_list = []
        for i in range(1, int(files) + 1):
            text = bucket.get_blob('machine_learning' + str(i) + '_' + email + '.txt')
            text = text.download_as_string().decode("utf-8")
            titles_list.extend(re.findall("<TITLE>(.*)<\/TITLE>", text))

        GCS_api.get_k_means_model()
        predictions = GCS_api.predict(titles_list)
    except Exception as e:
        print(e)

    return json.dumps([titles_list, predictions.tolist()])


text_cluster("")
