# Git Workflow

## At the start of coding time
Switch to your local dev branch  
```git checkout dev```  
Pull the latest changes from the github's dev branch onto your local dev branch  
```git pull origin dev```  

## Using feature branches
If you're continuing work on a feature branch, switch to your feature branch  
```git checkout feature-branch```  
THEN merge the changes you pulled from dev into your working feature branch  
```git merge dev```  
If you're starting work on a new feature branch, use -b to create a new branch 
```git checkout -b feature-branch```  

## Please commit often
```git add .```  
```git commit```  

## rebase before pull request
To help ensure that you have the latest github version, this will pull the latest dev changes into YOUR feature branch.  
```git pull --rebase origin dev```  

## push your feature branch to your fork
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
This is to keep your dev branch up to date  
```git pull --rebase origin dev```  
It helps keeps things the repo cleaner to delete your feature branch once you are completely done with your feature. The -d is for delete.  
```git branch -d feature-branch```  
