#Script to join data inside data folder into the index.html

import os
import json

nodes = dict()
links = list()

def rlt(text):
    """Function to remove line termination chars."""
    return text.replace("\n", "").replace("\r", "")

for i, f in enumerate(os.listdir("data")):
    if f[-4:] != ".txt":
        continue

    with open(os.path.join("data", f)) as fdata:
        lines = fdata.readlines()
        name = rlt(lines[0])

        if name in nodes:
            raise Exception("Node name already placed.")

        #Populate nodes
        nodes[f] = {
            "name": name,
            "link": rlt(lines[1]),
            "x": 0,
            "bgcolor": "#b3b3ff",
            "fgcolor": "#2d002d",
            "localId": i,
            "y": 0,
            "globalId": i
        }

        #Populate links
        for link in lines[2:]:
            links.append([
                f,
                rlt(link)
            ])

#Get links ids
linksIds = list()
for target, source in links:
    linksIds.append({
        "sourceId": nodes[source]["localId"],
        "targetId": nodes[target]["localId"],
    })

#Set everything to a object
joinedData = {
    "nodes": nodes.values(),
    "links": linksIds
}

base_index_file = ""
with open("base_index.html") as base_index_f:
    base_index_file = base_index_f.read()

#Set to index file
with open("index.html", "w") as indexf:
    indexf.write(base_index_file.replace("%JOINEDDATA%", json.dumps(joinedData)))

#print(joinedData)
