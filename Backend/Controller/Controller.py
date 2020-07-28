import json
import io
import base64

from werkzeug.utils import secure_filename

from Service.data_processing import *
from flask import Blueprint, render_template, request, jsonify, send_file

controller = Blueprint('controller', __name__,
                       static_folder='../Frontend/build/static/',
                       template_folder='../Frontend/build/'
                       )

@controller.route('/')
def hello_world():
    return render_template("index.html")

@controller.route("/data", methods=["POST"])
def data_post():
    data = json.loads(request.data.decode("utf-8"))
    print(data['sample_data'])
    return jsonify(data['sample_data'])


@controller.route("/data_processing", methods=["POST"])
def data_processing():
    f = request.files["Text"]
    f.save("temp/"+secure_filename(f.filename))
    f = open("temp/"+secure_filename(f.filename),"r")
    text_file = f.read()
    email = request.args.get("email")

    file_name = "data_processing_"+email
    upload_file_gcs("data-processing-lms",text_file,file_name+".txt")
    call_cloud_docker(email)
    image = fetch_file_gcs("data-processing-lms",file_name+".png")
    print(image)
    return send_file(
        io.BytesIO(image),
        mimetype='image/jpeg',
        as_attachment=True,
        attachment_filename="image")

# @controller.route("machine_learning",methods=["POST"])
# def machine_learning():
#