# F2reload


Simple extension of the [F2-examples.zip package](http://docs.openf2.org/F2-examples.zip) to demo reloading of an F2 app in-place.

## Steps

* Clone or download this repository 
* Open a browser and point to `http://localhost/F2reload/examples/container/`
* Click "Select Apps" in top right
* Press "Hello World Reload" checkbox
* Press Save
* Press the "Reload app (replace)" link

## Relevant code

### Container

The Container Developer controls the AppHandlers and reload logic must be supported in both the `appCreateRoot` and `appRender` AppHandlers.

* [Lines 9-11](https://github.com/markhealey/F2reload/blob/master/examples/container/js/container.js#L9), in the `appCreateRoot` function, check for the `reloaded` property and assign the `appConfig.root` to the _existing_ app root element. 
* [Line 11](https://github.com/markhealey/F2reload/blob/master/examples/container/js/container.js#L11), note the use of the instanceId in the jQuery selector. [Line 22](https://github.com/markhealey/F2reload/blob/master/examples/container/js/container.js#L22) demonstrates adding the instanceId to the app root as a `data-` attribute during initial app rendering.
* [Lines 49-57](https://github.com/markhealey/F2reload/blob/master/examples/container/js/container.js#L49), the `appRender` function checks for the `reloaded` property and inserts the reloaded HTML into the existing root vs. finding a row to fit the new app.

### App Class

* [Line 60](https://github.com/markhealey/F2reload/blob/master/examples/apps/JavaScript/HelloWorldReload/appclass.js#L60), there's a new function in the AppClass to handle app reloading. Note the important parts of this function:
    * `this.$root` is set to null along with `this.appConfig.root`.
    * The `appConfig.context` property is modified to have some new arbitrary data (`{newProp:'newValue'}`) alongside the _critical-for-this-to-work_ `reloaded:true` name/value pair. 
* [Line 28](https://github.com/markhealey/F2reload/blob/master/examples/apps/JavaScript/HelloWorldReload/appclass.js#L28), once the app is reloaded, set the `this.appConfig.context.reloaded` property to `null`. (Since this is a demo without real data, there is some additional logic to append a `guid` to the app to prove it is reloading.)

## Copyright and License

Copyright &copy; 2013 Markit On Demand, Inc.

"F2" is licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at: 

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the License for the specific language governing permissions and limitations under the License.

Please note that F2 ("Software") may contain third party material that Markit On Demand Inc. has a license to use and include within the Software (the "Third Party Material").  A list of the software comprising the Third Party Material and the terms and conditions under which such Third Party Material is distributed are reproduced in the [ThirdPartyMaterial.md](https://github.com/OpenF2/F2/blob/master/ThirdPartyMaterial.md) file. The inclusion of the Third Party Material in the Software does not grant, provide nor result in you having acquiring any rights whatsoever, other than as stipulated in the terms and conditions related to the specific Third Party Material, if any. 


