
# Propert Sale
# Django Installation Guide
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

# Note
	Dont forgot to append slash at end of the url for the post request

# 1.Registration
	data = {
    		"username": "",
    		"email": "",
    		"password1": "",
    		"password2": ""
	}
	axios.post('http://127.0.0.1:8000/api/account/registration/',data)

# 2.Login
	data = {
    		"email": "",
    		"password": ""
	}
	axios.post('/api/account/login/',data)

# 3.Password Change
	data = {
		"old_password":"",
    		"new_password1": "",
    		"new_password2": ""
	}
	options = {
		headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${res.data.access_token}`}
	}
	
	axios.post('/api/account/password/change/',data,options)
	

# 4.Retrive all user For Testing
	options = {
		headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${res.data.access_token}`}
	}
	axios.get('/api/user',options)

# 5.Resend Email Verification
	http://127.0.0.1:8000/api/account/registration/resend-email/

# 6.Logout
	data = {
		"username":"",
		"refresh":`${refresh_token}`
	}
	axios.post('/api/account/logout/',data)


# 7.Refresh Token
	data = {
    		"refresh": ""
	}
	axios.post('/api/account/token/refresh/',data)

# 8.Password Reset
	data = {
    		"email": ""
	}
	axios.post('api/account/password/reset/',data)



# 9.Response After Successful Login
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

# Connecting The Websocket
	ws://127.0.0.1:8000/ws/status/<username>/
	when you update document status you will be notified

# For Real Time No of Views of Property:
	ws://127.0.0.1:8000/ws/house/<int:id>/
    	ws://127.0.0.1:8000/ws/land/<int:id>/
	each time on Websocket connection no of views of proerty will be increased by 1

# New Item Listed For Sale notification in homepage
	ws://127.0.0.1:8000/ws/property/
	msg will be sent when user post property for sell and and is_active field is made true

For Google Login:
       Click on login with google. If you are not logged in a popup will appear and choose your mail for login.
       Then you will get reaponse from google which consist of token. If it is first time your account is not created, For creating your account go to url
       dj-rest-auth/google/login and post with access token your account will be created if it is first time and access and refrest token will be received.
       For the second time on dj-rest-auth/google/login account will not created and access and refrest token will be received

# Retrive User
	options = {
		headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${res.data.access_token}`}
	}
	axios.get('/api/retrive-user/',options)

# Update User
	options = {
		headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${res.data.access_token}`}
	}
	data = {
		"first_name":"",
		"last_name":"",
		"date_of_birth":"2000-03-06",
		"gender":"Male", 
		"username":"bibek"
	}
	axios.patch('/api/update-user/',data,options)

	gender_choices = ['Male','Female','Others']

	If get request is send on '/api/update-user/' then also user will be retrived

# Retrive KYC
	options = {
		headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${res.data.access_token}`}
	}
	axios.get('/api/kyc-retrive/',options)

# Create KYC
	data = {
		"user": 1,
		"profile_pic": "",
		"citizenship_photo_front": "",
		"citizenship_photo_back": "",
		"occupation": "",
		"citizenship_num": "2222-3333-334",
        "mobile_num":""
	}
	options = {
		headers:{ 'Content-Type':'multipart/form-data','Authorization':`Bearer ${res.data.access_token}`}
	}
	axios.post('/api/kyc-create/',data,options)

# Update KYC
	data = {
		"profile_pic": "",
		"citizenship_photo_front": "",
		"citizenship_photo_back": "",
		"occupation": ""
	}

	options = {
		headers:{ 'Content-Type':'multipart/form-data','Authorization':`Bearer ${res.data.access_token}`}
	}
	axios.patch('/api/kyc-update/',data,options)

# POST LAND
	 data = {
		 "seller":"<id>",
		 "title":"",
		 "description":"",
		 "listing_type":"",
		 "road_to_property":"Xm from somewhere",
		 "access_road":"",
		 "district":"",
		 "district":"",
		 "zone":"",
		 "zip":"",
		 "landmark":"",
		 "area":"",
		 "ropani":"",
		 "aana":"",
		 "paisa":"",
		 "daam":"",
		 "price_in_number":"",
		 "price_in_words":"",
		 "price_negotiable":"",
		 "face_towards":"",
		 "main_image":"",
		 "url":"",
		 "latitude":"",
		 "longitude":"",
		 "additional_land_image":"<multiple>",
		 "certificate_image":"<multiple>"
	 }


	options = {
		headers:{ 'Content-Type':'multipart/form-data','Authorization':`Bearer ${res.data.access_token}`}
	}
	axios.post('/api/property/post-land/',data,options)

# POST HOUSE
	data = {
		 "seller":"<id>",
		 "title":"",
		 "description":"",
		 "listing_type":"",
		 "road_to_property":"Xm from somewhere",
		 "access_road":"",
		 "district":"",
		 "district":"",
		 "zone":"",
		 "zip":"",
		 "landmark":"",
		 "area":"",
		 "ropani":"",
		 "aana":"",
		 "paisa":"",
		 "daam":"",
		 "price_in_number":"",
		 "price_in_words":"",
		 "price_negotiable":"",
		 "per":"<per month or ...",
		 "face_towards":"",
		 "property_type":"",
		 "condition":"",
		 "facility":"",
		 "furnishing":"",
		 "house_type":"",
		 "floors":"",
		 "beds":"",
		 "kitchen":"",
		 "living":"",
		 "parking":"",
		 "bath":"",
		 "main_image":"",
		 "url":"",
		 "latitude":"",
		 "longitude":"",
		 "additional_house_image":"<multiple>",
		 "certificate_image":"<multiple>"
	}
	options = {
		headers:{ 'Content-Type':'multipart/form-data','Authorization':`Bearer ${res.data.access_token}`}
	}
	axios.post('/api/property/post-house/',data,options)

# LIST ALL HOUSES
	axios.get('/api/property/house/all/')

# LIST ALL LANDS
	axios.get('/api/property/land/all/')

# GET HOUSE BY ID 
	axios.get('/api/property/house/<int:pk>/')

# GET LAND BY ID
	axios.get('/api/property/land/<int:pk>/')

# LIST ALL FOREIGN KEYS
	axios.get('/api/list-for-keys/')

# LIST USER HOUSE
	options = {
		headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${res.data.access_token}`}
	}

	axios.get('/api/list-user-house/',options)

# LIST USER LANDS
	options = {
		headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${res.data.access_token}`}
	}

	axios.get('/api/list-user-land/',options)

# RETRIVE USER HOUSE BY ID
	options = {
		headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${res.data.access_token}`}
	}

	axios.get('/api/retrive-user-house-by-id/<int:pk>/',options)

# RETRIVE USER LAND BY ID
	options = {
		headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${res.data.access_token}`}
	}

	axios.get('/api/retrive-user-land-by-id/<int:pk>/',options)


# SEARCH HOUSE BY TYPE
		
	var =[house-for-sale,house-for-rent,top-listing,premium-listing,featured-listing]
	axios.get('/api/property/house/<var>/',options)

# SEARCH LAND BY TYPE
	var =[top-listing,premium-listing,featured-listing]
	axios.get('/api/property/land/<var>/',options)


# UPDATE HOUSE STATUS
	options = {
		headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${res.data.access_token}`}
	}
	data = {
		"status":"Up or Down"
	}

	axios.put('/api/update-house-status/<pk>/',data,options)
	Up == Active
	Down == Inactive

# UPDATE LAND STATUS
	options = {
		headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${res.data.access_token}`}
	}
	data = {
		"status":"Up or Down"
	}

	axios.put('/api/update-land-status/<pk>/',data,options)
	Up == Active
	Down == Inactive














	 

