from werkzeug.utils import secure_filename
from Service.service import *
from Service.pubsub_api import *
from flask import Blueprint, render_template, request, jsonify, send_file
import json

controller = Blueprint('controller', __name__,
                       static_folder='../Frontend/build/static/',
                       template_folder='../Frontend/build/'
                       )

pub_sub_api = Pubsub_api()

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
    print("data processing complete")
    return jsonify(image)

@controller.route("/machine_learning",methods=["POST"])
def machine_learning():
    uploaded_files=[]
    for i in request.files:
        uploaded_files.extend(request.files.getlist(i))

    email = request.args.get("email")
    files = len(uploaded_files)
    for i in range(len(uploaded_files)):
        uploaded_files[i].save("temp/" + secure_filename(uploaded_files[i].filename))
        file = open("temp/" + secure_filename(uploaded_files[i].filename), "r")
        text_file = file.read()
        file_name = "machine_learning"+str(i+1)+"_"+email
        upload_file_gcs("machine-learning-lms",text_file,file_name+".txt")

    response = call_machine_learning_function(email,files)
    print("Machine learning analysis complete")
    return jsonify(response)


@controller.route("/sendmessage",methods=['POST'])
def send_message():
    print("inside sendmessage api")
    email = request.args.get("email")
    message = json.loads(request.data.decode("utf-8"))["message"]
    message = pub_sub_api.set_message(email,message)
    pub_sub_api.publish(message)
    print("message sent: "+ str(message))
    return "success"

@controller.route("/setsubscriber",methods=['POST'])
def create_subscriber():
    print("inside setsubscriber api")
    email = request.args.get("email")
    subscriber_name = pub_sub_api.get_username_from_email(email)
    pub_sub_api.set_subscriber(subscriber_name)
    print("subscriber set to "+subscriber_name)
    return "success"


@controller.route("/getmessage",methods=['POST'])
def get_message():
    email = request.args.get("email")
    username = pub_sub_api.get_username_from_email(email)
    messages = pub_sub_api.get_message(username)
    filtered_messages = pub_sub_api.filter_messages_for_email(username,messages)
    print("complete")
    print(messages)
    print(filtered_messages)
    return jsonify(filtered_messages)

