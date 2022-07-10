[h:broadcast("OnCampaignLoad starting")]

[h:defineFunction("notebook.list", "Notebooks@lib:net.dovesoft.Notebook")]
[h:defineFunction("notebook.help", "ShowHelp@lib:net.dovesoft.Notebook")]
[h:defineFunction("notebook.setup", "Setup@lib:net.dovesoft.Notebook")]
[h:defineFunction("notebook.about", "About@lib:net.dovesoft.Notebook")]

[h:macro()]
[h:broadcast("OnCampaignLoad done")]