from flask  import Flask, request, jsonify
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, ValidationError
from dotenv import load_dotenv
import os
from langchain.schema import AIMessage
from typing import Optional

load_dotenv()

app = Flask(__name__)

# API model to define the structure of incoming requests
class ChatRequest(BaseModel):
    message: str  # The user's input message
    theme: str    # The theme from SysConfig in Laravel

class QuestionTopicRequest(BaseModel):
    theme: str    # The theme from SysConfig in Laravel

class RandomQuestionAndAnswersRequest(BaseModel):
    theme: str    # The theme from SysConfig in Laravel
    topic_tag: Optional[str] = None
    topic_name: Optional[str] = None

class QuestionAndAnswersRequest(BaseModel):
    theme: str      # The theme from SysConfig in Laravel
    difficulty: str # difficulty range to be applied
    topic_name: str # question topic title
    topic_tag: str 

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

@app.route('/question-topic', methods=['POST'])
def questionTopics():
    try:
        if not request.is_json:
            return jsonify({'error': 'Request body must be JSON'}), 400
        
        # Manually validate and parse the incoming request using Pydantic
        questionTopic = QuestionTopicRequest(**request.get_json())
    except ValidationError as e:
        return jsonify({
            'error': 'Invalid input data',
            'details': e.errors()
        }), 400
    
    theme = questionTopic.theme

    if not theme:
        return jsonify({
            'error': 'Theme is required.'
        }), 400

    # Optionally, modify the message based on the theme before sending it to the LLM
    full_prompt = f"""You are an expert on {theme}. 
    You're making a game and need to have question topics for the participants. 
    Gather 5 topics. 
    Format your response as a list of JSON objects, each contain a "name" and "tag", and tag is snakecase of name. For example:
    [
        {{"name": "example Name", "tag": "example_tag}},
    ]
    Return only the List of JSON objects with no explanation please.
    """

    # Process the message with Langchain/OpenAI
    try:
        response = llm([full_prompt])
        generated_text = response.content
    except Exception as e:
        return jsonify({
            'error': f"An error occurred while generating the response: {str(e)}"
        }), 500
    
    return jsonify({
        'theme': theme,
        'response': generated_text
    })


@app.route('/random-questions', methods=['POST'])
def randomQuestions():
    try:
        if not request.is_json:
            return jsonify({'error': 'Request body must be JSON'}), 400
        
        # Manually validate and parse the incoming request using Pydantic
        randomQuestions = RandomQuestionAndAnswersRequest(**request.get_json())
    except ValidationError as e:
        return jsonify({
            'error': 'Invalid input data',
            'details': e.errors()
        }), 400
    
    # Get the theme from the validated request
    theme = randomQuestions.theme
    topic_tag = randomQuestions.topic_tag
    topic_name = randomQuestions.topic_name

    if not theme:
        return jsonify({
            'error': 'Theme is required.'
        }), 400

    # Modify the prompt to include the topic(s), if provided
    topic_string = ""
    if topic_tag:
        topic_string = f" Focus on the following topic: {topic_name}."
    
    # Optionally, modify the message based on the theme before sending it to the LLM
    full_prompt = f"""You are an expert on {theme}.{topic_string}
    You need to generate a variety of quiz questions. 
    There are three types of questions: 
        1. **Yes/No**: A question where the answer can be either "Yes" or "No".
        2. **Multiple Choice**: A question with multiple predefined options, where one or more options can be correct, up to 8 options.
        3. **Free Text**: A question where the answer will be written by the user.

    Generate 5 questions in the following JSON format, with a mix of question types. If the question is Multiple Choice or Yes/No, include the correct answer(s). For Free Text, leave the options blank.
    The difficulty of the questions can range between 1 and 100, to have a more specific assessment. The higher the number, the more difficult the question is.
    Return only the JSON objects:

    [
        {{
            "title": "The question text",
            "type": "multiple_choice", // or "yes_no" or "free_text"
            "difficulty": 1, // Difficulty rating from 1 to 100
            {f'"topic_tag": "{topic_tag}",' if topic_tag else ''}
            "tags": ["tag1", "tag2"], // Relevant tags
            "options": [ // If type is "multiple_choice" or "yes_no", provide options
                {{
                    "option_text": "Option A",
                    "is_correct": true // Mark true if this option is correct
                }},
                {{
                    "option_text": "Option B",
                    "is_correct": false
                }}
            ]
        }}
    ]
    """

    # Process the message with Langchain/OpenAI
    try:
        response = llm([full_prompt])
        generated_text = response.content
    except Exception as e:
        return jsonify({
            'error': f"An error occurred while generating the response: {str(e)}"
        }), 500
    
    return jsonify({
        'theme': theme,
        'topic_tag': topic_tag,
        'topic_name': topic_name,
        'response': generated_text
    })



@app.route('/healthcheck', methods=['GET'])
def healthcheck():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)