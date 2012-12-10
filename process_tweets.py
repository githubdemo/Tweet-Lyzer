#!/usr/bin/env python2.7
print "Content-type: text/plain\n"

import json
import urllib
import re
import time
import cgi
import os
import sys
import datetime

def get_words_data(username,request_type):
    fname = "jsondata/"+username
    json_data=open(fname)
    result = json.load(json_data)
    words_dictionary ={}
    tags_dictonary = {}
    reply_to_dictionary = {}
    date_dictionary = {}

    tag_regex = re.compile('^#')
    reply_to_regex = re.compile('^@')
    
    for key in result:
        try:
            tweet=key['text']
            words = tweet.split()
            for word in words:
                if word in ['a','an','the']:
                    continue;
                if tag_regex.match(word):
                    if tags_dictonary.has_key(word):
                        tags_dictonary[word] = tags_dictonary[word] +1
                    else:
                        tags_dictonary[word] = 1;
                elif reply_to_regex.match(word):
                    if reply_to_dictionary.has_key(word):
                        reply_to_dictionary[word] = reply_to_dictionary[word]+1
                    else:
                        reply_to_dictionary[word] = 1;
                elif words_dictionary.has_key(word):
                    words_dictionary[word] = words_dictionary[word] + 1;
                    continue;
                else:
                    words_dictionary[word] = 1;            
        except Exception, e:
            print "%s" %e

    if request_type == str(2):
        print json.dumps([reply_to_dictionary])
    elif request_type == str(7):
        print json.dumps([tags_dictonary])
    elif request_type == str(8):
        items = [(v, k) for k, v in words_dictionary.items()]
        items.sort()
        items.reverse()
        print json.dumps([items])
    

    
def get_date_data(username,arg):
    fname = "jsondata/"+username
    json_data=open(fname)
    result = json.load(json_data)
    date_dictionary = {}     
    for tweet in result:
        if arg == 'year':
            created_at = time.strftime('%Y', time.strptime(tweet['created_at'],'%a %b %d %H:%M:%S +0000 %Y'))
        elif arg == 'month':
            created_at = time.strftime('%m', time.strptime(tweet['created_at'],'%a %b %d %H:%M:%S +0000 %Y'))
        elif arg == 'day':
            created_at = time.strftime('%d', time.strptime(tweet['created_at'],'%a %b %d %H:%M:%S +0000 %Y'))
        elif arg == 'hour':
            created_at = time.strftime('%H', time.strptime(tweet['created_at'],'%a %b %d %H:%M:%S +0000 %Y'))
        elif arg == 'weekday':
            temp_date_string = time.strftime('%Y/%m/%d', time.strptime(tweet['created_at'],'%a %b %d %H:%M:%S +0000 %Y'))
            year, month, day = (int(x) for x in temp_date_string.split('/'))    
            created_at=datetime.date(year,month,day).strftime('%A')
        
        created_at = re.sub(re.compile('^0'),'',created_at)
        
        if date_dictionary.has_key(created_at):
            date_dictionary[created_at] = date_dictionary[created_at] + 1
        else:
            date_dictionary[created_at] = 1;
    
    print json.dumps([date_dictionary])



def get_tweet_source(json_data):
    tweet_source_dictionary ={};
    extract_source_regex = re.compile("<.*?>")
    for tweet in json_data:
        source = re.sub(extract_source_regex,'',tweet['source'])
        try:            
            if tweet_source_dictionary.has_key(source):
                tweet_source_dictionary[source] = tweet_source_dictionary[source] +1
            else:
                tweet_source_dictionary[source] = 1
        except Exception,e:
            print "%s" %e
    return [tweet_source_dictionary]


def get_tweet_list(username):
    fname = "jsondata/"+username
    json_data=open(fname)
    result = json.load(json_data)
 
    tweet_list = [];
    for key in result:
        try:
            tweet=key['text']
            tweet_list.append(tweet);
        except Exception,e:
            sys.stdout.write("")
    print json.dumps(tweet_list)
    
    
def get_json_data_from_twitter(username):
    try:
        fname = "jsondata/" + username
        if os.path.exists(fname):
            sys.stdout.write("success")
        else:
            url='https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name='+username+'&count=200&page=1'
            json_data=urllib.urlopen(url).read()
            if json_data:
                FH=open(fname,"w+")
                FH.write(str(json_data))
                FH.close()
                sys.stdout.write("success")
            else:
                sys.stdout.write("fail")
    except Exception,e:
        sys.stdout.write("fail")
   

######## CGI EXECUTION START #########

form = cgi.FieldStorage()
username=form.getvalue('uname')
call_id=form.getvalue('call_id')

#get twitter data and save it in file
if call_id == str(1):
    get_json_data_from_twitter(username)
#get most frequently mentioned users
elif call_id == str(2):
    get_words_data(username,"2")
#get day-wise tweets
elif call_id == str(3):
    get_date_data(username,"day")
#get month-wise tweets
elif call_id == str(4):
    get_date_data(username,"month")
#get tweets weekday-wise
elif call_id == str(5):
    get_date_data(username,"weekday")
#get tweets timewise
elif call_id == str(6):
    get_date_data(username,'hour')
#get most frequently used hashtags
elif call_id == str(7):
    get_words_data(username,'7')
#get most frquently used words
elif call_id == str(8):
    get_words_data(username,'8')
#return list of all tweets
elif call_id == str(9):
    get_tweet_list(username)


### SCRIPTS ENDS ###