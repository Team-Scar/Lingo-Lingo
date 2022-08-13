# Git Workflow

## At the start of coding time
Switch to your local dev branch  
```git checkout dev```  
Pull the latest changes from the github's dev branch onto your local dev branch  
```git pull --rebase origin dev```  

## Using feature branches
If you're starting work on a new feature branch, use -b to create a new branch 
```git checkout -b feature-branch```  
If you're continuing work on a feature branch, switch to your feature branch  
```git checkout feature-branch``` 
Then merge the changes you pulled from dev into your working feature branch  
```git merge dev```  

## Please commit often
```git add .```  
```git commit```  

## rebase before pull request
To help ensure that you have the latest github version if someone else made changes  
```git pull --rebase origin dev```  

## push to a feature branch on YOUR fork
```git push origin feature-branch```  

## make a pull request on GitHub
<b>Make sure you are pulling from your feature branch to the base dev NOT main</b>  
Change what you do next below depending if your pull is accepted or rejected after review  

---
---

## if pull request is rejected then fix bugs, commit
```git add .```  
```git commit```  
```git pull --rebase origin dev```  
```git push origin feature-branch```  

## make a pull request on GitHub
<b>Make sure to pull from your feature branch to the base dev NOT main</b>  

---
---

## if pull request is accepted
```git checkout dev```  
```git pull --rebase origin dev``` 
It helps keeps things the repo cleaner to delete your feature branch once you are completely done with your feature. The -d is for delete.  
```git branch -d feature-branch```  
