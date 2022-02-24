---
layout: layouts/post.njk
title: MacOSX Front-end dev setup
tags: ['OSX', 'DeveloperExperience']
date:   2022-01-25
author: Antoine Corre
---
Today is your first day as front-end developer in this fancy company, Congrats!
They provided you with this shiny macbook pro full options, but there is one hiccup: you are a window user 👻.

Don't be scared, here is a short list of tips and tools to get you started in the right track!

## XCode

Xcode is an IDE for the Mac ecosystem. You can use it to work, but this is not why we need it: it come with a bunch of packages that may be needed 
by other programs and provide some nice other tools, like the simulator that we will discover later.

Don't waste time and start downloading, as it will take some time (~13go, without optionals packages)

[Xcode on appstore](https://apps.apple.com/us/app/xcode/id497799835?mt=12)


## Improving your terminal: iTerm2
This is obviously opinionated and you have other options, but this is one of the most popular choice. Since we will spend some time in there for the rest of this article, we can deal with that first.

Set it up from [iterm2.com](https://iterm2.com/index.html) or go directly to the next step 

### Pimp your shell
Since Catalina, macOS come with `zsh` instead of `bash`, so here you don't have to install anything. However you could be interested in customizing it a little with the help of some plugins: [https://ohmyz.sh/](https://ohmyz.sh/)

For the adventurous, you could also give a try to [fish](https://fishshell.com/) and [oh-my-fish](https://github.com/oh-my-fish/oh-my-fish),but maybe not on the first day as it has few differences that could cause troubles while running some scripts if you don't pay attention. 

## Homebrew Package manager
Just like windows, macOS don't come with an actual package manager, you have to get it yourself.
Homebrew is the defacto standard for that, you can check their website [brew.sh](https://brew.sh/) or just run the following command:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Once its done, you are all set to install the rest of the tools!

> If you are a windows user, you might want to check `chocolatey` for the same purpose on your personal machine.


## NVM and nodejs

NVM is short for Node Version Manager: it let you easily switch node version between project and can even do it automatically when you open a project by using the configuration file `.nvmrc` that can be set at the root of your projects.

You can install it with the new brew command, but it is worth to mention that nvm dont officially support this installation options (if you have troubles, install it from the [official page](https://github.com/nvm-sh/nvm))

```shell
brew install nvm
```

> FYI: automatic switch wont work out of the box with `fish shell`

## Docker Desktop

I don't think I need to present this one, but here you go:
```shell 
brew install --cask docker
```
or from the official page [docker desktop](https://www.docker.com/products/docker-desktop)

## Personal tools: tilling manager

I am a casual user of tilling manager. If you are also interested, I can share 2 different one:

### Rectangle
Nice and simple, it is a small and easy experience to start on this path. Work out of the box and still rely on pointer device to do most of the work.

Get it on their [website](https://rectangleapp.com/) or through brew 
 
 ```shell
 brew install --cask rectangle

 ```

### Amethyst

All battery included, extensive configurable keyboard shortcut. You will most probably want to disabled almost everything and gradually add your own shortcut.

Learn more on their [github page](https://github.com/ianyh/Amethyst) or install it directly:

```shell
brew install --cask amethyst
```



