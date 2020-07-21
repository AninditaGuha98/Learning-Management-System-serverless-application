
from flask import Flask, Blueprint, render_template,request
from Service import User_Management
app = Flask(__name__)

controller = Blueprint('controller',__name__,template_folder='templates')

@controller.route('/')
def hello_world():
    return render_template("index.html")

@controller.route('/register', methods=['POST'])
def register():
    first_name = request.form["firstname"]
    last_name = request.form["lastname"]
    email = request.form["email"]
    password = request.form["password"]
    confirm_password = request.form["confirm_password"]
    security_1 = request.form["security_1"]
    security_2 = request.form["security_2"]
    User_Management.register_service(first_name,last_name,email,password,confirm_password,security_1,security_2)
    return render_template("index.html")