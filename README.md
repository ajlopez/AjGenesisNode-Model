# AjGenesisNode Model

AjGenesisNode Model tasks and templates. WIP.

## Installation

Install [AjGenesis for Node](https://github.com/ajlopez/AjGenesisNode) globally using:
```
npm install -g ajgenesis
```

## Usage

An AjGenesis project has a current directory, and special subdirectories. One of these distinguished directories
is `model`, where JSON files defines the free model to use for code generation. You can edit directly those files,
or you can use AjGenesisNode Model tasks.

To set a property in the model
```
ajgenesis model:set project title 'My Project'
```
> Use double quotes `"My Project"` in Windows

It modified or add a `models/project.json` file with a property `title` with string value `My Project`.

```json
{
    "title": "My Project",
    .... other properties
}

## Development

```
npm install -g ajgenesis
git clone git://github.com/ajlopez/AjGenesisNode-Model.git
cd AjGenesisNode-Model
npm link ajgenesis
npm install
npm test
```

## Versions

[TBD]

## Contribution

Feel free to [file issues](https://github.com/ajlopez/AjGenesisNode-Model) and submit
[pull requests](https://github.com/ajlopez/AjGenesisNode-Model/pulls) — contributions are
welcome.

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.
