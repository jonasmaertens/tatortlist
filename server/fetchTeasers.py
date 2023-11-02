import math
import requests
import json
import re
import time
import os


def clean_title(title):
    title = title.replace('Tatort: ', '')
    # regex remove date in title
    title = re.sub('\s\([0-9]{4}\)', '', title)
    title = re.sub(r" \| Tatort.*", "", title)
    title = title.replace("Tatort - ", '').strip()
    return title


# get json from 'https://api.ardmediathek.de/page-gateway/widgets/ard/compilation/71IpTwcl8yta2O3eVCSJR0?pageNumber=0&pageSize=1'
teasers = []
# setup pagination
resp = requests.get(
    'https://api.ardmediathek.de/page-gateway/widgets/ard/compilation/71IpTwcl8yta2O3eVCSJR0?pageNumber=0&pageSize=1')
data = resp.json()
num = int(data['pagination']['totalElements'])
pages = math.ceil(num / 50)
for i in range(pages):
    time.sleep(0.4)
    resp = requests.get(
        'https://api.ardmediathek.de/page-gateway/widgets/ard/compilation/71IpTwcl8yta2O3eVCSJR0?pageNumber=' + str(i) + '&pageSize=50')
    data = resp.json()
    new_teasers = data['teasers']
    new_teasers = [{'title': teaser['longTitle'],
                    'id': teaser['id'],
                    'image': teaser['images']['aspect16x9']['src'],
                    'duration': teaser['duration']} for teaser in new_teasers if teaser['duration'] > 3600 and 'Klare Sprache' not in teaser['longTitle'] and 'klare Sprache' not in teaser['longTitle']]
    teasers += new_teasers
#print date and time
print(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
print(f"num = {num}, pages = {pages}, len(teasers) = {len(teasers)}")

for teaser in teasers:
    teaser['title'] = clean_title(teaser['title'])
# check for duplicates
dupes = []
for i in range(len(teasers)):
    for j in range(i+1, len(teasers)):
        if teasers[i]['title'] == teasers[j]['title']:
            #print(teasers[i]['title'])
            # print(teasers[i]['id'])
            # print(teasers[j]['id'])
            # print(teasers[i]['image'])
            # print(teasers[j]['image'])
            # print(teasers[i]['duration'])
            # print(teasers[j]['duration'])
            # mark for deletion
            dupes.append(j)
# delete duplicates
for i in sorted(dupes, reverse=True):
    #print(teasers[i]['title'])
    del teasers[i]
print("Remaining: "+str(len(teasers)))
# write to json file
dir_path = os.path.dirname(os.path.realpath(__file__))
with open(os.path.join(dir_path, 'teasers_cleaned.json'), 'w', encoding="utf8") as json_file:
    json.dump(teasers, json_file, ensure_ascii=False)
