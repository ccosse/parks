from __future__ import unicode_literals
from django.db import models

class POI(models.Model):
	name= models.CharField(max_length=60,blank=False)
	desc= models.CharField(max_length=60,blank=False)
	lat	= models.FloatField(blank=False)
	lon	= models.FloatField(blank=False)
	
	def __unicode__(self):
		return self.name

class GalleryImage(models.Model):
	title=models.CharField(default='Untitled',max_length=60,blank=False)
	filename=models.CharField(max_length=60,blank=False)
	desc= models.CharField(max_length=500,blank=False)
	lat	= models.FloatField(blank=True)
	lon	= models.FloatField(blank=True)
	tags= models.CharField(max_length=100,blank=False)
	
	def __unicode__(self):
		return self.filename
