const say = require('say')

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

        class SayActionComponent extends ActionComponent {
            static classInfo = makeDerivedClassInfo(ActionComponent.classInfo, {
                properties: [
                    {
                        name: "sayText",
                        type: 0 /* String */
                    }
                ], icon: (
                    React.createElement("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 8.010000228881836 5.670000076293945"
                      }, React.createElement("path", {
                        d: "M1.16.01C.44.73 0 1.72 0 2.82s.43 2.12 1.16 2.84l.72-.72C1.34 4.4 1 3.65 1 2.81c0-.83.33-1.55.88-2.09L1.16 0zm5.69 0l-.72.72c.54.54.88 1.26.88 2.09 0 .83-.33 1.58-.88 2.13l.72.72c.72-.72 1.16-1.74 1.16-2.84 0-1.1-.43-2.09-1.16-2.81zM2.6 1.42c-.36.36-.59.86-.59 1.41 0 .55.23 1.08.59 1.44l.69-.72c-.18-.18-.28-.44-.28-.72 0-.28.1-.5.28-.69l-.69-.72zm2.81 0l-.69.72c.18.18.28.41.28.69 0 .28-.1.54-.28.72l.69.72c.36-.36.59-.89.59-1.44 0-.55-.23-1.05-.59-1.41z"
                      }))
                ),
                componentHeaderColor: "#26ff13",
                enabledInComponentPalette: (projectType) => projectType === "dashboard"
            });

            constructor() {
                super();

                this.sayText =  'BB3'; 

                mobx.observable(this);
                mobx.computed(this);
            }

            async execute(runningFlow) {
                // Does not work
                //await say.speak(this.sayText);
                await say.speak("BB3");

            }
        }
        
        registerClass(SayActionComponent);

        ////////////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////////////
    }
};

exports.default = extension;
