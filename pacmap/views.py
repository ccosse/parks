from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
import logging, xmlrpclib, json, time, os, string
from pacmap.models import *

def home(request):

	if request.method == 'POST':
		pois 	= POI.objects.all()
		x 	= pois.get(name='Georgetown')
		x.lat	= request.POST.get('lat')
		x.save()

	pois	= POI.objects.all().values();
	rval	= { 'gtown' : pois[0] }

	return render_to_response(
		'index.html',
		{
			'title'	: 'PAC',
			'pois'	: json.dumps(rval)
		},
		context_instance = RequestContext(request)
	)
