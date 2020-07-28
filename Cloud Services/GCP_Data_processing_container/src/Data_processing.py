from flask import Flask, request, jsonify
from google.cloud import storage
import Data_manipulation
app = Flask(__name__)
import os

@app.route("/data_processing",methods=['GET', 'POST'])
def data_processing():
    email = request.args.get("email")
    filename = "data_processing_"+email

    bucket_name = "data-processing-lms"
    client = storage.Client.from_service_account_json(
        'src/GCS_GCF_key.json')
    bucket = client.get_bucket(bucket_name)
    blob = bucket.get_blob(filename+".txt")
    content = blob.download_as_string().decode("utf-8")


    named_entity_words = Data_manipulation.Generate_named_entities(content)
    Data_manipulation.Generate_word_cloud(named_entity_words,filename)

    # deleting text file and uploading word cloud image
    blob2 = bucket.blob(filename + ".png")
    blob2.upload_from_filename(filename=filename + ".png")
    blob.delete()
    os.remove(filename + ".png")
    return {"Response": 200}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
