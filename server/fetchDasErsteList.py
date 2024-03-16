import requests
from bs4 import BeautifulSoup
import json
import os
from collections import defaultdict
import time
import re


alle = defaultdict(list)
def add_to_list(responseText):
    soup = BeautifulSoup(responseText, "html.parser")
    links = soup.select(".list > li > a")
    for link in links:
        text = link.text
        try:
            title = text.split("\n")[0].replace("Tatort: ", "").strip()
            title = re.sub(r" \| Tatort.*", "", title)
            team = text.split("\n")[1].split("(")[1].strip()
            city = text.split("\n")[1].split("(")[-1].split(")")[0].strip()
            date = text.split("\n")[-1].strip()
            #print({"title": title, "team": team, "city": city})
            new = {"team": team, "city": city, "date": date}
            if "Klare Sprache" not in title:
                alle[title].append(new)
        except:
            pass
    return len(links)

dir_path = os.path.dirname(os.path.realpath(__file__))
num_pages = 25
print(f"Pages: {num_pages}")
for i in range(num_pages):
    resp = requests.get(f"https://www.daserste.de/unterhaltung/krimi/tatort/sendung/tatort-alle-faelle-100~_seite-{i}.html")
    resp.encoding = 'UTF-8'
    add_to_list(resp.text)
    time.sleep(0.2)

print(f"\nAlle: {len(alle)}")
# save to json
with open(os.path.join(dir_path, "alle.json"), "w", encoding="utf-8") as f:
    json.dump(alle, f, ensure_ascii=False)
