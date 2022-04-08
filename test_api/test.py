from email.mime import base
import requests
import json
import base64
image_file = 'D:/Socialbook_img/member-2.png'

img = open(image_file, "rb")

citizenship_photo_front = img
citizenship_photo_back = img
profile_pic = img

# api = 'http://127.0.0.1:8000/api/kyc-create/'

files = {
    "citizenship_photo_front":citizenship_photo_front,
    "citizenship_photo_back":citizenship_photo_back,
    "profile_pic":profile_pic
}

payload = {
    "user":1,
    "contact_nums":[{"mobile_num":"8898876789"}],
    "citizenship_num":"88778-99098",

    
}
headers = {
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5MzkxMjQwLCJpYXQiOjE2NDkzOTA5NDAsImp0aSI6IjBkZjRhNjNmMzgzZjRmYjZhMjBlZTdhMjE0NzFkMjIzIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJiaWJlayJ9.3tcyD1OfVIg26uVDyCCkOuGdYcMH7QYmn0fAZi6rVdY"
        }        

# json_data = json.dumps(req_data)

res = requests.post('http://127.0.0.1:8000/api/kyc-create/',data=payload,files=files,headers=headers)
print(res.json())

