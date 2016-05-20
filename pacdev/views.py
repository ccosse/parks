from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render_to_response,redirect
from django.template import RequestContext
from django.views.decorators.http import require_http_methods
from django import forms

import logging, xmlrpclib, json, time, os, string

def dev(request):
	logging.debug('pacdev.home')

	return render_to_response(
		'pacdev.html',
		{
			'title'	: 'DEV',
		},
		context_instance = RequestContext(request)
	)

