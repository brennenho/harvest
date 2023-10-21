# import necessary packages
import os
import cohere

# initialize cohere api client
co = cohere.Client('nTI4k8KctOt7AiB6JdKIJhnwDUeU1BzauNM6G6Op')

# initialize a conversation session id
cohere_chat_res_start = co.chat("Hi")
conv_session_id = cohere_chat_res_start.conversation_id 

# continue existing chat session
def talk(prompt):
    response = co.generate(  
        model='command-nightly',  
        prompt = prompt,  
        temperature=0.750)

    return response.generations[0].text

# take prompt from user and call talk function. run this in loop till user exits
while True:
    prompt = input("You: ")
    if prompt == "exit":
        break
    print("Bot: ", talk(prompt))