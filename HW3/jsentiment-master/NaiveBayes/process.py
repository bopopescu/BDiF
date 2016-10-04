import csv, json

words = {'positive': [], 'negative': []}

with open('training.csv', 'rU') as csvFile:
	reader = csv.reader(csvFile) 
	reader.next()
	for row in reader:
		if int(row[1]):
			words['positive'].append(unicode(row[2].strip(), errors='ignore'))
		else:
			words['negative'].append(unicode(row[2].strip(), errors='ignore'))

with open('training.json', 'w') as jsonFile:
	jsonFile.write(json.dumps(words))
