from werkzeug.utils import secure_filename
from Service.service import *
from Service.pubsub_api import *
from flask import Blueprint, render_template, request, jsonify, send_file


controller = Blueprint('controller', __name__,
                       static_folder='../Frontend/build/static/',
                       template_folder='../Frontend/build/'
                       )

@controller.route("/data_processing", methods=["POST"])
def data_processing():
    f = request.files["Text"]
    f.save("temp/"+secure_filename(f.filename))
    f = open("temp/"+secure_filename(f.filename),"r")
    text_file = f.read()
    email = request.args.get("email")
    file_name = "data_processing_"+email

    upload_file_gcs("data-processing-lms",text_file,file_name+".txt")

    call_data_processing_docker(email)

    image = fetch_file_gcs("data-processing-lms",file_name+".png")

    return jsonify(image)

@controller.route("/machine_learning",methods=["POST"])
def machine_learning():
    uploaded_files = request.files.getlist("Text")
    print()
    email = request.args.get("email")
    files = len(uploaded_files)
    for i in range(len(uploaded_files)):
        uploaded_files[i].save("temp/" + secure_filename(uploaded_files[i].filename))
        file = open("temp/" + secure_filename(uploaded_files[i].filename), "r")
        text_file = file.read()
        file_name = "machine_learning"+str(i+1)+"_"+email

        upload_file_gcs("machine-learning-lms",text_file,file_name+".txt")

    response = call_machine_learning_function(email,files)
    return jsonify(response)


@controller.route("/sendmessage",methods=['POST'])
def send_message():
    email = request.args.get("email")
    message = request.form['message']

    data = bytes(email+"-"+message,'utf-8')
    publish(data)
    return "success"

@controller.route("/createsubscriber",methods=['POST'])
def create_subscriber():
    email = request.args.get("email")
    subscriber_name = email.split("@")[0]
    create_subscriber(subscriber_name)
    return "success"


@controller.route("/getmessage",methods=['POST'])
def get_message():
    email = request.args.get("email")
    subscriber_name = email.split('@')[0]
    message = get_data_for_topic(subscriber_name)
    return "success"

