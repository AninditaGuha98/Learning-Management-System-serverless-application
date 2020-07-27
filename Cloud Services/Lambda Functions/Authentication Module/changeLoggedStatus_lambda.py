import json
import mysql.connector

conn = mysql.connector.connect(host='serverless.cmtchp4wslrw.us-east-1.rds.amazonaws.com'
                               , user='admin',
                               password='admin2806',
                               db='serverless')
cursor = conn.cursor()


def lambda_handler(event, context):
    if event:
        status = "online"
        try:
            insertUser = "update userStatus set status=%s where email=%s"
            cursor.execute(insertUser, (status, event.get('email')))
        except Exception as e:
            print(e)
        finally:
            conn.commit()
            # conn.close()

