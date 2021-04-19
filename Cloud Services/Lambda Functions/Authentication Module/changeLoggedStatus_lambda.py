import json
import mysql.connector

conn = mysql.connector.connect(host=''
                               , user='',
                               password='',
                               db='')
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

