from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField

from pacmap.models import POI,GalleryImage,GalleryFile,Embedded

class POIAdmin(admin.ModelAdmin):
	list_display		= ('name','lat','lon', 'desc',)
	list_display_links	= ('name',)

admin.site.register(POI, POIAdmin)

class EmbeddedAdmin(admin.ModelAdmin):
	list_display		= ('title','desc','lat','lon', 'tags' )
	list_display_links	= ('title',)

admin.site.register(Embedded, EmbeddedAdmin)

class GalleryImageAdmin(admin.ModelAdmin):
	list_display		= ('title','desc','lat','lon', 'tags' )
	list_display_links	= ('title',)

admin.site.register(GalleryImage, GalleryImageAdmin)


class GalleryFileAdmin(admin.ModelAdmin):
	list_display		= ('title','desc','lat','lon', 'tags' )
	list_display_links	= ('title',)

admin.site.register(GalleryFile, GalleryFileAdmin)
