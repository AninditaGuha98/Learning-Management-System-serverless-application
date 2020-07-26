from flask import Flask, request, jsonify
import boto3
import Data_manipulation
app = Flask(__name__)
import os

@app.route("/data_processing",methods=['GET', 'POST'])
def data_processing():
    email = request.args.get("email")
    filename = "data_processing_"+email
    bucket_name = "data-processing-lms"
    s3 = boto3.client('s3')
    file_object = s3.get_object(Bucket=bucket_name, Key=filename+".txt")
    content = file_object["Body"].read().decode('utf-8')

    named_entity_words = Data_manipulation.Generate_named_entities(content)
    Data_manipulation.Generate_word_cloud(named_entity_words,filename)

    # deleting text file and uploading word cloud image
    s3.delete_object(Bucket=bucket_name, Key=filename+".txt")
    s3.upload_file(filename+".png", bucket_name, filename+".png")
    os.remove(filename+".png")
    return {"Response": 200}


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
