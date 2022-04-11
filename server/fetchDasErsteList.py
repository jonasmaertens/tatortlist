import requests
from bs4 import BeautifulSoup
from time import sleep
import json
import os

dir_path = os.path.dirname(os.path.realpath(__file__))
url = "https://www.daserste.de/unterhaltung/krimi/tatort/sendung/tatort-alle-faelle-100~_seite-0.html"
alle = {}
# Get the HTML from the URL
response = requests.get(url)
response.encoding = 'UTF-8'
# Parse the HTML
soup = BeautifulSoup(response.text, "html.parser")
pagination = soup.find("h3", {"class": "paging"}).string
num_pages = int(pagination.split(" | ")[1])
print(f"{num_pages = }")
for i in range(num_pages):
    url = f"https://www.daserste.de/unterhaltung/krimi/tatort/sendung/tatort-alle-faelle-100~_seite-{i}.html"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    for link in soup.select(".list > li > a"):
        text = link.text
        try:
            title = text.split("\n")[0].replace("Tatort: ", "").strip()
            team = text.split("\n")[1].split("(")[1].strip()
            city = text.split("\n")[1].split("(")[-1].split(")")[0].strip()
            date = text.split("\n")[-1].strip()
            #print({"title": title, "team": team, "city": city})
            alle[title] = {"team": team, "city": city, "date": date}
        except:
            print(f"{text}")
    sleep(0.5)
print(f"{len(alle) = }")
# save to json
with open(os.path.join(dir_path, "alle.json"), "w", encoding="utf-8") as f:
    json.dump(alle, f, ensure_ascii=False, indent=4)
