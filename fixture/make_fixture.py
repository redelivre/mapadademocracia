#!/usr/bin/env python

import json

fh = open('dados.csv')

fh.readline()
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
    elif line_data['politico_comissao'].startswith('n'):
        line_data['politico_comissao'] = False
    else:
        raise Exception()
           

    data[int(line_data['politico_id_planilha'])] = line_data

open('fixture.json', 'w').write(json.dumps(data, indent=4))
