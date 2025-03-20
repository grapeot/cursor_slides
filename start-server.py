#!/usr/bin/env python3
"""
Simple HTTP server for running HTML slides
"""

import http.server
import socketserver
import webbrowser
import os
import argparse

def start_server(port=8000):
    """Start HTTP server"""
    handler = http.server.SimpleHTTPRequestHandler
    
    with socketserver.TCPServer(("", port), handler) as httpd:
        print(f"Server started at http://localhost:{port}")
        print("Press Ctrl+C to stop the server")
        
        # Automatically open in browser
        webbrowser.open(f"http://localhost:{port}")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Start HTML slide server")
    parser.add_argument("-p", "--port", type=int, default=8000, help="Server port (default: 8000)")
    args = parser.parse_args()
    
    # Get current script directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    start_server(args.port) 