import json
import mysql.connector
import boto3

conn = mysql.connector.connect(host='serverless.cmtchp4wslrw.us-east-1.rds.amazonaws.com'
                               , user='admin',
                               password='admin2806',
                               db='serverless')
cursor = conn.cursor()

def lambda_handler(event, context):
    if event:
        try:
            insertUser = "INSERT into usermfa(email,question,answer,organization) values(%s,%s,%s,%s)"
            cursor.execute(insertUser,
                           (event.get('email'), event.get('question'), event.get('answer'), event.get('organization')))

            print(event.get('name'))
            insertUserStatus = "INSERT into userStatus(email,firstName,status) values(%s,%s,%s)"
            cursor.execute(insertUserStatus, (event.get('email'), event.get('name'), "offline"))

            return True
        except Exception as e:
            print(e)
            return False
        finally:
            conn.commit()
            # conn.close()
