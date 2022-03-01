Django Installation Guide:
first move to the directory name PS C:\4th_sem_project\property_sale\backend> 
Command to create virtual env => python -m venv env
command to activate virtual env => env\Scripts\activate
After activated looks like this => (env) PS C:\4th_sem_project\property_sale\backend>
Command to install requirements => python -m pip install -r requirements.txt
Then move to dir => (env) PS D:\4th_sem_project\property_sale\backend\mysite> 
Command => python manage.py runserver
You will recieve a error about secret key 
create .env file inside root directory where manage.py is located and put the content and run the command

Installation Guide for React:
move to the directory => PS C:\4th_sem_project\property_sale\frontend\property_sale>
run the command=> npm install

Note:
	Dont forgot to append slash at end of the url for the post request

1.Registration:
	data = {
    		"username": "",
    		"email": "",
    		"password1": "",
    		"password2": ""
	}
	axios.post('http://127.0.0.1:8000/api/account/registration/',data)

2.Login:
	data = {
    		"email": "",
    		"password": ""
	}
	axios.post('/api/account/login/',data)

3.Password Change:
	data = {
		"old_password":"",
    		"new_password1": "",
    		"new_password2": ""
	}
	options = {
		headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${res.data.access_token}`}
	}
	
	axios.post('/api/account/password/change/',data,options)
	

5.Retrive all user For Testing:
	options = {
		headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${res.data.access_token}`}
	}
	axios.get('/api/user',options)

5.Resend Email Verification:
	http://127.0.0.1:8000/api/account/registration/resend-email/

6.Logout
	data = {
		"username":"",
		"refresf":`${refrest_token}`
	}
	axios.post('/api/account/logout/',data)


7.Refresh Token:
	data = {
    		"refresh": ""
	}
	axios.post('/api/account/token/refresh/',data)

8.Password Reset:
	data = {
    		"email": ""
	}
	axios.post('api/account/password/reset/',data)



8.Response After Successful Login:
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQyMDY3MzE1LCJpYXQiOjE2NDIwNjQwMTUsImp0aSI6IjhmZDFkMjFmMGQxNjQxZGVhN2VmNjQzMjJkZjZkMWMxIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJiaWJlayJ9.LtI6lJyK1XKSYde91U4Fy0kBvzSuwezq9BVRgT8lhrU",
    "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY0MzM2MDAxNSwiaWF0IjoxNjQyMDY0MDE1LCJqdGkiOiI3NzljZjQ3ZDNmOTk0OTIzYTQ0YTQ1OGMxOTYxYWQwMCIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoiYmliZWsifQ.e3OS1QVYMuFrlrlqnCBsQfaqwp6w_UQlreuZguQgtuE",
    "user": {
        "pk": 1,
        "email": "bibek@gmail.com",
        "first_name": "",
        "last_name": ""
    }
}

Connecting The Websocket:
	ws://127.0.0.1:8000/ws/status/<username>/
	when you update document status you will be notified

For Real Time No of Views of Property:
	ws://127.0.0.1:8000/ws/house/<int:id>/',consumers.IncreaseHouseViews
    ws://127.0.0.1:8000/ws/land/<int:id>/',consumers.IncreaseLandViews
	each time on Websocket connection no of views of proerty will be increased by 1

New Item Listed For Sale notification in homepage:
	ws://127.0.0.1:8000/ws/property/
	msg will be sent when user post property for sell and and is_active field is made true

For Google Login:
       Click on login with google. If you are not logged in a popup will appear and choose your mail for login.
       Then you will get reaponse from google which consist of token. If it is first time your account is not created, For creating your account go to url
       dj-rest-auth/google/login and post with access token your account will be created if it is first time and access and refrest token will be received.
       For the second time on dj-rest-auth/google/login account will not created and access and refrest token will be received
