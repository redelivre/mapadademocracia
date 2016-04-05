#!/usr/bin/env python

import imaplib, json, os, email, sys
from email.header import decode_header

conf = json.loads(open('config').read())
mail = imaplib.IMAP4_SSL(conf['server'])
mail.login(conf['email'], conf['senha'])

already = {}
start = 0
if os.path.exists('already'):
    for line in open('already'):
        already[line.strip()] = True
        start += 1

mail.select(conf['folder'])
result, data = mail.uid('search', None, "ALL")
ids = data[0].split()

def extract_email(raw_email):
    message = email.message_from_string(raw_email)
    sender = message['From']
    if not sender:
        import ipdb; ipdb.set_trace()
        return
    if sender.startswith('='):
        decoded = decode_header(sender)
        if len(decoded) > 1:
            if decoded[0][1] is not None:
                name = decoded[0][0].decode(decoded[0][1]).encode('utf-8')
            else:
                name = decoded[0][0]
            addr = decoded[1][0]
            sender = '%s %s' % (name, addr)
        else:
            sender = sender.split('<')[1].split('>')[0]

    open('emails', 'a').write('%s\n' % sender)
    open('already', 'a').write('%s\n' % uid)

step = 100
acc = []
total = 0
while len(ids) > 0:
    uid = ids.pop(0)
    if already.get(uid, None):
        continue
    acc.append(uid)
    if len(acc) >= step:
        result, data = mail.uid('fetch', ','.join(acc), '(BODY[HEADER.FIELDS (FROM)])')
        if not result == 'OK':
            continue
        i = 0
        while i < len(data):
            if type(data[i]) is tuple:
                extract_email(data[i][1])
            i += 2
        acc = []

        total += 100
        sys.stdout.write('.')
        if total % 1000 == 0:
            sys.stdout.write(' %d\n' % (total + start))
        
            
    
