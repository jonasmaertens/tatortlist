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
            #print(f"{text}")
            pass
    return len(links)

dir_path = os.path.dirname(os.path.realpath(__file__))
# url = "https://www.daserste.de/unterhaltung/krimi/tatort/sendung/tatort-alle-faelle-100~_seite-0.html"
# # Get the HTML from the URL
# response = requests.get(url)
# response.encoding = 'UTF-8'
# # Parse the HTML
# soup = BeautifulSoup(response.text, "html.parser")
# pagination = soup.find("h3", {"class": "paging"}).string
# num_pages = int(pagination.split(" | ")[1])
num_pages = 25
print(f"Pages: {num_pages}")
# rs = (grequests.get(u) for u in [f"https://www.daserste.de/unterhaltung/krimi/tatort/sendung/tatort-alle-faelle-100~_seite-{i}.html" for i in range(num_pages)])
# print([add_to_list(resp.text) for resp in grequests.map(rs)])
for i in range(num_pages):
    #print(i, end="...", flush=True)
    resp = requests.get(f"https://www.daserste.de/unterhaltung/krimi/tatort/sendung/tatort-alle-faelle-100~_seite-{i}.html")
    resp.encoding = 'UTF-8'
    add_to_list(resp.text)
    time.sleep(0.2)

print(f"\nAlle: {len(alle)}")
# save to json
with open(os.path.join(dir_path, "alle.json"), "w", encoding="utf-8") as f:
    json.dump(alle, f, ensure_ascii=False)
