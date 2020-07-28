from google.cloud import storage
import pickle


def get_k_means_model():
    try:
        client = storage.Client.from_service_account_json(
            'GCS_GCF_key.json')
        bucket = client.get_bucket('k-means-model-lms')
        blob_trained_model = bucket.get_blob('K-means-text-clustering-trained-model')
        blob_vectorizer = bucket.get_blob('K-means-text-clustering-trained-vectorizer')

        blob_trained_model.download_to_filename("K-means-text-clustering-trained-model")
        blob_vectorizer.download_to_filename('K-means-text-clustering-trained-vectorizer')
    except Exception as e:
        print(e)


def predict(data):
    try:
        loaded_model = pickle.load(open("K-means-text-clustering-trained-model", 'rb'))
        loaded_vectorizer = pickle.load(open("K-means-text-clustering-trained-vectorizer", 'rb'))
        print("Model loading complete...")

        Y = loaded_vectorizer.transform(data)
        result = loaded_model.predict(Y)
        return result
    except Exception as e:
        print(e)
