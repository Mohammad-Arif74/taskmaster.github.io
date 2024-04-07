from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

from pymongo import MongoClient

uri = "mongodb+srv://mohammadarif74353:N7aJyML3LfNtuttL@cluster0.z4r7uwc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client  = MongoClient(uri)
db = client.taskmaster

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/tasks', methods = ["POST"])
def save_task():
    task = request.form['task']
    deadline=request.form['deadline']
    count = db.tasks.count_documents({})
    
    doc = {
        'index': count + 1,
        'task':task,
        'deadline': deadline,
        'status':'process'
    }
    
    db.tasks.insert_one(doc)
    return jsonify({
        'msg': 'Task Added successfully 👍'
    })

@app.route('/tasks', methods = ["GET"])
def get_tasks():
    task_list = list(db.tasks.find({}, {'_id':False}))
    return jsonify({'tasks':task_list})

@app.route('/done', methods = ["POST"])
def task_done():
    index = request.form['index']
    db.tasks.update_one({'index':int(index)}, {'$set':{'status':'completed'}})
    return jsonify({'msg':'marked done successfully..'})

@app.route('/undone', methods = ["POST"])
def task_undone():
    index = request.form['index']
    db.tasks.update_one({'index':int(index)}, {'$set':{'status':'process'}})
    return jsonify({'msg':'marked Undone successfully..'})

@app.route('/delete', methods = ["POST"])
def task_delete():
    index = request.form['index']
    db.tasks.delete_one({'index':int(index)})
    return jsonify({'msg':'Deleted successfully..'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)