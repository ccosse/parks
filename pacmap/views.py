from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from django import forms

import logging, xmlrpclib, json, time, os, string
from pacmap.models import *

FORMAT = '%(asctime)-15s %(message)s'
logging.basicConfig(filename='/var/www/dev/pacmap/pacmap.log',level=logging.DEBUG, format=FORMAT)

def home(request):
	logging.debug('pacmap.home')
	if request.method == 'POST':
		pois 	= POI.objects.all()
		x 	= pois.get(name='Georgetown')
		x.lat	= request.POST.get('lat')
		x.save()

	pois	= POI.objects.all().values();
	rval	= { 'gtown' : pois[0] }

	return render_to_response(
		'pacmap.html',
		{
			'title'	: 'PAC',
			'pois'	: json.dumps(rval)
		},
		context_instance = RequestContext(request)
	)

def hinterland(request):
	logging.debug('pacmap.hinterland')
	return render_to_response(
		'hinterland.html',{
			'title':'Hinterland Parks, Protected Areas Commission, Guyana'
		},
		context_instance = RequestContext(request)
	)

def urbanparks(request):
	logging.debug('pacmap.urbanparks')
	return render_to_response(
		'urbanparks.html',{
			'title':'Urban Parks, Protected Areas Commission, Guyana'
		},
		context_instance = RequestContext(request)
	)

def pacvideo(request):
	logging.debug('pacmap.pacvideo')
	return render_to_response(
		'pacvideo.html',{
			'title':'Protected Areas Commission, Guyana'
		},
		context_instance = RequestContext(request)
	)

class UploadFileForm(forms.Form):
	desc= forms.CharField(max_length=60,widget=forms.Textarea)
	lat	= forms.FloatField(required=False)
	lon	= forms.FloatField(required=False)
	tags= forms.CharField(max_length=60,required=False)
	file = forms.ImageField()

def handle_uploaded_file(f):
	oufname=f.name
	with open('/var/www/dev/static/pacmap/upload/images/%s'%oufname, 'wb+') as destination:
		for chunk in f.chunks():
			destination.write(chunk)
	
def pacphotos(request):
	if request.method=='POST':
		form = UploadFileForm(request.POST, request.FILES)
		if form.is_valid():
			handle_uploaded_file(request.FILES['file'])
			x=GalleryImage()
			x.filename=request.FILES['file'].name
			x.desc=request.POST.get('desc')
			x.tabs=request.POST.get('tags')
			x.lat	= request.POST.get('lat')
			x.lon	= request.POST.get('lon')
			x.save()
			
	images=os.listdir('/var/www/dev/static/pacmap/upload/images/')
	#NEED: return GalleryImage.objects.all()
	return render_to_response(
		'pacphotos.html',{
			'title':'Protected Areas Commission, Guyana',
			'images':images,
			'galleryobjects':GalleryImage.objects.all(),
			'form':UploadFileForm()
		},
		context_instance = RequestContext(request)
	)

def contact(request):
	logging.debug('pacmap.contact')
	return render_to_response(
		'contact.html',{
			'title':'Contact Protected Areas Commission, Guyana'
		},
		context_instance = RequestContext(request)
	)		