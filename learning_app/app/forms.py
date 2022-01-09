from django import forms
from django.db.models import fields, query
from django.forms import BaseFormSet
from django.forms.models import modelformset_factory
from django.forms.widgets import Textarea
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm

from .models import Problem, Choice, Type


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = get_user_model()
        fields = ['email', 'username']

class ProblemForm(forms.ModelForm):
    class Meta:
        model = Problem
        fields = ['subject', 'title', 'type', 'content']


    content = forms.CharField(
        label="問題文",
        widget=forms.Textarea(attrs=({'rows': 3, 'cols': 60})),
        initial="次のうちから正しいものを１つ選びなさい。"
    )




class ChoiceForm(forms.ModelForm):
    class Meta:
        model = Choice
        fields = ['content']
    content = forms.CharField(
        label="選択肢",
        widget=forms.Textarea(attrs=({'rows': 3, 'cols': 60})),
        )

class ContactForm(forms.Form):
    subject = forms.CharField(
        label="件名",
        max_length=100,
        widget=forms.Textarea(attrs=({'rows': 1, 'cols': 40}))
    )
    email = forms.EmailField(
        label="メールアドレス",
        widget=forms.Textarea(attrs=({'rows': 1, 'cols': 40}))
    )
    message = forms.CharField(label="お問い合わせ内容", widget=Textarea)


class RequiredFormset(forms.BaseFormSet):
    def __init__(self, *args, **kwargs):
        super(RequiredFormset, self).__init__(*args, **kwargs)
        for form in self.forms:
            form.empty_permitted = False