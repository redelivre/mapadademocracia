#!/usr/bin/env python

import json, urllib

#fh = urllib.urlopen('https://docs.google.com/spreadsheets/d/1H_cnrYN6GjkTNynyL4PpJLMdIP-kaLrrOdtyukrwcAs/export?format=tsv&id=1H_cnrYN6GjkTNynyL4PpJLMdIP-kaLrrOdtyukrwcAs&gid=198072564')
fh = urllib.urlopen('https://docs.google.com/spreadsheets/d/1QEz226JQEEN61kRUtzQ3VwAH0wpb7OM8kEm8lkUatgk/export?format=tsv')

labels = fh.readline().strip().split('\t')

data = {}
already = {}
n = 0
for line in fh:
    n += 1
    line_data = {}
    pieces = line.split('\t')
    for i, label in enumerate(labels):
        if not label:
            continue
        line_data[label] = pieces[i].strip()


    try:
        ide = int(line_data['politico_id_planilha'])
    except:
        raise Exception("Erro de ID na linha %d" % n)
        
    if already.get(ide, None) is not None:
        raise Exception("ID %d repetido na linha %d" % (ide, n))
    already[ide] = True
    data[ide] = line_data

json_data = json.dumps(data, indent=4)

open('dist/deputados.js', 'w').write('var deputados = %s' % json_data)
