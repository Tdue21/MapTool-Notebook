[h:name=decode(macro.args)]
[h:notebooks = decode(getLibProperty("Notebooks"))]
[h:notebook = json.get(notebooks, name)]
[r:notebook]
