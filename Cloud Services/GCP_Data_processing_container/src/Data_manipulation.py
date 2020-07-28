import nltk
from wordcloud import WordCloud, STOPWORDS
import matplotlib.pyplot as plt
import os
nltk.data.path.append(os.getcwd()+"/nltk_data/")
nltk.download("punkt", download_dir=str("/home/nltk_data"))
nltk.download("stopwords", download_dir=str("/home/nltk_data"))
nltk.download("averaged_perceptron_tagger", download_dir=str("/home/nltk_data"))

def Generate_named_entities(content):
    sentences = nltk.sent_tokenize(content)
    named_entity_words = ""
    for sentence in sentences:
        words = nltk.word_tokenize(sentence)
        tagged = nltk.pos_tag(words)
        for i in tagged:
            if (i[1] == "NNP"):
                named_entity_words += str(i[0]) + " "
    print(named_entity_words)
    return named_entity_words


def Generate_word_cloud(named_entity_words, filename):
    stopwords = set(STOPWORDS)
    wordcloud = WordCloud(width=800, height=800,
                          background_color='black',
                          stopwords=stopwords,
                          min_font_size=10).generate(named_entity_words)
    plt.figure(figsize=(8, 8), facecolor=None)
    plt.imshow(wordcloud)
    plt.axis("off")
    plt.tight_layout(pad=0)
    plt.savefig(filename + ".png")
