import sys
import time
from decouple import config
import json
import cohere
import random
import string

CHAT_MODEL = 'command'

co = cohere.Client(config('CO_API_KEY'))
cohere_chat_res_start = co.chat("Hi")

def talk(prompt):
    response = co.chat(  
        model='command',  
        message = prompt,  
        temperature=0.3,
        chat_history = history,
        # stream = True,
        prompt_truncation = 'auto',
        citation_quality = 'accurate',
        connectors=[{"id": "web-search"}]
        )
    return response

history = []

while True:
    prompt = input("You: ")
    if prompt == "exit":
        break

    conv_session_id = cohere_chat_res_start.conversation_id
    streaming_gens = talk(prompt)

    history.append({'role': 'User', 'message':prompt})

    print(streaming_gens.text)
    history.append({'role': 'Chatbot', 'message':streaming_gens.text})
    '''
    for i, token in enumerate(streaming_gens):
        event_type = token.event_type
        if(event_type=='text-generation'):
            print(f"{token.text}")
        if(event_type=='stream-end'):
            break
    '''

    for doc in streaming_gens.documents:
        print(doc['title'])
        print(doc['url'])




