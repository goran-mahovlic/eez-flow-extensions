const sjson = require('secure-json-parse');

const extension = {
    eezFlowExtensionInit: (eezStudio) => {
        const {
            React,
            mobx,
            registerClass,
            makeDerivedClassInfo,
            ActionComponent
        } = eezStudio;

        ////////////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////////////

        class JSONActionComponent extends ActionComponent {
            static classInfo = makeDerivedClassInfo(ActionComponent.classInfo, {
                icon: (
                    React.createElement("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 8.010000228881836 7.9800004959106445"
                      }, React.createElement("path", {
                        d: "M4 0c-.69 0-1.34.19-1.91.5l3.22 2.34.75-2.25C5.46.23 4.75 0 4 0zM1.25 1.13C.49 1.86 0 2.87 0 4.01c0 .25.02.48.06.72l3.09-2.22-1.91-1.38zm5.63.13L5.66 5.01h2.19c.08-.32.16-.65.16-1 0-1.07-.44-2.03-1.13-2.75zM2.16 4.48L.41 5.73c.55 1.13 1.6 1.99 2.88 2.22L2.16 4.48zm1.56 1.53l.63 1.97c1.33-.12 2.46-.88 3.09-1.97H3.72z"
                      }))
                ),
                componentHeaderColor: "#3395ff",
                enabledInComponentPalette: (projectType) => projectType === "dashboard"
            });

            constructor() {
                super();
                //mobx.observable(this);
                mobx.computed(this);
            }

            get inputs() {
                return [
                    ...super.inputs,
                    {
                        name: "In",
                        type: 0 /* String */
                    }                  
                ];
            }

            get outputs() {
                return [
                    ...super.outputs,
                    {
                        name: "Out",
                        type: 0 /* String */
                    }                      
                ];
            }

            async execute(runningFlow) {

                const inputPropertyValue = runningFlow.getInputPropertyValue(this, "In");



                if (inputPropertyValue && inputPropertyValue.value != undefined) {

                    const rawJSON = inputPropertyValue.value;
                    const parsedJSON = sjson.parse(rawJSON, { protoAction: 'remove', constructorAction: 'remove' });
                    console.log(rawJSON);
                    console.log(parsedJSON);

                    runningFlow.propagateValue(this, "Out", parsedJSON);
                }

                return undefined;
            }

            getBody() {
                return React.createElement("pre", null, "string json");
            }
        }
        
        registerClass(JSONActionComponent);

        ////////////////////////////////////////////////////////////////////////////////

        class StringActionComponent extends ActionComponent {
            static classInfo = makeDerivedClassInfo(ActionComponent.classInfo, {
                icon: (
                    React.createElement("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 8.010000228881836 7.9800004959106445"
                      }, React.createElement("path", {
                        d: "M4 0c-.69 0-1.34.19-1.91.5l3.22 2.34.75-2.25C5.46.23 4.75 0 4 0zM1.25 1.13C.49 1.86 0 2.87 0 4.01c0 .25.02.48.06.72l3.09-2.22-1.91-1.38zm5.63.13L5.66 5.01h2.19c.08-.32.16-.65.16-1 0-1.07-.44-2.03-1.13-2.75zM2.16 4.48L.41 5.73c.55 1.13 1.6 1.99 2.88 2.22L2.16 4.48zm1.56 1.53l.63 1.97c1.33-.12 2.46-.88 3.09-1.97H3.72z"
                      }))
                ),
                componentHeaderColor: "#3395ff",
                enabledInComponentPalette: (projectType) => projectType === "dashboard"
            });

            constructor() {
                super();
                //mobx.observable(this);
                mobx.computed(this);
            }

            get inputs() {
                return [
                    ...super.inputs,
                    {
                        name: "In",
                        type: 0 /* String */
                    }                  
                ];
            }

            get outputs() {
                return [
                    ...super.outputs,
                    {
                        name: "Out",
                        type: 0 /* String */
                    }                      
                ];
            }

            async execute(runningFlow) {

                const inputPropertyValue = runningFlow.getInputPropertyValue(this, "In");



                if (inputPropertyValue && inputPropertyValue.value != undefined) {

                    const parsedJSON = inputPropertyValue.value;

                    const rawJSON = JSON.stringify(parsedJSON);

                    console.log(rawJSON);

                    console.log(parsedJSON);

                    runningFlow.propagateValue(this, "Out", rawJSON);
                }

                return undefined;
            }

            getBody() {
                return React.createElement("pre", null, "json string");
            }
        }
        
        registerClass(StringActionComponent);

        ////////////////////////////////////////////////////////////////////////////////
    }
};

exports.default = extension;
