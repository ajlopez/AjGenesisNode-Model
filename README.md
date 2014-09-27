# AjGenesisNode Model

AjGenesisNode Model tasks and templates

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
ajgenesis model:set project title="My Project"
```
> To be reviewed if in *nix shell you should use `"title=My Project"` instead of `title="My Project"`

It modified or add a `models/project.json` file with a property `title` with string value `My Project`.

```json
{
    "project": {
        "title": "My Project",
        // ... other preexisting properties
    }
}
```

Set many properties in one command
```
ajgenesis model:set project title="My Project" description="My pet project"
```

Set an empty object
```
ajgenesis model:set project
```

Result
```json
{
    "project": {
    }
}
```

Set a boolean flag
```
ajgenesis model:set project usemongodb
```

Result
```json
{
    "project": {
        "usemongodb": true
    }
}
```

Set integers, booleans
```
ajgenesis model:set project usemongodb=true useangular=false port=3000
```

Result
```json
{
    "project": {
        "usemongodb": true,
        "useangular": false,
        "port": 3000
    }
}
```


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

- 0.0.1: Published, with set and remove tasks, initial implementation
- 0.0.2: Published, use `ajgenesis/models`
- 0.0.3: Published, use createModelDirectory, getModelDirectory
- 0.0.4: Published, install method

## Contribution

Feel free to [file issues](https://github.com/ajlopez/AjGenesisNode-Model) and submit
[pull requests](https://github.com/ajlopez/AjGenesisNode-Model/pulls) — contributions are
welcome.

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.
