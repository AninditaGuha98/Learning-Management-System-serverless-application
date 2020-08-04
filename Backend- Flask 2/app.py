from flask import Flask
from flask_cors import CORS
from Controller.Controller import controller

"""
The static folder and template folder is configured manually to set the path of the build folder of React,
so that flask can render the pages of React on the same server.
"""
app = Flask(__name__,
            static_folder='../sample_react/build/static/',
            template_folder='../sample_react/build/')

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.register_blueprint(controller)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5005)
