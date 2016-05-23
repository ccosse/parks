from __future__ import unicode_literals
from django.db import models
from tinymce.models import HTMLField
import os

class POI(models.Model):
	name= models.CharField(max_length=60,blank=False)
	desc= models.CharField(max_length=60,blank=False)
	lat	= models.FloatField(blank=False)
	lon	= models.FloatField(blank=False)

	def __unicode__(self):
		return self.name

class Embedded(models.Model):
	title=models.CharField(default='Untitled',max_length=60,blank=False)
	desc= models.CharField(max_length=500,blank=False)
	lat	= models.FloatField(blank=True)
	lon	= models.FloatField(blank=True)
	tags= models.CharField(max_length=100,blank=False)
	url = models.URLField(blank=False)

	def __unicode__(self):
		return self.title

class GalleryImage(models.Model):
	title=models.CharField(default='Untitled',max_length=60,blank=False)
	desc= models.CharField(max_length=500,blank=False)
	lat	= models.FloatField(blank=True)
	lon	= models.FloatField(blank=True)
	tags= models.CharField(max_length=100,blank=False)
	image = models.ImageField(upload_to='/var/www/dev/static/pacdev/upload/images/', null=True, blank=True)
	#how can we make filename hidden in admin interface? (b/c want blank and filled-out below)
	filename=models.CharField(max_length=60,blank=True)

	def __unicode__(self):
		return self.title

class GalleryFile(models.Model):
	title=models.CharField(default='Untitled',max_length=60,blank=False)
	desc= models.CharField(max_length=500,blank=False)
	lat	= models.FloatField(blank=True)
	lon	= models.FloatField(blank=True)
	tags= models.CharField(max_length=100,blank=False)
	file = models.FileField(upload_to='/var/www/dev/static/pacdev/upload/files/', null=True, blank=True)
	#how can we make filename hidden in admin interface? (b/c want blank and filled-out below)
	filename=models.CharField(max_length=60,blank=True)

	def __unicode__(self):
		return self.title

class GalleryDocument(models.Model):
	title=models.CharField(default='Untitled',max_length=60,blank=False)
	desc= models.CharField(max_length=500,blank=False)
	lat	= models.FloatField(blank=True)
	lon	= models.FloatField(blank=True)
	tags= models.CharField(max_length=100,blank=False)
	file = models.FileField(upload_to='/var/www/dev/static/pacdev/upload/docs/', null=True, blank=True)
	#how can we make filename hidden in admin interface? (b/c want blank and filled-out below)
	filename=models.CharField(max_length=60,blank=True)

	def __unicode__(self):
		return self.title

class TestArticle(models.Model):
	content = HTMLField()
	
#http://stackoverflow.com/questions/5372934/how-do-i-get-django-admin-to-delete-files-when-i-remove-an-object-from-the-datab
#Receive the pre_delete signal and delete the file associated with the model instance.
from django.db.models.signals import pre_delete,pre_save
from django.dispatch.dispatcher import receiver

@receiver(pre_save, sender=GalleryDocument)
def gallerydocument_save(sender, instance, **kwargs):
	instance.filename=os.path.basename(instance.file.name)

@receiver(pre_save, sender=GalleryFile)
def galleryfile_save(sender, instance, **kwargs):
	instance.filename=os.path.basename(instance.file.name)

@receiver(pre_save, sender=GalleryImage)
def galleryimage_save(sender, instance, **kwargs):
	instance.filename=os.path.basename(instance.image.name)

@receiver(pre_delete, sender=GalleryImage)
def galleryimage_delete(sender, instance, **kwargs):
    # Pass false so FileField doesn't save the model.
    instance.image.delete(False)
