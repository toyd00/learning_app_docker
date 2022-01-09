
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import (
    AdminPasswordChangeForm, UserCreationForm, UserChangeForm
)
from django.utils.translation import gettext, gettext_lazy as _
from .models import CustomUser


class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = CustomUser
        fields = '__all__'


class CustionUserChangeForm(UserChangeForm):

    class Meta:
        model = CustomUser
        fields = '__all__'


class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        (_('Permissions'), {'fields': ('is_active', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'data_joined')}),
    )

    form = UserChangeForm
    add_form = UserCreationForm
    change_password_form = AdminPasswordChangeForm
    list_display = ('id', 'username', 'email', 'is_staff')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')
    search_fields = ('username', 'email')
    ordering = ('username',)
    filter_horizontal = ('groups', 'user_permissions',)


admin.site.register(CustomUser, CustomUserAdmin)