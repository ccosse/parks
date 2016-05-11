from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render_to_response,redirect
from django.template import RequestContext
from django.views.decorators.http import require_http_methods
from django import forms

import logging, xmlrpclib, json, time, os, string
from pacmap.models import *

FORMAT = '%(asctime)-15s %(message)s'
logging.basicConfig(filename='/var/www/dev/pacmap/pacmap.log',level=logging.DEBUG, format=FORMAT)

@require_http_methods(["GET", "POST"])
def home(request):
	logging.debug('pacmap.home')
	if request.method == 'POST':
		pois 	= POI.objects.all()
		#x 	= pois.get(name='Georgetown')
		#x.lat	= request.POST.get('lat')
		#x.save()

	pois	= POI.objects.all().values();

	return render_to_response(
		'pacmap.html',
		{
			'title'	: 'PAC',
			'pois'	: pois
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

class UploadImageForm(forms.Form):
	title=forms.CharField(max_length=60,required=True)
	file = forms.ImageField()
	desc= forms.CharField(max_length=60,widget=forms.Textarea)
	lat	= forms.FloatField(required=False)
	lon	= forms.FloatField(required=False)
	tags= forms.CharField(max_length=60,required=False)

class UploadFileForm(forms.Form):
	title=forms.CharField(max_length=60,required=True)
	file = forms.FileField()
	desc= forms.CharField(max_length=60,widget=forms.Textarea)
	lat	= forms.FloatField(required=False)
	lon	= forms.FloatField(required=False)
	tags= forms.CharField(max_length=60,required=False)

class DeleteFileForm(forms.Form):
	title=forms.CharField(max_length=60,required=True)

class DeleteImageForm(forms.Form):
	title=forms.CharField(max_length=60,required=False)

def handle_uploaded_image(f):
	oufname=f.name
	with open('/var/www/dev/static/pacmap/upload/images/%s'%oufname, 'wb+') as destination:
		for chunk in f.chunks():
			destination.write(chunk)
	
def handle_uploaded_file(f):
	oufname=f.name
	with open('/var/www/dev/static/pacmap/upload/files/%s'%oufname, 'wb+') as destination:
		for chunk in f.chunks():
			destination.write(chunk)
	
def deletephoto(request):
	if request.method=='POST':
		fname=request.POST.get("pyld")
		logging.debug(fname)
		x=GalleryImage.objects.get(filename=fname)
		x.delete()
		cmd="rm /var/www/dev/static/pacmap/upload/images/%s"%fname
		os.system(cmd)
		logging.debug("%s deleted"%fname)
	return redirect("/pacmap/pacphotos/")

def pacphotos(request):
	if request.method=='POST':
		form = UploadFileForm(request.POST, request.FILES)
		if form.is_valid():
			logging.debug("form valid")
			handle_uploaded_image(request.FILES['file'])
			x=GalleryImage()
			x.filename=request.FILES['file'].name
			x.title=request.POST.get('title')
			x.desc=request.POST.get('desc')
			x.tabs=request.POST.get('tags')
			#An improvement would be map interface with drag/drop location icon
			x.lat	= request.POST.get('lat')
			x.lon	= request.POST.get('lon')
			x.save()
		else:
			logging.debug("form invalid")
			
	images=os.listdir('/var/www/dev/static/pacmap/upload/images/')
	#NEED: return GalleryImage.objects.all()
	return render_to_response(
		'pacphotos.html',{
			'title':'Protected Areas Commission, Guyana',
			'images':images,
			'galleryobjects':GalleryImage.objects.all(),
			'form':UploadImageForm(),
			'delete':DeleteImageForm()
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