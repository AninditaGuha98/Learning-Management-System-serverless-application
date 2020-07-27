import json


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
    service_response = event['currentIntent']['slots']['Service']
    print(service_response)
    if (service_response == 'sentiment analysis' or service_response == 'analysis'):
        message = "Please navigate to the second link from top right corner (The sentiment analysis link). You can upload your documents there."
        return sendResponse(message)

    else:
        message = "Please navigate to the third link from top right corner. You can upload your documents there."
        return sendResponse(message)

