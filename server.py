from flask import Flask, render_template,request,jsonify
from sock import *
import base64
import fire
app = Flask(__name__ ,static_folder='static')
#Members API Routes
@app.route('/')
def index():
    return render_template('index.html')
@app.route("/get_message/<string:id>", methods=["POST"])
def message(id):
    datastr = json.dumps(client_message[id])
    return datastr

@app.route("/get_client",methods=["POST"])
def get_client():
    datastr = json.dumps(client_regInfo)
    return datastr

@app.route("/add_friend",methods=["POST"])
def add_articles():
    print(type(request.json))
    id = request.json[2]
    Address = request.json[0]
    Port = request.json[1] 
    print("API get {}".format(request.json))
    if reg_friend(self_regInfo,Address,Port) == true:#[name,id,Address,Port]
        client_regInfo.append(request.json)
        client_message[id] = []
        datastr = json.dumps(client_regInfo)
        return datastr
    return "false"
    

@app.route("/image_url/<string:id>",methods=["POST"])
def image_url(id):
    files = request.files
    file = files.get("file")
    print("get")
    print(file)
    path =os.path.join("frontend/src/assets", file.filename).replace('\\','/')
    print(path)
    file.save(path)
    filename, file_extension = os.path.splitext(path)
    with open(path , "rb") as image_file :
        data = base64.urlsafe_b64encode(image_file.read())
        img_str = data.decode('utf-8')
        print(file.filename)
        if(file_extension == '.jpg' or file_extension == '.png' or file_extension== '.svg' or file_extension == '.gif' or file_extension == '.JPG' or file_extension == ".PNG"):
            client_message[id].append([self_regInfo[2],file.filename,"image"])
        else:
            client_message[id].append([self_regInfo[2],file.filename,"File"])
        for i in client_regInfo:
            if i[2] == id:
                Send_image(i,[self_regInfo[2],img_str],file_extension,file.filename)
    return "True"

@app.route("/send_message/<string:id>",methods=["POST"])
def send_message(id):
    print(id)
    text = request.json
    client_message[id].append([self_regInfo[2],text])
    for i in client_regInfo:
        if i[2] == id:
            send(i,[self_regInfo[2],text])
    return "send"

@app.route("/setup",methods = ["POST"])
def Setup_account():
    id = request.json["username"]
    Address = request.json["IP"]
    Port = request.json["port"]
    print([id,Address,Port])
    self_regInfo.append(Address)
    self_regInfo.append(Port)
    self_regInfo.append(id)
    open_server(Address,Port)
    return "fine"

@app.route("/open_server",methods = ["POST"])
def server():
    address = request.json["address"]
    port  = request.json["port"]
    open_server(address,port)

def fire_run(ip = '127.0.0.1',port ='5000'):
    app.run(ip,port,debug=True)
if __name__ == "__main__":
    fire.Fire(fire_run)