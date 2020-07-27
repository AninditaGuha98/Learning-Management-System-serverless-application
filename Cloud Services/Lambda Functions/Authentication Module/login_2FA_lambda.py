import json
import mysql.connector
import boto3

conn = mysql.connector.connect(host='serverless.cmtchp4wslrw.us-east-1.rds.amazonaws.com'
                               , user='admin',
                               password='admin2806',
                               db='serverless')
cursor = conn.cursor()

def lambda_handler(event, context):
    print(event.get('email'))
    if event:
        # print(event.get('email'))
        try:
            fetchData = "Select question,answer from usermfa where email= %s"
            cursor.execute(fetchData, (event.get('email'),))
            result = cursor.fetchone()
            print(result)
            myDict = {'question': result[0],
                      'answer': result[1]
                      }
            print(myDict)
            return myDict

        except Exception as e:
            myDict = {}
            print(e)
            return myDict
        finally:
            conn.commit()
            # conn.close()
