from django import forms
from django.db import models
from django.contrib import admin

from tinymce.widgets import TinyMCE
from pacdev.models import TestArticle

class TestArticleAdmin(admin.ModelAdmin):
        list_display		= ('content',)
    	list_display_links	= ('content',)

admin.site.register(TestArticle, TestArticleAdmin)
