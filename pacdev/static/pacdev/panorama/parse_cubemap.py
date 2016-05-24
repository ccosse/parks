#!/usr/bin/python
import json,math,os,sys
from PIL import Image,ImageDraw

print dir(Image)
print '\n\n'
print dir(ImageDraw)

infname=sys.argv[1]
print infname

prefix=os.path.splitext(infname)[0]
cmd="rm -rf %s"%prefix
print cmd
try:os.system(cmd)
except:pass

#RESIZE 2:1 here

cmd="cp -r t3 %s"%prefix
print cmd
os.system(cmd)

img=Image.open(infname)
img=img.resize((1600,800))
w=img.size[0]
h=img.size[1]

print "%d x %d"%(w,h)


oufnames=['posx','posz','negx','negz']
count=0
for xoffset in range(0,w,w/4):
	x=(xoffset,xoffset+w/4)
	y=(h/4,3*h/4)
	ouf=Image.new("RGBA",(w/4,h/2))
	for xx in range(x[0],x[1]):
		for yy in range(y[0],y[1]):
			pixel=img.getpixel((xx,yy))
			ouf.putpixel((xx-x[0],yy-y[0]),pixel)
	
	oufname="%s/%s.png"%(prefix,oufnames[count])
	print "%s"%(oufname)
	ouf.save(oufname,"PNG")
	count+=1

oufnames=['posy','negy']
for oidx in range(0,2):
	ouf=Image.new("RGBA",(w/2,w/2))
	oufname="%s/%s.png"%(prefix,oufnames[oidx])
	ouf.save(oufname,"PNG")
	print "%s"%(oufname)
	
#POS-Y
ouf=Image.new("RGBA",(w/4,w/4))
#print dir(ouf)
#print ouf.rotate.__doc__

for xoffset in range(0,w,w/4):
	y=[0,h/4]
	x=[0,w/4]

	dy=float(y[1]-y[0])
	dx=float(x[1]/2.-x[0])
	dydx=dy/dx
	for yy in range(y[0],y[1]):
		yyy=h/4-yy
		xmin=int(yy/dydx)
		xmax=x[1]-xmin
		for xx in range(xmin,xmax):
			try:
				pixel=img.getpixel((xx+xoffset,yyy))
				ouf.putpixel((xx,w/4-yy-1),pixel)
			except Exception,e:
				print xx,yy
				print e
				break

	ouf=ouf.rotate(-90)

ouf=ouf.rotate(-90)

oufname="%s/%s.png"%(prefix,oufnames[0])
print oufname
ouf.save(oufname,"PNG")


#NEG-Y
ouf=Image.new("RGBA",(w/4,w/4))
#print dir(ouf)
#print ouf.rotate.__doc__

for xoffset in range(0,w,w/4):
	y=[0,h/4]
	x=[0,w/4]

	dy=float(y[1]-y[0])
	dx=float(x[1]/2.-x[0])
	dydx=dy/dx
	for yy in range(y[0],y[1]):
		yyy=3*h/4+yy
		xmin=int(yy/dydx)
		xmax=x[1]-xmin
		for xx in range(xmin,xmax):
			try:
				pixel=img.getpixel((xx+xoffset,yyy))
				ouf.putpixel((xx,yy),pixel)
			except Exception,e:
				print xx,yy
				print e
				break

	ouf=ouf.rotate(90)

ouf=ouf.rotate(90)

oufname="%s/%s.png"%(prefix,oufnames[1])
print oufname
ouf.save(oufname,"PNG")
