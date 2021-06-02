let {PythonShell} = require('python-shell')

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

        class RunPythonActionComponent extends ActionComponent {
            static classInfo = makeDerivedClassInfo(ActionComponent.classInfo, {
                properties: [
                    {
                        name: "pythonScript",
                        type: 2 /* String */ 
                    }
                ], icon: (
                    React.createElement("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 1536 1792"
                      }, React.createElement("path", {
                        d: "M1468 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28H96q-40 0-68-28t-28-68V96q0-40 28-68T96 0h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528V640H992q-40 0-68-28t-28-68V128H128v1536h1280zM384 800q0-14 9-23t23-9h704q14 0 23 9t9 23v64q0 14-9 23t-23 9H416q-14 0-23-9t-9-23v-64zm736 224q14 0 23 9t9 23v64q0 14-9 23t-23 9H416q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h704zm0 256q14 0 23 9t9 23v64q0 14-9 23t-23 9H416q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h704z"
                      }))
                ),
                componentHeaderColor: "#ffed13",
                enabledInComponentPalette: (projectType) => projectType === "dashboard"
            });

            constructor() {
                super();

                //this.pythonScript =  '/tmp/test.py'; 

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

                await PythonShell.runString(this.pythonScript, null, function (err) {
                  if (err) throw err;
                  console.log('finished');
                });
            }
        }
        
        registerClass(RunPythonActionComponent);

        ////////////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////////////
    }
};

exports.default = extension;
