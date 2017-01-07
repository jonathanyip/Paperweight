#!/usr/bin/python
# A Simple HTTP Server! :D
import SimpleHTTPServer
import SocketServer

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
httpd = SocketServer.TCPServer(("", 8000), Handler)

print("Running on http://localhost:8000/!")

httpd.serve_forever()
