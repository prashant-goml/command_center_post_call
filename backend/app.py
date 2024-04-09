from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
import json
import uuid
from mangum import Mangum
import os
import psycopg2
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)
handler = Mangum(app)


# @app.route('/')
# def show_survey_form():
#     return render_template('survey_form.html')

@app.route('/submit_data', methods=['POST'])
def submit_data():
  # Parse form data (assuming data is sent as JSON)
#   Extract specific fields
  print("############# hi #####################")
  print(request.get_data())
  data = request.get_data().decode('utf-8')
  print("Received data:", data)

  # Parse JSON data
  data_dict = json.loads(data)

  # Extract specific fields
  survey_id = str(uuid.uuid4())
  survey_name = data_dict['data']['surveyName']
  intro_prompt = data_dict['data']['introPrompt']
  outro_prompt = data_dict['data']['outroPrompt']
  min_value = data_dict['data']['min']
  max_value = data_dict['data']['max']
  questions = data_dict['data']['questions']
  flags = data_dict['data']['flags']

  print("Extracted fields:")
  print("Survey ID:", survey_id)
  print("Survey Name:", survey_name)
  print("Intro Prompt:", intro_prompt)
  print("Outro Prompt:", outro_prompt)
  print("Min Value:", min_value)
  print("Max Value:", max_value)
  print("Questions:", questions)
  print("Flags:", flags)

  # Connect to database
  table_name = os.getenv('TABLE_NAME')
  conn = psycopg2.connect(dbname=os.getenv('DB_NAME'), user=os.getenv('USER'), password=os.getenv('PASSWORD'), host=os.getenv('HOST'))
  cur = conn.cursor()

  create_table_query = f"""
    CREATE TABLE IF NOT EXISTS {table_name} (
        survey_id VARCHAR(255) PRIMARY KEY,
        survey_name VARCHAR(255) NOT NULL,
        intro_prompt TEXT,
        outro_prompt TEXT,
        min_value INTEGER,
        max_value INTEGER,
        questions JSONB,
        flags JSONB,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    """
  # Prepare SQL statement
  insert_data_query = f"""
    INSERT INTO {table_name} (survey_id, survey_name, intro_prompt, outro_prompt, min_value, max_value, questions, flags, created_at)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, CURRENT_TIMESTAMP)
    """

  select_data_query = f"""SELECT * FROM {table_name}"""

  # Convert questions and flags to JSON strings before insertion
  questions_json = json.dumps(questions)
  flags_json = json.dumps(flags)

  values = (survey_id, survey_name, intro_prompt, outro_prompt, min_value, max_value, questions_json, flags_json)

  try:
    cur.execute(create_table_query)
    cur.execute(insert_data_query, values)
    cur.execute(select_data_query)
    conn.commit()
    return "Survey data inserted successfully!", 201
  except Exception as e:
    conn.rollback()
    return f"Error: {str(e)}", 500
  finally:
    cur.close()
    conn.close()



@app.route('/get_data', methods=['GET'])
def get_data():
  # Connect to database
  table_name = os.getenv('TABLE_NAME')
  conn = psycopg2.connect(dbname=os.getenv('DB_NAME'), user=os.getenv('USER'), password=os.getenv('PASSWORD'), host=os.getenv('HOST'))
  cur = conn.cursor()

  # Prepare SQL statement (consider filtering or sorting if needed)
  sql = f"SELECT * FROM {table_name} ORDER BY created_at DESC"

  cur.execute(sql)
  data = cur.fetchall()  # Fetch all rows

  # Convert data to list of dictionaries with extracted fields
  data_list = []
  for row in data:
    survey_dict = {
      'surveyId': row[0],  # Assuming survey_id is the first column
      'surveyName': row[1],
      'date': row[8] 
    }
    data_list.append(survey_dict)
  print(data_list)
  return jsonify(data_list)

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)  # Adjust port if needed