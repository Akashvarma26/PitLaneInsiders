from flask import Flask, request, render_template
import joblib

app = Flask(__name__) 
rfc = joblib.load('rfclassifier.joblib') 

@app.route('/', methods=['GET'])
def home():
    return render_template('predictions.html')

@app.route('/', methods=['POST', 'GET'])
def predict():
    if request.method == 'POST':
        GP_name = float(request.form['GP_name'])
        age_at_gp_in_days=9676
        qualis = int(request.form['qualis'])
        driver = int(request.form['driver'])
        prediction = rfc.predict([[GP_name,qualis,driver,age_at_gp_in_days]])
        output = round(prediction[0], 2)
        return render_template('predictions.html', output="The Predicted position of the driver is {}".format(output))
if __name__ == '__main__':
   app.run(debug=True)