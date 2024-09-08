from flask  import Flask, request, jsonify
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, ValidationError
from dotenv import load_dotenv
import os
from langchain.schema import AIMessage

load_dotenv()

app = Flask(__name__)

# API model to define the structure of incoming requests
class ChatRequest(BaseModel):
    message: str  # The user's input message
    theme: str    # The theme from SysConfig in Laravel

api_key = os.getenv('OPENAI_API_KEY')
temperature = float(os.getenv('TEMPERATURE', 0.7))  # Default to 0.7 if not set

# Initialize the OpenAI API key for LangChain
llm = ChatOpenAI(openai_api_key=api_key, temperature=temperature)

@app.route('/chat', methods=['POST'])
def chat():
    try:
        if not request.is_json:
            return jsonify({'error': 'Request body must be JSON'}), 400
        
        # Manually validate and parse the incoming request using Pydantic
        chat_request = ChatRequest(**request.get_json())
    except ValidationError as e:
        return jsonify({
            'error': 'Invalid input data',
            'details': e.errors()
        }), 400
    
    message = chat_request.message
    theme = chat_request.theme

    if not message or not theme:
        return jsonify({
            'error': 'Both message and theme are required.'
        }), 400

    # Optionally, modify the message based on the theme before sending it to the LLM
    full_prompt = f"You are an expert on {theme}. Answer the following question based on your expertise.\n\nQuestion: {message}\n\nAnswer:"

    # Process the message with Langchain/OpenAI
    try:
        response = llm([full_prompt])
        generated_text = response.content
    except Exception as e:
        return jsonify({
            'error': f"An error occurred while generating the response: {str(e)}"
        }), 500
    
    return jsonify({
        'message': message,
        'theme': theme,
        'response': generated_text
    })

@app.route('/healthcheck', methods=['GET'])
def healthcheck():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)