<h1>Learning Management System- A multi-cloud serverless applicaton</h1>


<p>This repository is a collaborative work towards creating a serverless application called Learning Management System. This application will follow multi-cloud deployment and will implement backend-as-a service architecture. This application has the following features:</p>
 
<h3>Technologies Used</h3>
<p>Frameworks/Languages used:</p>
<ul>
<li> React </li>
<li> Node.js </li>
</ul>
<p>Cloud Services used:</p>
<ul>
<li>Amazon Web Services: RDS, Lex, Lambda, S3</li>
<li>Google Cloud Provider: Cloud Storage, Cloud Function, Cloud AI, GCP Pub/Sub</li>
</ul>

<h2>Modules</h2>

<i><p>User Management Module</p></i>
<p>1. This module involves the registration page.</p>
<p>2. Details such as email and firstname and last name are being stored in the Firebase.</p>
<p>3. Other details such as the security question and answers are stored in AWS RDS, where the email id serves the primary key.</p>

<i><p>Authentication Module</p></i>
<p>1. This module involves the login page.</p>
<p>2. 1st factor authentication involves validating the email and password, by validating them using the google cloud function.</p>
<p>3. 2 FA involves validating the security question/answer using the AWS Lambda function.</p>  

<i><p>Online Support Module</p></i>
<p>1. This module involves the Lex Chatbot.</p>
<p>2. According to first use case, the user queries basic website navigation information. Branching logic has been added by triggering Lambda function.</p>
<p>3. According to second use case, the Lex bot triggers a lambda function, which will be querying and displaying online users belonging to the same organization.</p>  
  
<i><p>Data Processing</p></i>
<p>1. Google Cloud Storage buckets are google encrypted.</p>
<p>2. Files will be uploaded on a the bucket | Name: data_processing_lms | Filename: data_processing_email.txt</p>
<p>3. The docker will be called for processing; which will fetch the filename, take file from S3 and create a word cloud. The wordcloud will be uploaded to S3. </p>

<i><p>Machine Learning</p></i>
<p>1. Create K-Means text clustering on JupyterLab available on Google AI Platform.</p>
<p>2. There are 2 approaches which can be followed. One is to create a container and call API for training and testing, another is to train the model on notebook and save the
  model on GCS. Then we can use the model to predict the data. The later technique works if the model needs training only once. The former works best for all the ways</p>

 
<h3>Testing</h3>
<p>1. Unit testing for all the controllers, api and cloud functions.</p>
<p>2. Integration testing for single-feature plumbing.</p>
<p>3. Testing of the whole application.</p>
<p>4. Testing of I/O data of cloud functions.</p>
<p>5. Security testing.</p>
<p>6. Regression testing</p>
<p>7. System testing</p>


<h3>Team Members:</h3>
<ul>
<li><a href="https://github.com/AninditaGuha98"> Anindita Guha </li>
<li> Devam Shah </li>
<li><a href="https://github.com/Harshpatel44"> Harsh Patel </li>
 </ul>
 
 
<h2>References</h2>
<ul>
<li>Word cloud code: <i>https://www.geeksforgeeks.org/generating-word-cloud-python/</i></li>
<li>Google Cloud Storage API: <i>https://googleapis.dev/python/storage/latest/index.html</i></li>
<li>K-Means Text clustering: <i>https://pythonprogramminglanguage.com/kmeans-text-clustering/</i></li>
<li>Amazon Lex: <i>https://medium.com/velotio-perspectives/amazon-lex-aws-lambda-beyond-hello-world-1403c1825e72</i></li>
<li>Lex-React-Integration :<i>https://www.npmjs.com/package/react-lex</i></li>
</ul>
 
 
 
 
 
