#!/usr/bin/python
import json,math,os,sys,random
from PIL import Image,ImageDraw

def random_bright():
	rval=[]
	for idx in range(3):
		val=100+int(random.random()*155.)
		rval.append(val)
	xval=(rval[0],rval[1],rval[2],255)
	return xval

def random_gray():
	#hexvals=['1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
	#hidx=int(random.random()*len(hexvals))
	#hexval=hexvals[hidx]
	#rval="#"+6*hexval
	
	val=100+int(random.random()*100)
	rval=(val,val,val+55,255)
	
	return rval
	
	
w=1600
h=800
ouf=Image.new("RGBA",(w,h),"#0000FF")

for xoffset in range(0,w,w/4):
	for yoffset in range(-h/4,5*h/4,h/2):
		
		pixel=random_gray()
		
		for x in range(0,w/4):
			xx=x+xoffset
			for y in range(0,h/2):
				yy=y+yoffset
				try:ouf.putpixel((xx,yy),pixel)
				except:pass

pi=math.acos(-1.)
y0=400
A=30
f=5

for y0 in range(0,800,10):
	f=10*random.random()
	pixel=random_bright()
	for x in range(0,1600):
		y=y0+int(A*math.sin(f*x*pi/180.))
		#y=y0+int(A*math.sin(f*x*pi/180.))+int(A/5*math.cos(5*f*x*pi/180.)*math.sin(4*f*(x)*pi/180.))
		
		try:ouf.putpixel((x,y),pixel)
		except:pass
		
oufname="sinewave.png";
ouf.save(oufname,"PNG")
