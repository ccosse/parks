#!/usr/bin/python
import os,sys,json
infname=sys.argv[1]
#print infname
inf=open(infname)
x=eval(inf.read())
#print x

c=x['features'][0]['geometry']['coordinates']
xmin=1000
xmax=-1000
ymin=1000
ymax=-1000
for idx0 in range(len(c)):
	for idx1 in range(len(c[idx0])):
		for idx2 in range(len(c[idx0][idx1])):
			lon,lat=c[idx0][idx1][idx2]
			if lon<xmin:xmin=lon
			if lon>xmax:xmax=lon
			if lat<ymin:ymin=lat
			if lat>ymax:ymax=lat

print 'bbox: ',xmin,ymin,xmax,ymax
print 'ctr:  ',(xmin+xmax)/2.,(ymin+ymax)/2.
