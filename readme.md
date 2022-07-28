# MapTool Notebook add-in library

This project is inspired by the excellent [notebook library](https://github.com/rtakehara/5e-Framework/tree/master/Resources) by Rod Takehara.

The project is mainly used as a learning point for myself. The purpose is to polish and modernize the code to use javascript and the new add-in library functionality in MapTool. 

Unlike the original library, this add-on keeps all notebooks in the data store, and thus avoid the need for tokens to represent each notebook. 

Access to notebooks is handled through an overlay, which presents the available notebooks to each player. 

# How to build
A VS Code task is included which will build a .mtlib in the `release` folder. 

# How to Contribute
Undecided as of yet. 

# Changelog

## Unreleased
- [ ] Overlay interface for accessing the notebook library.   
- [x] Configuration of library.   
- [ ] Create and maintain notebooks.   
- [x] Access to notebooks can be controlled by author. (GM will always have access).   
- [x] Show list of available notebooks.  
- [ ] Create or update builtin user guide as a notebook.  
- [] more to come ..