from fastapi import FastAPI,Request,WebSocket
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import asyncio

app = FastAPI()
app.mount(
    "/static",
    StaticFiles(directory=r"C:\AI\openai-fastapi\app\Frontend\static"),
    name="static"
)
templates = Jinja2Templates(directory=r"C:\AI\openai-fastapi\app\Frontend\templates")
fastest_cars = [{"name":"BMW","engine":"V8"},{"name":"Supra","engine":"1.2"}]

@app.get("/")
async def greet(request:Request):
    return templates.TemplateResponse("index.html",{"request":request}) 


@app.websocket("/ws")
async def handle_websocket(web_socket:WebSocket):
    await web_socket.accept() # wait for websocket to accept the connection
    print("Client connected...")
    while True:
        try:
                data = await web_socket.receive_bytes()
                print(f"len audio:  {len(data)}")
        except Exception as e:
            print("❌ occur during the setup of websocket connection")
        finally:
            print("Websocket disconnected.....")
        
    
    