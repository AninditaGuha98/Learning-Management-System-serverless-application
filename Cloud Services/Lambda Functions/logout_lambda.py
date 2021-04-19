import json
import mysql.connector
import boto3

conn = mysql.connector.connect(host=''
                               , user='',
                               password='',
                               db='')
cursor = conn.cursor()


def lambda_handler(event, context):
    print(event.get('email'))
    if event:
        status = "offline"
        try:
            insertUser = "update userStatus set status=%s where email=%s"
            cursor.execute(insertUser, (status, event.get('email')))
            return True
        except Exception as e:
            print(e)
            return
        finally:
            conn.commit()

