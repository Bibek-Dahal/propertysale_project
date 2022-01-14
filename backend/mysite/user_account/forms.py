from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import MyUser
from django.contrib.auth import password_validation
from django.utils.translation import gettext_lazy as _
import re
from django.core.exceptions import ValidationError

class CustomUserCreationForm(UserCreationForm):
    username = forms.CharField(min_length=3,widget=forms.TextInput(attrs={"placeholder":"enter your name"}))
    password1 = forms.CharField(
        label=_("Password"),
        strip=False,
        max_length=25,
        widget=forms.PasswordInput(attrs={'autocomplete': 'new-password','placeholder':'enter password'}),
        help_text=password_validation.password_validators_help_text_html(),
    )  
    password2 = forms.CharField(
            label=_("Password confirmation"),
            widget=forms.PasswordInput(attrs={'autocomplete': 'new-password','placeholder':'re-enter password'}),
            max_length=25,
            strip=False,
            help_text=_("Enter the same password as before, for verification."),
    )   
    class Meta:
        model = MyUser
        fields = ('email','username')
    
        widgets ={
            
            'email':forms.EmailInput(attrs={"placeholder":"enter your email","minlength":11}),
        }
       

    def clean_username(self):
        
        cleaned_data = super().clean()
        username = cleaned_data.get('username')
        check_username = re.findall("[a-zA-Z]",cleaned_data.get('username'))
        if not check_username:
            raise ValidationError('Enter valid username')
        return username

    def clean_password2(self):
        super().clean()
        pwd = self.cleaned_data.get('password1')
        if len(pwd) >= 8:
            reg = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$"
            pat = re.compile(reg)
            mat = re.search(pat, pwd)
            if not mat:
                raise ValidationError('Password must contain atleats one digit special characrers and uppercase letter')
            return pwd
        
                    
        