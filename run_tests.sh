#!/bin/bash
# run tests on the API
cd server
python3 -m unittest tests/test_apis.py 
cd ..
fuser -k 8000/tcp
