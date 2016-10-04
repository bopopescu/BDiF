import json
from numpy import genfromtxt

data = genfromtxt('LoughranMcDonald_MasterDictionary_2014.csv', dtype=None, delimiter=',', names=True)
d = {}
for x in data:
	if x['Positive'] != 0 or x['Negative'] != 0:
		d[x['Word']] = {'pos': 1 if x['Positive'] > 0 else 0, 'neg': 1 if x['Negative'] > 0 else 0}

with open('lm.json', 'w') as ofile:
	json.dump(d, ofile)
