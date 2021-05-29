const jsonfile = require('jsonfile')

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

        class readJSONActionComponent extends ActionComponent {
            static classInfo = makeDerivedClassInfo(ActionComponent.classInfo, {
                properties: [
                    {
                        name: "JSONpath",
                        type: 0 /* String */
                    },
                ], icon: (
                    React.createElement("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 1536 1792"
                      }, React.createElement("path", {
                        d: "M1468 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28H96q-40 0-68-28t-28-68V96q0-40 28-68T96 0h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528V640H992q-40 0-68-28t-28-68V128H128v1536h1280zM384 800q0-14 9-23t23-9h704q14 0 23 9t9 23v64q0 14-9 23t-23 9H416q-14 0-23-9t-9-23v-64zm736 224q14 0 23 9t9 23v64q0 14-9 23t-23 9H416q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h704zm0 256q14 0 23 9t9 23v64q0 14-9 23t-23 9H416q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h704z"
                      }))
                ),
                componentHeaderColor: "#f59542",
                enabledInComponentPalette: (projectType) => projectType === "dashboard"
            });

            constructor() {
                super();

                this.JSONpath = '/tmp/read.json';

                mobx.observable(this);
                mobx.computed(this);
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
                const file = jsonfile.readFileSync(this.JSONpath)
                console.dir(file)
                runningFlow.propagateValue(this, "Out", file);
            }
        }
        
        registerClass(readJSONActionComponent);

        ////////////////////////////////////////////////////////////////////////////////

        class writeJSONActionComponent extends ActionComponent {
            static classInfo = makeDerivedClassInfo(ActionComponent.classInfo, {
                properties: [
                    {
                        name: "JSONpath",
                        type: 0 /* String */
                    },
                ], icon: (
                    React.createElement("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 1536 1792"
                      }, React.createElement("path", {
                        d: "M1468 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28H96q-40 0-68-28t-28-68V96q0-40 28-68T96 0h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528V640H992q-40 0-68-28t-28-68V128H128v1536h1280zM384 800q0-14 9-23t23-9h704q14 0 23 9t9 23v64q0 14-9 23t-23 9H416q-14 0-23-9t-9-23v-64zm736 224q14 0 23 9t9 23v64q0 14-9 23t-23 9H416q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h704zm0 256q14 0 23 9t9 23v64q0 14-9 23t-23 9H416q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h704z"
                      }))
                ),
                componentHeaderColor: "#f59542",
                enabledInComponentPalette: (projectType) => projectType === "dashboard"
            });

            constructor() {
                super();

                this.JSONpath = '/tmp/write.json';

                mobx.observable(this);
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

            async execute(runningFlow) {
                const inputPropertyValue = runningFlow.getInputPropertyValue(this, "In");
                const file = inputPropertyValue.value;
                jsonfile.writeFileSync(this.JSONpath, file)
                // runningFlow.propagateValue(this, "Out", this.rawJSON);

            }
        }
        
        registerClass(writeJSONActionComponent);

        ////////////////////////////////////////////////////////////////////////////////
    }
};

exports.default = extension;
