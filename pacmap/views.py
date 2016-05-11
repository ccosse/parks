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


def pacphotos(request):
	return render_to_response(
		'pacphotos.html',{
			'title':'Protected Areas Commission, Guyana',
			'galleryobjects':GalleryImage.objects.all(),
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