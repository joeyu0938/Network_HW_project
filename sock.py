from socket import *
import socketserver
import threading,sys,json,re
from unicodedata import category
from sqlalchemy import false, true
import os
import base64
import time
global self_regInfo
global client_message
global client_regInfo
self_regInfo = []
client_regInfo = []
client_message = dict()

class MyServer(socketserver.BaseRequestHandler):
    def handle(self):
        print("\ngot connection from",self.client_address)
        while True:
            print("looping")
            conn = self.request
            try:
                data = conn.recv(50000)
            except:
                print("connection problem or connection end")
                break
            if not data: #如果沒有收到東西
                continue
            dataobj = json.loads(data.decode('utf-8'))
            #如果連線客戶端傳送過來的資訊格式是一個列表且註冊標識為False時進行使用者註冊 list[0] account,list[1] password
            if dataobj["category"] == 1 : #reg
                client_regInfo.append(dataobj["text"])
                client_message[dataobj["text"][2]] = []
                break
            elif dataobj["category"] == 2: #update message
                client_message[dataobj["text"][0]].append([dataobj["text"][0],dataobj["text"][1]])
                break
            elif dataobj["category"] == 3: #update message
                nowTime = int(time.time())
                suffix = dataobj["suffix"]
                filename =dataobj["filename"]
                if(suffix == '.jpg' or suffix == '.png' or suffix== '.svg' or suffix == '.gif' or suffix == '.JPG' or suffix == '.PNG') :
                    tmp = "image"
                else:
                    tmp = "File"
                # t = dataobj["image"].encode('utf-8')
                print("get file")
                cnt = 0
                path = f"{filename}"
                with open(f"frontend/src/assets/{filename}", "wb") as fh:
                    while True:
                        conn = self.request
                        data = conn.recv(1024)
                        if not data and cnt>10000:
                            break
                        t = data.decode('utf-8')
                        fh.write(base64.urlsafe_b64decode(t))
                        cnt+=1
                    client_message[dataobj["text"]].append([dataobj["text"],path,tmp])
                break
            else:
                print("cannot read message")
                print(dataobj)
                break
def open_server(IP_a,Port):
    P = int(Port)
    server = socketserver.ThreadingTCPServer((IP_a,P),MyServer)
    print('waiting for connection...')
    server_thread = threading.Thread(target=server.serve_forever)
    server_thread.start()
    print("Starting Server ......")

def reg_friend(regINfo,tar_ip,tar_port):
    print("Running register")
    tcpCliSock = socket(AF_INET,SOCK_STREAM)
    try:
        tcpCliSock.connect((tar_ip,int(tar_port)))
    except:
        print("cannot connect to client")
        return false
    if  regINfo:
        text = dict()
        text["category"] = 1
        text["text"] = regINfo #id,Address,Port
        datastr = json.dumps(text)
        tcpCliSock.send(datastr.encode('utf-8'))
        print("send reg to target")
    tcpCliSock.close()
    return true

def send(client_regInfo,message):
    tcpCliSock = socket(AF_INET,SOCK_STREAM)
    try:
        tcpCliSock.connect((client_regInfo[0],int(client_regInfo[1])))
    except:
        print("cannot connect to client")
        return
    text = dict()
    text["category"] = 2
    text["text"] = message #[self_regInfo[0],text]  (id,text)
    datastr = json.dumps(text)
    tcpCliSock.send(datastr.encode('utf-8'))
    print("send message to target")
    tcpCliSock.close()

def Send_image(client_regInfo,message,file_extension,filename):
    tcpCliSock = socket(AF_INET,SOCK_STREAM)
    try:
        tcpCliSock.connect((client_regInfo[0],int(client_regInfo[1])))
    except:
        print("cannot connect to client")
        return
    text = dict()
    text["category"] = 3
    text["text"] = message[0] #[self_regInfo[0],image64]  (id,image)
    # text["image"] = message[1]
    text["suffix"] = file_extension
    text["filename"] =filename
    datastr = json.dumps(text)
    tcpCliSock.send(datastr.encode('utf-8'))
    print("send image to target")
    time.sleep(2)
    tcpCliSock.sendall(message[1].encode('utf-8'))
    tcpCliSock.close()
    
    
    
