
from flask import Flask, Blueprint, render_template,request

app = Flask(__name__)

controller = Blueprint('controller',__name__,template_folder='templates')

@controller.route('/')
def hello_world():
    return render_template("index.html")

@controller.route('/register', methods=['POST'])
def register():
    # form = request.form["register_form"]
    # print(form)
    return render_template("index.html")