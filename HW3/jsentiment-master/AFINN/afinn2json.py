import json
d = dict(map(lambda (k,v): (k,int(v)), [ line.split('\t') for line in open("AFINN-111.txt") ]))

with open('afinn.json', 'w') as ofile:
	json.dump(d, ofile)
