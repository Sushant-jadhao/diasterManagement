import os
from dotenv import load_dotenv
import requests
import pandas as pd
import spacy

# Load environment variables from .env file
load_dotenv()

# Load SpaCy model
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
# Updated disaster-related keywords
DISASTER_KEYWORDS = [
    # Natural Disasters
    'earthquake', 'flood', 'hurricane', 'tornado', 'wildfire', 
    'storm', 'tsunami', 'drought', 'volcano', 'avalanche',
    'landslide', 'cyclone', 'mudslide', 'blizzard', 'hailstorm',

    # Man-made Disasters
    'accident', 'collision', 'explosion', 'crash', 'fire', 
    'chemical spill', 'oil spill', 'nuclear disaster', 'power outage',
    'radiation leak', 'biohazard', 'terrorist attack', 'bombing',

    # Human Impact and Response
    'death', 'fatality', 'casualty', 'injury', 'injured', 
    'missing', 'trapped', 'rescue', 'evacuation', 'shelter', 
    'aid', 'assistance', 'relief', 'survivor', 'recovery', 
    'life', 'livelihood', 'emergency', 'first aid', 'medical response',

    # Severity and Consequence
    'disaster', 'catastrophe', 'calamity', 'devastation', 
    'destruction', 'damage', 'loss', 'ruin', 'collapse', 
    'crisis', 'hazard', 'danger', 'risk', 'peril',

    # Recovery and Mitigation
    'reconstruction', 'rehabilitation', 'cleanup', 'restoration', 
    'rebuild', 'support', 'donation', 'volunteer', 'community', 
    'preparedness', 'warning', 'alert', 'evacuate', 'safety',
    
    # Social and Economic Impact
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
    # Filtering locations to be within India (for simplicity, we assume all locations in the text are within India)
    return ', '.join(locations) if locations else 'Unknown'

# Function to fetch news from NewsAPI
def fetch_news_newsapi():
    try:
        response = requests.get(URLS['newsapi'], params=PARAMS['newsapi'])
        response.raise_for_status()
        return response.json().get('articles', [])
    except requests.exceptions.RequestException as e:
        print(f"An error occurred with NewsAPI: {e}")
        return []

# Function to fetch news from GNews
def fetch_news_gnews():
    try:
        response = requests.get(URLS['gnews'], params=PARAMS['gnews'])
        response.raise_for_status()
        return response.json().get('articles', [])
    except requests.exceptions.RequestException as e:
        print(f"An error occurred with GNews: {e}")
        return []

# Function to fetch news from EventRegistry
def fetch_news_eventregistry():
    try:
        response = requests.get(URLS['eventregistry'], params=PARAMS['eventregistry'])
        response.raise_for_status()
        return response.json().get('articles', [])
    except requests.exceptions.RequestException as e:
        print(f"An error occurred with EventRegistry: {e}")
        return []

# Function to fetch news from Mediastack
def fetch_news_mediastack():
    try:
        response = requests.get(URLS['mediastack'], params=PARAMS['mediastack'])
        response.raise_for_status()
        return response.json().get('data', [])
    except requests.exceptions.RequestException as e:
        print(f"An error occurred with Mediastack: {e}")
        return []

# Fetch news from all sources
def fetch_all_news():
    news_sources = {
        'NewsAPI': fetch_news_newsapi(),
        'GNews': fetch_news_gnews(),
        'EventRegistry': fetch_news_eventregistry(),
        'Mediastack': fetch_news_mediastack()
    }
    return news_sources

# Main function to process and display disaster-related news
def main():
    all_news = fetch_all_news()

    # Combine all articles into a DataFrame
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

    df = pd.DataFrame(all_articles)
    print(df)
    
    # Optionally, save the data to a CSV file
    # df.to_csv('disaster_news_with_locations_in_india.csv', index=False)
    # print("Disaster-related news saved to 'disaster_news_with_locations_in_india.csv'.")

if __name__ == "__main__":
    main()
