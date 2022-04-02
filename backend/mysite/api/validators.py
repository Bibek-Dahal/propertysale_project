import re

from rest_framework import serializers
def check_pswd(attrs):
    print(attrs)
    if len(attrs['password']) >= 8:
        reg = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$"
        pat = re.compile(reg)
        final_pswd = re.search(pat, attrs['password'])
        if not final_pswd:
            raise serializers.ValidationError('Password must contain atleats one digit, one special characters and one uppercase letter')
            # return pwd
        return attrs

def custom_check_pswd(value):
    print(value)
    if len(value) >= 8:
        reg = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$"
        pat = re.compile(reg)
        final_pswd = re.search(pat, value)
        if not final_pswd:
            raise serializers.ValidationError('Password must contain atleats one digit, one special characters and one uppercase letter')
            # return pwd
        return value

def check_int(attrs):
    if attrs.isnumeric():
        return str(attrs)
    else:
        raise serializers.ValidationError("Ensure this field is numeric.")

def check_mobile_num(attrs):
    if attrs.isnumeric():
        if len(attrs) == 10:
            return str(attrs)
    raise serializers.ValidationError("Enter a valid phone number")