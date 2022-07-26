[h:data = json.set("", "isGM", isGM())]
[h:data = json.set(data, "playerName", getPlayerName())]
[h:data = json.set(data, "notebooks", getLibProperty("notebooks"))]
[r:data]