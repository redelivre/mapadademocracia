#!/usr/bin/env python

import json, urllib

fh = urllib.urlopen('https://docs.google.com/spreadsheets/d/1H_cnrYN6GjkTNynyL4PpJLMdIP-kaLrrOdtyukrwcAs/export?format=tsv&id=1H_cnrYN6GjkTNynyL4PpJLMdIP-kaLrrOdtyukrwcAs&gid=198072564')

labels = fh.readline().strip().split('\t')

data = {}

for line in fh:
    line_data = {}
    pieces = line.split('\t')
    for i, label in enumerate(labels):
        if not label:
            continue
        line_data[label] = pieces[i].strip()

    if line_data['politico_comissao'] == 'sim':
        line_data['politico_comissao'] = True
    else:
        line_data['politico_comissao'] = False
           

    data[int(line_data['politico_id_planilha'])] = line_data

json_data = json.dumps(data, indent=4)

open('dist/deputados.js', 'w').write('var deputados = %s' % json_data)
