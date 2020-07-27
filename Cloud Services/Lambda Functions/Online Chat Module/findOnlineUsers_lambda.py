import json
import mysql.connector

conn = mysql.connector.connect(host='serverless.cmtchp4wslrw.us-east-1.rds.amazonaws.com'
                               , user='admin',
                               password='admin2806',
                               db='serverless')
cursor = conn.cursor()


def lambda_handler(event, context):
    myList = []
    myDict = {}
    status = "online"
    try:
        fetchUsers = "select  userStatus.firstName,usermfa.organization, userStatus.email  from usermfa natural join userStatus where status=%s"
        cursor.execute(fetchUsers, (status,))
        result = cursor.fetchall()
        for i in range(len(result)):
            myDict = {
                "name": result[i][0],
                "organization": result[i][1],
                "email": result[i][2]
            }
            myList.append(myDict)

        print(myList)
        return myList
    except Exception as e:
        print(e)

    finally:
        conn.commit()
        # conn.close()
