from __future__ import unicode_literals
from django.db import models

class POI(models.Model):
	name	= models.CharField(max_length=60,blank=False)
	lat	= models.FloatField(blank=False)
	lon	= models.FloatField(blank=False)
	desc	= models.CharField(max_length=60,blank=False)
	
	def __unicode__(self):
		return self.name
