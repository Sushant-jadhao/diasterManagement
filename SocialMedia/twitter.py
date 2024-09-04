import tweepy
import spacy

# Twitter API credentials (replace with your own)
consumer_key = 'WtwPXhukDF88pHxKvV2Hv2kpX'
consumer_secret = 'GRdmWBJoF6dui8wX1xfU62KNDhL15ftVyTU5TDKVNTPbefzIkO'
access_token = '1489579977716551681-BWxno9t0kHNo4H0v1dJp8PC0gz4BVP'
access_token_secret = 'wuOCzYtLyPi5C6HCCEDfOt1Drb8N5waYlygOg6MeB8zWX'

# Authenticate with the Twitter API
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

# Load SpaCy model for location extraction
nlp = spacy.load('en_core_web_sm')

# Define disaster-related keywords
DISASTER_KEYWORDS = [
    'earthquake', 'flood', 'hurricane', 'tornado', 'wildfire', 
    'storm', 'tsunami', 'drought', 'accident', 'collision', 
    'explosion', 'crash', 'fire', 'catastrophe', 'calamity',
    'death', 'injury', 'rescue', 'evacuation', 'emergency'
]

# Function to extract the type of disaster from the tweet
def extract_disaster_type(text):
    for keyword in DISASTER_KEYWORDS:
        if keyword in text.lower():
            return keyword
    return 'Unknown'

# Function to extract location using SpaCy
def extract_location(text):
    doc = nlp(text)
    locations = [ent.text for ent in doc.ents if ent.label_ == 'GPE']
    return ', '.join(locations) if locations else 'Unknown'

# Define the query for disaster-related tweets
query = " OR ".join(DISASTER_KEYWORDS)

# Search for tweets containing the query
tweets = api.search_tweets(q=query, count=100, lang='en')

# Print the tweets along with the extracted location and disaster type
for tweet in tweets:
    disaster_type = extract_disaster_type(tweet.text)
    location = extract_location(tweet.text)
    
    print(f"User: {tweet.user.screen_name}")
    print(f"Tweet: {tweet.text}")
    print(f"Date: {tweet.created_at}")
    print(f"Disaster Type: {disaster_type}")
    print(f"Location: {location}")
    print("-" * 50)
