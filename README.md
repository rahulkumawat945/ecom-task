# E-commerce Product Dashboard

This is a E-commerce Product Dashboard for Frontend Engineering Assignment. 

# Design decisions: 
I have used CSS files based designing and tailwind together. I wanted to create this task easily and fast so Tailwind helps me with that. I have referred to regular e-commerce sites as design reference.
Project includes a left section for filters in desktop and button that displayed filter model.
I have used vite for bootstrap code of react app. It's a little faster development vise.

# Pattern used:
Followed the Presenter and Container pattern for parent level components. Didn't used it for all the components as it seems unnecessary to use for every small component. If we don't have time constraint then can follow it for each component.  

# Optimization
Din't applied anything external source to optimize the website performance. But there are things that we can take care when we have a more SEO required page, then we can focus on web vitals performance.

# Setup
clone the repository and open directory in terminal
run to install dependencies:

# Scope of improvement
Right now filters are being applied after data is retrieved because of API limitations. I would have discussed with backend team and prepared flexible API that would tale filters as params and fetch data accordingly. So user would get proper data without making too many calls on backed. Also I missed to configure alias at initially so followed without that, I would have done that so cleaner import paths can be used all over and would not cause issues while moving files from one directory to other.


run to install dependencies:
```
npm install
```
run in development:
```
npm run dev
```
this will launch the page in localsystem.

if you want to host page on github-pages:
```
npm run deploy
```

