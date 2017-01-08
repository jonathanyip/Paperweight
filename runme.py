#!/usr/bin/python
# A Simple HTTP Server! :D
from SimpleHTTPServer import SimpleHTTPRequestHandler
import SimpleHTTPServer
import SocketServer

# Make it cacheless, cause it's all static files,
# and I'm don't want to clear my cache everytime I change something...
# http://stackoverflow.com/questions/12193803/invoke-python-simplehttpserver-from-command-line-with-no-cache-option
class CachelessHTTPRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.cacheless_headers()
        SimpleHTTPRequestHandler.end_headers(self)

    def cacheless_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")

Handler = CachelessHTTPRequestHandler
httpd = SocketServer.TCPServer(("", 8000), Handler)

print("Running on http://localhost:8000/!")

httpd.serve_forever()
