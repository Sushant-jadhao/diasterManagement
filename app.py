from flask import Flask, jsonify, render_template
import os
from dotenv import load_dotenv
import requests
import spacy

app = Flask(__name__)

# Load environment variables from .env file
load_dotenv()

# Load SpaCy model for location extraction
nlp = spacy.load('en_core_web_sm')

# API keys for different news platforms
API_KEYS = {
    'newsapi': os.getenv('NEWSAPI_KEY'),
    'gnews': os.getenv('GNEWS_KEY'),
    'eventregistry': os.getenv('EVENTREGISTRY_KEY'),
    'mediastack': os.getenv('MEDIASTACK_KEY')
}

# Define URLs for each news platform
URLS = {
    'newsapi': 'https://newsapi.org/v2/top-headlines',
    'gnews': 'https://gnews.io/api/v4/top-headlines',
    'eventregistry': 'https://eventregistry.org/api/v1/getArticles',
    'mediastack': 'http://api.mediastack.com/v1/news'
}

# Parameters for each news platform
PARAMS = {
    'newsapi': {
        'country': 'in',
        'language': 'en',
        'apiKey': API_KEYS['newsapi']
    },
    'gnews': {
        'country': 'IN',
        'lang': 'en',
        'token': API_KEYS['gnews']
    },
    'eventregistry': {
        'action': 'getArticles',
        'country': 'IN',
        'lang': 'en',
        'apiKey': API_KEYS['eventregistry']
    },
    'mediastack': {
        'access_key': API_KEYS['mediastack'],
        'countries': 'IN',
        'languages': 'en'
    }
}

# Keywords for disaster-related articles
DISASTER_KEYWORDS = [
    'earthquake', 'flood', 'hurricane', 'tornado', 'wildfire', 
    'storm', 'tsunami', 'drought', 'volcano', 'avalanche',
    'landslide', 'cyclone', 'mudslide', 'blizzard', 'hailstorm',
    'accident', 'collision', 'explosion', 'crash', 'fire', 
    'chemical spill', 'oil spill', 'nuclear disaster', 'power outage',
    'radiation leak', 'biohazard', 'terrorist attack', 'bombing',
    'death', 'fatality', 'casualty', 'injury', 'injured', 
    'missing', 'trapped', 'rescue', 'evacuation', 'shelter', 
    'aid', 'assistance', 'relief', 'survivor', 'recovery', 
    'life', 'livelihood', 'emergency', 'first aid', 'medical response',
    'disaster', 'catastrophe', 'calamity', 'devastation', 
    'destruction', 'damage', 'loss', 'ruin', 'collapse', 
    'crisis', 'hazard', 'danger', 'risk', 'peril',
    'reconstruction', 'rehabilitation', 'cleanup', 'restoration', 
    'rebuild', 'support', 'donation', 'volunteer', 'community', 
    'preparedness', 'warning', 'alert', 'evacuate', 'safety',
    'homeless', 'displaced', 'refugee', 'migration', 'poverty', 
    'economic loss', 'infrastructure damage', 'food shortage', 
    'water shortage', 'electricity outage', 'communication failure', 
    'transport disruption', 'hospitalization', 'quarantine'
]

# Function to check if the article is about a disaster
def is_disaster_article(article):
    title = article.get('title', '').lower()
    description = article.get('description', '').lower()
    combined_text = title + ' ' + description
    return any(keyword in combined_text for keyword in DISASTER_KEYWORDS)

# Function to extract location using SpaCy
def extract_location(text):
    doc = nlp(text)
    locations = [ent.text for ent in doc.ents if ent.label_ == 'GPE']
    return ', '.join(locations) if locations else 'Unknown'

# Function to fetch news from NewsAPI
def fetch_news_newsapi():
    response = requests.get(URLS['newsapi'], params=PARAMS['newsapi'])
    if response.status_code == 200:
        return response.json().get('articles', [])
    return []

# Function to fetch news from GNews
def fetch_news_gnews():
    response = requests.get(URLS['gnews'], params=PARAMS['gnews'])
    if response.status_code == 200:
        return response.json().get('articles', [])
    return []

# Function to fetch news from EventRegistry
def fetch_news_eventregistry():
    response = requests.get(URLS['eventregistry'], params=PARAMS['eventregistry'])
    if response.status_code == 200:
        return response.json().get('articles', [])
    return []

# Function to fetch news from Mediastack
def fetch_news_mediastack():
    response = requests.get(URLS['mediastack'], params=PARAMS['mediastack'])
    if response.status_code == 200:
        return response.json().get('data', [])
    return []

# Function to fetch news from all sources
def fetch_all_news():
    news_sources = {
        'NewsAPI': fetch_news_newsapi(),
        'GNews': fetch_news_gnews(),
        'EventRegistry': fetch_news_eventregistry(),
        'Mediastack': fetch_news_mediastack()
    }
    return news_sources

# API endpoint to get disaster-related news
@app.route('/api/disaster-news', methods=['GET'])
def get_disaster_news():
    all_news = fetch_all_news()
    all_articles = []

    for source, articles in all_news.items():
        for article in articles:
            if is_disaster_article(article):
                all_articles.append({
                    'source': source,
                    'title': article.get('title', ''),
                    'description': article.get('description', ''),
                    'publishedAt': article.get('publishedAt', ''),
                    'location': extract_location(article.get('title', '') + ' ' + article.get('description', ''))
                })

    return jsonify(all_articles)

# Serve the React frontend
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
