from flask import Flask, Blueprint, render_template, request
from Service import User_Management, passwordEncryptDecrypt

app = Flask(__name__)
controller = Blueprint('controller', __name__, template_folder='templates')

@controller.route('/')
def hello_world():
    return render_template("index.html")


@controller.route('/register', methods=["GET"])
def register_page():
    #Fetch the actual data here
    print("here")
    fName="Sheldon"
    lName="Cooper"
    password="user"

    User_Management.register_service()
    return render_template("register.html")


@controller.route('/register', methods=["POST"])
def register():
    first_name = request.form["firstname"]
    last_name = request.form["lastname"]
    email = request.form["email"]
    password = request.form["password"]
    confirm_password = request.form["confirm_password"]
    security_1 = request.form["security_1"]
    security_2 = request.form["security_2"]
    flag, message = User_Management.register_service(first_name, last_name, email, password, confirm_password,
                                                     security_1, security_2)

    return render_template("register.html", message=message)


@controller.route("/login", methods=["GET"])
def login_page():
    return render_template("login.html")


@controller.route("/login", methods=["POST"])
def login():
    email = request.form["email"]
    password = request.form["password"]
    security_question = request.form["security_question"]
    flag, message = User_Management.login_service(email, password, security_question)
    return render_template("login.html", message=message)
