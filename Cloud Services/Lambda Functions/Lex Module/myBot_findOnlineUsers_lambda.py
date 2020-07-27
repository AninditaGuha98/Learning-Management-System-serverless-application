import json
import mysql.connector

conn = mysql.connector.connect(host='serverless.cmtchp4wslrw.us-east-1.rds.amazonaws.com'
                               , user='admin',
                               password='admin2806',
                               db='serverless')
cursor = conn.cursor()


def sendResponse(message):
    result = {
        "dialogAction": {
            "fulfillmentState": "Fulfilled",
            "type": "Close",
            "message": {
                "contentType": "PlainText",
                "content": message
            }
        }
    }
    return result


def lambda_handler(event, context):
    personB = event['currentIntent']['slots']['Person']
    person = personB.lower()
    print(person)
    try:
        fetchUser = "Select status from userStatus where firstName= %s"
        cursor.execute(fetchUser, (person,))
        result = cursor.fetchone()
        print(type(result))
        if (result is None):
            response = "Sorry " + personB + " is not a registered user."
            print(response)

        elif (result[0] == "offline"):
            response = "No " + personB + " is not online right now."
        elif (result[0] == "online"):
            response = "Yes " + personB + " is online. If you want to chat you can navigate to the chat link on the upper left corner."

        return sendResponse(response)

    except Exception as e:
        print(e)
    finally:
        conn.commit()
        # conn.close()
