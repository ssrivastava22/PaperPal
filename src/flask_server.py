from flask import Flask, request, jsonify
import vertexai
from vertexai.language_models import TextGenerationModel

app = Flask(__name__)

def llm(article):
    vertexai.init(project="hidden", location="us-central1")
    parameters = {
        "candidate_count": 1,
        "max_output_tokens": 1024,
        "temperature": 0.05,
        "top_p": 0.8,
        "top_k": 1
    }
    model = TextGenerationModel.from_pretrained("text-bison")
    expert_in = "Machine Learning"
    keyword_numb = ""
    edu_in = "Computer Science"
    prompt1 = f'''Give key value pair of top {keyword_numb} keywords which are present in the article along with their definitions, but don't
    show me keywords related to my expertise {expert_in}
    and my education background {edu_in}
    '''

    response = model.predict(
        f"""Article: {article}
        Question :{prompt1}
        """,
        **parameters
    )
    return response.text

@app.route('/get_keywords', methods=['POST'])
def get_keywords():
    try:
        data = request.get_json()
        text = data.get('text', '')

        result = llm(text)
        return jsonify({"processed_text": result}), 200

    except Exception as e:
        return jsonify({"error_msg": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)