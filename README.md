# Njörðr
Njörðr is a GUI for browsing [Skaði](https://github.com/Turistforeningen/Skadi) – Fotoweb API adapter.

## Load plugin
Include the plugin in a `script` tag.
```html
<script type="text/javascript" src="/path/to/fotoweb/plugin.js"></script>
```
## Methods
The plugin will be available as a global `fotoweb` object.jk
### open
```javascript
fotoweb.open(options, callback);
```
#### options
* **boolean** `multiselect` - Allow the user be to select multiple photos before .closing the popup (**default**: `false`)
* **string** `apiUrl` - Full URL to API. *No trailing slash*.
* **string[]** `hiddenArchives` – Names of archives to hide from the user.
* **string[]** `promotedArchives` – Names of archives that are more important to the user. The first one will be opened by default. All of them will be in the top of the list of archives in the nav bar.

#### callback
```javascript
function callback(selected) {
  console.log('Look what I got!', selected);
}
```
Function that will be called when photo selection is confirmed in popup.

* **object** `selected` Returns a single object if option `multiselect` is `false`.
* **object[]** `selected` Returns an array of objects if option `multiselect` is `true`.
