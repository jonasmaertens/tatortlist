import json

dupes = []
titles = []

#open "alle.json" and read all titles
with open("alle.json", "r", encoding="utf-8") as f:
    alle = json.load(f)
    for item in alle:
        if item['title'] not in titles:
            titles.append(item['title'])
        else:
            dupes.append(item['title'])
print(dupes)