# <p style='color:dodgerblue' align='center'>Extension Update Checklist</p>

## 1.0 *Update package.json*

### 1.1 *Update version number*
Open `package.json` and change `version` accordingly.

### 1.2 *Update feature contributions*
For example, if you're contributing a new command:
```
...
"commands": [
    ...
    {
        "command": "extension.command",
        "title": "Extension: Command"
    },
    {
        "command": "extension.needInputCommand",
        "title": "Extension: Need Input Command..."
    }
],
...
```

## 2.0 *Update extension code*
#### Self-explanatory.

## 3.0 *Update changelog*
Sample changelog entry:
```
2.7.3 *(Revision of 2.7.2)* **CURRENT**
- Cat bit my code and ran off with it so I had to fix it
...
```

## 4.0 *Pack extension*
Run `vsce package`, and optionally move the resulting `.vsix` into a separate directory.

## 5.0 *Do rigorous testing*
Test all aspects of the extension, if possible.

## 6.0 *Final steps*

### 6.1 *Upload VSIX file*
Upload the `.vsix` file to [the Visual Studio Extension Marketplace](https://marketplace.visualstudio.com/manage). Wait for it to verify, and it's done!

### 6.2 *Upload changes to GitHub*
Go to Source Control (`Ctrl-Shift-G`), and stage your changes. Commit them with a message, then synchronize the changes, and you're done! You've updated your extension.