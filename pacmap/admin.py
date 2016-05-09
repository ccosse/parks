from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField

from pacmap.models import POI

class POIAdmin(admin.ModelAdmin):
	list_display		= ('name','lat','lon', 'desc',)
	list_display_links	= ('name',)

admin.site.register(POI, POIAdmin)
